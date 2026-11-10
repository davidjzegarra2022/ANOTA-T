// Avisos del panel (la campanita): recordatorios pendientes y pedidos nuevos.
//
// Cuándo avisa con una ventanita:
//   * al iniciar sesión (una vez por visita), si hay algo pendiente;
//   * 3 veces al día — a las 9:00, 13:00 y 18:00 — si hay pendientes;
//   * 6 horas antes de un recordatorio que tenga hora (una sola vez);
//   * a la hora exacta de un recordatorio que tenga hora (una sola vez);
//   * cuando entra un pedido nuevo mientras el panel está abierto.
// Todo se calcula aquí con funciones puras (fáciles de probar); lo que ya se
// avisó se recuerda en este navegador para no repetir.
import { dayKey } from './reminders'

export const ALERT_HOURS = [9, 13, 18]

// Aviso adelantado: desde 6 horas antes hasta 1 hora antes de la hora pactada.
// Si el panel se abre dentro de esa ventana, avisa igual (una sola vez).
export const ADVANCE_HOURS = 6
export const MIN_ADVANCE_HOURS = 1

/** Momento local exacto de un recordatorio con día y hora ('AAAA-MM-DD', 'HH:MM'). */
export function reminderAt(r) {
  if (!r?.dueDate || !r?.dueTime) return null
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(r.dueTime).trim())
  if (!m) return null
  const [y, mo, d] = String(r.dueDate).split('-').map(Number)
  if (!y || !mo || !d) return null
  const at = new Date(y, mo - 1, d, Number(m[1]), Number(m[2]), 0, 0)
  return Number.isNaN(at.getTime()) ? null : at
}

/**
 * Recordatorios que toca avisar 6 horas antes: su hora cae entre 1 y 6 horas
 * desde `now` y todavía no se avisaron con la clave `adv:<id>`. La clave es
 * distinta de la del aviso a la hora exacta, así suenan las dos veces.
 */
export function advanceReminderDue(list, now = new Date(), notified = []) {
  const min = now.getTime() + MIN_ADVANCE_HOURS * 60 * 60 * 1000
  const max = now.getTime() + ADVANCE_HOURS * 60 * 60 * 1000
  return (list || []).filter((r) => {
    if (r.done || notified.includes(`adv:${r.id}`)) return false
    const at = reminderAt(r)
    return at ? at.getTime() >= min && at.getTime() <= max : false
  })
}

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
    const opts = { body, icon: '/icon-192.png', badge: '/icon-192.png', tag: 'anotat-' + title, renotify: true, vibrate: [160, 80, 160, 80, 300], data: { url: '/' } }
    // En Android las notificaciones solo funcionan desde el service worker.
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.ready.then((reg) => reg.showNotification(title, opts)).catch(() => new Notification(title, opts))
    } else {
      new Notification(title, opts)
    }
    return true
  } catch {
    return false
  }
}
export function notificationsSupported() {
  return typeof Notification !== 'undefined'
}
