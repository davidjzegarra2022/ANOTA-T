// Resumen de un pedido tal como lo llenó el cliente final: se usa para
// mostrarlo en pantalla, copiarlo al portapapeles y mandarlo a imprimir.
// Una sola fuente de verdad para los tres, así no se desincronizan.
import { ORDER_STATUS_LABELS } from './orders'

const DELIVERY_LABELS = {
  store: 'Retiro en tienda',
  home: 'Envío a domicilio',
  agency: 'Retiro en agencia',
}

export function deliveryMethodLabel(order) {
  const base = DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod || '—'
  if (order.deliveryMethod === 'agency' && order.courier) {
    return `${base} ${order.courier}`
  }
  return base
}

function fmtDate(iso) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

/**
 * Secciones del resumen: [{ title, fields: [[etiqueta, valor], …] }].
 * Se omiten los campos vacíos — el formulario cambia según el método de
 * entrega, así que la mitad viene en null en cualquier pedido.
 */
export function orderSummarySections(order) {
  if (!order) return []

  const sections = [
    {
      title: 'Pedido',
      fields: [
        ['Código', order.trackingCode],
        ['Estado', ORDER_STATUS_LABELS[order.status] || order.status],
        ['Fecha de envío', order.shippingDate],
        ['Recibido', fmtDate(order.createdAt)],
      ],
    },
    {
      title: 'Cliente',
      fields: [
        ['Nombre', order.customerName],
        ['WhatsApp', order.customerPhone],
        ['DNI', order.customerDni],
      ],
    },
    {
      title: 'Entrega',
      fields: [
        ['Método', deliveryMethodLabel(order)],
        ['Courier', order.courier],
        ['Agencia', order.agencyLabel],
        ['Dirección de la agencia', order.agencyAddress],
        ['Referencia de la agencia', order.agencyReference],
        ['Dirección', order.address],
        ['Departamento', order.department],
        ['Provincia / Distrito', order.provinceDistrict],
        ['Referencia', order.reference],
      ],
    },
    {
      title: 'Pago y notas',
      fields: [
        ['Método de pago', order.paymentMethod],
        ['Notas del cliente', order.notes],
      ],
    },
  ]

  return sections
    .map((s) => ({ ...s, fields: s.fields.filter(([, value]) => value != null && String(value).trim() !== '') }))
    .filter((s) => s.fields.length > 0)
}

/** El mismo resumen en texto plano, listo para pegar en WhatsApp o en una guía. */
export function orderSummaryText(order) {
  const sections = orderSummarySections(order)
  if (!sections.length) return ''
  const blocks = sections.map(
    (s) => `${s.title.toUpperCase()}\n${s.fields.map(([label, value]) => `${label}: ${value}`).join('\n')}`,
  )
  return blocks.join('\n\n')
}
