import { ORDER_STATUS_LABELS } from '../utils/orders'
import { deliveryMethodLabel } from '../utils/orderSummary'
import { trackingHeadline, trackingSteps } from '../utils/tracking'
import { IconCheck, IconX } from './icons'

function fmtDateTime(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('es-PE', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'America/Lima' })
  } catch {
    return ''
  }
}

function fmtDay(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return iso || ''
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
}

/**
 * Resultado del rastreo: estado en grande, línea de tiempo del envío y los
 * datos del pedido. Pensado para que el cliente final entienda de un
 * vistazo en qué va su pedido y qué sigue.
 */
export default function TrackingResult({ order }) {
  const head = trackingHeadline(order)
  const cancelled = order.status === 'cancelled'
  const steps = trackingSteps(order)

  return (
    <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white text-left text-ink shadow-xl">
      <div className={`flex items-start gap-3 px-5 py-4 ${cancelled ? 'bg-red-50' : 'bg-emerald-50'}`}>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${cancelled ? 'bg-red-600' : 'bg-emerald-600'}`}
          aria-hidden="true"
        >
          {cancelled ? <IconX className="h-5 w-5" /> : <IconCheck className="h-5 w-5" />}
        </span>
        <div className="min-w-0">
          <p className={`text-base font-bold ${cancelled ? 'text-red-700' : 'text-emerald-700'}`}>{head.title}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-ink">{head.text}</p>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-wide text-muted uppercase">{order.businessName}</p>
            <p className="tracking-code font-mono text-sm font-bold">{order.trackingCode}</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${cancelled ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
            {ORDER_STATUS_LABELS[order.status] ?? order.status}
          </span>
        </div>

        {!cancelled && (
          <ol className="mt-5" aria-label="Avance de tu envío">
            {steps.map((s, i) => {
              const isLast = i === steps.length - 1
              return (
                <li key={s.id} className="relative flex gap-3 pb-5 last:pb-0">
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`absolute top-8 bottom-0 left-[15px] w-0.5 ${s.state === 'done' ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    />
                  )}
                  <span
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      s.state === 'done'
                        ? 'bg-emerald-600 text-white'
                        : s.state === 'current'
                          ? 'bg-brand text-navy ring-4 ring-brand/30'
                          : 'border-2 border-slate-200 bg-white text-muted'
                    }`}
                  >
                    {s.state === 'done' ? <IconCheck className="h-4 w-4" /> : i + 1}
                    {s.state === 'current' && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-brand/40" />}
                  </span>
                  <div className="min-w-0 pt-1">
                    <p className={`text-sm font-bold ${s.state === 'todo' ? 'text-muted' : 'text-navy'}`}>
                      {s.title}
                      {s.badge && <span className="ml-2 rounded-full bg-brand/20 px-2 py-0.5 tracking-code text-[10px] font-extrabold uppercase">{s.badge}</span>}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-muted">
                      {s.id === 'registered' && order.createdAt ? `${fmtDateTime(order.createdAt)} · ` : ''}
                      {s.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        )}

        <dl className="mt-5 grid grid-cols-1 gap-2 rounded-xl bg-surface p-3.5 text-[13px] sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold text-muted uppercase">Entrega</dt>
            <dd className="font-semibold text-ink">{deliveryMethodLabel(order)}</dd>
          </div>
          {order.shippingDate && (
            <div>
              <dt className="text-[11px] font-semibold text-muted uppercase">{order.deliveryMethod === 'store' ? 'Fecha de entrega' : 'Fecha de envío'}</dt>
              <dd className="font-semibold text-ink first-letter:uppercase">{fmtDay(order.shippingDate)}</dd>
            </div>
          )}
          {order.agencyLabel && (
            <div className="sm:col-span-2">
              <dt className="text-[11px] font-semibold text-muted uppercase">Agencia</dt>
              <dd className="font-semibold break-words text-ink">{order.agencyLabel}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}
