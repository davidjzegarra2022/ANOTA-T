// Pedidos persistidos en Supabase (tabla `orders`). Antes ANOTA-T solo
// armaba un link de WhatsApp y no guardaba nada; ahora cada pedido que
// llena un cliente final queda registrado y ligado al negociante dueño del
// link — es lo que alimenta Envíos, Clientes y Panel Pro.
import { getSupabaseClient } from './supabaseClient'

function fromRow(row) {
  return {
    id: row.id,
    trackingCode: row.tracking_code,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerDni: row.customer_dni,
    deliveryMethod: row.delivery_method,
    courier: row.courier,
    agencyLabel: row.agency_label,
    agencyAddress: row.agency_address,
    agencyReference: row.agency_reference,
    address: row.address,
    department: row.department,
    provinceDistrict: row.province_district,
    reference: row.reference,
    paymentMethod: row.payment_method,
    notes: row.notes,
    shippingDate: row.shipping_date,
    status: row.status,
    createdAt: row.created_at,
  }
}

/**
 * Crea un pedido — lo llama el formulario público, sin sesión (cliente final).
 * Va por `submit_order` (security invoker: el INSERT sigue pasando por la
 * política RLS pública) porque el cliente no puede leer `orders`, y así
 * recibe el código de rastreo y el estado que fija el servidor.
 */
export async function createOrder(merchantId, form) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const row = {
    merchant_id: merchantId,
    customer_name: form.fullName,
    customer_phone: form.phone,
    customer_dni: form.dni || null,
    delivery_method: form.deliveryMethod,
    courier: form.courier || null,
    agency_label: form.agency?.label || null,
    agency_address: form.agency?.address || null,
    agency_reference: form.agency?.reference || null,
    address: form.address || null,
    department: form.department || null,
    province_district: form.provinceDistrict || null,
    reference: form.reference || null,
    payment_method: form.paymentMethod || null,
    notes: form.notes || null,
    shipping_date: form.shippingDate?.value || null,
  }
  const { data, error } = await supabase.rpc('submit_order', { p: row })
  if (!error) {
    const created = data?.[0]
    return {
      ok: true,
      trackingCode: created?.tracking_code || null,
      orderNumber: created?.order_number ?? null,
      status: created?.status || 'pending',
    }
  }
  // Si la función aún no existe en esta base, guarda igual el pedido (sin código).
  if (error.code === 'PGRST202') {
    const res = await supabase.from('orders').insert(row)
    if (!res.error) return { ok: true, trackingCode: null, status: 'pending' }
    console.warn('[supabase] No se pudo guardar el pedido:', res.error.message)
    return { ok: false, error: res.error.message }
  }
  console.warn('[supabase] No se pudo guardar el pedido:', error.message)
  // 42501 = la política RLS lo rechazó: la tienda está suspendida.
  return { ok: false, error: error.message, suspended: error.code === '42501' }
}

const WEEKDAYS = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

