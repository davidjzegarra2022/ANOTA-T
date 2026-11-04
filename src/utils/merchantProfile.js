// Perfil/configuración del negociante logueado (tabla `merchants`, 1 fila
// por cuenta de Supabase Auth). Reemplaza el registro estático que antes
// vivía en src/data/merchants.js — ahora cada negociante edita su propia
// marca y logística desde "Configuración".
import { getSupabaseClient } from './supabaseClient'
import { compressLogo, HEAVY_LOGO_BYTES } from './logoImage'
import { SELLER_ID_RE, loadSellerDraft, normalizeSellers } from './sellers'

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
    sellers: Array.isArray(row.sellers) ? row.sellers : [],
    // false = la columna `sellers` todavía no existe en la base (falta
    // correr sql/2026-11-04-vendedores.sql). La pantalla lo usa para avisar
    // y para no intentar guardar una columna que no está.
    sellersSupported: Object.prototype.hasOwnProperty.call(row, 'sellers'),
    planId: row.plan_id,
    planStartedAt: row.plan_started_at,
    active: row.active,
    // false = suscripción vencida o tienda desactivada: el formulario
    // muestra el aviso de suspensión (ver get_merchant_public).
    acceptingOrders: row.accepting_orders ?? row.active,
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

/**
 * Configuración pública de un negociante por su slug — la usa el formulario
 * público (sin login). Va por una función security definer y no por la tabla:
 * `merchants` NO es legible públicamente, porque eso permitiría listar todos
 * los negociantes con su WhatsApp (ver README → nota de seguridad).
 */
export async function fetchMerchantBySlug(slug) {
  const supabase = await getSupabaseClient()
  if (!supabase || !slug) return null
  const { data, error } = await supabase.rpc('get_merchant_public', { p_slug: slug })
  if (error) {
    console.warn('[supabase] No se pudo leer el negociante por slug:', error.message)
    return null
  }
  return data?.[0] ? fromRow(data[0]) : null
}

/**
 * Vendedor del link (?v=<código> o ?v=Nombre en links antiguos), resuelto por
 * el servidor: { id, name, whatsapp } o null si la tienda no lo tiene
 * registrado. Con `name` se marca el pedido y con `whatsapp` el resumen vuelve
 * al chat de ESE vendedor.
 *
 * `pending: true` = la base todavía no tiene el SQL de vendedores: se usa el
 * nombre que venga en un link antiguo solo para mostrarlo; sin número.
 */
export async function fetchSellerPublic(slug, ref) {
  if (!ref) return null
  const supabase = await getSupabaseClient()
  if (!supabase || !slug) return null
  // Una falla momentánea (señal débil del cliente, corte breve de la base)
  // NO debe mandar el pedido del vendedor a la tienda: se reintenta.
  let lastError = null
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) await new Promise((r) => setTimeout(r, 700 * attempt))
    const { data, error } = await supabase.rpc('get_seller_public', { p_slug: slug, p_ref: ref })
    if (!error) {
      const row = Array.isArray(data) ? data[0] : data
      // Vendedor que la tienda no tiene (o ya quitó): el link vale como el de la tienda.
      if (!row?.name) return null
      const seller = { id: row.id || '', name: row.name, whatsapp: String(row.whatsapp || '').replace(/\D/g, '') }
      rememberSeller(slug, ref, seller)
      return seller
    }
    if (isMissingFunction(error)) {
      return SELLER_ID_RE.test(ref) ? null : { id: '', name: ref, whatsapp: '', pending: true }
    }
    lastError = error
  }
  console.warn('[supabase] No se pudo leer el vendedor del link:', lastError?.message)
  // Si en esta visita ya se había identificado, se usa lo recordado.
  return recalledSeller(slug, ref) || { id: '', name: '', whatsapp: '', unresolved: true }
}

function sellerMemoryKey(slug, ref) {
  return `anotat-seller:${String(slug).toLowerCase()}:${String(ref).toLowerCase()}`
}

function rememberSeller(slug, ref, seller) {
  try {
    sessionStorage.setItem(sellerMemoryKey(slug, ref), JSON.stringify(seller))
  } catch {
    // sin sessionStorage
  }
}

function recalledSeller(slug, ref) {
  try {
    const s = JSON.parse(sessionStorage.getItem(sellerMemoryKey(slug, ref)) || 'null')
    return s?.name ? s : null
  } catch {
    return null
  }
}

