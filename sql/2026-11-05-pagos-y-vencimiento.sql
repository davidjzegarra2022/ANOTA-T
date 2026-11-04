-- Pagos y vencimiento de los planes (cuenta regresiva para TODOS los planes)
-- Ejecutar una vez en Supabase → SQL Editor → pegar todo → Run.
-- Se puede volver a correr sin problema.
--
-- Qué agrega:
--   * merchants.paid_until  → hasta cuándo está pagado el plan de la tienda.
--                             Solo lo cambia el administrador (registrando un
--                             pago); el negociante no puede tocarlo.
--   * merchant_payments     → historial de pagos (quién pagó, qué plan, cuántos
--                             días, monto, método y nota). Solo lo ve el admin.
--   * admin_register_payment, admin_list_payments, admin_list_subscriptions
--                           → las usa /admin → Negociantes.
--   * merchant_accepts_orders → ahora también vence el plan pagado: si
--                             paid_until ya pasó, la tienda deja de recibir
--                             pedidos (y su panel se bloquea).
--
-- Importante: las tiendas con plan pagado que todavía no tienen pagos
-- registrados quedan «sin vencimiento» (no se cortan de golpe). En cuanto
-- les registres un pago desde /admin empiezan a correr su cuenta regresiva.

alter table public.merchants
  add column if not exists paid_until timestamptz;

create table if not exists public.merchant_payments (
  id bigint generated always as identity primary key,
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  plan_id bigint references public.plans(id) on delete set null,
  plan_name text,
  days int not null check (days between 1 and 3650),
  amount numeric(10,2) not null default 0 check (amount >= 0),
  method text,
  note text,
  period_start timestamptz not null,
  period_end timestamptz not null,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);
alter table public.merchant_payments enable row level security;
-- Sin políticas: nadie la lee ni escribe directo; solo las funciones de admin.
create index if not exists merchant_payments_merchant_idx on public.merchant_payments (merchant_id, created_at desc);

-- El negociante puede editar SU fila (marca, logística…) pero NO su fecha de
-- vencimiento: si lo intenta, se conserva la que tenía.
create or replace function public.protect_paid_until()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.paid_until is distinct from old.paid_until
     and auth.uid() is not null
     and not public.is_platform_admin() then
    new.paid_until := old.paid_until;
  end if;
  return new;
end; $$;

drop trigger if exists protect_paid_until on public.merchants;
create trigger protect_paid_until
  before update on public.merchants
  for each row execute function public.protect_paid_until();

-- ¿La tienda puede recibir pedidos?
--   * activa, y
--   * plan de prueba: dentro de sus días (mínimo 15), y
--   * plan pagado: paid_until en el futuro (o sin pagos registrados aún).
create or replace function public.merchant_accepts_orders(p_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((
    select m.active
       and case
             when p.id is null then true
             when coalesce(p.trial_days, 0) > 0 then
               m.plan_started_at + make_interval(days => greatest(p.trial_days, 15)) > now()
             else
               m.paid_until is null or m.paid_until > now()
           end
      from public.merchants m
      left join public.plans p on p.id = m.plan_id
     where m.id = p_id
  ), false);
$$;
grant execute on function public.merchant_accepts_orders(uuid) to anon, authenticated;

-- Registrar un pago: asigna el plan, suma los días (si renueva el mismo plan
-- antes de vencer, los días se suman a lo que le quedaba) y reactiva la tienda.
create or replace function public.admin_register_payment(
  p_merchant uuid, p_plan_id bigint, p_days int, p_amount numeric, p_method text default null, p_note text default null
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

  v_start := case
               when m.plan_id = p_plan_id and m.paid_until is not null and m.paid_until > now() then m.paid_until
               else now()
             end;
  v_end := v_start + make_interval(days => p_days);

  insert into public.merchant_payments (merchant_id, plan_id, plan_name, days, amount, method, note, period_start, period_end)
  values (p_merchant, p_plan_id, pl.name, p_days, greatest(coalesce(p_amount, 0), 0), nullif(trim(p_method), ''), nullif(trim(p_note), ''), v_start, v_end)
  returning * into r;

  update public.merchants
     set plan_id = p_plan_id,
         plan_started_at = case when plan_id is distinct from p_plan_id then now() else plan_started_at end,
         paid_until = v_end,
         active = true
   where id = p_merchant;
  return r;
end; $$;
revoke all on function public.admin_register_payment(uuid, bigint, int, numeric, text, text) from public, anon;
grant execute on function public.admin_register_payment(uuid, bigint, int, numeric, text, text) to authenticated;

-- Historial de pagos (de una tienda, o de todas si p_merchant es null).
create or replace function public.admin_list_payments(p_merchant uuid default null)
returns table (
  id bigint, merchant_id uuid, business_name text, plan_name text, days int, amount numeric,
  method text, note text, period_start timestamptz, period_end timestamptz, created_at timestamptz
)
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_platform_admin() then raise exception 'forbidden'; end if;
  return query
    select pa.id, pa.merchant_id, m.business_name, pa.plan_name, pa.days, pa.amount,
           pa.method, pa.note, pa.period_start, pa.period_end, pa.created_at
      from public.merchant_payments pa
      join public.merchants m on m.id = pa.merchant_id
     where p_merchant is null or pa.merchant_id = p_merchant
     order by pa.created_at desc
     limit 500;
end; $$;
revoke all on function public.admin_list_payments(uuid) from public, anon;
grant execute on function public.admin_list_payments(uuid) to authenticated;

-- Vencimiento y resumen de pagos de cada tienda (para la tabla de Negociantes).
create or replace function public.admin_list_subscriptions()
returns table (merchant_id uuid, paid_until timestamptz, last_payment_at timestamptz, total_paid numeric, payments int)
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_platform_admin() then raise exception 'forbidden'; end if;
  return query
    select m.id, m.paid_until, max(pa.created_at), coalesce(sum(pa.amount), 0)::numeric, count(pa.id)::int
      from public.merchants m
      left join public.merchant_payments pa on pa.merchant_id = m.id
     group by m.id, m.paid_until;
end; $$;
revoke all on function public.admin_list_subscriptions() from public, anon;
grant execute on function public.admin_list_subscriptions() to authenticated;

notify pgrst, 'reload schema';

-- Verificación: debe salir 1 fila con paid_until y la tabla de pagos.
select (select count(*) from information_schema.columns
         where table_schema = 'public' and table_name = 'merchants' and column_name = 'paid_until') as columna_paid_until,
       (select count(*) from information_schema.tables
         where table_schema = 'public' and table_name = 'merchant_payments') as tabla_pagos;
