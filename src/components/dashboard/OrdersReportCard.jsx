import { useEffect, useMemo, useRef, useState } from 'react'
import { ORDER_STATUS_LABELS } from '../../utils/orders'
import { deliveryMethodLabel } from '../../utils/orderSummary'
import { exportOrdersToExcel, exportOrdersToPdf } from '../../utils/ordersExport'
import { IconDownload, IconFile } from '../icons'
import { isShalomOrder } from '../../utils/shalomExport'
import ShalomExportDialog from './ShalomExportDialog'

/**
 * Lista de pedidos del periodo elegido arriba en Panel Pro (día, semana o
 * mes), con su resumen y la descarga en Excel o PDF. No hace otra consulta:
 * recibe los pedidos ya filtrados.
 */
export default function OrdersReportCard({ orders, rows, label, slug, basis, merchant, onOpenSummary }) {
  const [exporting, setExporting] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shalomOpen, setShalomOpen] = useState(false)
  const menuRef = useRef(null)

  // El menú de Excel se cierra al tocar fuera o con Escape.
  useEffect(() => {
    if (!menuOpen) return undefined
    function onDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  async function handleGeneralExcel() {
    setMenuOpen(false)
    setExporting('excel')
    try {
      // Todo el historial, del más antiguo al más reciente.
      const history = [...orders].sort((a, b) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0))
      await exportOrdersToExcel(history, 'historial-pedidos')
    } finally {
      setExporting(null)
    }
  }

  const byStatus = useMemo(() => {
    const counts = {}
    for (const o of rows) counts[o.status] = (counts[o.status] || 0) + 1
    return counts
  }, [rows])

  async function handleExport(kind) {
    const period = `${label} (${basis === 'shipping' ? 'fecha de envío' : 'fecha de registro'})`
    setExporting(kind)
    try {
      if (kind === 'pdf') await exportOrdersToPdf(rows, { businessName: merchant?.businessName, title: 'Reporte de pedidos', period, filename: `pedidos-${slug}`, dated: false })
      else await exportOrdersToExcel(rows, `pedidos-${slug}`, { dated: false })
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="card p-4">
      <p className="text-sm font-bold text-navy">Pedidos del periodo</p>
      <p className="mt-1 text-xs text-muted">{label} · descárgalos en Excel o PDF, o abre el resumen de cada uno.</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-sm font-bold text-navy">{rows.length} pedido{rows.length === 1 ? '' : 's'}</span>
        {Object.entries(ORDER_STATUS_LABELS).map(([status, name]) =>
          byStatus[status] ? (
            <span key={status} className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-semibold text-ink">
              {name}: {byStatus[status]}
            </span>
          ) : null,
        )}
      </div>

      {rows.length === 0 ? (
        <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-muted">No hay pedidos en este periodo.</p>
      ) : (
        <div className="mt-3 max-h-80 overflow-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="sticky top-0 bg-surface text-[10.5px] tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-semibold">N°</th>
                <th className="px-3 py-2 font-semibold">Código</th>
                <th className="px-3 py-2 font-semibold">Cliente</th>
                <th className="px-3 py-2 font-semibold">Método</th>
                <th className="px-3 py-2 font-semibold">{basis === 'shipping' ? 'Fecha envío' : 'Registrado'}</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="px-3 py-2"><span className="sr-only">Resumen</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-ink">
              {rows.map((o) => (
                <tr key={o.id}>
                  <td className="px-3 py-2 font-bold whitespace-nowrap text-navy">{o.orderNumber != null ? `#${o.orderNumber}` : '—'}</td>
                  <td className="px-3 py-2 font-mono whitespace-nowrap text-brand-dark">{o.trackingCode}</td>
                  <td className="px-3 py-2">{o.customerName}</td>
                  <td className="px-3 py-2">{deliveryMethodLabel(o)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {basis === 'shipping' ? o.shippingDate : new Date(o.createdAt).toLocaleDateString('es-PE')}
                  </td>
                  <td className="px-3 py-2">{ORDER_STATUS_LABELS[o.status] || o.status}</td>
                  <td className="px-2 py-1.5 text-right">
                    <button type="button" onClick={() => onOpenSummary(o)} className="btn btn-outline !px-2.5 !py-1 text-[11px]">
                      Resumen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <div ref={menuRef} className="relative flex-1 sm:flex-none">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            disabled={!orders.length || Boolean(exporting)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="btn btn-outline w-full"
          >
            <IconDownload className="h-4 w-4" /> {exporting === 'excel' ? 'Exportando…' : 'Excel'} <span aria-hidden="true">▾</span>
          </button>
          {menuOpen && (
            <div role="menu" className="animate-fade-in-up absolute bottom-full left-0 z-30 mb-2 w-72 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl">
              <button
                type="button"
                role="menuitem"
                disabled={!rows.length}
                onClick={() => {
                  setMenuOpen(false)
                  handleExport('excel')
                }}
                className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-surface disabled:opacity-50"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-800">P</span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-navy">Este periodo</span>
                  <span className="block text-xs text-muted">{label} · {rows.length}</span>
                </span>
              </button>
              <button type="button" role="menuitem" onClick={handleGeneralExcel} className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-surface">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">X</span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-navy">General</span>
                  <span className="block text-xs text-muted">Todo el historial de pedidos · {orders.length}</span>
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  setShalomOpen(true)
                }}
                className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-surface"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-sm font-bold text-red-700">S</span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-navy">Formato Shalom</span>
                  <span className="block text-xs text-muted">Carga masiva Shalom Pro · {orders.filter(isShalomOrder).length} pedidos</span>
                </span>
              </button>
            </div>
          )}
        </div>
        <button type="button" onClick={() => handleExport('pdf')} disabled={!rows.length || Boolean(exporting)} className="btn btn-outline flex-1 sm:flex-none">
          <IconFile className="h-4 w-4" /> {exporting === 'pdf' ? 'Exportando…' : 'PDF'}
        </button>
      </div>

      {shalomOpen && (
        <ShalomExportDialog merchant={merchant} periodOrders={rows} periodLabel={label} allOrders={orders} onClose={() => setShalomOpen(false)} />
      )}
    </div>
  )
}
