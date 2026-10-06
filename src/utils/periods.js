// Periodos del Panel Pro (día, semana lunes-domingo o mes) y agrupaciones
// de pedidos para sus indicadores. Todo se calcula en el navegador sobre
// los pedidos ya cargados.

export const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
export const WEEKDAYS_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const WEEKDAYS_LONG = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/** Rango [desde, hasta) del periodo que contiene `anchor`. */
export function periodRange(mode, anchor) {
  if (mode === 'month') {
    const from = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
    return { from, to: new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1) }
  }
  const from = startOfDay(anchor)
  if (mode === 'week') from.setDate(from.getDate() - ((from.getDay() + 6) % 7))
  const to = new Date(from)
  to.setDate(to.getDate() + (mode === 'week' ? 7 : 1))
  return { from, to }
}

export function shiftAnchor(mode, anchor, delta) {
  const d = new Date(anchor)
  if (mode === 'month') return new Date(d.getFullYear(), d.getMonth() + delta, 1)
  d.setDate(d.getDate() + (mode === 'week' ? 7 : 1) * delta)
  return d
}

function fmtShort(d) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`
}

function cap(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function periodLabel(mode, { from, to }) {
  if (mode === 'month') return `${cap(MONTHS[from.getMonth()])} ${from.getFullYear()}`
  if (mode === 'day') return `${cap(WEEKDAYS_LONG[from.getDay()])} ${fmtShort(from)} ${from.getFullYear()}`
  const last = new Date(to)
  last.setDate(last.getDate() - 1)
  return `Semana del ${fmtShort(from)} al ${fmtShort(last)} ${last.getFullYear()}`
}

/** Para nombres de archivo: 2026-10, semana-2026-10-05 o dia-2026-10-06. */
export function periodSlug(mode, { from }) {
  const iso = `${from.getFullYear()}-${String(from.getMonth() + 1).padStart(2, '0')}-${String(from.getDate()).padStart(2, '0')}`
  if (mode === 'month') return iso.slice(0, 7)
  return `${mode === 'week' ? 'semana' : 'dia'}-${iso}`
}

export function orderDate(order, basis) {
  if (basis === 'shipping') return order.shippingDate ? new Date(order.shippingDate + 'T00:00:00') : null
  return order.createdAt ? new Date(order.createdAt) : null
}

export function ordersInPeriod(orders, basis, range) {
  return orders
    .filter((o) => {
      const d = orderDate(o, basis)
      return d && d >= range.from && d < range.to
    })
    .sort((a, b) => orderDate(a, basis) - orderDate(b, basis))
}

/**
 * Pedidos por tramo del periodo: por hora (día), por día de la semana
 * (semana) o por día del mes (mes). En "día" se agrupa por la hora de
 * registro: la fecha de envío no trae hora.
 */
export function timelineBuckets(mode, range, orders, basis) {
  let buckets
  if (mode === 'day') {
    buckets = Array.from({ length: 24 }, (_, h) => ({ key: h, label: `${h}h`, tip: `${String(h).padStart(2, '0')}:00 – ${String(h).padStart(2, '0')}:59`, count: 0 }))
    for (const o of orders) if (o.createdAt) buckets[new Date(o.createdAt).getHours()].count++
    return buckets
  }
  if (mode === 'week') {
    buckets = WEEKDAYS_SHORT.map((label, i) => {
      const d = new Date(range.from)
      d.setDate(d.getDate() + i)
      return { key: i, label, tip: `${cap(WEEKDAYS_LONG[d.getDay()])} ${fmtShort(d)}`, count: 0 }
    })
    for (const o of orders) {
      const d = orderDate(o, basis)
      if (d) buckets[(d.getDay() + 6) % 7].count++
    }
    return buckets
  }
  const days = new Date(range.from.getFullYear(), range.from.getMonth() + 1, 0).getDate()
  buckets = Array.from({ length: days }, (_, i) => ({ key: i, label: String(i + 1), tip: `${i + 1} de ${MONTHS[range.from.getMonth()]}`, count: 0 }))
  for (const o of orders) {
    const d = orderDate(o, basis)
    if (d) buckets[d.getDate() - 1].count++
  }
  return buckets
}

function titleCase(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/(^|[\s-])(\p{L})/gu, (_m, sep, ch) => sep + ch.toUpperCase())
}

/** Ciudad de destino: provincia de la agencia o de la dirección de entrega. */
export function destinationCity(order) {
  if (order.deliveryMethod === 'agency') {
    const parts = String(order.agencyLabel || '').split('/').map((p) => p.trim()).filter(Boolean)
    return titleCase(parts[1] || parts[0] || '') || null
  }
  if (order.deliveryMethod === 'home') {
    const first = String(order.provinceDistrict || '').split(/[/,]/)[0]
    return titleCase(first || order.department || '') || null
  }
  return null // retiro en tienda: no viaja a otra ciudad
}

/** Canal de despacho: el courier, "Delivery" o "Despacho en tienda". */
export function dispatchChannel(order) {
  if (order.deliveryMethod === 'agency') return { key: String(order.courier || 'otro').toLowerCase(), label: titleCase(order.courier || 'Otro courier') }
  if (order.deliveryMethod === 'home') return { key: 'delivery', label: 'Delivery' }
  return { key: 'store', label: 'Despacho en tienda' }
}

/** Cuenta por clave y devuelve [{key, label, count}] de mayor a menor. */
export function countBy(orders, pick) {
  const map = new Map()
  for (const o of orders) {
    const v = pick(o)
    if (!v) continue
    const { key, label } = typeof v === 'string' ? { key: v.toLowerCase(), label: v } : v
    const cur = map.get(key) || { key, label, count: 0 }
    cur.count++
    map.set(key, cur)
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'es'))
}

/** Los `max - 1` primeros y el resto sumado en "Otros". */
export function foldOthers(items, max) {
  if (items.length <= max) return items
  const head = items.slice(0, max - 1)
  const rest = items.slice(max - 1).reduce((n, i) => n + i.count, 0)
  return [...head, { key: '__others', label: 'Otros', count: rest }]
}

export function buyerKey(order) {
  return order.customerDni || order.customerPhone || String(order.customerName || '').trim().toLowerCase() || null
}
