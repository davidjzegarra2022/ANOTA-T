// Planes activos, visibles para cualquier negociante logueado (solo
// lectura — los crea y edita el administrador, ver utils/adminMerchants.js).
import { getSupabaseClient } from './supabaseClient'

// Días de prueba gratis de la plataforma (antes eran 7). Es el mínimo que se
// usa siempre: si la fila del plan en la base trae un trial_days mayor, se
// respeta ese número, pero nunca se muestran menos de 15 días.
export const TRIAL_DAYS = 15

/**
 * Planes que la web debe mostrar aunque la fila todavía no esté en la base.
 * Sirve para publicar un nivel nuevo sin esperar a que alguien corra el SQL:
 * cuando el plan exista en `plans` (mismo nombre), este de respaldo
 * desaparece solo. El botón pide el plan por WhatsApp igual que los demás,
 * porque soporte es quien lo activa — no necesita `id` en la base.
 */
export const PLAN_FALLBACKS = [
  {
    key: 'emprendedor-pro',
    name: 'Emprendedor Pro',
    pricePerDay: 1.5,
    description: 'Para tiendas que venden en equipo.',
    features: [
      'Todo lo incluido en el Plan Emprendedor.',
      'Gestión en equipo: Añade hasta 4 vendedores para operar de forma simultánea.',
      'Alertas inteligentes: Automatiza notificaciones al acumular un número determinado de pedidos.',
      'Soporte prioritario 24/7 y acceso anticipado a todas las actualizaciones del sistema.',
    ],
  },
]

function fromRow(row) {
  return {
    id: row.id,
    name: row.name,
    trialDays: row.trial_days ? Math.max(row.trial_days, TRIAL_DAYS) : row.trial_days,
    pricePerDay: Number(row.price_per_day),
    monthlyOrderLimit: row.monthly_order_limit,
    description: row.description,
    features: row.features || [],
  }
}

const normName = (name) => String(name || '').trim().toLowerCase()

/** Agrega los planes de respaldo que falten (por nombre) y ordena por precio. */
export function mergePlanFallbacks(plans) {
  const names = new Set(plans.map((p) => normName(p.name)))
  const missing = PLAN_FALLBACKS.filter((f) => !names.has(normName(f.name))).map((f) => ({
    id: `local-${f.key}`,
    name: f.name,
    trialDays: null,
    pricePerDay: f.pricePerDay,
    monthlyOrderLimit: null,
    description: f.description,
    features: f.features,
    // Marca para la UI: este plan todavía no vive en la base.
    localOnly: true,
  }))
  return [...plans, ...missing].sort((a, b) => a.pricePerDay - b.pricePerDay || a.name.localeCompare(b.name, 'es'))
}

export async function fetchActivePlans() {
  const supabase = await getSupabaseClient()
  if (!supabase) return mergePlanFallbacks([])
  // Orden estable: primero por precio y, si dos planes cuestan lo mismo, el
  // más antiguo primero (así el nivel nuevo queda al final de la lista).
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('price_per_day', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) {
    console.warn('[supabase] No se pudo leer los planes:', error.message)
    return mergePlanFallbacks([])
  }
  return mergePlanFallbacks((data || []).map(fromRow))
}

/** Fecha en que vence la prueba gratuita de un negociante, o null si su plan no es de prueba. */
export function trialEndsAt(merchant, plan) {
  if (!plan?.trialDays) return null
  const start = new Date(merchant.planStartedAt)
  const end = new Date(start)
  end.setDate(end.getDate() + plan.trialDays)
  return end
}
