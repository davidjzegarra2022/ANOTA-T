// Gestión de negociantes y planes desde el panel de administrador. Las RPC
// `admin_*` ya no reciben ninguna clave: validan en la base de datos que el
// usuario logueado esté en `platform_admins` (ver utils/supabaseAuth.js →
// isPlatformAdmin). Sin sesión de admin, la base responde `forbidden`.
import { getSupabaseClient } from './supabaseClient'
import { TRIAL_DAYS } from './plans'

const NETWORK_RE = /failed to fetch|load failed|networkerror|network request failed|fetch failed/i

function adminError(err) {
  const msg = String(err?.message || err || '')
  if (NETWORK_RE.test(msg)) return 'No hay conexión con el servidor en este momento. Revisa tu internet y pulsa «Actualizar».'
  if (/forbidden/i.test(msg)) return 'Tu cuenta no tiene permisos de administrador.'
  if (/jwt|session|401/i.test(msg)) return 'Sesión expirada, vuelve a ingresar.'
  return msg || 'Error desconocido.'
}

/**
 * Consultas de SOLO LECTURA con reintento: un «Failed to fetch» suele ser un
 * corte de red de un segundo (señal del celular, cambio de wifi). Se reintenta
 * hasta 3 veces antes de mostrar el error. Las escrituras (registrar un pago,
 * cambiar un plan) NO se reintentan solas, para no duplicar nada.
 */
async function readRpc(supabase, name, args) {
  let res
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) await new Promise((r) => setTimeout(r, 600 * attempt))
    try {
      res = await supabase.rpc(name, args)
    } catch (e) {
      res = { data: null, error: { message: String(e?.message || e) } }
    }
    if (!res.error || !NETWORK_RE.test(String(res.error.message || ''))) return res
  }
  return res
}

/**
 * Días de prueba con los que trabaja la app: nunca menos de TRIAL_DAYS (15).
 * Si la fila del plan en la base todavía dice 7 (planes viejos), se muestra
 * igual 15 — la prueba gratuita es de 15 días en todo el sistema.
 */
function effectiveTrialDays(value) {
  const days = Number(value)
  if (!days) return null
  return Math.max(days, TRIAL_DAYS)
}

function fromRow(row) {
  return {
    id: row.id,
    businessName: row.business_name,
    whatsappNumber: row.whatsapp_number,
    slug: row.slug,
    active: row.active,
    planId: row.plan_id,
    planName: row.plan_name,
    createdAt: row.created_at,
    email: row.email,
    planStartedAt: row.plan_started_at,
    planTrialDays: effectiveTrialDays(row.plan_trial_days),
    planPricePerDay: row.plan_price_per_day == null ? null : Number(row.plan_price_per_day),
    lastSignInAt: row.last_sign_in_at,
  }
}

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Vigencia del plan de un negociante para la columna "Usuario conectado".
 * Devuelve { kind, days } donde kind es:
 *   'none'    — sin plan asignado
 *   'trial'   — plan de prueba: `days` son los días que le quedan (0 = vencido)
 *   'forever' — plan pago: no tiene fecha de vencimiento guardada
 */
export function planRemaining(merchant) {
  if (!merchant.planId) return { kind: 'none', days: null, deadline: null }
  const trialDays = effectiveTrialDays(merchant.planTrialDays)
  if (!trialDays) {
    // Plan pagado: vence en paid_until (lo fija «Registrar pago»).
    const paid = merchant.paidUntil ? Date.parse(merchant.paidUntil) : NaN
    if (Number.isNaN(paid)) return { kind: 'forever', days: null, deadline: null }
    return { kind: 'paid', days: Math.max(0, Math.ceil((paid - Date.now()) / DAY_MS)), deadline: new Date(paid) }
  }
  const start = merchant.planStartedAt ? new Date(merchant.planStartedAt).getTime() : null
  if (!start || Number.isNaN(start)) return { kind: 'forever', days: null, deadline: null }
  const end = start + trialDays * DAY_MS
  return { kind: 'trial', days: Math.max(0, Math.ceil((end - Date.now()) / DAY_MS)), deadline: new Date(end) }
}

function isMissingFn(error) {
  return error?.code === 'PGRST202' || error?.code === '42883' || /could not find the function|does not exist/i.test(error?.message || '')
}

/**
 * Vencimiento y pagos de cada tienda (sql/2026-11-05-pagos-y-vencimiento.sql).
 * `missing: true` = falta correr ese SQL.
 */
export async function adminListSubscriptions() {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.', byId: {} }
  const { data, error } = await readRpc(supabase, 'admin_list_subscriptions')
  if (error) return { ok: false, missing: isMissingFn(error), error: adminError(error), byId: {} }
  const byId = {}
  for (const r of data || []) {
    byId[r.merchant_id] = {
      paidUntil: r.paid_until || null,
      lastPaymentAt: r.last_payment_at || null,
      totalPaid: Number(r.total_paid || 0),
      payments: Number(r.payments || 0),
    }
  }
  return { ok: true, byId }
}

/** Registra un pago: asigna el plan y suma los días de vigencia. */
export async function adminRegisterPayment({ merchantId, planId, days, amount, method, note }) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { data, error } = await supabase.rpc('admin_register_payment', {
    p_merchant: merchantId,
    p_plan_id: planId,
    p_days: days,
    p_amount: amount,
    p_method: method || null,
    p_note: note || null,
  })
  if (error) {
    if (isMissingFn(error)) return { ok: false, error: 'Falta correr el SQL de pagos en Supabase (sql/2026-11-05-pagos-y-vencimiento.sql).' }
    if (/invalid_days/.test(error.message)) return { ok: false, error: 'Los días deben estar entre 1 y 3650.' }
    return { ok: false, error: adminError(error) }
  }
  return { ok: true, payment: data }
}

