-- Rastreo real en Shalom (botón «Consultar en Shalom» del panel)
-- Ejecutar en Supabase → SQL Editor → pegar todo → Run (se puede repetir).
-- Requisito: haber corrido sql/2026-11-04-horas-de-estado.sql (ya está).
--
-- Qué agrega a cada pedido:
--   * courier_tracking_number / courier_tracking_code → N° de orden y código
--     del ticket de Shalom. Los escribe el negociante en el resumen del pedido.
--     NO se muestran en el rastreo público (solo sirven para consultar).
--   * courier_status, courier_registered_at, courier_delivered_at,
--     courier_checked_at → lo último que respondió Shalom y cuándo se consultó.
--     El rastreo público muestra ESTO a tu cliente.

alter table public.orders
  add column if not exists courier_tracking_number text,
  add column if not exists courier_tracking_code text,
  add column if not exists courier_status text,
  add column if not exists courier_registered_at text,
  add column if not exists courier_delivered_at text,
  add column if not exists courier_checked_at timestamptz;

do $$ begin
  alter table public.orders add constraint orders_courier_tracking_number_chk
    check (courier_tracking_number is null or courier_tracking_number ~ '^\d{8,12}$');
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.orders add constraint orders_courier_tracking_code_chk
    check (courier_tracking_code is null or courier_tracking_code ~ '^[A-Z0-9]{4}$');
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.orders add constraint orders_courier_status_chk
    check (courier_status is null or courier_status in ('En origen', 'En tránsito', 'En destino', 'Entregado'));
exception when duplicate_object then null; end $$;

-- Si cambian los números del ticket, el estado guardado ya no corresponde.
create or replace function public.reset_courier_status()
returns trigger language plpgsql as $$
begin
  if new.courier_tracking_number is distinct from old.courier_tracking_number
     or new.courier_tracking_code is distinct from old.courier_tracking_code then
    new.courier_status := null;
    new.courier_registered_at := null;
    new.courier_delivered_at := null;
    new.courier_checked_at := null;
  end if;
  return new;
end; $$;
drop trigger if exists reset_courier_status on public.orders;
create trigger reset_courier_status before update of courier_tracking_number, courier_tracking_code on public.orders
  for each row execute function public.reset_courier_status();

-- Rastreo público: lo de antes + el estado de Shalom (sin los números del ticket).
drop function if exists public.track_order_by_code(text);
create function public.track_order_by_code(p_code text)
returns table (
  tracking_code text, delivery_method text, courier text, agency_label text,
  shipping_date date, status text, created_at timestamptz, business_name text,
  packed_at timestamptz, shipped_at timestamptz, cancelled_at timestamptz,
  courier_status text, courier_registered_at text, courier_delivered_at text, courier_checked_at timestamptz
)
language sql stable security definer set search_path = public as $$
  select o.tracking_code, o.delivery_method, o.courier, o.agency_label,
         o.shipping_date, o.status, o.created_at, m.business_name,
         o.packed_at, o.shipped_at, o.cancelled_at,
         o.courier_status, o.courier_registered_at, o.courier_delivered_at, o.courier_checked_at
    from public.orders o
    join public.merchants m on m.id = o.merchant_id
   where o.tracking_code = upper(trim(p_code));
$$;
grant execute on function public.track_order_by_code(text) to anon, authenticated;

notify pgrst, 'reload schema';

-- Verificación: deben salir 6 filas.
select column_name from information_schema.columns
 where table_schema = 'public' and table_name = 'orders' and column_name like 'courier\_%' escape '\'
   and column_name <> 'courier';