function norm(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function pad(n) {
  return String(n).padStart(2, '0')
}

/** Todas las formas en que alguien podría escribir una fecha/hora al buscar. */
function dateTerms(date, withTime) {
  if (!date || Number.isNaN(date.getTime())) return ''
  const d = pad(date.getDate())
  const m = pad(date.getMonth() + 1)
  const y = date.getFullYear()
  const parts = [`${y}-${m}-${d}`, `${d}/${m}/${y}`, `${d}/${m}`, `${d}-${m}`, WEEKDAYS[date.getDay()], MONTHS[date.getMonth()]]
  if (withTime) {
    const h = date.getHours()
    const h12 = h % 12 || 12
    const ampm = h < 12 ? 'am a.m. a. m.' : 'pm p.m. p. m.'
    parts.push(`${pad(h)}:${pad(date.getMinutes())}`, `${h}:${pad(date.getMinutes())}`, `${h12}:${pad(date.getMinutes())} ${ampm}`)
  }
  return parts.join(' ')
}

/** Hora en que el cliente envió el formulario, ej. "10:26 a. m.". */
export function orderTimeLabel(order) {
  if (!order?.createdAt) return ''
  return new Date(order.createdAt).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
}

/** Fecha corta del envío del formulario, ej. "30/09". */
export function orderDayLabel(order) {
  if (!order?.createdAt) return ''
  const d = new Date(order.createdAt)
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`
}

/**
 * Búsqueda de Envíos: N° de pedido, código, cliente, WhatsApp, DNI, día y
 * hora (del envío del formulario y de la fecha de envío). Cada palabra
 * escrita tiene que aparecer. "#5", "n° 5" o "pedido 5" buscan EXACTAMENTE
 * el pedido número 5. Solo filtra en memoria: el texto nunca viaja a la
 * base de datos, así que no hay nada que inyectar.
 */
export function orderMatchesSearch(order, rawQuery) {
  let q = norm(rawQuery).trim().slice(0, 80)
  if (!q) return true
  const exact = q.match(/^(?:#|n[°o.º]?\s*|pedido\s*(?:n[°o.º]?\s*)?)(\d+)$/)
  if (exact) return Number(exact[1]) === Number(order.orderNumber)
  const created = order.createdAt ? new Date(order.createdAt) : null
  const shipping = order.shippingDate ? new Date(order.shippingDate + 'T00:00:00') : null
  const haystack = norm(
    [
      order.orderNumber != null ? `#${order.orderNumber} ${order.orderNumber}` : '',
      order.trackingCode,
      order.customerName,
      order.customerPhone,
      order.customerDni,
      order.courier,
      order.agencyLabel,
      order.address,
      ORDER_STATUS_LABELS[order.status],
      dateTerms(created, true),
      dateTerms(shipping, false),
    ].join(' '),
  )
  return q.split(/\s+/).every((word) => haystack.includes(word))
}

/** Pedidos del negociante logueado, opcionalmente filtrados por fecha de envío (shipping_date). */
export async function fetchMyOrders({ shippingDateFrom, shippingDateTo, status, search } = {}) {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  let query = supabase.from('orders').select('*').order('created_at', { ascending: false })
  if (shippingDateFrom) query = query.gte('shipping_date', shippingDateFrom)
  if (shippingDateTo) query = query.lte('shipping_date', shippingDateTo)
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) {
    console.warn('[supabase] No se pudo leer los pedidos:', error.message)
    return []
  }
  const rows = (data || []).map(fromRow)
  return search?.trim() ? rows.filter((o) => orderMatchesSearch(o, search)) : rows
}

export async function updateOrderStatus(id, status) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.from('orders').update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/** Consulta pública de UN pedido por su código de rastreo (sin login, sin exponer datos personales). */
export async function trackOrderByCode(code) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { data, error } = await supabase.rpc('track_order_by_code', { p_code: String(code || '').trim() })
  if (error) return { ok: false, error: error.message }
  const row = data?.[0]
  if (!row) return { ok: false, error: 'No encontramos ningún pedido con ese código.' }
  return {
    ok: true,
    order: {
      trackingCode: row.tracking_code,
      deliveryMethod: row.delivery_method,
      courier: row.courier,
      agencyLabel: row.agency_label,
      shippingDate: row.shipping_date,
      status: row.status,
      createdAt: row.created_at,
      businessName: row.business_name,
    },
  }
}

export const ORDER_STATUS_LABELS = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

/**
 * "Te conocemos": nombre del cliente que ya compró antes con ese documento
 * EN ESTA TIENDA. Va por una función security definer porque `orders` no es
 * legible públicamente, y devuelve solo el nombre (ver README → seguridad).
 * `null` si el documento no está registrado o no se pudo consultar.
 */
export async function lookupCustomerByDni(merchantId, dni) {
  const clean = String(dni || '').trim()
  if (!merchantId || clean.length < 8) return null
  const supabase = await getSupabaseClient()
  if (!supabase) return null
  const { data, error } = await supabase.rpc('lookup_customer_by_dni', {
    p_merchant_id: merchantId,
    p_dni: clean,
  })
  if (error) return null
  return data || null
}