function isMissingFunction(error) {
  return error?.code === 'PGRST202' || error?.code === '42883' || /could not find the function|does not exist/i.test(error?.message || '')
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
  if ('sellers' in patch) row.sellers = normalizeSellers(patch.sellers)

  const { data, error } = await supabase.from('merchants').update(row).eq('id', user.id).select().maybeSingle()
  if (error) {
    // La columna `sellers` la crea sql/2026-11-04-vendedores.sql. Si todavía
    // no está, se guarda todo lo demás y se avisa que los vendedores no se
    // pudieron guardar — así la pantalla de Configuración nunca queda
    // bloqueada por una migración pendiente.
    if ('sellers' in row && /sellers/i.test(error.message || '')) {
      const withoutSellers = { ...row }
      delete withoutSellers.sellers
      const retry = await supabase.from('merchants').update(withoutSellers).eq('id', user.id).select().maybeSingle()
      if (!retry.error) return { ok: true, merchant: fromRow(retry.data), sellersIgnored: true }
    }
    return { ok: false, error: error.message }
  }
  return { ok: true, merchant: fromRow(data) }
}

/**
 * Sube el logo al bucket `logos/<uid>/...` y devuelve su URL pública.
 * Siempre se guarda comprimido (JPG ≤ 600 px, liviano) para que WhatsApp y
 * las redes lo muestren en la vista previa del link.
 */
export async function uploadMerchantLogo(file) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Sesión expirada, vuelve a ingresar.' }
  if (file.size > 10 * 1024 * 1024) return { ok: false, error: 'El logo no debe superar 10 MB.' }

  let blob
  try {
    blob = await compressLogo(file)
  } catch {
    return { ok: false, error: 'No se pudo leer la imagen. Prueba con un JPG o PNG.' }
  }
  const path = `${user.id}/logo-${Date.now()}.jpg`
  const { error: uploadError } = await supabase.storage
    .from('logos')
    .upload(path, blob, { upsert: true, contentType: 'image/jpeg', cacheControl: '31536000' })
  if (uploadError) return { ok: false, error: uploadError.message }

  const { data } = supabase.storage.from('logos').getPublicUrl(path)
  return { ok: true, url: data.publicUrl }
}

/**
 * Arreglo automático para logos subidos antes de la compresión: si el logo
 * actual pesa demasiado para la vista previa de WhatsApp, se recomprime y se
 * reemplaza (una sola vez por sesión). Devuelve la URL nueva o null.
 */
export async function ensureLightLogo(merchant) {
  if (!merchant?.logoUrl) return null
  const flag = `anotat-logo-checked-${merchant.logoUrl}`
  try {
    if (sessionStorage.getItem(flag)) return null
    sessionStorage.setItem(flag, '1')
  } catch {
    // sin sessionStorage: igual se intenta
  }
  try {
    const res = await fetch(merchant.logoUrl, { cache: 'no-store' })
    if (!res.ok) return null
    const blob = await res.blob()
    const isJpeg = /jpe?g/i.test(blob.type)
    if (blob.size <= HEAVY_LOGO_BYTES && isJpeg) return null
    const up = await uploadMerchantLogo(new File([blob], 'logo', { type: blob.type || 'image/png' }))
    if (!up.ok) return null
    const saved = await updateMyMerchant({ logoUrl: up.url })
    return saved.ok ? up.url : null
  } catch {
    return null
  }
}

/** ¿El formulario público de este negociante está recibiendo pedidos? (false = suscripción vencida o cuenta desactivada) */
export async function fetchAcceptingOrders(merchantId) {
  const supabase = await getSupabaseClient()
  if (!supabase || !merchantId) return true
  const { data, error } = await supabase.rpc('merchant_accepts_orders', { p_id: merchantId })
  if (error) return true
  return data !== false
}

/**
 * ¿Ya se corrió el SQL de vendedores en Supabase? Lo comprueba el panel de
 * administrador llamando a la función `get_seller_public` con datos de
 * prueba (`get_seller_public`): si la función no existe, la base responde con error de "función no
 * encontrada". Devuelve 'ok', 'missing' o 'unknown' (sin conexión u otro error).
 */
export async function checkSellersSql() {
  const supabase = await getSupabaseClient()
  if (!supabase) return 'unknown'
  const { error } = await supabase.rpc('get_seller_public', { p_slug: '__probe__', p_ref: '__probe__' })
  if (!error) return 'ok'
  if (isMissingFunction(error)) return 'missing'
  return 'unknown'
}

/**
 * Vendedores que se escribieron antes de correr el SQL quedaron solo en este
 * navegador. En cuanto la base ya tiene la columna `sellers` (y está vacía),
 * se suben solos al entrar al panel, sin tener que volver a "Guardar cambios".
 * Devuelve el negociante actualizado, o el mismo si no había nada que subir.
 */
export async function syncSellerDraft(merchant) {
  if (!merchant?.sellersSupported || normalizeSellers(merchant.sellers).length) return merchant
  const draft = loadSellerDraft(merchant.id)
  if (!draft.length) return merchant
  const res = await updateMyMerchant({ sellers: draft })
  return res.ok && !res.sellersIgnored ? res.merchant : merchant
}
