import { useEffect, useState } from 'react'
import { fetchActivePlans, trialEndsAt } from '../../utils/plans'
import { supportWhatsAppUrl } from '../../utils/support'
import { IconCheck, IconRefresh, IconWhatsapp } from '../icons'

// Sin pasarela de pago: el cambio de plan lo asigna el administrador
// manualmente (ver panel de admin → pestaña "Planes"). Cada botón abre el
// WhatsApp de soporte con un mensaje ya escrito (utils/support.js).

export default function PlanesPage({ merchant }) {
  const [plans, setPlans] = useState(null)

  useEffect(() => {
    fetchActivePlans().then(setPlans)
  }, [])

  if (!plans) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-navy sm:text-2xl">Planes</h1>
        <p className="mt-1 text-sm text-muted">El plan lo activa soporte de ANOTA-T. Elige uno y te escribimos por WhatsApp con un mensaje listo para enviar.</p>
      </div>

      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${plans.length > 2 ? 'lg:grid-cols-3' : 'max-w-3xl'}`}>
        {plans.map((p) => {
          const isCurrent = p.id === merchant.planId
          const priceLabel = p.trialDays ? `${p.trialDays} días` : `S/ ${p.pricePerDay.toFixed(2)}`
          const priceSuffix = p.trialDays ? 'gratis' : 'x día'
          const trialEnd = isCurrent ? trialEndsAt(merchant, p) : null
          const expired = trialEnd ? trialEnd <= new Date() : false
          const cta = isCurrent
            ? expired
              ? { label: 'Renovar plan', url: supportWhatsAppUrl('renew', { merchant }) }
              : null
            : { label: `Solicitar ${p.name}`, url: supportWhatsAppUrl('changePlan', { merchant, planName: p.name }) }
          return (
            <div key={p.id} className={`card flex flex-col p-5 ${isCurrent ? 'border-brand bg-amber-50/60' : ''}`}>
              {isCurrent && (
                <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-brand/20 px-2 py-0.5 text-[11px] font-bold text-brand-dark">
                  <IconCheck className="h-3 w-3" /> Tu plan actual
                </span>
              )}
              <p className="text-lg font-bold text-navy">{p.name}</p>
              <p className="mt-1 text-2xl font-bold text-navy">
                {priceLabel} <span className="text-xs font-normal text-muted">{priceSuffix}</span>
              </p>
              {p.description && <p className="mt-2 text-xs text-muted">{p.description}</p>}
              {p.features?.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-muted">
                      <IconCheck className="mt-0.5 h-3 w-3 shrink-0 text-brand-dark" /> {f}
                    </li>
                  ))}
                </ul>
              )}
              {cta && (
                <div className="mt-auto pt-4">
                  <a href={cta.url} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600">
                    <IconWhatsapp className="h-4 w-4" /> {cta.label}
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <a
        href={supportWhatsAppUrl(merchant.planId ? 'help' : 'activate', { merchant })}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-surface"
      >
        <IconWhatsapp className="h-4 w-4 text-emerald-700" /> ¿Dudas? Habla con soporte
      </a>
    </div>
  )
}
