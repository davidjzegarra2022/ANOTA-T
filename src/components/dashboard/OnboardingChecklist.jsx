import { useEffect, useState } from 'react'
import { copyText } from '../../utils/clipboard'
import { storeShareLink } from '../../utils/logoImage'
import { loadOnboardingFlags, markOnboarding, onboardingSteps, onOnboardingChange } from '../../utils/onboarding'
import { hasAnyOrder } from '../../utils/orders'
import { buildWhatsAppUrl } from '../../utils/whatsapp'
import { IconCheck, IconCopy, IconWhatsapp, IconX } from '../icons'

/**
 * Guía de primeros pasos arriba del panel. Muestra solo lo necesario para
 * empezar a recibir pedidos, resalta el paso que toca ahora (botón amarillo)
 * y desaparece sola cuando todo está hecho o si el negociante la cierra.
 */
export default function OnboardingChecklist({ merchant, proEnabled, onGoTo }) {
  const [flags, setFlags] = useState(() => loadOnboardingFlags(merchant.id))
  const [hasOrders, setHasOrders] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => onOnboardingChange(() => setFlags(loadOnboardingFlags(merchant.id))), [merchant.id])

  useEffect(() => {
    let alive = true
    hasAnyOrder().then((v) => alive && setHasOrders(v))
    return () => {
      alive = false
    }
  }, [])

  // Mientras no se sabe si hay pedidos, no se muestra (evita un parpadeo
  // para quien ya usa la plataforma).
  if (hasOrders === null || flags.dismissed) return null
  const { steps, doneCount, total, current, complete } = onboardingSteps({ merchant, proEnabled, hasOrders, flags })
  // Cuentas que ya reciben pedidos y tienen lo básico no necesitan la guía.
  if (complete || (hasOrders && doneCount >= total - 1)) return null

  const link = storeShareLink(merchant.slug, merchant.logoUrl)
  const pct = Math.round((doneCount / total) * 100)

  function shared() {
    markOnboarding(merchant.id, 'linkShared')
  }

  async function handleCopy() {
    await copyText(link)
    shared()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section aria-label="Primeros pasos" className="mb-6 overflow-hidden rounded-2xl border border-brand/40 bg-white shadow-sm">
      <div className="flex items-start gap-3 bg-navy px-4 py-3.5 text-white sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold tracking-wide text-brand uppercase">Primeros pasos · {doneCount} de {total}</p>
          <p className="mt-0.5 text-base font-bold">Deja tu tienda lista para recibir pedidos</p>
          <div className="mt-2 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button
          type="button"
          onClick={() => markOnboarding(merchant.id, 'dismissed')}
          aria-label="Ocultar guía de primeros pasos"
          title="Ocultar guía"
          className="shrink-0 rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>

      <ol className="divide-y divide-slate-100">
        {steps.map((step, i) => {
          const isCurrent = current?.id === step.id
          return (
            <li key={step.id} className={`flex gap-3 px-4 py-3 sm:px-5 ${isCurrent ? 'bg-amber-50/70' : ''}`}>
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  step.done ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-brand text-navy ring-4 ring-brand/25' : 'bg-slate-100 text-muted'
                }`}
              >
                {step.done ? <IconCheck className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-bold ${step.done ? 'text-muted line-through' : 'text-navy'}`}>{step.title}</p>
                {!step.done && <p className="mt-0.5 text-xs leading-relaxed text-muted">{step.hint}</p>}

                {isCurrent && step.action?.tab && (
                  <button type="button" onClick={() => onGoTo(step.action.tab)} className="btn btn-primary mt-2 !px-3.5 !py-2 text-sm">
                    {step.action.label} →
                  </button>
                )}
                {!step.done && step.action?.share && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold transition ${
                        isCurrent ? 'bg-brand text-navy hover:brightness-95' : 'border border-slate-200 bg-white text-navy hover:bg-surface'
                      }`}
                    >
                      {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />} {copied ? 'Link copiado' : 'Copiar mi link'}
                    </button>
                    <a
                      href={buildWhatsAppUrl('', `Llena tus datos de envío aquí: ${link}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={shared}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-emerald-600"
                    >
                      <IconWhatsapp className="h-4 w-4" /> Enviar por WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
