// Pedidos persistidos en Supabase (tabla `orders`). Antes ANOTA-T solo
// armaba un link de WhatsApp y no guardaba nada; ahora cada pedido que
// llena un cliente final queda registrado y ligado al negociante dueño del
// link — es lo que alimenta Envíos, Clientes y Panel Pro.
import { getSupabaseClient } from './supabaseClient'

function fromRow(row) {
  return {
    id: row.id,
    trackingCode: row.tracking_code,
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

/** Crea un pedido — lo llama el formulario público, sin sesión (cliente final). */
export async function createOrder(merchantId, form) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { error } = await supabase.from('orders').insert({
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
  })
  if (error) {
    console.warn('[supabase] No se pudo guardar el pedido:', error.message)
    return { ok: false, error: error.message }
  }
  return { ok: true }
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
  let rows = (data || []).map(fromRow)
  if (search?.trim()) {
    const q = search.trim().toLowerCase()
    rows = rows.filter(
      (o) =>
        String(o.id).includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.customerPhone?.toLowerCase().includes(q),
    )
  }
  return rows
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
