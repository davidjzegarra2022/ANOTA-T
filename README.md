# ANOTA-T — Formulario de Envío Logístico (multi-tenant)

Plataforma mobile-first para que negocios de e-commerce reciban pedidos de
envío/recojo de sus propios clientes, construida con React + Vite +
Tailwind CSS + Supabase (Auth, base de datos y storage).

Cada **negociante** crea su propia cuenta, configura su logística y marca,
y comparte su link (`tu-dominio.com/f/<su-slug>`) con sus clientes finales.
Cuando un cliente llena el formulario, el pedido queda **guardado** (no
solo enviado por WhatsApp) y aparece en el panel del negociante (Envíos,
Clientes, Panel Pro).

## Diseño: navy + amarillo

La marca sigue la landing de referencia
([anotat-website](https://github.com/davidjzegarra2022/ANOTAT-WEBSITE)):
fondo claro, navy (`#071d2d`) y amarillo (`#ffc400`) como acentos,
tipografía Inter. Los tokens de color viven en `src/index.css` (`@theme` de
Tailwind v4: `--color-navy`, `--color-brand`, etc.) y las clases
compartidas `.btn`/`.card`/`.input-field` están en `@layer components`
para que las utilidades responsive de Tailwind (`sm:hidden`, etc.) sigan
pudiendo sobreescribirlas.

## Rutas y los tres roles de la app

- **`tu-dominio.com/`** — landing de marketing (`src/components/LandingPage.jsx`,
  sin login): hero, funciones, planes (leídos en vivo de Supabase), cómo
  funciona, rastreo público de pedidos y contacto. Si el visitante ya tiene
  sesión de negociante activa, esta ruta muestra su panel directamente en
  vez de la landing.
- **`tu-dominio.com/login`** / **`/signup`** / **`/forgot-password`** —
  acceso del negociante (`src/components/auth/`), con **correo y
  contraseña reales** (Supabase Auth). Una vez logueado, tiene su propio
  panel con pestañas **Envíos, Clientes, Panel Pro, Configuración, Planes
  y Suscripción** (`src/components/dashboard/`).
- **`tu-dominio.com/f/<slug>`** — el link que cada negociante comparte con
  sus propios clientes finales (sin login). Llenan el formulario y el
  pedido se manda por WhatsApp al negociante Y queda guardado en Supabase.
- **`tu-dominio.com/admin`** — el dueño de la plataforma, con
  usuario/contraseña fijos (`src/utils/serial.js`). Gestiona el directorio
  de agencias, los negociantes (activar/desactivar, asignar plan) y los
  planes disponibles.

## Cuentas de negociante (Supabase Auth)

Antes esto era un serial fijo compartido; ahora cada negociante tiene una
cuenta real:

- **Registro** (`src/components/auth/SignupScreen.jsx`): pide nombre de
  tienda, WhatsApp, correo y contraseña. Al crear la cuenta,
  `supabase.auth.signUp()` guarda `business_name`/`whatsapp_number` como
  metadata del usuario, y un **trigger de Postgres**
  (`handle_new_merchant`, ver SQL abajo) crea automáticamente su fila en
  `public.merchants` con un **slug único** derivado del nombre de tienda y
  el plan "Prueba" asignado por defecto.
- **Confirmación por correo**: Supabase Auth exige confirmar el correo
  antes de poder iniciar sesión (configuración por defecto del proyecto).
  Ver "Correo de confirmación (tu Gmail)" más abajo para que esos correos
  salgan desde tu propia cuenta de Gmail.
- **Login / recuperar contraseña**
  (`LoginScreen.jsx` / `ForgotPasswordScreen.jsx` / `ResetPasswordScreen.jsx`):
  flujo estándar de Supabase Auth, con link de recuperación por correo.
- **Cierre de sesión y "cuenta desactivada"**: si el administrador
  desactiva un negociante (pestaña "Negociantes" del panel admin), su
  próxima carga del panel le muestra "Tu cuenta está desactivada" en vez
  del dashboard (`DashboardLayout.jsx`).

## Correo de confirmación (tu Gmail)

Un navegador no puede mandar correos por SMTP directamente (expondría la
contraseña), así que el envío lo hace **Supabase Auth**, configurado para
usar tu Gmail como servidor saliente:

1. En Gmail: activa la verificación en 2 pasos y genera una
   [contraseña de aplicación](https://myaccount.google.com/apppasswords).
2. En tu proyecto Supabase → **Authentication → Emails → SMTP Settings**,
   activa "Enable Custom SMTP" y completa:
   - Host: `smtp.gmail.com`, Puerto: `587`
   - Usuario: tu dirección de Gmail
   - Contraseña: la contraseña de aplicación (NO tu contraseña normal)
   - Remitente: tu Gmail (o un alias que tengas verificado)
3. Guarda. Desde ese momento, los correos de confirmación de registro y de
   recuperación de contraseña salen por tu Gmail.
4. En **Authentication → URL Configuration**:
   - **Site URL**: tu dominio de producción (ej. `https://anotat.vercel.app`).
   - **Redirect URLs**: agrega `https://tu-dominio/login` (y
     `http://localhost:5173/login` si pruebas en local). Sin esto, Supabase
     ignora el destino que pide la app y manda todo al Site URL.
5. En **Authentication → Emails → Templates**, reemplaza las plantillas por
   defecto (vienen en inglés) por las de la marca. Están maquetadas con
   tablas, colores planos y una imagen estática (`/logo-icon.png`, servida
   por el propio sitio): Gmail y Outlook ignoran degradados, flexbox y
   animaciones, por eso no se usan.

**A dónde cae el usuario al hacer click:** el link de confirmación vale
solo como token de alta. Supabase abre una sesión automática al validarlo,
así que la app la cierra en cuanto detecta el hash `type=signup`, limpia la
URL y deja al usuario en `/login` con el aviso "Tu cuenta quedó
confirmada" (ver `readAuthHashType` en `src/App.jsx`). El destino se pide
desde el código con `emailRedirectTo` (`utils/supabaseAuth.js` →
`authRedirectUrl()`), que siempre apunta al `/login` del dominio donde
corre la app — nunca a otro dominio.

> Gmail tiene un límite diario de envíos (~500/día en cuentas normales) —
> suficiente para arrancar. Si creces mucho, migra el SMTP a un proveedor
> transaccional (Resend, SendGrid, Amazon SES) cambiando solo esta
> configuración, sin tocar código.

## Quién puede registrarse (dominios de correo permitidos)

Para que no entren correos temporales ni de bots que saturen la
plataforma, solo se puede crear cuenta con dominios de la tabla
`allowed_email_domains` (Gmail, Outlook/Hotmail, Live, Yahoo, iCloud,
Proton y algunos más por defecto).

El dueño de la plataforma administra esa lista desde su panel →
**Negociantes → "Dominios de correo permitidos"**: puede agregar o quitar
dominios en caliente, sin redeploy.

> **Ojo con los clientes que usan dominio propio** (ej.
> `contacto@ferreteriatelco.com`): por defecto quedan bloqueados. Cuando
> uno legítimo quiera entrar, agrega su dominio desde ese panel.

## El panel del negociante (`src/components/dashboard/`)

- **Envíos** (`EnviosPage.jsx`) — todos los pedidos, filtrables por estado,
  por rango de fechas o navegando día por día, con búsqueda por cliente/
  WhatsApp/N° de pedido y exportación a Excel.
- **Clientes** (`ClientesPage.jsx`) — agrupa los pedidos por WhatsApp del
  cliente final: recurrentes (2+ pedidos), nuevos este mes, dormidos (sin
  comprar +30 días), en riesgo (15-30 días sin comprar).
- **Panel Pro** (`PanelProPage.jsx`) — pedidos de hoy/7/30 días, días
  restantes de prueba gratuita (si el plan es de prueba) o uso del límite
  de pedidos del mes (si el plan lo tiene), pedidos por estado y top
  couriers.
  > **Limitación honesta:** el formulario no pide un monto por pedido (es
  > un formulario de logística, no de facturación), así que este panel
  > mide **pedidos**, no ventas en soles. Si quieres un campo de monto
  > para ver ingresos reales, es un cambio aparte — pídelo.
- **Configuración** (`ConfiguracionPage.jsx`) — couriers activos, días de
  despacho, hora de corte, anticipación en horas, nombre de tienda,
  WhatsApp, moneda de visualización, zona horaria, logo (sube a Supabase
  Storage, bucket `logos`) y el slug de su link público.
- **Planes** (`PlanesPage.jsx`) — planes disponibles (los define el admin):
  días de prueba gratis y/o precio por día, con su lista de
  características. Sin pasarela de pago todavía — el cambio se pide por
  WhatsApp a un número tuyo que configuras en el propio archivo
  (`ADMIN_WHATSAPP` en `PlanesPage.jsx`, vacío por defecto). La landing
  menciona Culqi como método de pago del plan Gold — el terreno está
  preparado en el esquema de planes, pero la integración de cobro en sí
  no está hecha; pídela aparte cuando quieras activarla.
- **Suscripción** (`SuscripcionPage.jsx`) — plan actual, días de prueba
  restantes o uso del mes según corresponda.

## El panel de administrador

`src/components/AdminDashboard.jsx` tiene 4 pestañas:

- **Activaciones** — telemetría de accesos (igual que antes, ver más abajo).
- **Base de datos** (`AgencyManager.jsx`) — directorio de agencias por
  courier (sin cambios respecto a la versión anterior).
- **Negociantes** (`AdminMerchantsManager.jsx`) — lista todas las cuentas
  registradas (correo, WhatsApp, plan, activo/inactivo) y permite
  activar/desactivar y asignar un plan. Ya no crea cuentas manualmente —
  cada negociante se registra solo.
- **Planes** (`AdminPlansManager.jsx`) — crear/editar/eliminar planes
  (nombre, límite de pedidos al mes, precio de referencia en soles).

Estas dos últimas usan el mismo patrón de seguridad que antes: funciones
RPC de Postgres protegidas con una `admin_secret` que vive solo en la base
de datos (tabla `app_settings`), nunca en el bundle del navegador — pega
esa clave en el panel (pestaña "Negociantes") la primera vez.

## Base de datos (Supabase) — esquema completo

Crea un proyecto en [supabase.com](https://supabase.com), abre **SQL
Editor** y corre esto (agencias + negociantes + planes + pedidos):

```sql
-- Agencias (directorio de couriers, público) ---------------------------
create table if not exists public.agencies (
  id bigint generated always as identity primary key,
  courier text not null,
  courier_label text,
  department text,
  province text,
  district text,
  zone text,
  address text not null,
  reference text,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now()
);
alter table public.agencies enable row level security;
create policy "agencies_public_select" on public.agencies for select using (true);
create policy "agencies_public_insert" on public.agencies for insert with check (true);
create policy "agencies_public_delete" on public.agencies for delete using (true);

-- Configuración interna del admin ---------------------------------------
create table if not exists public.app_settings (
  key text primary key,
  value text not null
);
alter table public.app_settings enable row level security;
-- CAMBIA 'pon-aqui-una-clave-larga' antes de correr esto.
insert into public.app_settings (key, value) values ('admin_secret', 'pon-aqui-una-clave-larga')
  on conflict (key) do update set value = excluded.value;

-- Planes -----------------------------------------------------------------
-- Esquema por día (alineado a la landing): trial_days para planes de
-- prueba gratuita, price_per_day para planes pagos, monthly_order_limit
-- opcional (null = sin límite) y features como lista para mostrar.
create table if not exists public.plans (
  id bigint generated always as identity primary key,
  name text not null,
  trial_days integer,
  price_per_day numeric(10,2) not null default 0,
  monthly_order_limit integer,
  description text,
  features text[] not null default '{}'::text[],
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.plans enable row level security;
create policy "plans_authenticated_select" on public.plans
  for select using (auth.role() = 'authenticated' and active = true);

insert into public.plans (name, trial_days, price_per_day, description, features)
select 'Prueba Free', 7, 0, 'Prueba gratis por 7 días.',
  array['Te registras', 'Con tu número de WhatsApp']
where not exists (select 1 from public.plans where name = 'Prueba Free');

insert into public.plans (name, price_per_day, description, features)
select 'Pro', 1.00, 'Todo lo esencial para operar tu tienda.',
  array['Link con tu marca', 'Formulario de datos universal',
        'Base de datos oficial de las agencias más conocidas a nivel nacional',
        'Panel de control de estados de envío',
        'Plantillas de Excel para envíos masivos Shalom y Olva',
        'Impresión de etiquetas desde tu móvil']
where not exists (select 1 from public.plans where name = 'Pro');

insert into public.plans (name, price_per_day, description, features)
select 'Gold', 1.50, 'Todo el plan Pro, con seguimiento en tiempo real y pagos.',
  array['Todo el plan Pro', 'Seguimiento de envío en tiempo real', 'Dashboard del negocio',
        'Pasarela de pagos por Culqi (Yape, Plin, BCP, etc.) — próximamente']
where not exists (select 1 from public.plans where name = 'Gold');

-- Negociantes (1 fila por cuenta de Supabase Auth) ----------------------
create table if not exists public.merchants (
  id uuid primary key references auth.users(id) on delete cascade,
  business_name text not null default 'Mi Tienda',
  whatsapp_number text not null default '',
  currency text not null default 'PEN',
  timezone text not null default 'America/Lima',
  logo_url text,
  slug text not null unique,
  couriers_active text[] not null default '{}'::text[],
  dispatch_days integer[] not null default '{1,2,3,4,5,6}'::integer[], -- 0=domingo … 6=sábado
  cutoff_hour integer not null default 18,
  lead_time_hours integer not null default 0,
  plan_id bigint references public.plans(id),
  -- Desde cuándo corre el plan actual — con esto se calcula el vencimiento
  -- de la prueba gratuita (plan_started_at + plan.trial_days).
  plan_started_at timestamptz not null default now(),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.merchants enable row level security;
create policy "merchants_select_own" on public.merchants for select using (auth.uid() = id);
create policy "merchants_update_own" on public.merchants for update using (auth.uid() = id);
create policy "merchants_insert_own" on public.merchants for insert with check (auth.uid() = id);
-- Lectura pública por slug: la necesita el formulario público (sin login).
create policy "merchants_public_select" on public.merchants for select using (true);

create or replace function public.handle_new_merchant()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  base_slug text;
  final_slug text;
  i int := 0;
  trial_plan_id bigint;
begin
  base_slug := regexp_replace(lower(coalesce(new.raw_user_meta_data->>'business_name', 'tienda')), '[^a-z0-9]+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  if base_slug = '' then base_slug := 'tienda'; end if;
  final_slug := base_slug;
  while exists (select 1 from public.merchants where slug = final_slug) loop
    i := i + 1;
    final_slug := base_slug || '-' || i;
  end loop;
  select id into trial_plan_id from public.plans where name = 'Prueba' limit 1;
  insert into public.merchants (id, business_name, whatsapp_number, slug, plan_id)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'business_name', 'Mi Tienda'),
    coalesce(regexp_replace(new.raw_user_meta_data->>'whatsapp_number', '\D', '', 'g'), ''),
    final_slug, trial_plan_id
  );
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_merchant();

-- Pedidos ------------------------------------------------------------------
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  customer_name text not null,
  customer_phone text,
  customer_dni text,
  delivery_method text not null,
  courier text,
  agency_label text,
  agency_address text,
  agency_reference text,
  address text,
  department text,
  province_district text,
  reference text,
  payment_method text,
  notes text,
  shipping_date date,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  -- Código corto para que el cliente final rastree SU pedido sin login
  -- (ej. ANOTA-4F8K2) — lo genera el trigger de abajo.
  tracking_code text unique
);
alter table public.orders enable row level security;
create policy "orders_insert_public" on public.orders for insert with check (true);
create policy "orders_select_own" on public.orders for select using (auth.uid() = merchant_id);
create policy "orders_update_own" on public.orders for update using (auth.uid() = merchant_id);
create policy "orders_delete_own" on public.orders for delete using (auth.uid() = merchant_id);
create index if not exists orders_merchant_created_idx on public.orders (merchant_id, created_at desc);

create or replace function public.generate_order_tracking_code()
returns trigger language plpgsql as $$
declare
  code text;
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- sin 0/O/1/I para evitar confusiones
  i int;
begin
  if new.tracking_code is not null then
    return new;
  end if;
  loop
    code := 'ANOTA-';
    for i in 1..5 loop
      code := code || substr(chars, 1 + floor(random() * length(chars))::int, 1);
    end loop;
    exit when not exists (select 1 from public.orders where tracking_code = code);
  end loop;
  new.tracking_code := code;
  return new;
end; $$;

drop trigger if exists set_order_tracking_code on public.orders;
create trigger set_order_tracking_code
  before insert on public.orders
  for each row execute function public.generate_order_tracking_code();

-- Público: consulta SOLO por código exacto, sin exponer datos personales
-- del cliente final ni la lista completa de pedidos.
create or replace function public.track_order_by_code(p_code text)
returns table (
  tracking_code text, delivery_method text, courier text, agency_label text,
  shipping_date date, status text, created_at timestamptz, business_name text
)
language sql security definer set search_path = public as $$
  select o.tracking_code, o.delivery_method, o.courier, o.agency_label,
         o.shipping_date, o.status, o.created_at, m.business_name
  from public.orders o
  join public.merchants m on m.id = o.merchant_id
  where o.tracking_code = upper(trim(p_code));
$$;
grant execute on function public.track_order_by_code(text) to anon, authenticated;

-- RPCs de administrador (multi-tenant) --------------------------------------
create or replace function public.admin_list_merchants(p_secret text)
returns table (id uuid, business_name text, whatsapp_number text, slug text, active boolean,
  plan_id bigint, plan_name text, created_at timestamptz, email text)
language plpgsql security definer set search_path = public as $$
begin
  if p_secret is null or p_secret <> (select value from public.app_settings where key = 'admin_secret') then
    raise exception 'unauthorized';
  end if;
  return query
    select m.id, m.business_name, m.whatsapp_number, m.slug, m.active, m.plan_id, p.name, m.created_at, u.email
    from public.merchants m
    left join public.plans p on p.id = m.plan_id
    left join auth.users u on u.id = m.id
    order by m.created_at desc;
end; $$;
grant execute on function public.admin_list_merchants(text) to anon, authenticated;

create or replace function public.admin_set_merchant_active(p_secret text, p_id uuid, p_active boolean)
returns public.merchants language plpgsql security definer set search_path = public as $$
declare r public.merchants;
begin
  if p_secret is null or p_secret <> (select value from public.app_settings where key = 'admin_secret') then
    raise exception 'unauthorized';
  end if;
  update public.merchants set active = p_active where id = p_id returning * into r;
  return r;
end; $$;
grant execute on function public.admin_set_merchant_active(text, uuid, boolean) to anon, authenticated;

create or replace function public.admin_set_merchant_plan(p_secret text, p_id uuid, p_plan_id bigint)
returns public.merchants language plpgsql security definer set search_path = public as $$
declare r public.merchants;
begin
  if p_secret is null or p_secret <> (select value from public.app_settings where key = 'admin_secret') then
    raise exception 'unauthorized';
  end if;
  -- plan_started_at se reinicia para que un plan de prueba nuevo arranque su cuenta de días desde cero.
  update public.merchants set plan_id = p_plan_id, plan_started_at = now() where id = p_id returning * into r;
  return r;
end; $$;
grant execute on function public.admin_set_merchant_plan(text, uuid, bigint) to anon, authenticated;

create or replace function public.admin_list_plans(p_secret text)
returns setof public.plans language plpgsql security definer set search_path = public as $$
begin
  if p_secret is null or p_secret <> (select value from public.app_settings where key = 'admin_secret') then
    raise exception 'unauthorized';
  end if;
  return query select * from public.plans order by price_per_day asc, created_at asc;
end; $$;
grant execute on function public.admin_list_plans(text) to anon, authenticated;

create or replace function public.admin_upsert_plan(
  p_secret text, p_id bigint, p_name text, p_trial_days integer,
  p_price_per_day numeric, p_monthly_order_limit integer, p_description text,
  p_features text[], p_active boolean
)
returns public.plans language plpgsql security definer set search_path = public as $$
declare r public.plans;
begin
  if p_secret is null or p_secret <> (select value from public.app_settings where key = 'admin_secret') then
    raise exception 'unauthorized';
  end if;
  if p_id is null then
    insert into public.plans (name, trial_days, price_per_day, monthly_order_limit, description, features, active)
    values (p_name, p_trial_days, p_price_per_day, p_monthly_order_limit, p_description, coalesce(p_features, '{}'), coalesce(p_active, true))
    returning * into r;
  else
    update public.plans set
      name = p_name, trial_days = p_trial_days, price_per_day = p_price_per_day,
      monthly_order_limit = p_monthly_order_limit, description = p_description,
      features = coalesce(p_features, '{}'), active = coalesce(p_active, true)
    where id = p_id returning * into r;
  end if;
  return r;
end; $$;
grant execute on function public.admin_upsert_plan(text, bigint, text, integer, numeric, integer, text, text[], boolean) to anon, authenticated;

create or replace function public.admin_delete_plan(p_secret text, p_id bigint)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if p_secret is null or p_secret <> (select value from public.app_settings where key = 'admin_secret') then
    raise exception 'unauthorized';
  end if;
  delete from public.plans where id = p_id;
  return true;
end; $$;
grant execute on function public.admin_delete_plan(text, bigint) to anon, authenticated;

-- Storage: logos ------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('logos', 'logos', true) on conflict (id) do nothing;
create policy "logos_public_read" on storage.objects for select using (bucket_id = 'logos');
create policy "logos_owner_write" on storage.objects for insert with check (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "logos_owner_update" on storage.objects for update using (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "logos_owner_delete" on storage.objects for delete using (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);
```

### Modelo de seguridad (qué puede hacer un anónimo y qué no)

La anon key viaja en el bundle del navegador — es pública por diseño. Lo
que impide abusos es Row Level Security, no ocultar esa clave. Reglas:

| Tabla | Anónimo (cliente final) | Negociante logueado | Admin |
|---|---|---|---|
| `agencies` | Solo **leer** | Solo leer | Escribe vía RPC con `admin_secret` |
| `merchants` | **Nada directo**; solo `get_merchant_public(slug)`, que devuelve UNA tienda por slug exacto | Lee/edita **su** fila (marca y logística) | Activa/desactiva y asigna plan vía RPC |
| `orders` | Solo **insertar** su pedido, con topes de longitud y contra un negociante activo | Lee/edita **sus** pedidos | — |
| `plans` | Leer los activos (se muestran en la landing) | Leer los activos | CRUD vía RPC |
| `app_settings` | Nada | Nada | Solo vía funciones `security definer` |

Detalles que conviene tener presentes:

- **El estado y el código de rastreo de un pedido los fija el servidor**
  (trigger `prepare_new_order`), no el navegador: nadie puede crear un
  pedido ya marcado como "entregado" ni elegir su propio código.
- **Un negociante no puede cambiarse el plan ni reactivarse solo**: el
  trigger `protect_merchant_columns` revierte `plan_id`, `active` y
  `plan_started_at` si la edición viene de una sesión de negociante. Esas
  columnas solo las mueven las RPC de admin (que corren sin `auth.uid()`).
- **`merchants` no es enumerable**: si lo fuera, cualquiera podría
  descargar la lista completa de tus clientes con su WhatsApp.
- **Registro restringido por dominio de correo**: el trigger
  `enforce_allowed_email_domain` sobre `auth.users` rechaza dominios fuera
  de `allowed_email_domains` (la validación del navegador es solo para dar
  un mensaje claro; el candado real es el trigger).
- **Storage**: el bucket `logos` limita a 2 MB y a PNG/JPEG/WEBP del lado
  del servidor, además de la validación del navegador.

> **Lo que sigue siendo "seguridad de cliente":** la contraseña de
> administrador (`src/utils/serial.js`) viaja en el bundle y cualquiera que
> lo inspeccione puede leerla. Lo que realmente protege los datos de otros
> negociantes es la `admin_secret` guardada en la base (nunca en el
> bundle), que es lo que exigen todas las RPC `admin_*`. Aun así, esas RPC
> son invocables por cualquiera y no tienen límite de intentos: usa una
> clave larga y aleatoria. Si más adelante quieres cerrarlo del todo, el
> camino es mover el admin a una cuenta real de Supabase Auth con un rol
> propio — dilo y se hace.

**Credenciales en Vercel** (Project Settings → Environment Variables):

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

Para desarrollo local, copia `.env.example` a `.env` con esos mismos
valores.

## Panel de administrador y telemetría (anti-piratería)

Al entrar como **Administrador** se abre un panel con un registro de
activaciones: cada vez que alguien ingresa (negociante o admin) se
registra un evento con dispositivo, navegador/OS, fecha y hora, zona
horaria, idioma, **ubicación por IP** (aprox., sin permiso) y, si el
usuario acepta el permiso del navegador, **coordenadas GPS** exactas. La
lógica está en `src/utils/telemetry.js`.

- El evento se guarda siempre en `localStorage` (visible en el panel de
  ese dispositivo) y, si hay un **endpoint** configurado, se envía a tu
  backend (`sendBeacon`/`fetch`, fire-and-forget).
- El panel muestra estadísticas (activaciones, dispositivos únicos,
  cuentas usadas, últimas 24 h), la tabla completa y exportación a CSV.

**Importante:** al ser una app estática, sin backend el panel solo ve
las activaciones de *ese* navegador. Para vigilar a todos tus negociantes
necesitas un backend que reciba los eventos. La forma más simple y gratis
es un **Google Apps Script + Hoja de cálculo**:

1. Crea una Hoja de cálculo en Google Sheets.
2. Menú **Extensiones → Apps Script** y pega:

   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
     const d = JSON.parse(e.postData.contents)
     sheet.appendRow([
       new Date(), d.type, d.serial, d.deviceId, d.browser, d.os,
       d.deviceType, d.language, d.tz, d.ip, d.city, d.region, d.country,
       d.isp, d.ipLat, d.ipLng, d.gpsLat, d.gpsLng, d.gpsAccuracy, d.ua,
     ])
     return ContentService.createTextOutput('ok')
   }
   ```

3. **Implementar → Nueva implementación → Aplicación web**, acceso
   "Cualquier usuario", y copia la URL `…/exec`.
4. Pega esa URL en el panel de administrador (campo "Endpoint de
   telemetría") y guarda.

## Cómo funciona el formulario público (`/f/<slug>`)

1. La página lee el `slug` de la URL y busca al negociante dueño en
   Supabase (`fetchMerchantBySlug`). Si no existe o está desactivado,
   muestra "Este link no existe o ya no está disponible".
2. Las fechas de envío respetan los **días de despacho**, la **hora de
   corte** y la **anticipación en horas** que el negociante configuró en
   "Configuración" (`src/utils/dates.js`).
3. Los couriers ofrecidos son los que el negociante marcó como "activos"
   en Configuración (si no marcó ninguno, se muestran todos por defecto).
4. El cliente elige cómo quiere recibir su pedido:
   - **Retiro en tienda** — solo nombre y fecha.
   - **Envío a domicilio** — dirección, departamento, provincia/distrito,
     referencia y método de pago (Yape/Plin, transferencia, contraentrega).
   - **Retiro en agencia** (Shalom / Emtrafesa / Marvisur / Olva Courier /
     Transportes Flores) — buscador de agencias con geolocalización + DNI/CE.
   - **Otra agencia / encomienda** — nombre y dirección de recojo libres.
5. Al enviar, el pedido se **guarda en Supabase** (`utils/orders.js`) ligado
   al negociante y con un **código de rastreo** único generado por un
   trigger de Postgres (ej. `ANOTA-4F8K2`, ver esquema arriba). Se muestra
   la pantalla de confirmación con un botón para mandarlo también por
   WhatsApp al número del negociante.
6. Ese código sirve para que el cliente final consulte el estado de su
   pedido sin login desde la sección "Rastrear pedido" de la landing
   (`utils/orders.js` → `trackOrderByCode`, que llama a la función pública
   `track_order_by_code` — solo por código exacto, nunca expone la lista
   completa ni datos personales).

## Sobre las "agencias cercanas" (Shalom, Emtrafesa, Marvisur, Olva, Flores)

Ninguna de estas empresas peruanas ofrece una API pública y gratuita para
ubicar agencias por geolocalización (Shalom y Olva solo por contacto
comercial; Marvisur/Emtrafesa/Flores sin API documentada; y ninguna envía
cabeceras CORS, así que ni con credenciales se podría llamar desde el
navegador sin backend propio).

**Solución implementada:** un directorio propio en
`src/data/agenciesData.js` (archivo **generado**, no editar a mano) con
**más de 1200 agencias reales** de las 5 empresas (directorios oficiales
completos), expuesto vía `src/data/agencies.js`. Las coordenadas son
aproximadas a nivel de distrito/ciudad (`src/data/peruGeo.js`); el
formulario pide geolocalización y ordena por distancia real (Haversine,
`src/utils/geo.js`).

Para sumar otro courier o actualizar uno existente, súbelo desde el panel
de administrador (pestaña "Base de datos") — no hace falta tocar código.

## Cargar/alimentar el directorio de agencias (panel de administrador)

Sin cambios respecto a antes: pestaña **"Base de datos"**
(`src/components/AgencyManager.jsx`), con plantilla Excel, alta suelta con
"+ Nueva empresa…", resumen por courier e importador local de respaldo.
Ver el esquema de `agencies` en el SQL de arriba.

### Sobre la librería de Excel (`xlsx` / SheetJS)

La lectura del `.xlsx` que sube el admin usa `xlsx` (SheetJS). La versión
publicada en npm tiene 2 CVEs conocidos sin parche ahí (prototype
pollution y ReDoS al leer un archivo malicioso) — ver
[GHSA-4r6h-8v6p-xvw6](https://github.com/advisories/GHSA-4r6h-8v6p-xvw6) y
[GHSA-5pgg-2g8v-p4x9](https://github.com/advisories/GHSA-5pgg-2g8v-p4x9).
Mitigado por ahora con: (1) esta librería solo se carga tras el login de
administrador o negociante, nunca para el cliente final del formulario
(`import()` dinámico); (2) el archivo subido se limita a 5 MB antes de
intentar leerlo; (3) el parseo va en `try/catch`. Para eliminar el riesgo
del todo, SheetJS publica builds parchadas en su propio dominio:

```bash
npm install https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz
```

## Desarrollo local

```bash
npm install
npm run dev       # servidor de desarrollo
npm run lint      # oxlint
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción localmente
```

## Deploy a Vercel

El proyecto incluye `vercel.json` (framework Vite, build `npm run build`,
salida `dist/`). Para desplegar:

```bash
npx vercel        # preview
npx vercel --prod # producción
```

O impórtalo directamente desde el dashboard de Vercel apuntando a este
repositorio — lo detecta como proyecto Vite sin configuración adicional.
No olvides las variables de entorno de Supabase (ver arriba) y, en
Supabase → Authentication → URL Configuration, apuntar el "Site URL" a tu
dominio de producción.
