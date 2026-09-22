import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { copyText } from '../../utils/clipboard'
import { orderSummarySections, orderSummaryText } from '../../utils/orderSummary'
import { IconCheck, IconCopy, IconX } from '../icons'

function IconPrinter({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="7" rx="1" />
    </svg>
  )
}

/**
 * Todo lo que el cliente final escribió en el formulario, en una sola
 * vista: para leerlo, copiarlo y pegarlo donde haga falta, o imprimirlo.
 *
 * La copia para imprimir va en un portal directo a <body>: Chromium NO
 * imprime el contenido dentro de un elemento `position: fixed` (el overlay
 * del modal), así que imprimir la tarjeta en su sitio salía en blanco. El
 * CSS de `#order-summary-print` (en index.css) esconde el resto al
 * imprimir y muestra solo esa copia.
 */
export default function OrderSummaryModal({ order, onClose }) {
  const [copied, setCopied] = useState(false)
  const sections = orderSummarySections(order)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleCopy() {
    copyText(orderSummaryText(order)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/60 p-0 sm:items-center sm:p-6">
      <button type="button" aria-label="Cerrar" onClick={onClose} className="absolute inset-0 print:hidden" />

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-start gap-3 border-b border-slate-200 px-4 py-3.5 sm:px-5 print:hidden">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-navy sm:text-base">Resumen del pedido</p>
            <p className="truncate font-mono text-xs text-brand-dark">{order.trackingCode}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <SummaryBody sections={sections} />
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 bg-surface px-4 py-3 sm:flex-row sm:px-5 print:hidden">
          <button type="button" onClick={handleCopy} className="btn btn-primary w-full sm:w-auto">
            {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
            {copied ? 'Copiado' : 'Copiar texto'}
          </button>
          <button type="button" onClick={() => window.print()} className="btn btn-outline w-full sm:w-auto">
            <IconPrinter className="h-4 w-4" /> Imprimir
          </button>
        </div>
      </div>
    </div>

    {createPortal(
      <div id="order-summary-print">
        <p className="mb-4 text-lg font-bold">Pedido {order.trackingCode}</p>
        <SummaryBody sections={sections} />
      </div>,
      document.body,
    )}
    </>
  )
}

function SummaryBody({ sections }) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <section key={section.title}>
          <p className="text-[11px] font-bold tracking-wide text-muted uppercase">{section.title}</p>
          <dl className="mt-1.5 space-y-1.5">
            {section.fields.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="shrink-0 text-xs text-muted sm:w-44">{label}</dt>
                <dd className="min-w-0 text-sm break-words text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
