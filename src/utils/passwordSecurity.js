// Reglas para contraseñas nuevas. Nuestros usuarios son pequeños negocios:
// se pide solo un mínimo de longitud (el mismo que exige Supabase Auth), sin
// reglas de complejidad ni bloqueo de contraseñas comunes.
const MIN_LENGTH = 6

/** Valida una contraseña nueva. Devuelve { ok } o { ok: false, error }. */
export async function checkNewPassword(password) {
  if (String(password || '').length < MIN_LENGTH) {
    return { ok: false, error: `La contraseña debe tener al menos ${MIN_LENGTH} caracteres.` }
  }
  return { ok: true }
}

export { MIN_LENGTH as MIN_PASSWORD_LENGTH }
