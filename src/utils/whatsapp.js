import { COURIERS } from '../data/agencies'
import { PAYMENT_LABELS } from '../data/paymentMethods'
import { dateFieldLabel } from './dates'
import { ORDER_STATUS_LABELS } from './orders'

const DELIVERY_TITLES = {
  store: 'NUEVO PEDIDO (RECOJO EN TIENDA)',
  agency: 'NUEVO ENVÍO (AGENCIA)',
  home: 'NUEVO PEDIDO (ENVÍO A DOMICILIO)',
}

const TRACKING_URL = `${typeof window !== 'undefined' ? window.location.host : 'anotat.vercel.app'}/#rastreo`

function line(emoji, label, value) {
  if (!value) return null
  return `${emoji} *${label}:* ${value}`
}

export function buildWhatsAppSummary(form, merchant) {
  const lines = [`📦 *${DELIVERY_TITLES[form.deliveryMethod] ?? 'NUEVO PEDIDO'}*`, '']

  lines.push(line('🔖', 'Código', form.trackingCode))
  lines.push(line('📌', 'Estado', form.trackingCode ? ORDER_STATUS_LABELS[form.orderStatus] ?? 'Pendiente' : null))
  if (form.trackingCode) lines.push('')
  lines.push(line('🏪', 'Tienda', merchant?.businessName))
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
    lines.push(`🔎 Consulta el estado de tu pedido en ${TRACKING_URL} con tu código ${form.trackingCode}`)
  }

  return lines.filter((l) => l !== null).join('\n')
}

export function buildWhatsAppUrl(phoneWithCountryCode, message) {
  const digits = phoneWithCountryCode.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
