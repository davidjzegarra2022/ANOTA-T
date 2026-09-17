# ANOTA-T — Formulario de Envío Logístico (multi-tenant)

Plataforma mobile-first para que negocios de e-commerce reciban pedidos de
envío/recojo de sus propios clientes, construida con React + Vite +
Tailwind CSS + Supabase (Auth, base de datos y storage).

Cada **negociante** crea su propia cuenta, configura su logística y marca,
y comparte su link (`tu-dominio.com/f/<su-slug>`) con sus clientes finales.
Cuando un cliente llena el formulario, el pedido queda **guardado** (no
solo enviado por WhatsApp) y aparece en el panel del negociante (Envíos,
Clientes, Panel Pro).

## Los tres roles de la app

1. **Cliente final** — entra a `tu-dominio.com/f/<slug>` (sin login), llena
   el formulario y lo manda por WhatsApp al número del negociante dueño de
   ese link. El pedido también queda guardado en Supabase.
2. **Negociante** — entra a `tu-dominio.com/` (login normal, `src/App.jsx`),
   con **correo y contraseña reales** (Supabase Auth). Tiene su propio panel
   con pestañas **Envíos, Clientes, Panel Pro, Configuración, Planes y
   Suscripción** (`src/components/dashboard/`).
3. **Administrador (dueño de la plataforma)** — entra a
   `tu-dominio.com/admin` con usuario/contraseña fijos (`src/utils/serial.js`).
   Gestiona el directorio de agencias, los negociantes (activar/desactivar,
   asignar plan) y los planes disponibles.

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
4. Opcional: en **Authentication → URL Configuration**, configura el "Site
   URL" con tu dominio de producción para que los links de los correos
   apunten ahí en vez de a `localhost`.

> Gmail tiene un límite diario de envíos (~500/día en cuentas normales) —
> suficiente para arrancar. Si creces mucho, migra el SMTP a un proveedor
> transaccional (Resend, SendGrid, Amazon SES) cambiando solo esta
> configuración, sin tocar código.

## El panel del negociante (`src/components/dashboard/`)

- **Envíos** (`EnviosPage.jsx`) — todos los pedidos, filtrables por estado,
  por rango de fechas o navegando día por día, con búsqueda por cliente/
  WhatsApp/N° de pedido y exportación a Excel.
- **Clientes** (`ClientesPage.jsx`) — agrupa los pedidos por WhatsApp del
  cliente final: recurrentes (2+ pedidos), nuevos este mes, dormidos (sin
  comprar +30 días), en riesgo (15-30 días sin comprar).
- **Panel Pro** (`PanelProPage.jsx`) — pedidos de hoy/7/30 días, uso del
  plan del mes ("X de N pedidos"), pedidos por estado y top couriers.
  > **Limitación honesta:** el formulario no pide un monto por pedido (es
  > un formulario de logística, no de facturación), así que este panel
  > mide **pedidos**, no ventas en soles. Si quieres un campo de monto
  > para ver ingresos reales, es un cambio aparte — pídelo.
- **Configuración** (`ConfiguracionPage.jsx`) — couriers activos, días de
  despacho, hora de corte, anticipación en horas, nombre de tienda,
  WhatsApp, moneda de visualización, zona horaria, logo (sube a Supabase
  Storage, bucket `logos`) y el slug de su link público.
- **Planes** (`PlanesPage.jsx`) — planes disponibles (los define el admin),
  resalta el plan actual; sin pasarela de pago, el cambio se pide por
  WhatsApp a un número tuyo que configuras en el propio archivo
  (`ADMIN_WHATSAPP` en `PlanesPage.jsx`, vacío por defecto).
- **Suscripción** (`SuscripcionPage.jsx`) — plan actual y uso del mes.

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
create table if not exists public.plans (
  id bigint generated always as identity primary key,
  name text not null,
  monthly_order_limit integer not null default 20,
  price_soles numeric(10,2) not null default 0,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.plans enable row level security;
create policy "plans_authenticated_select" on public.plans
  for select using (auth.role() = 'authenticated' and active = true);
insert into public.plans (name, monthly_order_limit, price_soles, description)
select 'Prueba', 20, 0, 'Plan de prueba gratuito, hasta 20 pedidos al mes.'
where not exists (select 1 from public.plans where name = 'Prueba');

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
  created_at timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "orders_insert_public" on public.orders for insert with check (true);
create policy "orders_select_own" on public.orders for select using (auth.uid() = merchant_id);
create policy "orders_update_own" on public.orders for update using (auth.uid() = merchant_id);
create policy "orders_delete_own" on public.orders for delete using (auth.uid() = merchant_id);
create index if not exists orders_merchant_created_idx on public.orders (merchant_id, created_at desc);

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
  update public.merchants set plan_id = p_plan_id where id = p_id returning * into r;
  return r;
end; $$;
grant execute on function public.admin_set_merchant_plan(text, uuid, bigint) to anon, authenticated;

create or replace function public.admin_list_plans(p_secret text)
returns setof public.plans language plpgsql security definer set search_path = public as $$
begin
  if p_secret is null or p_secret <> (select value from public.app_settings where key = 'admin_secret') then
    raise exception 'unauthorized';
  end if;
  return query select * from public.plans order by price_soles asc, created_at asc;
end; $$;
grant execute on function public.admin_list_plans(text) to anon, authenticated;

create or replace function public.admin_upsert_plan(
  p_secret text, p_id bigint, p_name text, p_monthly_order_limit integer,
  p_price_soles numeric, p_description text, p_active boolean
)
returns public.plans language plpgsql security definer set search_path = public as $$
declare r public.plans;
begin
  if p_secret is null or p_secret <> (select value from public.app_settings where key = 'admin_secret') then
    raise exception 'unauthorized';
  end if;
  if p_id is null then
    insert into public.plans (name, monthly_order_limit, price_soles, description, active)
    values (p_name, p_monthly_order_limit, p_price_soles, p_description, coalesce(p_active, true))
    returning * into r;
  else
    update public.plans set name = p_name, monthly_order_limit = p_monthly_order_limit,
      price_soles = p_price_soles, description = p_description, active = coalesce(p_active, true)
    where id = p_id returning * into r;
  end if;
  return r;
end; $$;
grant execute on function public.admin_upsert_plan(text, bigint, text, integer, numeric, text, boolean) to anon, authenticated;

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

> **Nota de seguridad:** `merchants` y `orders` permiten inserción/lectura
> pública en varios casos (mismo modelo que `agencies`: seguridad de
> cliente, no de servidor — la app es 100% estática, sin backend propio).
> Ninguna columna expuesta es secreta: el WhatsApp de un negociante ya es
> público por diseño (es el número al que sus clientes le escriben). Si
> más adelante quieres cerrarlo más, existe margen para políticas más
> finas — pídelo.

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
   al negociante, y se muestra la pantalla de confirmación con un botón
   para mandarlo también por WhatsApp al número del negociante.

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
