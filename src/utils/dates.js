const WEEKDAY_LABELS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MONTH_LABELS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const DEFAULT_DISPATCH_DAYS = [1, 2, 3, 4, 5, 6] // lunes a sábado (0=domingo, ver Date#getDay)
const DAYS_TO_SHOW = 14

// Hora de corte para que el pedido salga AL DÍA SIGUIENTE. Es la que el
// negociante edita en "Configuración"; por defecto las 4 de la tarde.
const DEFAULT_NEXT_DAY_CUTOFF = 16
// Para que el pedido salga HOY MISMO hay que pedir una hora antes del
// corte (por defecto, las 3 de la tarde).
const SAME_DAY_MARGIN_HOURS = 1

export function nextDayCutoffHour(merchant) {
  return merchant?.cutoffHour ?? DEFAULT_NEXT_DAY_CUTOFF
}

export function sameDayCutoffHour(merchant) {
  return Math.max(0, nextDayCutoffHour(merchant) - SAME_DAY_MARGIN_HOURS)
}

export function isPastCutoff(merchant, now = new Date()) {
  return now.getHours() >= nextDayCutoffHour(merchant)
}

/**
 * Primer día que se puede elegir, contado desde hoy:
 *   antes de las 3pm → 0 (hoy mismo)
 *   entre 3pm y 4pm  → 1 (mañana)
 *   desde las 4pm    → 2 (pasado mañana)
 * Las horas salen de la configuración del negociante; `leadTimeHours` se
 * suma a la hora actual antes de comparar.
 */
export function earliestDayOffset(merchant, now = new Date()) {
  const check = new Date(now)
  check.setHours(check.getHours() + (merchant?.leadTimeHours || 0))
  const hour = check.getHours()
  if (hour < sameDayCutoffHour(merchant)) return 0
  if (hour < nextDayCutoffHour(merchant)) return 1
  return 2
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

  const results = []
  for (let offset = startOffset, scanned = 0; results.length < DAYS_TO_SHOW && scanned < 60; offset += 1, scanned += 1) {
    const d = new Date(now)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + offset)
    if (!dispatchDays.has(d.getDay())) continue
    results.push({
      value: d.toISOString().slice(0, 10),
      label: `${WEEKDAY_LABELS[d.getDay()]} ${d.getDate()} ${MONTH_LABELS[d.getMonth()]}`,
      shortLabel: `${WEEKDAY_LABELS[d.getDay()]} ${d.getDate()}/${String(d.getMonth() + 1).padStart(2, '0')}`,
    })
  }
  return results
}
