-- Ajustes de pagos: anular / restaurar pagos, ajustar días de servicio y
-- palabra de seguridad para un segundo pago en el mismo día.
-- Ejecutar una vez en Supabase → SQL Editor → pegar todo → Run.
-- Requiere haber corrido antes sql/2026-11-05-pagos-y-vencimiento.sql.
-- Se puede volver a correr sin problema.
--
-- Qué agrega:
--   * merchant_payments.kind        → 'payment' (pago) o 'adjustment' (ajuste
--                                     manual de días, en más o en menos).
--   * merchant_payments.voided_*    → un pago o ajuste ANULADO deja de contar:
--                                     se le restan (o devuelven) sus días a la
--                                     tienda. Se puede RESTAURAR después.
--   * admin_void_payment / admin_restore_payment / admin_adjust_days
--                                   → las usa /admin → Negociantes → Registrar pago.
--   * admin_register_payment        → si la tienda ya tiene un pago registrado
--                                     HOY (hora de Lima), exige escribir la fecha
--                                     de hoy (DD/MM/AAAA) para registrar otro.
--   * admin_list_payments / admin_list_subscriptions
--                                   → los totales ya no cuentan anulados ni ajustes.
-- Nada se borra: el historial guarda quién anuló, cuándo y por qué.

alter table public.merchant_payments
  add column if not exists kind text not null default 'payment',
  add column if not exists voided_at timestamptz,
  add column if not exists voided_by uuid,
  add column if not exists void_reason text;

alter table public.merchant_payments drop constraint if exists merchant_payments_kind_check;
alter table public.merchant_payments
  add constraint merchant_payments_kind_check check (kind in ('payment', 'adjustment'));

-- Los ajustes pueden restar días: se permite -3650…3650 (pero nunca 0).
alter table public.merchant_payments drop constraint if exists merchant_payments_days_check;
alter table public.merchant_payments
  add constraint merchant_payments_days_check check (days between -3650 and 3650 and days <> 0);

-- Fecha de hoy en Perú, en el formato que se pide escribir (ej. 20/11/2026).
create or replace function public.lima_today_text()
returns text language sql stable as $$
  select to_char(now() at time zone 'America/Lima', 'DD/MM/YYYY');
$$;

-- Registrar un pago (igual que antes) + palabra de seguridad si ya hubo otro hoy.
drop function if exists public.admin_register_payment(uuid, bigint, int, numeric, text, text);
create or replace function public.admin_register_payment(
  p_merchant uuid, p_plan_id bigint, p_days int, p_amount numeric,
  p_method text default null, p_note text default null, p_confirm text default null
)
returns public.merchant_payments
language plpgsql security definer set search_path = public as $$
declare
  m public.merchants;
  pl public.plans;
  v_start timestamptz;
  v_end timestamptz;
  r public.merchant_payments;
begin
  if not public.is_platform_admin() then raise exception 'forbidden'; end if;
  if p_days is null or p_days < 1 or p_days > 3650 then raise exception 'invalid_days'; end if;
  select * into m from public.merchants where id = p_merchant for update;
  if not found then raise exception 'merchant_not_found'; end if;
  select * into pl from public.plans where id = p_plan_id;
  if not found then raise exception 'plan_not_found'; end if;

  -- ¿Ya tiene un pago (no anulado) registrado hoy? Entonces pide la fecha.
  if exists (
    select 1 from public.merchant_payments pa
     where pa.merchant_id = p_merchant
       and pa.kind = 'payment'
       and pa.voided_at is null
       and (pa.created_at at time zone 'America/Lima')::date = (now() at time zone 'America/Lima')::date
  ) and coalesce(trim(p_confirm), '') <> public.lima_today_text() then
    raise exception 'duplicate_today';
  end if;

  v_start := case
               when m.plan_id = p_plan_id and m.paid_until is not null and m.paid_until > now() then m.paid_until
               else now()
             end;
  v_end := v_start + make_interval(days => p_days);

  insert into public.merchant_payments (merchant_id, plan_id, plan_name, days, amount, method, note, period_start, period_end, kind)
  values (p_merchant, p_plan_id, pl.name, p_days, greatest(coalesce(p_amount, 0), 0), nullif(trim(p_method), ''), nullif(trim(p_note), ''), v_start, v_end, 'payment')
  returning * into r;

  update public.merchants
     set plan_id = p_plan_id,
         plan_started_at = case when plan_id is distinct from p_plan_id then now() else plan_started_at end,
         paid_until = v_end,
         active = true
   where id = p_merchant;
  return r;
end; $$;
revoke all on function public.admin_register_payment(uuid, bigint, int, numeric, text, text, text) from public, anon;
grant execute on function public.admin_register_payment(uuid, bigint, int, numeric, text, text, text) to authenticated;

-- Ajustar los días de servicio a mano (+ suma, − resta). Queda en el historial
-- como «Ajuste» y también se puede anular/restaurar.
create or replace function public.admin_adjust_days(p_merchant uuid, p_days int, p_reason text)
returns public.merchant_payments
language plpgsql security definer set search_path = public as $$
declare
  m public.merchants;
  v_start timestamptz;
  v_end timestamptz;
  r public.merchant_payments;
