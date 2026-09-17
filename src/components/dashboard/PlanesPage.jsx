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
      <div className="flex items-center gap-2 text-gray-400">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Planes</h1>
        <p className="mt-1 text-sm text-gray-400">El plan lo asigna el administrador. Si quieres cambiar de plan, contáctalo por WhatsApp.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => {
          const isCurrent = p.id === merchant.planId
          return (
            <div
              key={p.id}
              className={`rounded-2xl border p-5 backdrop-blur-sm ${
                isCurrent ? 'border-amber-400/60 bg-amber-400/[0.06]' : 'border-white/10 bg-white/5'
              }`}
            >
              {isCurrent && (
                <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                  <IconCheck className="h-3 w-3" /> Tu plan actual
                </span>
              )}
              <p className="text-lg font-bold text-white">{p.name}</p>
              <p className="mt-1 text-2xl font-bold text-white">
                S/ {p.priceSoles.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ mes</span>
              </p>
              <p className="mt-2 text-sm text-gray-400">Hasta {p.monthlyOrderLimit} pedidos al mes.</p>
              {p.description && <p className="mt-2 text-xs text-gray-500">{p.description}</p>}
            </div>
          )
        })}
      </div>

      {ADMIN_WHATSAPP && (
        <a
          href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`Hola, quiero cambiar el plan de ${merchant.businessName}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-400"
        >
          <IconWhatsapp className="h-4 w-4" /> Contactar para cambiar de plan
        </a>
      )}
    </div>
  )
}
