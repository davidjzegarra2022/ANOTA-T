-- Prueba gratuita de 15 días en TODO el sistema
-- Ejecutar una vez en Supabase → SQL Editor (o editar el plan desde
-- /admin → Planes poniendo "Días de prueba gratis" = 15).
--
-- Qué hace: los planes de prueba que quedaron con 7 días pasan a 15.
-- No hace falta tocar a cada negociante: los días restantes se calculan
-- siempre como plan_started_at + plans.trial_days, así que al subir el plan
-- a 15 días todas las cuentas en prueba pasan a tener 15 desde su registro.
--
-- Ojo: la función merchant_accepts_orders() (la que suspende la tienda
-- cuando vence la prueba) lee esta misma columna, por eso el cambio tiene
-- que estar en la base y no solo en la pantalla.

update public.plans
   set trial_days = 15
 where trial_days is not null
   and trial_days < 15;

-- Verificación: debe listar los planes de prueba en 15 días.
select id, name, trial_days, price_per_day, active
  from public.plans
 order by price_per_day asc, id asc;
