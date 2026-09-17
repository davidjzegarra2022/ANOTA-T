// Perfil/configuración del negociante logueado (tabla `merchants`, 1 fila
// por cuenta de Supabase Auth). Reemplaza el registro estático que antes
// vivía en src/data/merchants.js — ahora cada negociante edita su propia
// marca y logística desde "Configuración".
import { getSupabaseClient } from './supabaseClient'

function fromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    businessName: row.business_name,
    whatsappNumber: row.whatsapp_number,
    currency: row.currency,
    timezone: row.timezone,
    logoUrl: row.logo_url,
    slug: row.slug,
    couriersActive: row.couriers_active || [],
    dispatchDays: row.dispatch_days || [1, 2, 3, 4, 5, 6],
    cutoffHour: row.cutoff_hour,
    leadTimeHours: row.lead_time_hours,
    planId: row.plan_id,
    active: row.active,
  }
}

/** Perfil del negociante actualmente logueado. */
export async function fetchMyMerchant() {
  const supabase = await getSupabaseClient()
  if (!supabase) return null
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase.from('merchants').select('*').eq('id', user.id).maybeSingle()
  if (error) {
    console.warn('[supabase] No se pudo leer el perfil del negociante:', error.message)
    return null
  }
  return fromRow(data)
}

/** Configuración pública de un negociante por su slug — la usa el formulario público (sin login). */
export async function fetchMerchantBySlug(slug) {
  const supabase = await getSupabaseClient()
  if (!supabase || !slug) return null
  const { data, error } = await supabase.from('merchants').select('*').eq('slug', slug).maybeSingle()
  if (error) {
    console.warn('[supabase] No se pudo leer el negociante por slug:', error.message)
    return null
  }
  return fromRow(data)
}

export async function updateMyMerchant(patch) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Sesión expirada, vuelve a ingresar.' }

  const row = {}
  if ('businessName' in patch) row.business_name = String(patch.businessName || '').trim()
  if ('whatsappNumber' in patch) row.whatsapp_number = String(patch.whatsappNumber || '').replace(/\D/g, '')
  if ('currency' in patch) row.currency = patch.currency
  if ('timezone' in patch) row.timezone = patch.timezone
  if ('logoUrl' in patch) row.logo_url = patch.logoUrl
  if ('slug' in patch) {
    row.slug = String(patch.slug || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  if ('couriersActive' in patch) row.couriers_active = patch.couriersActive
  if ('dispatchDays' in patch) row.dispatch_days = patch.dispatchDays
  if ('cutoffHour' in patch) row.cutoff_hour = patch.cutoffHour
  if ('leadTimeHours' in patch) row.lead_time_hours = patch.leadTimeHours

  const { data, error } = await supabase.from('merchants').update(row).eq('id', user.id).select().maybeSingle()
  if (error) return { ok: false, error: error.message }
  return { ok: true, merchant: fromRow(data) }
}

/** Sube el logo al bucket `logos/<uid>/...` y devuelve su URL pública. */
export async function uploadMerchantLogo(file) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Sesión expirada, vuelve a ingresar.' }
  if (file.size > 2 * 1024 * 1024) return { ok: false, error: 'El logo no debe superar 2 MB.' }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
  const path = `${user.id}/logo-${Date.now()}.${ext}`
  const { error: uploadError } = await supabase.storage.from('logos').upload(path, file, { upsert: true })
  if (uploadError) return { ok: false, error: uploadError.message }

  const { data } = supabase.storage.from('logos').getPublicUrl(path)
  return { ok: true, url: data.publicUrl }
}
