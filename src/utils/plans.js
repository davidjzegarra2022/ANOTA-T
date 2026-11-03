// Planes activos, visibles para cualquier negociante logueado (solo
// lectura — los crea y edita el administrador, ver utils/adminMerchants.js).
import { getSupabaseClient } from './supabaseClient'

// Días de prueba gratis de la plataforma (antes eran 7). Es el mínimo que se
// usa siempre: si la fila del plan en la base trae un trial_days mayor, se
// respeta ese número, pero nunca se muestran menos de 15 días.
export const TRIAL_DAYS = 15

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

export async function fetchActivePlans() {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  // Orden estable: primero por precio y, si dos planes cuestan lo mismo, el
  // más antiguo primero (así el nivel nuevo queda al final de la lista).
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('price_per_day', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) {
    console.warn('[supabase] No se pudo leer los planes:', error.message)
    return []
  }
  return (data || []).map(fromRow)
}

/** Fecha en que vence la prueba gratuita de un negociante, o null si su plan no es de prueba. */
export function trialEndsAt(merchant, plan) {
  if (!plan?.trialDays) return null
  const start = new Date(merchant.planStartedAt)
  const end = new Date(start)
  end.setDate(end.getDate() + plan.trialDays)
  return end
}
