// Planes activos, visibles para cualquier negociante logueado (solo
// lectura — los crea y edita el administrador, ver utils/adminPlans.js).
import { getSupabaseClient } from './supabaseClient'

function fromRow(row) {
  return {
    id: row.id,
    name: row.name,
    monthlyOrderLimit: row.monthly_order_limit,
    priceSoles: Number(row.price_soles),
    description: row.description,
  }
}

export async function fetchActivePlans() {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  const { data, error } = await supabase.from('plans').select('*').order('price_soles', { ascending: true })
  if (error) {
    console.warn('[supabase] No se pudo leer los planes:', error.message)
    return []
  }
  return (data || []).map(fromRow)
}