/** Historial de pagos de una tienda (o de todas si no se pasa id). */
export async function adminListPayments(merchantId = null) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.', payments: [] }
  const { data, error } = await readRpc(supabase, 'admin_list_payments', { p_merchant: merchantId })
  if (error) return { ok: false, missing: isMissingFn(error), error: adminError(error), payments: [] }
  return {
    ok: true,
    payments: (data || []).map((r) => ({
      id: r.id,
      merchantId: r.merchant_id,
      businessName: r.business_name,
      planName: r.plan_name,
      days: r.days,
      amount: Number(r.amount || 0),
      method: r.method || '',
      note: r.note || '',
      periodStart: r.period_start,
      periodEnd: r.period_end,
      createdAt: r.created_at,
    })),
  }
}

export async function adminListMerchants() {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.', merchants: [] }
  const { data, error } = await readRpc(supabase, 'admin_list_merchants')
  if (error) return { ok: false, error: adminError(error), merchants: [] }
  return { ok: true, merchants: (data || []).map(fromRow) }
}

export async function adminSetMerchantActive(id, active) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_set_merchant_active', {
    p_id: id,
    p_active: active,
  })
  if (error) return { ok: false, error: adminError(error) }
  return { ok: true }
}

/**
 * Elimina la cuenta de un negociante (usuario, tienda y todos sus pedidos).
 * La base vuelve a exigir el nombre exacto de la tienda y no deja borrar
 * cuentas de administradores ni la propia.
 */
export async function adminDeleteMerchant(id, confirmName) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_delete_merchant', { p_id: id, p_confirm: String(confirmName || '') })
  if (!error) return { ok: true }
  const msg = String(error.message || '')
  if (/confirm_mismatch/.test(msg)) return { ok: false, error: 'El nombre de la tienda no coincide.' }
  if (/protected_account/.test(msg)) return { ok: false, error: 'No se puede eliminar una cuenta de administrador.' }
  if (/not_found/.test(msg)) return { ok: false, error: 'La cuenta ya no existe.' }
  if (/admin_delete_merchant|PGRST202|does not exist/i.test(msg)) return { ok: false, error: 'La función de borrado aún no está activada en la base de datos.' }
  return { ok: false, error: adminError(error) }
}

export async function adminSetMerchantPlan(id, planId) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_set_merchant_plan', {
    p_id: id,
    p_plan_id: planId,
  })
  if (error) return { ok: false, error: adminError(error) }
  return { ok: true }
}

function planFromRow(row) {
  return {
    id: row.id,
    name: row.name,
    trialDays: row.trial_days,
    pricePerDay: Number(row.price_per_day),
    monthlyOrderLimit: row.monthly_order_limit,
    description: row.description,
    features: row.features || [],
    active: row.active,
  }
}

export async function adminListPlans() {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.', plans: [] }
  const { data, error } = await readRpc(supabase, 'admin_list_plans')
  if (error) return { ok: false, error: adminError(error), plans: [] }
  return { ok: true, plans: (data || []).map(planFromRow) }
}

export async function adminUpsertPlan({ id, name, trialDays, pricePerDay, monthlyOrderLimit, description, features, active }) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { data, error } = await supabase.rpc('admin_upsert_plan', {
    p_id: id ?? null,
    p_name: String(name || '').trim(),
    p_trial_days: trialDays ? Number(trialDays) : null,
    p_price_per_day: Number(pricePerDay) || 0,
    p_monthly_order_limit: monthlyOrderLimit ? Number(monthlyOrderLimit) : null,
    p_description: String(description || '').trim() || null,
    p_features: (features || []).map((f) => String(f).trim()).filter(Boolean),
    p_active: active !== false,
  })
  if (error) return { ok: false, error: adminError(error) }
  return { ok: true, plan: planFromRow(data) }
}

// --- Dominios de correo permitidos para registrarse -----------------------

export async function adminListEmailDomains() {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.', domains: [] }
  const { data, error } = await readRpc(supabase, 'admin_list_email_domains')
  if (error) return { ok: false, error: adminError(error), domains: [] }
  return { ok: true, domains: (data || []).map((r) => r.domain) }
}

export async function adminAddEmailDomain(domain) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_add_email_domain', {
    p_domain: String(domain || '').trim(),
  })
  if (error) {
    if (/invalid_domain/i.test(error.message)) return { ok: false, error: 'Dominio inválido (ej. gmail.com).' }
    return { ok: false, error: adminError(error) }
  }
  return { ok: true }
}

export async function adminDeleteEmailDomain(domain) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_delete_email_domain', {
    p_domain: domain,
  })
  if (error) return { ok: false, error: adminError(error) }
  return { ok: true }
}

export async function adminDeletePlan(id) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_delete_plan', { p_id: id })
  if (error) return { ok: false, error: adminError(error) }
  return { ok: true }
}

/** Deja constancia de que un admin inició sesión (registro de actividad). */
export async function adminLogLogin() {
  const supabase = await getSupabaseClient()
  if (!supabase) return
  await supabase.rpc('admin_log_login')
}

/**
 * Registro de actividad de los administradores: quién, cuándo y qué cambió.
 * Lo escribe la base de datos (las RPC de admin y triggers), no el
 * navegador, así que no se puede falsear desde el panel.
 */
export async function adminListActivity(limit = 100) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.', events: [] }
  const { data, error } = await readRpc(supabase, 'admin_list_activity', { p_limit: limit })
  if (error) return { ok: false, error: adminError(error), events: [] }
  return {
    ok: true,
    events: (data || []).map((r) => ({
      id: r.id,
      adminName: r.admin_name,
      action: r.action,
      details: r.details,
      createdAt: r.created_at,
    })),
  }
}
