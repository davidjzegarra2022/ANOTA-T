-- Recordatorios (y sus avisos) en Supabase: los mismos en todos tus dispositivos
-- Ejecutar una vez en Supabase → SQL Editor → pegar todo → Run.
-- Se puede volver a correr sin problema.
--
-- Antes los recordatorios vivían solo en el navegador. Con esta tabla se
-- guardan en tu cuenta: lo que anotes en la computadora aparece en el
-- celular (y la campanita avisa en ambos). Cada tienda ve SOLO los suyos.
-- Los que ya tenías en un navegador se suben solos la primera vez que
-- entres al panel desde ese navegador.

create table if not exists public.merchant_reminders (
  id text primary key check (char_length(id) between 3 and 60),
  merchant_id uuid not null default auth.uid() references public.merchants(id) on delete cascade,
  text text not null check (char_length(text) between 1 and 300),
  due_date date,
  due_time text check (due_time is null or due_time ~ '^\d{2}:\d{2}$'),
  category text not null default 'general',
  important boolean not null default false,
  done boolean not null default false,
  sale jsonb,
  -- Borrado = marca (no se elimina la fila): así los otros dispositivos se
  -- enteran de que se borró, en vez de adivinarlo.
  deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.merchant_reminders add column if not exists deleted boolean not null default false;

create index if not exists merchant_reminders_merchant_idx on public.merchant_reminders (merchant_id, done, due_date);

alter table public.merchant_reminders enable row level security;

drop policy if exists "reminders_select_own" on public.merchant_reminders;
drop policy if exists "reminders_insert_own" on public.merchant_reminders;
drop policy if exists "reminders_update_own" on public.merchant_reminders;
drop policy if exists "reminders_delete_own" on public.merchant_reminders;
create policy "reminders_select_own" on public.merchant_reminders for select using (merchant_id = auth.uid());
create policy "reminders_insert_own" on public.merchant_reminders for insert with check (merchant_id = auth.uid());
create policy "reminders_update_own" on public.merchant_reminders for update using (merchant_id = auth.uid()) with check (merchant_id = auth.uid());
create policy "reminders_delete_own" on public.merchant_reminders for delete using (merchant_id = auth.uid());

grant select, insert, update, delete on public.merchant_reminders to authenticated;

notify pgrst, 'reload schema';

-- Verificación: debe salir 1.
select count(*) as tabla_recordatorios from information_schema.tables
 where table_schema = 'public' and table_name = 'merchant_reminders';
