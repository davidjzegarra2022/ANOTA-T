// Protección contra contraseñas filtradas.
//
// Supabase trae esto nativo (Authentication → Providers → Email), pero solo
// en el plan Pro. Mientras el proyecto esté en el plan Free lo hacemos acá,
// contra la misma fuente que usa Supabase: la API de HaveIBeenPwned.
//
// La contraseña NUNCA sale del navegador. Se usa el modelo de k-anonimato:
// se calcula el SHA-1 local, se envían solo los 5 primeros caracteres del
// hash, y el servidor devuelve ~800 sufijos entre los que buscamos el
// nuestro. Ni HaveIBeenPwned ni nadie en la red ve la contraseña ni su hash
// completo.

const HIBP_RANGE_URL = 'https://api.pwnedpasswords.com/range/'
const MIN_LENGTH = 8

/** SHA-1 en mayúsculas usando Web Crypto (disponible en todo navegador con HTTPS). */
async function sha1Hex(text) {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-1', bytes)
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

/**
 * Busca `suffix` en la respuesta de HaveIBeenPwned (líneas "SUFIJO:veces").
 * Exportada para poder probarla sin red.
 */
export function countInRangeResponse(body, suffix) {
  for (const line of String(body || '').split('\n')) {
    const [hashSuffix, count] = line.trim().split(':')
    if (hashSuffix === suffix) return Number(count) || 0
  }
  return 0
}

/**
 * ¿Cuántas veces apareció esta contraseña en filtraciones conocidas?
 * Devuelve `null` si no se pudo consultar (sin red, API caída): en ese caso
 * no bloqueamos el registro — la validación de longitud sigue aplicando.
 */
export async function leakedPasswordCount(password) {
  if (!password || typeof crypto?.subtle?.digest !== 'function') return null
  try {
    const hash = await sha1Hex(password)
    const res = await fetch(HIBP_RANGE_URL + hash.slice(0, 5), {
      headers: { 'Add-Padding': 'true' }, // respuestas de tamaño uniforme
    })
    if (!res.ok) return null
    return countInRangeResponse(await res.text(), hash.slice(5))
  } catch {
    return null
  }
}

/**
 * Valida una contraseña nueva. Devuelve { ok } o { ok: false, error }.
 * Primero lo barato (longitud) y solo después la consulta de red.
 */
export async function checkNewPassword(password) {
  const pw = String(password || '')
  if (pw.length < MIN_LENGTH) {
    return { ok: false, error: `La contraseña debe tener al menos ${MIN_LENGTH} caracteres.` }
  }
  const count = await leakedPasswordCount(pw)
  if (count && count > 0) {
    return {
      ok: false,
      error:
        'Esa contraseña aparece en filtraciones públicas de datos y es fácil de adivinar. Elige otra.',
    }
  }
  return { ok: true }
}

export { MIN_LENGTH as MIN_PASSWORD_LENGTH }
