// Avisos del panel (la campanita): recordatorios pendientes y pedidos nuevos.
//
// Cuándo avisa con una ventanita:
//   * al iniciar sesión (una vez por visita), si hay algo pendiente;
//   * 3 veces al día — a las 9:00, 13:00 y 18:00 — si hay pendientes;
//   * a la hora exacta de un recordatorio que tenga hora (una sola vez);
//   * cuando entra un pedido nuevo mientras el panel está abierto.
// Todo se calcula aquí con funciones puras (fáciles de probar); lo que ya se
// avisó se recuerda en este navegador para no repetir.
import { dayKey } from './reminders'

export const ALERT_HOURS = [9, 13, 18]

/** Recordatorios que piden atención: vencidos, de hoy, o importantes sin fecha. */
export function pendingReminders(list, today = dayKey()) {
  return (list || [])
    .filter((r) => !r.done && ((r.dueDate && r.dueDate <= today) || (!r.dueDate && r.important)))
    .sort((a, b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999') || (a.dueTime || '99').localeCompare(b.dueTime || '99'))
}

/** ¿Está vencido? (de un día anterior, o de hoy con hora ya pasada) */
export function isOverdue(r, now = new Date()) {
  const today = dayKey(now)
  if (!r.dueDate) return false
  if (r.dueDate < today) return true
  if (r.dueDate > today || !r.dueTime) return false
  return r.dueTime < hhmm(now)
}

function hhmm(date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

/**
 * Turno del día (9, 13 o 18 h) que toca avisar ahora y todavía no se avisó.
 * Devuelve su clave ('AAAA-MM-DD@13') o null.
 */
export function dueSlot(now, shown = []) {
  const today = dayKey(now)
  const hour = now.getHours()
  const passed = ALERT_HOURS.filter((h) => h <= hour)
  if (!passed.length) return null
  const key = `${today}@${passed[passed.length - 1]}`
  return shown.includes(key) ? null : key
}

/** Recordatorios de hoy cuya hora ya llegó y que todavía no se avisaron. */
export function timedReminderDue(list, now, notified = []) {
  const today = dayKey(now)
  const t = hhmm(now)
  return (list || []).filter((r) => !r.done && r.dueDate === today && r.dueTime && r.dueTime <= t && !notified.includes(r.id))
}

/** Pedidos registrados después de la última vez que se miró Envíos. */
export function newOrdersSince(orders, lastSeen) {
  if (!lastSeen) return []
  const since = Date.parse(lastSeen)
  return (orders || []).filter((o) => Date.parse(o.createdAt) > since)
}

// --- Lo que ya se avisó (por tienda, en este navegador) -------------------

function key(merchantId) {
  return `anotat-alerts:${merchantId || 'anon'}`
}

export function loadAlertState(merchantId) {
  try {
    const s = JSON.parse(localStorage.getItem(key(merchantId)) || '{}') || {}
    return { shown: s.shown || [], notified: s.notified || [], ordersSeenAt: s.ordersSeenAt || '' }
  } catch {
    return { shown: [], notified: [], ordersSeenAt: '' }
  }
}

export function saveAlertState(merchantId, state, today = dayKey()) {
  // Solo se guardan los turnos de hoy y los últimos 200 recordatorios avisados.
  const clean = {
    shown: (state.shown || []).filter((k) => k.startsWith(today)),
    notified: (state.notified || []).slice(-200),
    ordersSeenAt: state.ordersSeenAt || '',
  }
  try {
    localStorage.setItem(key(merchantId), JSON.stringify(clean))
  } catch {
    // sin almacenamiento: los avisos funcionan, pero pueden repetirse
  }
  return clean
}

/** Notificación del sistema (fuera de la pestaña) si el usuario dio permiso. */
export function systemNotify(title, body) {
  try {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false
    new Notification(title, { body, icon: '/icon-192.png', tag: 'anotat-' + title })
    return true
  } catch {
    return false
  }
}

export function notificationsSupported() {
  return typeof Notification !== 'undefined'
}
