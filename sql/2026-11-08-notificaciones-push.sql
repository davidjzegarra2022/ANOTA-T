-- Notificaciones push: avisos aunque ANOTA-T esté cerrado
-- Requisito: haber corrido antes sql/2026-11-07-recordatorios-en-la-nube.sql
-- Ejecutar en Supabase → SQL Editor → pegar todo → Run (se puede repetir).
--
-- Cómo funciona:
--   * Cada dispositivo que activa «Avisos push» queda en push_subscriptions.
--   * Cada minuto, pg_cron llama a https://anotat.vercel.app/api/push-dispatch,
--     que envía: recordatorios que llegaron a su hora y, a las 9:00, 13:00 y
--     18:00 (hora de Perú), un resumen de pendientes. Solo plan Pro.
--   * Al entrar un pedido nuevo, un trigger avisa al instante (todos los planes).
--
-- ⚠️ PASO ÚNICO: en la sección «CONFIGURACIÓN» de abajo reemplaza
--    PEGA_AQUI_EL_SECRETO por el valor de PUSH_DISPATCH_SECRET (el mismo que
--    pusiste en Vercel). Mientras diga PEGA_AQUI…, no se envía nada.

-- 1) Suscripciones de cada dispositivo -------------------------------------
create table if not exists public.push_subscriptions (
  id bigint generated always as identity primary key,
  merchant_id uuid not null default auth.uid() references public.merchants(id) on delete cascade,
  endpoint text not null unique check (endpoint ~ '^https://'),
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default now(),
  last_sent_at timestamptz
);
alter table public.push_subscriptions enable row level security;
drop policy if exists "push_select_own" on public.push_subscriptions;
create policy "push_select_own" on public.push_subscriptions for select using (merchant_id = auth.uid());
grant select on public.push_subscriptions to authenticated;
-- Altas y bajas solo por las funciones de abajo (un navegador puede cambiar
-- de cuenta: la suscripción pasa a la cuenta que la registra).
create or replace function public.register_push_subscription(p_endpoint text, p_p256dh text, p_auth text, p_user_agent text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not_authenticated'; end if;
  if p_endpoint !~ '^https://' or coalesce(p_p256dh, '') = '' or coalesce(p_auth, '') = '' then raise exception 'invalid_subscription'; end if;
  delete from public.push_subscriptions where endpoint = p_endpoint;
  insert into public.push_subscriptions (merchant_id, endpoint, p256dh, auth, user_agent)
  values (auth.uid(), p_endpoint, p_p256dh, p_auth, left(p_user_agent, 300));
end; $$;
revoke all on function public.register_push_subscription(text, text, text, text) from public, anon;
grant execute on function public.register_push_subscription(text, text, text, text) to authenticated;

create or replace function public.unregister_push_subscription(p_endpoint text)
returns void language sql security definer set search_path = public as $$
  delete from public.push_subscriptions where endpoint = p_endpoint and merchant_id = auth.uid();
$$;
revoke all on function public.unregister_push_subscription(text) from public, anon;
grant execute on function public.unregister_push_subscription(text) to authenticated;

-- 2) Recordatorios: marca de «ya se envió» ---------------------------------
alter table public.merchant_reminders add column if not exists pushed_at timestamptz;
-- Si cambias el día u hora de un recordatorio, vuelve a avisar en la nueva hora.
create or replace function public.reset_reminder_push()
returns trigger language plpgsql as $$
begin
  if new.due_date is distinct from old.due_date or new.due_time is distinct from old.due_time or (old.done and not new.done) then
    new.pushed_at := null;
  end if;
  return new;
end; $$;
drop trigger if exists reset_reminder_push on public.merchant_reminders;
create trigger reset_reminder_push before update on public.merchant_reminders
  for each row execute function public.reset_reminder_push();

create table if not exists public.push_summary_log (
  slot text not null,
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (slot, merchant_id)
);
alter table public.push_summary_log enable row level security;

-- Tienda con plan Pro y activa (los recordatorios son del plan Pro).
create or replace function public.push_is_pro(p_merchant uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.merchants m join public.plans p on p.id = m.plan_id
     where m.id = p_merchant and m.active and p.name ~* '\mpro\M'
  ) and public.merchant_accepts_orders(p_merchant);
$$;

-- 3) Funciones del despachador (solo service_role, nunca desde el navegador)
-- Recordatorios cuya hora llegó (últimas 6 h, para no avisar cosas viejas);
-- los marca como enviados en la misma operación.
create or replace function public.push_claim_due_reminders()
returns table (merchant_id uuid, reminder_id text, text text, phone text, note text, due_time text)
language sql security definer set search_path = public as $$
  update public.merchant_reminders r
     set pushed_at = now()
   where not r.done and not r.deleted and r.pushed_at is null and r.due_date is not null
     and (r.due_date + coalesce(r.due_time, '09:00')::time) <= (now() at time zone 'America/Lima')
     and (r.due_date + coalesce(r.due_time, '09:00')::time) > (now() at time zone 'America/Lima') - interval '6 hours'
     and public.push_is_pro(r.merchant_id)
  returning r.merchant_id, r.id, r.text, r.sale->>'phone', r.sale->>'note', r.due_time;
