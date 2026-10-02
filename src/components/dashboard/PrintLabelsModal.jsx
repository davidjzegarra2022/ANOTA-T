import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { COURIERS } from '../../data/agencies'
import { PAYMENT_LABELS } from '../../data/paymentMethods'
import { IconX } from '../icons'

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

function fmtShippingDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  return `${WEEKDAYS[d.getDay()]} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

function courierName(order) {
  if (order.deliveryMethod === 'store') return 'RETIRO EN TIENDA'
  if (order.deliveryMethod === 'home') return 'DELIVERY'
  return (COURIERS[order.courier]?.label || order.courier || 'AGENCIA').toUpperCase()
}

function IconPrinter({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="7" rx="1" />
    </svg>
  )
}

/** Una etiqueta de envío en HTML (lo que sale en papel). */
function Label({ order, merchant }) {
  let destino = null
  let lugar = null
  let direccion = null
  if (order.deliveryMethod === 'agency') {
    destino = order.agencyLabel
    direccion = [order.agencyAddress, order.agencyReference ? `Ref. ${order.agencyReference}` : null].filter(Boolean).join(', ')
  } else if (order.deliveryMethod === 'home') {
    destino = [order.department, order.provinceDistrict].filter(Boolean).join(' / ')
    lugar = order.address
    direccion = [order.reference ? `Ref. ${order.reference}` : null, order.paymentMethod ? `Pago: ${PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}` : null]
      .filter(Boolean)
      .join(' · ')
  } else {
    lugar = 'El cliente recoge su pedido en tienda'
  }

  return (
    <article className="lbl">
      <header className="lbl-head">
        <span className="lbl-key">Remitente</span>
        <span className="lbl-shop">{merchant?.businessName}</span>
      </header>
      <div className="lbl-body">
        <p className="lbl-key">Destinatario:</p>
        <p className="lbl-name">{order.customerName}</p>
        <p className="lbl-ids">
          {order.customerDni && <span>N°DOC: {order.customerDni}</span>}
          {order.customerPhone && <span>Cel: {order.customerPhone}</span>}
        </p>
        {(destino || lugar || direccion) && <p className="lbl-key">Destino:</p>}
        {destino && <p className="lbl-text">{destino}</p>}
        {lugar && <p className="lbl-place">{lugar}</p>}
        {direccion && <p className="lbl-small">{direccion}</p>}
        {order.notes && <p className="lbl-small">Nota: {order.notes}</p>}
      </div>
      <footer className="lbl-foot">
        <span className="lbl-courier">{courierName(order)}</span>
        <span className="lbl-code">
          {order.orderNumber != null ? `#${order.orderNumber} · ` : ''}
          {order.trackingCode}
        </span>
        <span className="lbl-date">{fmtShippingDate(order.shippingDate)}</span>
      </footer>
    </article>
  )
}

