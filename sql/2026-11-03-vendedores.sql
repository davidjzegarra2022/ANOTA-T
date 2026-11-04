-- Vendedores por tienda (hasta 4) y su marca en cada pedido
-- Ejecutar una vez en Supabase → SQL Editor.
--
-- Qué agrega:
--   * merchants.sellers  → la lista que se edita en Configuración → Vendedores.
--                          Formato: [{"name":"Juan Pérez","whatsapp":"987654321"}]
--   * orders.seller_name → el vendedor que trajo ese pedido (llega por el link
--                          del formulario: /f/mi-tienda?v=Juan%20Pérez).
--
-- No se toca `submit_order`: el nombre del vendedor se guarda con la función
-- `set_order_seller`, que el formulario llama justo después de crear el
-- pedido. Si esta función no existe, el pedido se guarda igual (sin vendedor),
-- así que el sistema nunca se rompe por no haber corrido este SQL.

alter table public.merchants
  add column if not exists sellers jsonb not null default '[]'::jsonb;

alter table public.orders
  add column if not exists seller_name text;

create index if not exists orders_seller_idx
  on public.orders (merchant_id, seller_name);

-- Solo asigna el vendedor de un pedido recién creado (10 minutos), por su
-- código de rastreo, y nunca reescribe uno ya asignado. El nombre se limpia
-- igual que en el navegador: sin caracteres de control y máximo 60.
create or replace function public.set_order_seller(p_code text, p_seller text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.orders
     set seller_name = left(
           regexp_replace(coalesce(p_seller, ''), '[[:cntrl:]]', '', 'g'),
           60
         )
   where tracking_code = upper(trim(p_code))
     and seller_name is null
     and created_at > now() - interval '10 minutes';
end; $$;

revoke all on function public.set_order_seller(text, text) from public;
grant execute on function public.set_order_seller(text, text) to anon, authenticated;

-- El formulario público necesita el WhatsApp del vendedor para devolverle el
-- resumen del pedido. Solo devuelve el número del vendedor cuyo nombre llega
-- en el link (?v=...), nunca la lista completa.
create or replace function public.get_seller_contact(p_slug text, p_name text)
returns text language sql stable security definer set search_path = public as $$
  select s->>'whatsapp'
    from public.merchants m, jsonb_array_elements(m.sellers) s
   where m.slug = lower(trim(p_slug))
     and translate(lower(trim(s->>'name')), 'áéíóúüñ', 'aeiouun')
       = translate(lower(trim(p_name)), 'áéíóúüñ', 'aeiouun')
   limit 1;
$$;
revoke all on function public.get_seller_contact(text, text) from public;
grant execute on function public.get_seller_contact(text, text) to anon, authenticated;

-- Verificación: deben aparecer las dos columnas nuevas.
select table_name, column_name, data_type
  from information_schema.columns
 where table_schema = 'public'
   and ((table_name = 'orders' and column_name = 'seller_name')
     or (table_name = 'merchants' and column_name = 'sellers'));
