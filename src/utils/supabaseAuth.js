// Autenticación real de negociantes (Supabase Auth, email + contraseña).
// Reemplaza el login por serial fijo: cada negociante tiene su propia
// cuenta, puede recuperar su contraseña, y confirma su correo mediante el
// flujo estándar de Supabase Auth (ver README → "Correo de confirmación").
import { checkEmailDomain } from './emailDomains'
import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient'

export { isSupabaseConfigured }

/** A dónde vuelve el usuario tras hacer click en un link de correo: siempre
 * al login de ESTE dominio (el link solo confirma la cuenta; la sesión se
 * cierra al llegar — ver App.jsx). */
export function authRedirectUrl() {
  return `${window.location.origin}/login`
}

export async function signUpMerchant({ email, password, businessName, whatsappNumber }) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }

  const domainCheck = await checkEmailDomain(email)
  if (!domainCheck.ok) return { ok: false, error: domainCheck.error }

  const { data, error } = await supabase.auth.signUp({
    email: String(email || '').trim(),
    password,
    options: {
      emailRedirectTo: authRedirectUrl(),
      data: {
        business_name: String(businessName || '').trim(),
        whatsapp_number: String(whatsappNumber || '').replace(/\D/g, ''),
      },
    },
  })
  if (error) {
    // El trigger de la base de datos rechaza dominios no permitidos; GoTrue
    // lo devuelve como un error genérico de base de datos.
    if (/database error|email_domain_not_allowed/i.test(error.message)) {
      return { ok: false, error: 'Ese correo no está permitido. Usa Gmail, Outlook/Hotmail, Yahoo o iCloud.' }
    }
    return { ok: false, error: error.message }
  }
  // Si el proyecto exige confirmación de correo, `session` viene null hasta
  // que el usuario haga click en el link que le llega por email.
  return { ok: true, needsEmailConfirmation: !data.session, user: data.user }
}

export async function signInMerchant(email, password) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(email || '').trim(),
    password,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true, session: data.session }
}

export async function signOutMerchant() {
  const supabase = await getSupabaseClient()
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function sendPasswordReset(email) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.auth.resetPasswordForEmail(String(email || '').trim(), {
    redirectTo: authRedirectUrl(),
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function updateMerchantPassword(newPassword) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/** Sesión actual (o null) — para saber si hay un negociante logueado al abrir la app. */
export async function getCurrentSession() {
  const supabase = await getSupabaseClient()
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session || null
}

/** Se dispara en login, logout y refresh de token. Devuelve una función para desuscribirse. */
export async function onAuthStateChange(callback) {
  const supabase = await getSupabaseClient()
  if (!supabase) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}
