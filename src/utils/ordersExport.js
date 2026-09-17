import { ORDER_STATUS_LABELS } from './orders'

/** Exporta pedidos a un .xlsx descargable. Carga `xlsx` de forma dinámica —
 * igual que en AgencyManager— para que no viaje en el bundle principal. */
export async function exportOrdersToExcel(orders, filename = 'envios') {
  const XLSX = await import('xlsx')
  const rows = orders.map((o) => ({
    'N° pedido': o.id,
    Cliente: o.customerName,
    WhatsApp: o.customerPhone,
    'Método': o.deliveryMethod,
    Courier: o.courier || '',
    Agencia: o.agencyLabel || '',
    Dirección: o.address || o.agencyAddress || '',
    'Fecha de envío': o.shippingDate || '',
    Estado: ORDER_STATUS_LABELS[o.status] || o.status,
    'Creado': o.createdAt,
  }))
  const sheet = XLSX.utils.json_to_sheet(rows)
  const book = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(book, sheet, 'Envíos')
  XLSX.writeFile(book, `${filename}-${new Date().toISOString().slice(0, 10)}.xlsx`)
}
