// Gestión de negociantes y planes desde el panel de administrador —
// reemplaza el antiguo utils/supabaseClients.js (seriales). Mismo patrón de
// seguridad: funciones RPC protegidas con `admin_secret`, que vive solo en
// la base de datos (nunca en el bundle del navegador).
import { getSupabaseClient } from './supabaseClient'
import { getAdminSecret, unauthorizedMessage } from './adminSecret'

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
  }
}

export async function adminListMerchants() {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.', merchants: [] }
  const { data, error } = await supabase.rpc('admin_list_merchants', { p_secret: getAdminSecret() })
  if (error) return { ok: false, error: unauthorizedMessage(error), merchants: [] }
  return { ok: true, merchants: (data || []).map(fromRow) }
}

export async function adminSetMerchantActive(id, active) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_set_merchant_active', {
    p_secret: getAdminSecret(),
    p_id: id,
    p_active: active,
  })
  if (error) return { ok: false, error: unauthorizedMessage(error) }
  return { ok: true }
}

export async function adminSetMerchantPlan(id, planId) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_set_merchant_plan', {
    p_secret: getAdminSecret(),
    p_id: id,
    p_plan_id: planId,
  })
  if (error) return { ok: false, error: unauthorizedMessage(error) }
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
  const { data, error } = await supabase.rpc('admin_list_plans', { p_secret: getAdminSecret() })
  if (error) return { ok: false, error: unauthorizedMessage(error), plans: [] }
  return { ok: true, plans: (data || []).map(planFromRow) }
}

export async function adminUpsertPlan({ id, name, trialDays, pricePerDay, monthlyOrderLimit, description, features, active }) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { data, error } = await supabase.rpc('admin_upsert_plan', {
    p_secret: getAdminSecret(),
    p_id: id ?? null,
    p_name: String(name || '').trim(),
    p_trial_days: trialDays ? Number(trialDays) : null,
    p_price_per_day: Number(pricePerDay) || 0,
    p_monthly_order_limit: monthlyOrderLimit ? Number(monthlyOrderLimit) : null,
    p_description: String(description || '').trim() || null,
    p_features: (features || []).map((f) => String(f).trim()).filter(Boolean),
    p_active: active !== false,
  })
  if (error) return { ok: false, error: unauthorizedMessage(error) }
  return { ok: true, plan: planFromRow(data) }
}

// --- Dominios de correo permitidos para registrarse -----------------------

export async function adminListEmailDomains() {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.', domains: [] }
  const { data, error } = await supabase.rpc('admin_list_email_domains', { p_secret: getAdminSecret() })
  if (error) return { ok: false, error: unauthorizedMessage(error), domains: [] }
  return { ok: true, domains: (data || []).map((r) => r.domain) }
}

export async function adminAddEmailDomain(domain) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_add_email_domain', {
    p_secret: getAdminSecret(),
    p_domain: String(domain || '').trim(),
  })
  if (error) {
    if (/invalid_domain/i.test(error.message)) return { ok: false, error: 'Dominio inválido (ej. gmail.com).' }
    return { ok: false, error: unauthorizedMessage(error) }
  }
  return { ok: true }
}

export async function adminDeleteEmailDomain(domain) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_delete_email_domain', {
    p_secret: getAdminSecret(),
    p_domain: domain,
  })
  if (error) return { ok: false, error: unauthorizedMessage(error) }
  return { ok: true }
}

export async function adminDeletePlan(id) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.rpc('admin_delete_plan', { p_secret: getAdminSecret(), p_id: id })
  if (error) return { ok: false, error: unauthorizedMessage(error) }
  return { ok: true }
}
