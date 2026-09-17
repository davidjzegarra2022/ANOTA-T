const WEEKDAY_LABELS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MONTH_LABELS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const DEFAULT_DISPATCH_DAYS = [1, 2, 3, 4, 5, 6] // lunes a sábado (0=domingo, ver Date#getDay)
const DAYS_TO_SHOW = 14

export function isPastCutoff(merchant, now = new Date()) {
  return now.getHours() >= (merchant.cutoffHour ?? 18)
}

/**
 * Fechas de envío disponibles a partir de mañana, saltando los días que el
 * negociante no despache (`dispatchDays`, configurable en "Configuración").
 * Si ya pasó la hora de corte (+ anticipación en horas), arranca un día más
 * tarde.
 */
export function generateAvailableDates(merchant, now = new Date()) {
  const dispatchDays = new Set(merchant.dispatchDays?.length ? merchant.dispatchDays : DEFAULT_DISPATCH_DAYS)
  const leadHours = merchant.leadTimeHours || 0

  const cutoffCheck = new Date(now)
  cutoffCheck.setHours(cutoffCheck.getHours() + leadHours)
  const startOffset = 1 + (isPastCutoff(merchant, cutoffCheck) ? 1 : 0)

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
