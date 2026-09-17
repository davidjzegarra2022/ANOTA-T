import { useEffect, useState } from 'react'
import { fetchMyOrders } from '../../utils/orders'
import { fetchActivePlans } from '../../utils/plans'
import { IconRefresh } from '../icons'

function startOfMonthIso() {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

export default function SuscripcionPage({ merchant }) {
  const [plan, setPlan] = useState(undefined)
  const [usedThisMonth, setUsedThisMonth] = useState(null)

  useEffect(() => {
    fetchActivePlans().then((plans) => setPlan(plans.find((p) => p.id === merchant.planId) || null))
    fetchMyOrders().then((orders) => {
      const monthStart = startOfMonthIso()
      setUsedThisMonth(orders.filter((o) => o.status !== 'cancelled' && o.createdAt >= monthStart).length)
    })
  }, [merchant.planId])

  if (plan === undefined || usedThisMonth === null) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  return (
    <div className="max-w-xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Suscripción</h1>
        <p className="mt-1 text-sm text-gray-400">Tu plan actual y su uso este mes.</p>
      </div>

      {!plan ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
          <p className="text-sm text-gray-400">
            Todavía no tienes un plan asignado. Escríbele al administrador para que te active uno.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">Plan actual</p>
          <p className="mt-1 text-xl font-bold text-white">{plan.name}</p>
          <p className="mt-1 text-2xl font-bold text-white">
            S/ {plan.priceSoles.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ mes</span>
          </p>

          <div className="mt-4">
            <p className="text-xs text-gray-400">
              {usedThisMonth} de {plan.monthlyOrderLimit} pedidos usados este mes
            </p>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600"
                style={{ width: `${Math.min(100, Math.round((usedThisMonth / plan.monthlyOrderLimit) * 100))}%` }}
              />
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            El cobro y el cambio de plan los gestiona el administrador manualmente por ahora — no hay pasarela
            de pago integrada. Ve a la pestaña "Planes" para ver las opciones disponibles.
          </p>
        </div>
      )}
    </div>
  )
}
