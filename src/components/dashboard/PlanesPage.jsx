import { useEffect, useState } from 'react'
import { fetchActivePlans } from '../../utils/plans'
import { IconCheck, IconRefresh, IconWhatsapp } from '../icons'

// Sin pasarela de pago: el cambio de plan lo asigna el administrador
// manualmente (ver panel de admin → pestaña "Planes"). Pon aquí TU número
// (el del dueño de la plataforma, no el de un negociante) para que te
// puedan escribir a pedir un cambio de plan.
const ADMIN_WHATSAPP = '' // ej. '51987654321'

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
        <p className="mt-1 text-sm text-muted">El plan lo asigna el administrador. Si quieres cambiar de plan, contáctalo por WhatsApp.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => {
          const isCurrent = p.id === merchant.planId
          const priceLabel = p.trialDays ? `${p.trialDays} días` : `S/ ${p.pricePerDay.toFixed(2)}`
          const priceSuffix = p.trialDays ? 'gratis' : 'x día'
          return (
            <div key={p.id} className={`card p-5 ${isCurrent ? 'border-brand bg-amber-50/60' : ''}`}>
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
            </div>
          )
        })}
      </div>

      {ADMIN_WHATSAPP && (
        <a
          href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`Hola, quiero cambiar el plan de ${merchant.businessName}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          <IconWhatsapp className="h-4 w-4" /> Contactar para cambiar de plan
        </a>
      )}
    </div>
  )
}
