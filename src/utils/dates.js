const WEEKDAY_LABELS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MONTH_LABELS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const DEFAULT_DISPATCH_DAYS = [1, 2, 3, 4, 5, 6] // lunes a sábado (0=domingo, ver Date#getDay)
const DAYS_TO_SHOW = 14

// Hora de corte (la edita el negociante en "Configuración"; por defecto
// las 5 de la tarde). Antes del corte se puede despachar HOY MISMO; desde
// el corte, el primer día disponible es el siguiente día de despacho.
const DEFAULT_CUTOFF = 17

// Las horas se cuentan en hora de Perú (UTC-5, sin horario de verano), así
// el calendario es el mismo aunque el celular del cliente tenga otra zona.
const LIMA_OFFSET_MS = 5 * 60 * 60 * 1000

function limaClock(now) {
  return new Date(now.getTime() - LIMA_OFFSET_MS) // leer siempre con getUTC*
}

export function nextDayCutoffHour(merchant) {
  return merchant?.cutoffHour ?? DEFAULT_CUTOFF
}

export function isPastCutoff(merchant, now = new Date()) {
  return limaClock(now).getUTCHours() >= nextDayCutoffHour(merchant)
}

/**
 * Primer día que se puede elegir, contado desde hoy (hora de Perú):
 *   antes de la hora de corte → 0 (hoy mismo)
 *   desde la hora de corte    → 1 (mañana)
 * `leadTimeHours` (anticipación, 0 por defecto) se suma a la hora actual.
 * Luego `generateAvailableDates` salta los días sin despacho.
 */
export function earliestDayOffset(merchant, now = new Date()) {
  const check = limaClock(new Date(now.getTime() + (merchant?.leadTimeHours || 0) * 3600 * 1000))
  const today = limaClock(now)
  const dayDiff = Math.round(
    (Date.UTC(check.getUTCFullYear(), check.getUTCMonth(), check.getUTCDate()) -
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())) /
      86400000,
  )
  return dayDiff + (check.getUTCHours() < nextDayCutoffHour(merchant) ? 0 : 1)
}

/** "Fecha de entrega" cuando el cliente recoge en tienda; si no, "Fecha de envío". */
export function dateFieldLabel(deliveryMethod) {
  return String(deliveryMethod || '').startsWith('store') ? 'Fecha de entrega' : 'Fecha de envío'
}

/**
 * Fechas disponibles, saltando los días que el negociante no despache
 * (`dispatchDays`, configurable en "Configuración"). El primer día
 * candidato lo decide `earliestDayOffset`.
 */
export function generateAvailableDates(merchant, now = new Date()) {
  const dispatchDays = new Set(merchant.dispatchDays?.length ? merchant.dispatchDays : DEFAULT_DISPATCH_DAYS)
  const startOffset = earliestDayOffset(merchant, now)
  const today = limaClock(now)

  const results = []
  for (let offset = startOffset, scanned = 0; results.length < DAYS_TO_SHOW && scanned < 60; offset += 1, scanned += 1) {
    // Fecha "de calendario" en UTC para que no la mueva la zona del celular.
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + offset))
    if (!dispatchDays.has(d.getUTCDay())) continue
    results.push({
      value: d.toISOString().slice(0, 10),
      label: `${WEEKDAY_LABELS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTH_LABELS[d.getUTCMonth()]}`,
      shortLabel: `${WEEKDAY_LABELS[d.getUTCDay()]} ${d.getUTCDate()}/${String(d.getUTCMonth() + 1).padStart(2, '0')}`,
    })
  }
  return results
}