function OptionCard({ active, onClick, label, hint, badge, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 p-3 text-center transition ${
        active ? 'border-brand bg-amber-50 text-navy' : 'border-slate-200 bg-white text-ink hover:border-slate-300'
      }`}
    >
      {children}
      <span className="text-[13px] leading-tight font-bold">{label}</span>
      {hint && <span className="text-[11px] leading-snug text-muted">{hint}</span>}
      {badge && <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold text-brand">★ {badge}</span>}
    </button>
  )
}

// Formatos de impresión. El elegido queda como predeterminado en este
// navegador para la próxima vez.
export const PRINT_FORMATS = {
  thermal: { label: 'Térmica 10×15', hint: 'Impresora de stickers · 1 etiqueta por página' },
  a4x2: { label: 'A4 · 2 columnas', hint: 'Hasta 6 etiquetas por hoja' },
  a4x1: { label: 'A4 · 1 columna', hint: 'Hasta 4 etiquetas por hoja' },
}
const FORMAT_KEY = 'anotat-print-format'

export function readPrintFormat() {
  try {
    const v = localStorage.getItem(FORMAT_KEY)
    return v in PRINT_FORMATS ? v : 'a4x2'
  } catch {
    return 'a4x2'
  }
}

export function savePrintFormat(value) {
  try {
    localStorage.setItem(FORMAT_KEY, value)
  } catch {
    // modo privado: solo no se recuerda
  }
}

/** Regla @page de cada formato (la térmica es una hoja de 10×15 cm por etiqueta). */
export function pageRule(format, orientation = 'portrait') {
  return format === 'thermal' ? '@page { size: 100mm 150mm; margin: 4mm; }' : `@page { size: A4 ${orientation}; margin: 10mm; }`
}

/**
 * "Formato de impresión" de etiquetas: térmica 10×15 (una por página, para
 * impresoras de stickers) o A4 a 1 o 2 columnas en vertical u horizontal,
 * y qué pedidos imprimir (varios a la vez).
 *
 * Igual que el resumen del pedido, la copia que se imprime va en un portal
 * directo a <body> (`.print-root`): Chromium no imprime lo que está dentro
 * de un `position: fixed`. El @page con la orientación elegida se inyecta
 * junto con esa copia.
 */
export default function PrintLabelsModal({ orders, initialSelected, merchant, onClose }) {
  const [format, setFormatState] = useState(readPrintFormat)
  const [orientation, setOrientation] = useState('portrait')
  const isA4 = format !== 'thermal'

  function setFormat(value) {
    setFormatState(value)
    savePrintFormat(value)
  }
  const [selected, setSelected] = useState(() => new Set(initialSelected?.length ? initialSelected : orders.map((o) => o.id)))

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const toPrint = orders.filter((o) => selected.has(o.id))
  const allSelected = toPrint.length === orders.length

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-6">
        <button type="button" aria-label="Cerrar" onClick={onClose} className="absolute inset-0" />

        <div role="dialog" aria-modal="true" aria-labelledby="print-title" className="relative flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 z-10 rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy"
          >
            <IconX className="h-5 w-5" />
          </button>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-6 pb-4 sm:px-7">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-brand">
                <IconPrinter className="h-7 w-7" />
              </span>
              <h2 id="print-title" className="mt-3 text-lg font-bold text-navy">Formato de Impresión</h2>
              <p className="mt-1 text-[13px] text-muted">
                Elige el formato. Lo que elijas queda como tu <b>predeterminado</b> para la próxima vez.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              <OptionCard active={format === 'thermal'} onClick={() => setFormat('thermal')} label={PRINT_FORMATS.thermal.label} hint={PRINT_FORMATS.thermal.hint} badge={format === 'thermal' ? 'Predeterminado' : null}>
                <span className="flex h-14 w-9 flex-col justify-between rounded-md border-2 border-slate-400 bg-white p-1">
                  <span className="space-y-0.5">
                    <span className="block h-1 rounded bg-slate-300" />
                    <span className="block h-1 rounded bg-slate-300" />
                    <span className="block h-1 w-2/3 rounded bg-slate-300" />
                  </span>
                  <span className="block h-2 rounded bg-slate-400" />
                </span>
              </OptionCard>
              <OptionCard active={format === 'a4x2'} onClick={() => setFormat('a4x2')} label={PRINT_FORMATS.a4x2.label} hint={PRINT_FORMATS.a4x2.hint} badge={format === 'a4x2' ? 'Predeterminado' : null}>
                <span className="grid h-14 w-11 grid-cols-2 gap-0.5 rounded-md border-2 border-slate-400 bg-white p-1">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="rounded-sm bg-slate-300" />
                  ))}
                </span>
              </OptionCard>
              <OptionCard active={format === 'a4x1'} onClick={() => setFormat('a4x1')} label={PRINT_FORMATS.a4x1.label} hint={PRINT_FORMATS.a4x1.hint} badge={format === 'a4x1' ? 'Predeterminado' : null}>
                <span className="grid h-14 w-11 grid-rows-4 gap-0.5 rounded-md border-2 border-slate-400 bg-white p-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="rounded-sm bg-slate-300" />
                  ))}
                </span>
              </OptionCard>
            </div>

            {isA4 && (
              <>
                <p className="mt-5 text-[11px] font-bold tracking-wide text-muted uppercase">Orientación de la hoja</p>
                <div className="mt-2 flex gap-3">
                  <OptionCard active={orientation === 'portrait'} onClick={() => setOrientation('portrait')} label="Vertical">
                    <span className="h-12 w-9 rounded-md border-2 border-slate-400 bg-slate-100" />
                  </OptionCard>
                  <OptionCard active={orientation === 'landscape'} onClick={() => setOrientation('landscape')} label="Horizontal">
                    <span className="mt-1.5 h-9 w-12 rounded-md border-2 border-slate-400 bg-slate-100" />
                  </OptionCard>
                </div>
              </>
            )}

            <div className="mt-5 flex items-center justify-between">
              <p className="text-[11px] font-bold tracking-wide text-muted uppercase">Pedidos a imprimir</p>
              <label className="flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-ink select-none">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() => setSelected(allSelected ? new Set() : new Set(orders.map((o) => o.id)))}
                  className="h-4 w-4 cursor-pointer accent-[#a16207]"
                />
                Todo
              </label>
            </div>
            <ul className="mt-2 max-h-48 divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200">
              {orders.map((o) => (
                <li key={o.id}>
                  <label className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-surface">
                    <input
                      type="checkbox"
                      checked={selected.has(o.id)}
                      onChange={() => toggle(o.id)}
                      className="h-4 w-4 shrink-0 cursor-pointer accent-[#a16207]"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-ink">{o.customerName}</span>
                      <span className="block truncate font-mono text-[11px] text-brand-dark">{o.trackingCode}</span>
                    </span>
                    <span className="shrink-0 text-[11px] text-muted">{fmtShippingDate(o.shippingDate)}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 border-t border-slate-200 bg-surface px-5 py-3 sm:px-7">
            <button type="button" onClick={onClose} className="btn btn-outline flex-1 sm:flex-none">
              Cancelar
            </button>
            <button type="button" onClick={() => window.print()} disabled={!toPrint.length} className="btn btn-primary flex-1">
              <IconPrinter className="h-4 w-4" />
              Imprimir {toPrint.length} etiqueta{toPrint.length === 1 ? '' : 's'}
            </button>
          </div>
        </div>
      </div>

      {createPortal(
        <div className="print-root labels-print">
          <style>{pageRule(format, orientation)}</style>
          <div className={`lbl-grid ${format === 'thermal' ? 'lbl-thermal' : format === 'a4x1' ? 'lbl-cols-1' : 'lbl-cols-2'}`}>
            {toPrint.map((o) => (
              <Label key={o.id} order={o} merchant={merchant} />
            ))}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
