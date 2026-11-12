import { COURIERS } from '../data/agencies'
import { PAYMENT_LABELS } from '../data/paymentMethods'
import { dateFieldLabel } from './dates'
import { ORDER_STATUS_LABELS } from './orders'
import { trackingLink } from './tracking'
import { buildWhatsAppUrl } from './whatsappUrl'

export { buildWhatsAppUrl }

const DELIVERY_TITLES = {
  store: 'NUEVO PEDIDO (RECOJO EN TIENDA)',
  agency: 'NUEVO ENVÍO (AGENCIA)',
  home: 'NUEVO PEDIDO (ENVÍO A DOMICILIO)',
}


function line(emoji, label, value) {
  if (!value) return null
  return `${emoji} *${label}:* ${value}`
}

export function buildWhatsAppSummary(form, merchant) {
  const lines = [`📦 *${DELIVERY_TITLES[form.deliveryMethod] ?? 'NUEVO PEDIDO'}*`, '']

  lines.push(line('#️⃣', 'N° de pedido', form.orderNumber != null ? String(form.orderNumber) : null))
  lines.push(line('🔖', 'Código', form.trackingCode))
  lines.push(line('📌', 'Estado', form.trackingCode ? ORDER_STATUS_LABELS[form.orderStatus] ?? 'Pendiente' : null))
  if (form.trackingCode) lines.push('')
  lines.push(line('🏪', 'Tienda', merchant?.businessName))
  lines.push(line('🧑‍💼', 'Vendedor', form.sellerName))
  lines.push(line('👤', 'Cliente', form.fullName))
  lines.push(line('📱', 'WhatsApp', form.phone ? `+51 ${form.phone}` : ''))

  if (form.deliveryMethod === 'agency') {
    lines.push(line('🆔', 'DNI/CE', form.dni))
    lines.push(line('🚚', 'Courier', COURIERS[form.courier]?.label ?? form.agency?.courierLabel ?? form.courier))
    lines.push(line('🏬', 'Agencia', form.agency?.label))
    const addr = [form.agency?.address, form.agency?.reference ? `Ref: ${form.agency.reference}` : null]
      .filter(Boolean)
      .join(', ')
    lines.push(line('📍', 'Dirección', addr))
  }

  if (form.deliveryMethod === 'home') {
    lines.push(line('📍', 'Dirección', form.address))
    lines.push(line('🏙️', 'Ubicación', [form.department, form.provinceDistrict].filter(Boolean).join(' / ')))
    lines.push(line('📝', 'Referencia', form.reference))
    lines.push(line('💳', 'Método de pago', PAYMENT_LABELS[form.paymentMethod] ?? form.paymentMethod))
  }

  lines.push('')
  lines.push(line('📅', dateFieldLabel(form.deliveryMethod), form.shippingDate?.shortLabel))
  lines.push(line('🗒️', 'Notas', form.notes))

  if (form.trackingCode) {
    lines.push('')
    // Link directo: abre el rastreo con el pedido ya consultado.
    lines.push(`🔎 Sigue tu pedido aquí: ${trackingLink(form.trackingCode)}`)
  }

  return lines.filter((l) => l !== null).join('\n')
}

// Aviso que el negociante le manda al cliente cuando cambia el estado de su
// pedido. Es el reemplazo "a un toque" del mensaje que antes escribía a mano.
const STATUS_NEWS = {
  pending: 'Recibimos tu pedido y está *pendiente* de preparación. 📝',
  packed: 'Tu pedido ya está *empacado* y listo para despacho. 📦',
  shipped: 'Tu pedido ya fue *enviado*. 🚚',
  cancelled: 'Tu pedido fue *cancelado*. Si crees que es un error, escríbenos. 🙏',
}

export function buildStatusMessage(order, merchant) {
  const n = order.dailyNumber ?? order.orderNumber
  const firstName = order.customerName ? ` ${String(order.customerName).trim().split(/\s+/)[0]}` : ''
  const lines = [
    `Hola${firstName} 👋`,
    STATUS_NEWS[order.status] || 'Tu pedido fue actualizado.',
    '',
    line('🏪', 'Tienda', merchant?.businessName),
    n != null ? line('#️⃣', 'N° de pedido', String(n)) : null,
    line('🔖', 'Código', order.trackingCode),
  ]
  if (order.status === 'shipped' && order.deliveryMethod === 'agency') {
    lines.push(line('🚚', 'Courier', COURIERS[order.courier]?.label ?? order.courier))
    lines.push(line('🏬', 'Agencia', order.agencyLabel))
  }
  if (order.trackingCode) {
    lines.push('')
    lines.push(`🔎 Sigue tu pedido aquí: ${trackingLink(order.trackingCode)}`)
  }
  return lines.filter((l) => l !== null).join('\n')
}

/** Link de WhatsApp al CLIENTE con el aviso de su estado (null si no hay teléfono). */
export function customerStatusWhatsAppUrl(order, merchant) {
  const digits = String(order.customerPhone || '').replace(/\D/g, '')
  if (!digits) return null
  const withCc = digits.length <= 9 ? `51${digits}` : digits
  return buildWhatsAppUrl(withCc, buildStatusMessage(order, merchant))
}