begin
  if not public.is_platform_admin() then raise exception 'forbidden'; end if;
  if p_days is null or p_days = 0 or p_days < -3650 or p_days > 3650 then raise exception 'invalid_days'; end if;
  if coalesce(trim(p_reason), '') = '' then raise exception 'reason_required'; end if;
  select * into m from public.merchants where id = p_merchant for update;
  if not found then raise exception 'merchant_not_found'; end if;

  v_start := coalesce(m.paid_until, now());
  v_end := v_start + make_interval(days => p_days);

  insert into public.merchant_payments (merchant_id, plan_id, plan_name, days, amount, method, note, period_start, period_end, kind)
  values (p_merchant, m.plan_id, (select name from public.plans where id = m.plan_id), p_days, 0, null, trim(p_reason), v_start, v_end, 'adjustment')
  returning * into r;

  update public.merchants set paid_until = v_end where id = p_merchant;
  return r;
end; $$;
revoke all on function public.admin_adjust_days(uuid, int, text) from public, anon;
grant execute on function public.admin_adjust_days(uuid, int, text) to authenticated;

-- Anular un pago o ajuste: deja de contar y se le restan sus días a la tienda
-- (si era un ajuste negativo, se le devuelven).
create or replace function public.admin_void_payment(p_payment bigint, p_reason text default null)
returns public.merchant_payments
language plpgsql security definer set search_path = public as $$
declare
  r public.merchant_payments;
begin
  if not public.is_platform_admin() then raise exception 'forbidden'; end if;
  select * into r from public.merchant_payments where id = p_payment for update;
  if not found then raise exception 'payment_not_found'; end if;
  if r.voided_at is not null then raise exception 'already_voided'; end if;

  perform 1 from public.merchants where id = r.merchant_id for update;
  update public.merchants
     set paid_until = coalesce(paid_until, now()) - make_interval(days => r.days)
   where id = r.merchant_id;

  update public.merchant_payments
     set voided_at = now(), voided_by = auth.uid(), void_reason = nullif(trim(p_reason), '')
   where id = p_payment
  returning * into r;
  return r;
end; $$;
revoke all on function public.admin_void_payment(bigint, text) from public, anon;
grant execute on function public.admin_void_payment(bigint, text) to authenticated;

-- Restaurar un pago o ajuste anulado: vuelve a contar y se le devuelven sus días.
create or replace function public.admin_restore_payment(p_payment bigint)
returns public.merchant_payments
language plpgsql security definer set search_path = public as $$
declare
  r public.merchant_payments;
begin
  if not public.is_platform_admin() then raise exception 'forbidden'; end if;
  select * into r from public.merchant_payments where id = p_payment for update;
  if not found then raise exception 'payment_not_found'; end if;
  if r.voided_at is null then raise exception 'not_voided'; end if;

  perform 1 from public.merchants where id = r.merchant_id for update;
  update public.merchants
     set paid_until = coalesce(paid_until, now()) + make_interval(days => r.days)
   where id = r.merchant_id;

  update public.merchant_payments
     set voided_at = null, voided_by = null, void_reason = null
   where id = p_payment
  returning * into r;
  return r;
end; $$;
revoke all on function public.admin_restore_payment(bigint) from public, anon;
grant execute on function public.admin_restore_payment(bigint) to authenticated;

-- Historial con tipo y anulación.
drop function if exists public.admin_list_payments(uuid);
create or replace function public.admin_list_payments(p_merchant uuid default null)
returns table (
  id bigint, merchant_id uuid, business_name text, plan_name text, days int, amount numeric,
  method text, note text, period_start timestamptz, period_end timestamptz, created_at timestamptz,
  kind text, voided_at timestamptz, void_reason text
)
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_platform_admin() then raise exception 'forbidden'; end if;
  return query
    select pa.id, pa.merchant_id, m.business_name, pa.plan_name, pa.days, pa.amount,
           pa.method, pa.note, pa.period_start, pa.period_end, pa.created_at,
           pa.kind, pa.voided_at, pa.void_reason
      from public.merchant_payments pa
      join public.merchants m on m.id = pa.merchant_id
     where p_merchant is null or pa.merchant_id = p_merchant
     order by pa.created_at desc
     limit 500;
end; $$;
revoke all on function public.admin_list_payments(uuid) from public, anon;
grant execute on function public.admin_list_payments(uuid) to authenticated;

-- Resumen por tienda: solo pagos reales y no anulados.
create or replace function public.admin_list_subscriptions()
returns table (merchant_id uuid, paid_until timestamptz, last_payment_at timestamptz, total_paid numeric, payments int)
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_platform_admin() then raise exception 'forbidden'; end if;
  return query
    select m.id, m.paid_until, max(pa.created_at), coalesce(sum(pa.amount), 0)::numeric, count(pa.id)::int
      from public.merchants m
      left join public.merchant_payments pa
        on pa.merchant_id = m.id and pa.kind = 'payment' and pa.voided_at is null
     group by m.id, m.paid_until;
end; $$;
revoke all on function public.admin_list_subscriptions() from public, anon;
grant execute on function public.admin_list_subscriptions() to authenticated;

notify pgrst, 'reload schema';

-- Verificación: deben salir 4 columnas nuevas y 3 funciones nuevas.
select (select count(*) from information_schema.columns
         where table_schema = 'public' and table_name = 'merchant_payments'
           and column_name in ('kind', 'voided_at', 'voided_by', 'void_reason')) as columnas_nuevas,
       (select count(*) from pg_proc
         where pronamespace = 'public'::regnamespace
           and proname in ('admin_void_payment', 'admin_restore_payment', 'admin_adjust_days')) as funciones_nuevas;
