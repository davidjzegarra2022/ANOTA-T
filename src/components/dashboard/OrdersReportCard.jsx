import { useEffect, useMemo, useRef, useState } from 'react'
import { ORDER_STATUS_LABELS } from '../../utils/orders'
import { deliveryMethodLabel } from '../../utils/orderSummary'
import { exportOrdersToExcel, exportOrdersToPdf } from '../../utils/ordersExport'
import { IconChevronLeft, IconChevronRight, IconDownload, IconFile } from '../icons'
import { isShalomOrder } from '../../utils/shalomExport'
import ShalomExportDialog from './ShalomExportDialog'

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/** Rango [desde, hasta) del periodo que contiene `anchor`. Semana = lunes a domingo. */
function periodRange(mode, anchor) {
  if (mode === 'month') {
    const from = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
    return { from, to: new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1) }
  }
  const from = startOfDay(anchor)
  from.setDate(from.getDate() - ((from.getDay() + 6) % 7))
  const to = new Date(from)
  to.setDate(to.getDate() + 7)
  return { from, to }
}

function shiftAnchor(mode, anchor, delta) {
  const d = new Date(anchor)
  if (mode === 'month') return new Date(d.getFullYear(), d.getMonth() + delta, 1)
  d.setDate(d.getDate() + 7 * delta)
  return d
}

function fmtShort(d) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`
}

function periodLabel(mode, { from, to }) {
  if (mode === 'month') return `${MONTHS[from.getMonth()][0].toUpperCase()}${MONTHS[from.getMonth()].slice(1)} ${from.getFullYear()}`
  const last = new Date(to)
  last.setDate(last.getDate() - 1)
  return `Semana del ${fmtShort(from)} al ${fmtShort(last)} ${last.getFullYear()}`
}

function orderDate(order, basis) {
  if (basis === 'shipping') return order.shippingDate ? new Date(order.shippingDate + 'T00:00:00') : null
  return order.createdAt ? new Date(order.createdAt) : null
}

function Segmented({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-surface p-1">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${value === v ? 'bg-navy text-white shadow' : 'text-muted hover:text-navy'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/**
 * Reporte de pedidos por semana específica o mes completo, para verlos en
 * pantalla y descargarlos en Excel o PDF. Trabaja sobre los pedidos que
 * Panel Pro ya cargó (no hace otra consulta).
 */
export default function OrdersReportCard({ orders, merchant }) {
  const [mode, setMode] = useState('week')
  const [basis, setBasis] = useState('created')
  const [anchor, setAnchor] = useState(() => new Date())
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

  const range = useMemo(() => periodRange(mode, anchor), [mode, anchor])
  const label = periodLabel(mode, range)
  const isCurrent = range.from <= new Date() && new Date() < range.to

  const rows = useMemo(
    () =>
      orders
        .filter((o) => {
          const d = orderDate(o, basis)
          return d && d >= range.from && d < range.to
        })
        .sort((a, b) => orderDate(a, basis) - orderDate(b, basis)),
    [orders, basis, range],
  )

  const byStatus = useMemo(() => {
    const counts = {}
    for (const o of rows) counts[o.status] = (counts[o.status] || 0) + 1
    return counts
  }, [rows])

  async function handleExport(kind) {
    const slug = mode === 'month' ? `${range.from.getFullYear()}-${String(range.from.getMonth() + 1).padStart(2, '0')}` : `semana-${range.from.toISOString().slice(0, 10)}`
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
      <p className="text-sm font-bold text-navy">Reporte de pedidos</p>
      <p className="mt-1 text-xs text-muted">Visualiza los pedidos de una semana específica o de un mes completo y descárgalos en Excel o PDF.</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Segmented value={mode} onChange={(v) => { setMode(v); setAnchor(new Date()) }} options={[['week', 'Semana'], ['month', 'Mes']]} />
        <Segmented value={basis} onChange={setBasis} options={[['created', 'Fecha de registro'], ['shipping', 'Fecha de envío']]} />
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5">
        <button type="button" aria-label="Periodo anterior" onClick={() => setAnchor((a) => shiftAnchor(mode, a, -1))} className="rounded-md p-1.5 text-muted hover:bg-surface">
          <IconChevronLeft className="h-4 w-4" />
        </button>
        <p className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-ink">{label}</p>
        {!isCurrent && (
          <button type="button" onClick={() => setAnchor(new Date())} className="rounded-md px-2 py-1 text-xs font-bold text-brand-dark hover:bg-surface">
            Hoy
          </button>
        )}
        <button type="button" aria-label="Periodo siguiente" onClick={() => setAnchor((a) => shiftAnchor(mode, a, 1))} className="rounded-md p-1.5 text-muted hover:bg-surface">
          <IconChevronRight className="h-4 w-4" />
        </button>
      </div>

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
          <table className="w-full min-w-[560px] text-left text-xs">
            <thead className="sticky top-0 bg-surface text-[10.5px] tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-semibold">Código</th>
                <th className="px-3 py-2 font-semibold">Cliente</th>
                <th className="px-3 py-2 font-semibold">Método</th>
                <th className="px-3 py-2 font-semibold">{basis === 'shipping' ? 'Fecha envío' : 'Registrado'}</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-ink">
              {rows.map((o) => (
                <tr key={o.id}>
                  <td className="px-3 py-2 font-mono whitespace-nowrap text-brand-dark">{o.trackingCode}</td>
                  <td className="px-3 py-2">{o.customerName}</td>
                  <td className="px-3 py-2">{deliveryMethodLabel(o)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {basis === 'shipping' ? o.shippingDate : new Date(o.createdAt).toLocaleDateString('es-PE')}
                  </td>
                  <td className="px-3 py-2">{ORDER_STATUS_LABELS[o.status] || o.status}</td>
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