$$;

-- Resumen de pendientes (una vez por tienda y turno, p. ej. '2026-11-08@13').
create or replace function public.push_claim_summaries(p_slot text)
returns table (merchant_id uuid, pending int, first_text text)
language sql security definer set search_path = public as $$
  with pend as (
    select r.merchant_id, count(*)::int as pending, (array_agg(r.text order by r.due_date, r.due_time))[1] as first_text
      from public.merchant_reminders r
     where not r.done and not r.deleted
       and (r.due_date <= (now() at time zone 'America/Lima')::date or (r.due_date is null and r.important))
     group by r.merchant_id
  ), claimed as (
    insert into public.push_summary_log (slot, merchant_id)
    select p_slot, pend.merchant_id from pend where public.push_is_pro(pend.merchant_id)
    on conflict do nothing
    returning merchant_id
  )
  select c.merchant_id, pend.pending, pend.first_text from claimed c join pend using (merchant_id);
$$;

create or replace function public.push_order_info(p_order_id bigint)
returns table (merchant_id uuid, customer_name text, seller_name text, tracking_code text, daily_number int)
language sql stable security definer set search_path = public as $$
  select o.merchant_id, o.customer_name, o.seller_name, o.tracking_code, null::int
    from public.orders o where o.id = p_order_id;
$$;

create or replace function public.push_subscriptions_for(p_merchants uuid[])
returns table (endpoint text, p256dh text, auth text, merchant_id uuid)
language sql stable security definer set search_path = public as $$
  select s.endpoint, s.p256dh, s.auth, s.merchant_id from public.push_subscriptions s where s.merchant_id = any(p_merchants);
$$;

create or replace function public.push_mark_sent(p_endpoints text[], p_gone text[])
returns void language sql security definer set search_path = public as $$
  update public.push_subscriptions set last_sent_at = now() where endpoint = any(p_endpoints);
  delete from public.push_subscriptions where endpoint = any(p_gone);
$$;

do $$
declare f text;
begin
  foreach f in array array[
    'public.push_is_pro(uuid)', 'public.push_claim_due_reminders()', 'public.push_claim_summaries(text)',
    'public.push_order_info(bigint)', 'public.push_subscriptions_for(uuid[])', 'public.push_mark_sent(text[], text[])'
  ] loop
    execute format('revoke all on function %s from public, anon, authenticated', f);
    execute format('grant execute on function %s to service_role', f);
  end loop;
end $$;

-- 4) CONFIGURACIÓN: a dónde llamar y con qué secreto ------------------------
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
create table if not exists private.push_settings (
  id int primary key default 1 check (id = 1),
  dispatch_url text not null,
  secret text not null
);
insert into private.push_settings (id, dispatch_url, secret)
values (1, 'https://anotat.vercel.app/api/push-dispatch', 'PEGA_AQUI_EL_SECRETO')
on conflict (id) do update
  set dispatch_url = excluded.dispatch_url,
      -- Volver a correr el archivo sin cambiar el secreto no borra el ya puesto.
      secret = case when excluded.secret like 'PEGA_AQUI%' then private.push_settings.secret else excluded.secret end;

-- 5) Disparadores: cada minuto (pg_cron) y al entrar un pedido (pg_net) -----
create extension if not exists pg_net;
create extension if not exists pg_cron;

create or replace function private.push_dispatch(p_body jsonb)
returns void language plpgsql security definer set search_path = public as $$
declare s private.push_settings;
begin
  select * into s from private.push_settings where id = 1;
  if s is null or s.secret like 'PEGA_AQUI%' then return; end if;
  perform net.http_post(
    url := s.dispatch_url,
    body := p_body,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-push-secret', s.secret),
    timeout_milliseconds := 8000
  );
end; $$;
revoke all on function private.push_dispatch(jsonb) from public, anon, authenticated;

create or replace function public.notify_new_order_push()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  -- Nunca impide guardar el pedido: si algo falla, solo no hay push.
  begin
    perform private.push_dispatch(jsonb_build_object('type', 'order', 'order_id', new.id));
  exception when others then null;
  end;
  return new;
end; $$;
drop trigger if exists notify_new_order_push on public.orders;
create trigger notify_new_order_push after insert on public.orders
  for each row execute function public.notify_new_order_push();

select cron.unschedule(jobid) from cron.job where jobname = 'anotat-push';
select cron.schedule('anotat-push', '* * * * *', $cron$select private.push_dispatch('{"type":"tick"}'::jsonb)$cron$);

notify pgrst, 'reload schema';

-- Verificación: suscripciones = 1 tabla, tarea programada = 1, secreto configurado = true.
select (select count(*) from information_schema.tables where table_schema = 'public' and table_name = 'push_subscriptions') as tabla_suscripciones,
       (select count(*) from cron.job where jobname = 'anotat-push') as tarea_cada_minuto,
       (select secret not like 'PEGA_AQUI%' from private.push_settings where id = 1) as secreto_configurado;
