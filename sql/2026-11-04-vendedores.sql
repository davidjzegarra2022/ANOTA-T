-- Vendedores por tienda (hasta 4): cada uno comparte su propio link y el
-- resumen del pedido le llega a SU WhatsApp. Reemplaza al SQL de vendedores
-- del 2026-11-03 (se puede correr aunque aquel ya se haya corrido).
-- Ejecutar una vez en Supabase → SQL Editor → pegar todo → Run.
--
-- Qué agrega:
--   * merchants.sellers  → la lista de Configuración → Vendedores.
--                          [{"id":"k3m9x2qa","name":"Juan Pérez","whatsapp":"987654321"}]
--   * orders.seller_name → el vendedor que trajo cada pedido.
--   * get_seller_public  → el formulario público pregunta por el vendedor del
--                          link (?v=<código>) y recibe su nombre y WhatsApp.
--   * set_order_seller   → marca el pedido recién creado con su vendedor.
--                          El servidor solo acepta vendedores registrados por
--                          la tienda dueña del pedido.

alter table public.merchants
  add column if not exists sellers jsonb not null default '[]'::jsonb;

alter table public.orders
  add column if not exists seller_name text;

create index if not exists orders_seller_idx
  on public.orders (merchant_id, seller_name);

-- Nombre comparable: sin mayúsculas, tildes ni espacios de más.
create or replace function public.seller_key(p text)
returns text language sql immutable set search_path = public as $$
  select translate(lower(regexp_replace(trim(coalesce(p, '')), '\s+', ' ', 'g')),
                   'áéíóúüñ', 'aeiouun');
$$;

-- Vendedor del link: por código (links nuevos) o por nombre (links antiguos
-- ?v=Juan%20Pérez). Devuelve solo ESE vendedor, nunca la lista completa.
create or replace function public.get_seller_public(p_slug text, p_ref text)
returns table (id text, name text, whatsapp text)
language sql stable security definer set search_path = public as $$
  select s->>'id', s->>'name', s->>'whatsapp'
    from public.merchants m, jsonb_array_elements(m.sellers) s
   where m.slug = lower(trim(p_slug))
     and coalesce(trim(p_ref), '') <> ''
     and (coalesce(s->>'id' = trim(p_ref), false)
          or public.seller_key(s->>'name') = public.seller_key(p_ref))
   order by coalesce(s->>'id' = trim(p_ref), false) desc
   limit 1;
$$;

revoke all on function public.get_seller_public(text, text) from public;
grant execute on function public.get_seller_public(text, text) to anon, authenticated;

-- Marca con su vendedor un pedido recién creado (máx. 10 minutos), por su
-- código de rastreo, sin reescribir uno ya marcado. Se guarda el nombre
-- registrado en la tienda (no lo que venga escrito en la URL).
drop function if exists public.set_order_seller(text, text);
create function public.set_order_seller(p_code text, p_seller text)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_order_id public.orders.id%type;
  v_merchant public.orders.merchant_id%type;
  v_name text;
begin
  select o.id, o.merchant_id into v_order_id, v_merchant
    from public.orders o
   where o.tracking_code = upper(trim(p_code))
     and o.seller_name is null
     and o.created_at > now() - interval '10 minutes'
   limit 1;
  if v_order_id is null or coalesce(trim(p_seller), '') = '' then
    return;
  end if;

  select s->>'name' into v_name
    from public.merchants m, jsonb_array_elements(m.sellers) s
   where m.id = v_merchant
     and (coalesce(s->>'id' = trim(p_seller), false)
          or public.seller_key(s->>'name') = public.seller_key(p_seller))
   order by coalesce(s->>'id' = trim(p_seller), false) desc
   limit 1;
  if v_name is null then
    return; -- vendedor que la tienda no tiene registrado (o ya quitó)
  end if;

  update public.orders
     set seller_name = left(regexp_replace(v_name, '[[:cntrl:]]', '', 'g'), 60)
   where id = v_order_id;
end; $$;

revoke all on function public.set_order_seller(text, text) from public;
grant execute on function public.set_order_seller(text, text) to anon, authenticated;

-- Ya no se usa (lo reemplaza get_seller_public).
drop function if exists public.get_seller_contact(text, text);

-- Que la API de Supabase vea las funciones nuevas al instante.
notify pgrst, 'reload schema';

-- Verificación: deben salir 2 filas (orders.seller_name y merchants.sellers).
select table_name, column_name, data_type
  from information_schema.columns
 where table_schema = 'public'
   and ((table_name = 'orders' and column_name = 'seller_name')
     or (table_name = 'merchants' and column_name = 'sellers'));
