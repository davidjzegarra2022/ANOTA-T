// Solo se permiten registros con proveedores de correo conocidos, para que
// no entren correos temporales / de bots que saturen la plataforma.
//
// El candado REAL es un trigger en la base de datos
// (`enforce_allowed_email_domain` sobre auth.users): esta validación del
// navegador existe solo para dar un mensaje claro antes de enviar el
// formulario — cualquiera podría saltársela llamando a la API directamente.
//
// La lista la administra el dueño de la plataforma desde su panel
// (pestaña "Negociantes" → "Dominios de correo permitidos").
import { getSupabaseClient } from './supabaseClient'

// Respaldo por si no hay red al momento de validar: los más usados.
const FALLBACK_DOMAINS = [
  'gmail.com', 'googlemail.com',
  'outlook.com', 'outlook.es', 'hotmail.com', 'hotmail.es', 'live.com', 'msn.com',
  'yahoo.com', 'yahoo.es', 'icloud.com', 'me.com',
]

let cache = null

export function emailDomainOf(email) {
  return String(email || '').trim().toLowerCase().split('@')[1] || ''
}

/** Dominios permitidos (cacheados por sesión). */
export async function fetchAllowedDomains() {
  if (cache) return cache
  try {
    const supabase = await getSupabaseClient()
    if (!supabase) return FALLBACK_DOMAINS
    const { data, error } = await supabase.from('allowed_email_domains').select('domain')
    if (error) throw error
    const list = (data || []).map((r) => r.domain)
    cache = list.length ? list : FALLBACK_DOMAINS
    return cache
  } catch {
    return FALLBACK_DOMAINS
  }
}

/** ¿Este correo puede registrarse? Devuelve { ok, error }. */
export async function checkEmailDomain(email) {
  const value = String(email || '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return { ok: false, error: 'Ingresa un correo válido.' }
  }
  const domain = emailDomainOf(value)
  const allowed = await fetchAllowedDomains()
  if (!allowed.includes(domain)) {
    return {
      ok: false,
      error: `No aceptamos correos de "${domain}". Usa un correo de Gmail, Outlook/Hotmail, Yahoo o iCloud.`,
    }
  }
  return { ok: true }
}
