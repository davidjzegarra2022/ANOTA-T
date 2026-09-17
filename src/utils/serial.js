// Credenciales del dueño de la plataforma (super-admin, ruta `/admin`).
// Sigue siendo un gate del lado del cliente (sin backend propio): estas
// credenciales viajan en el bundle y son visibles para cualquiera que lo
// inspeccione. Los negociantes YA NO usan esto — tienen cuentas reales de
// Supabase Auth (ver utils/supabaseAuth.js).
const ROLE_KEY = 'anotate-access-role'

export const ADMIN_USER = 'admin'
const ADMIN_PASSWORD = '962029292'

export function isValidAdmin(user, password) {
  return String(user).trim().toLowerCase() === ADMIN_USER && String(password) === ADMIN_PASSWORD
}

export function setAdminUnlocked() {
  try {
    localStorage.setItem(ROLE_KEY, 'admin')
  } catch {
    // sin persistencia: el acceso dura solo esta sesión.
  }
}

/** Rol de admin guardado en este dispositivo (se confía de inmediato, sin red). */
export function getStoredAdminRole() {
  try {
    return localStorage.getItem(ROLE_KEY) === 'admin' ? 'admin' : null
  } catch {
    return null
  }
}

/** Cierra la sesión de admin en este dispositivo. */
export function clearAdminAccess() {
  try {
    localStorage.removeItem(ROLE_KEY)
  } catch {
    // sin persistencia
  }
}
