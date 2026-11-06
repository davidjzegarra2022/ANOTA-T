// Recordatorios inteligentes de una venta (solo plan Pro).
//
// A partir de un pedido arma:
//   * un RESUMEN BREVE en texto (estado, cliente, entrega, productos/notas,
//     monto, vendedor);
//   * una fecha y hora SUGERIDAS para el recordatorio según el momento del
//     pedido: por despachar → el día del envío; empacado → antes de la hora
//     de cierre; enviado → confirmar que lo recogió/recibió; atrasado →
//     cuanto antes.
// Son funciones puras: la pantalla solo las muestra y deja editar.
import { ORDER_STATUS_LABELS } from './orders'
import { deliveryMethodLabel, orderDestination } from './orderSummary'
import { addDaysKey, dayKey } from './reminders'

const pad = (n) => String(n).padStart(2, '0')
const hhmm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`

function firstName(name) {
  return String(name || 'el cliente').trim().split(/\s+/)[0]
}

function dayLabel(key, today) {
  if (key === today) return 'hoy'
  if (key === addDaysKey(today, 1)) return 'mañana'
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' })
}

/** Redondea hacia arriba a múltiplos de 5 minutos. */
function roundUp5(date) {
  const d = new Date(date)
  d.setSeconds(0, 0)
  const extra = (5 - (d.getMinutes() % 5)) % 5
  d.setMinutes(d.getMinutes() + extra)
  return d
}

/** Texto corto con lo esencial de la venta. */
export function saleSummary(order, { currency = 'S/' } = {}) {
  const n = order.dailyNumber ?? order.orderNumber
  const status = ORDER_STATUS_LABELS[order.status] || order.status || 'Pendiente'
  const dest = orderDestination(order)
  const where = order.deliveryMethod === 'store' ? 'Recojo en tienda' : `${deliveryMethodLabel(order)} → ${[dest.main, dest.detail].filter(Boolean).join(', ')}`
  const parts = [
    `Pedido${n != null ? ` #${n}` : ''} de ${order.customerName || 'cliente'}${order.trackingCode ? ` (${order.trackingCode})` : ''} · ${status}.`,
    `${where}.`,
  ]
  if (order.shippingDate) {
    const today = dayKey()
    parts.push(`${order.deliveryMethod === 'store' ? 'Entrega' : 'Envío'}: ${/^\d{4}-\d{2}-\d{2}$/.test(order.shippingDate) ? dayLabel(order.shippingDate, today) : order.shippingDate}.`)
  }
  if (order.notes) parts.push(`Productos / notas: ${String(order.notes).trim()}.`)
  parts.push(order.amount != null ? `Monto: ${currency} ${Number(order.amount).toFixed(2)}.` : 'Monto: sin registrar.')
  if (order.sellerName) parts.push(`Vendido por ${order.sellerName}.`)
  return parts.join(' ')
}

/**
 * Fecha/hora sugerida y título del recordatorio según el contexto.
 * Devuelve { date: 'AAAA-MM-DD', time: 'HH:MM', title, reason }.
 */
export function suggestSaleReminder(order, { now = new Date(), cutoffHour = 17 } = {}) {
  const today = dayKey(now)
  const who = firstName(order.customerName)
  const n = order.dailyNumber ?? order.orderNumber
  const tag = n != null ? ` #${n}` : ''
  const ship = /^\d{4}-\d{2}-\d{2}$/.test(order.shippingDate || '') ? order.shippingDate : null
  const cutoff = `${pad(Math.max(8, Math.min(22, Number(cutoffHour) || 17) - 1))}:00`
  const soon = (min, why, title) => {
    const d = roundUp5(new Date(now.getTime() + min * 60000))
    return { date: dayKey(d), time: hhmm(d), title, reason: why }
  }
  const at = (date, time, why, title) => {
    // Si el momento sugerido ya pasó, se mueve a dentro de 30 minutos.
    const [y, m, d] = date.split('-').map(Number)
    const [h, mi] = time.split(':').map(Number)
    if (new Date(y, m - 1, d, h, mi) <= now) return soon(30, `${why} (ya pasó la hora: te avisamos en 30 min)`, title)
    return { date, time, title, reason: why }
  }

  if (order.status === 'cancelled') {
    return at(addDaysKey(today, 1), '10:00', 'Pedido cancelado: un mensaje al día siguiente puede recuperar la venta', `Contactar a ${who}: pedido${tag} cancelado`)
  }
  if (order.status === 'shipped') {
    if (order.deliveryMethod === 'agency') {
      return at(addDaysKey(ship && ship > today ? ship : today, 2), '11:00', 'Enviado a agencia: en ~2 días debería poder recogerlo', `Confirmar que ${who} recogió su pedido${tag}`)
    }
    return at(addDaysKey(today, 1), '11:00', 'Enviado: confirmar la entrega al día siguiente', `Confirmar que ${who} recibió su pedido${tag}`)
  }
  if (order.status === 'packed') {
    const day = ship && ship > today ? ship : today
    return at(day, cutoff, `Empacado: despacharlo antes de la hora de cierre (${cutoffHour}:00)`, `Despachar pedido${tag} de ${who}`)
  }
  // Pendiente
  if (ship && ship < today) return soon(30, 'El pedido está atrasado: su fecha de envío ya pasó', `URGENTE: despachar pedido${tag} de ${who} (atrasado)`)
  if (ship && ship > today) return at(ship, '09:00', `Se envía ${dayLabel(ship, today)}: te lo recordamos a primera hora`, `Empacar y despachar pedido${tag} de ${who}`)
  return soon(60, 'Se envía hoy: te lo recordamos en una hora', `Empacar y despachar pedido${tag} de ${who}`)
}
