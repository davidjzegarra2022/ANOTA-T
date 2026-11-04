-- Hora de cada estado del pedido (empacado, enviado, cancelado)
-- Ejecutar una vez en Supabase → SQL Editor → pegar todo → Run.
-- Se puede volver a correr sin problema.
--
-- Qué agrega:
--   * orders.packed_at / shipped_at / cancelled_at → cuándo pasó a cada estado.
--   * Un trigger que las llena solo cada vez que el negociante cambia el
--     estado en Envíos (nadie tiene que hacer nada extra).
--   * track_order_by_code devuelve esas horas: la página de rastreo las
--     muestra en la línea de tiempo del cliente.
--
-- Los pedidos que ya estaban empacados o enviados antes de correr esto
-- quedan sin hora (no se inventa); desde ahora cada cambio la guarda.

alter table public.orders
  add column if not exists packed_at timestamptz,
  add column if not exists shipped_at timestamptz,
  add column if not exists cancelled_at timestamptz;

-- Al cambiar de estado: guarda la hora del estado nuevo y, si el pedido
-- retrocede (p. ej. de Enviado a Pendiente por error), borra las horas de
-- los pasos que ya no aplican, para que la línea de tiempo no mienta.
create or replace function public.stamp_order_status()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.status is not distinct from old.status then
    return new;
  end if;

  if new.status = 'cancelled' then
    new.cancelled_at := now();
    return new;
  end if;
  new.cancelled_at := null;

  if new.status = 'pending' then
    new.packed_at := null;
    new.shipped_at := null;
  elsif new.status = 'packed' then
    new.packed_at := now();
    new.shipped_at := null;
  elsif new.status = 'shipped' then
    new.shipped_at := now();
  end if;
  return new;
end; $$;

drop trigger if exists stamp_order_status on public.orders;
create trigger stamp_order_status
  before update of status on public.orders
  for each row execute function public.stamp_order_status();

-- Rastreo público: mismas columnas de antes + las horas de cada estado.
-- (Hay que borrarla primero porque cambia lo que devuelve.)
drop function if exists public.track_order_by_code(text);
create function public.track_order_by_code(p_code text)
returns table (
  tracking_code text, delivery_method text, courier text, agency_label text,
  shipping_date date, status text, created_at timestamptz, business_name text,
  packed_at timestamptz, shipped_at timestamptz, cancelled_at timestamptz
)
language sql stable security definer set search_path = public as $$
  select o.tracking_code, o.delivery_method, o.courier, o.agency_label,
         o.shipping_date, o.status, o.created_at, m.business_name,
         o.packed_at, o.shipped_at, o.cancelled_at
    from public.orders o
    join public.merchants m on m.id = o.merchant_id
   where o.tracking_code = upper(trim(p_code));
$$;
grant execute on function public.track_order_by_code(text) to anon, authenticated;

notify pgrst, 'reload schema';

-- Verificación: deben salir 3 filas.
select column_name from information_schema.columns
 where table_schema = 'public' and table_name = 'orders'
   and column_name in ('packed_at', 'shipped_at', 'cancelled_at');
