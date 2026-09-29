import { ORDER_STATUS_LABELS } from './orders'
import { deliveryMethodLabel } from './orderSummary'

function stamp() {
  return new Date().toISOString().slice(0, 10)
}

/** Exporta pedidos a un .xlsx descargable. Carga `xlsx` de forma dinámica —
 * igual que en AgencyManager— para que no viaje en el bundle principal. */
export async function exportOrdersToExcel(orders, filename = 'envios', { dated = true } = {}) {
  const XLSX = await import('xlsx')
  const rows = orders.map((o) => ({
    'Código': o.trackingCode || '',
    'N° pedido': o.id,
    Cliente: o.customerName,
    WhatsApp: o.customerPhone,
    'DNI/CE': o.customerDni || '',
    'Método': deliveryMethodLabel(o),
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
  XLSX.writeFile(book, dated ? `${filename}-${stamp()}.xlsx` : `${filename}.xlsx`)
}

/** Exporta pedidos a un PDF (A4 horizontal, una fila por pedido). `jspdf`
 * también se carga bajo demanda. */
export async function exportOrdersToPdf(orders, { businessName, filename = 'envios', title: customTitle, period, dated = true } = {}) {
  const [{ jsPDF }, { autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')])
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const base = customTitle || 'Envíos'
  const title = businessName ? `${base} — ${businessName}` : base

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(11, 31, 58)
  doc.text(title, 40, 42)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(91, 107, 128)
  doc.text(
    [period, `${orders.length} pedido${orders.length === 1 ? '' : 's'}`, `generado el ${new Date().toLocaleString('es-PE')}`]
      .filter(Boolean)
      .join(' · '),
    40,
    58,
  )

  autoTable(doc, {
    startY: 72,
    head: [['Código', 'Cliente', 'WhatsApp', 'DNI/CE', 'Método', 'Agencia / Dirección', 'Fecha envío', 'Estado']],
    body: orders.map((o) => [
      o.trackingCode || '',
      o.customerName || '',
      o.customerPhone || '',
      o.customerDni || '',
      deliveryMethodLabel(o),
      [o.agencyLabel, o.address || o.agencyAddress].filter(Boolean).join(' — '),
      o.shippingDate || '',
      ORDER_STATUS_LABELS[o.status] || o.status || '',
    ]),
    styles: { font: 'helvetica', fontSize: 8.5, cellPadding: 5, textColor: [30, 41, 59], overflow: 'linebreak' },
    headStyles: { fillColor: [11, 31, 58], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: { 0: { font: 'courier', fontStyle: 'bold', textColor: [161, 98, 7] }, 5: { cellWidth: 190 } },
    margin: { left: 40, right: 40 },
    didDrawPage: () => {
      const { width, height } = doc.internal.pageSize
      doc.setFontSize(8)
      doc.setTextColor(140)
      doc.text(`ANOTA-T · página ${doc.getNumberOfPages()}`, width - 40, height - 20, { align: 'right' })
    },
  })

  doc.save(dated ? `${filename}-${stamp()}.pdf` : `${filename}.pdf`)
}
