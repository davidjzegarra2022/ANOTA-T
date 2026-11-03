-- Plan Emprendedor Pro (S/ 1.50 por día)
-- Ejecutar una vez en Supabase → SQL Editor, o crearlo desde
-- /admin → Planes → "+ Nuevo plan" con los mismos datos.
--
-- Mientras no exista esta fila, la web ya muestra el plan: la app trae un
-- catálogo de respaldo (utils/plans.js → PLAN_FALLBACKS) que desaparece solo
-- en cuanto el plan está en la base con el mismo nombre.

insert into public.plans (name, price_per_day, description, features, active)
select 'Emprendedor Pro', 1.50, 'Para tiendas que venden en equipo.',
  array[
    'Todo lo incluido en el Plan Emprendedor.',
    'Gestión en equipo: Añade hasta 4 vendedores para operar de forma simultánea.',
    'Alertas inteligentes: Automatiza notificaciones al acumular un número determinado de pedidos.',
    'Soporte prioritario 24/7 y acceso anticipado a todas las actualizaciones del sistema.'
  ],
  true
where not exists (select 1 from public.plans where lower(trim(name)) = 'emprendedor pro');

-- Verificación: el catálogo completo, ordenado por precio.
select id, name, trial_days, price_per_day, active
  from public.plans
 order by price_per_day asc, id asc;
