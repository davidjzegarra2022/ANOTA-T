-- Planes: Emprendedor Pro a S/ 1.50 y nuevo nivel EMPRENDEDOR GOLD (S/ 1.50)
-- Ejecutar una vez en Supabase → SQL Editor, o editar/crear los planes desde
-- /admin → Planes (las dos cosas hacen exactamente lo mismo).
--
-- Deja el catálogo así:
--   Prueba Free        → 15 días gratis
--   Emprendedor        → S/ 1.00 por día
--   Emprendedor Pro    → S/ 1.50 por día (equipo de 4 vendedores, alertas, 24/7)
--   EMPRENDEDOR GOLD   → S/ 1.50 por día

update public.plans
   set price_per_day = 1.50,
       features = array[
         'Todo lo incluido en el Plan Emprendedor.',
         'Gestión en equipo: añade hasta 4 vendedores y separa las ventas de cada uno.',
         'Alertas inteligentes: avisos automáticos al acumular un número determinado de pedidos.',
         'Soporte prioritario 24/7 y acceso anticipado a todas las actualizaciones del sistema.'
       ]
 where lower(trim(name)) = 'emprendedor pro';

-- Si el plan no existía, se crea.
insert into public.plans (name, price_per_day, description, features, active)
select 'Emprendedor Pro', 1.50, 'Para tiendas que venden en equipo.',
  array[
    'Todo lo incluido en el Plan Emprendedor.',
    'Gestión en equipo: añade hasta 4 vendedores y separa las ventas de cada uno.',
    'Alertas inteligentes: avisos automáticos al acumular un número determinado de pedidos.',
    'Soporte prioritario 24/7 y acceso anticipado a todas las actualizaciones del sistema.'
  ],
  true
where not exists (select 1 from public.plans where lower(trim(name)) = 'emprendedor pro');

-- Nivel nuevo.
insert into public.plans (name, price_per_day, description, features, active)
select 'EMPRENDEDOR GOLD', 1.50, 'El nivel más alto de ANOTA-T, al mismo precio que Pro.',
  array[
    'Todo lo incluido en el Plan Emprendedor Pro.',
    'Ventas separadas por vendedor en el panel, los reportes y las etiquetas.',
    'Soporte prioritario 24/7 por WhatsApp.',
    'Acceso anticipado a todas las actualizaciones del sistema.'
  ],
  true
where not exists (select 1 from public.plans where lower(trim(name)) = 'emprendedor gold');

-- Verificación: el catálogo completo, ordenado por precio.
select id, name, trial_days, price_per_day, active
  from public.plans
 order by price_per_day asc, id asc;
