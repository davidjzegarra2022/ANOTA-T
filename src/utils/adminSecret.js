// Clave de administrador para las funciones RPC "admin_*" (negociantes y
// planes) — vive SOLO en la base de datos (tabla app_settings), nunca en el
// bundle del navegador. Esta copia local es solo para no tener que
// retipearla en cada visita a este dispositivo. Ver README → "Panel de
// administrador".
const ADMIN_SECRET_KEY = 'anotate-admin-secret'

export function getAdminSecret() {
  try {
    return localStorage.getItem(ADMIN_SECRET_KEY) || ''
  } catch {
    return ''
  }
}

export function setAdminSecret(secret) {
  try {
    if (secret && secret.trim()) localStorage.setItem(ADMIN_SECRET_KEY, secret.trim())
    else localStorage.removeItem(ADMIN_SECRET_KEY)
  } catch {
    // sin persistencia
  }
}

export function unauthorizedMessage(err) {
  const msg = String(err?.message || err || '')
  if (/unauthorized/i.test(msg)) return 'Clave de administrador incorrecta.'
  return msg || 'Error desconocido.'
}
