-- Aviso 6 horas antes de cada recordatorio
-- Requisito: haber corrido antes sql/2026-11-08-notificaciones-push.sql
-- Ejecutar en Supabase → SQL Editor → pegar todo → Run (se puede repetir).
--
-- Cómo funciona:
--   * Cada minuto el despachador (api/push-dispatch.js) revisa los
--     recordatorios con hora que caen entre 1 y 6 horas adelante y que aún no
--     se avisaron; envía un push y los marca en pushed_advance_at.
--   * A la hora exacta sigue avisando con la columna pushed_at (la del archivo
--     anterior), así suenan los dos avisos: el adelantado y el puntual.
--   * Si cambias el día/hora de un recordatorio, o lo marcas pendiente otra
--     vez, se reinician los dos avisos.

alter table public.merchant_reminders add column if not exists pushed_advance_at timestamptz;

create or replace function public.reset_reminder_push()
returns trigger language plpgsql as $$
begin
  if new.due_date is distinct from old.due_date or new.due_time is distinct from old.due_time or (old.done and not new.done) then
    new.pushed_at := null;
    new.pushed_advance_at := null;
  end if;
  return new;
end; $$;
drop trigger if exists reset_reminder_push on public.merchant_reminders;
create trigger reset_reminder_push before update on public.merchant_reminders
  for each row execute function public.reset_reminder_push();

-- Recordatorios en la ventana de aviso adelantado (1 a 6 horas antes).
-- Devuelve las horas que faltan y los marca como enviados en la misma operación.
create or replace function public.push_claim_advance_reminders()
returns table (merchant_id uuid, reminder_id text, text text, phone text, note text, due_time text, hours_left int)
language sql security definer set search_path = public as $$
  update public.merchant_reminders r
     set pushed_advance_at = now()
   where not r.done and not r.deleted
     and r.pushed_advance_at is null
     and r.due_date is not null and r.due_time is not null
     and (r.due_date + r.due_time::time) >  (now() at time zone 'America/Lima') + interval '1 hour'
     and (r.due_date + r.due_time::time) <= (now() at time zone 'America/Lima') + interval '6 hours'
     and public.push_is_pro(r.merchant_id)
  returning r.merchant_id, r.id, r.text, r.sale->>'phone', r.sale->>'note', r.due_time,
            greatest(1, ceil(extract(epoch from ((r.due_date + r.due_time::time) - (now() at time zone 'America/Lima'))) / 3600))::int;
$$;

revoke all on function public.push_claim_advance_reminders() from public, anon, authenticated;
grant execute on function public.push_claim_advance_reminders() to service_role;

notify pgrst, 'reload schema';

-- Verificación: columna nueva = 1 y función disponible = 1.
select (select count(*) from information_schema.columns where table_schema = 'public' and table_name = 'merchant_reminders' and column_name = 'pushed_advance_at') as columna_aviso_adelantado,
       (select count(*) from pg_proc join pg_namespace n on n.oid = pg_proc.pronamespace
         where n.nspname = 'public' and proname = 'push_claim_advance_reminders') as funcion_6_horas;
