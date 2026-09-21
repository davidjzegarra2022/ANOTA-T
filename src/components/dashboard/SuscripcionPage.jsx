import { useEffect, useState } from 'react'
import { fetchMyOrders } from '../../utils/orders'
import { fetchActivePlans, trialEndsAt } from '../../utils/plans'
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
      <div className="flex items-center gap-2 text-muted">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  const trialEnd = plan ? trialEndsAt(merchant, plan) : null
  const trialDaysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd - Date.now()) / 86400000)) : null

  return (
    <div className="max-w-xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-navy">Suscripción</h1>
        <p className="mt-1 text-sm text-muted">Tu plan actual y su uso este mes.</p>
      </div>

      {!plan ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-muted">
            Todavía no tienes un plan asignado. Escríbele al administrador para que te active uno.
          </p>
        </div>
      ) : (
        <div className="card p-5">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">Plan actual</p>
          <p className="mt-1 text-xl font-bold text-navy">{plan.name}</p>
          <p className="mt-1 text-2xl font-bold text-navy">
            {plan.trialDays ? `${plan.trialDays} días` : `S/ ${plan.pricePerDay.toFixed(2)}`}{' '}
            <span className="text-xs font-normal text-muted">{plan.trialDays ? 'gratis' : '/ día'}</span>
          </p>

          {trialEnd ? (
            <p className="mt-4 text-sm font-semibold text-brand-dark">
              {trialDaysLeft > 0 ? `Te quedan ${trialDaysLeft} día${trialDaysLeft === 1 ? '' : 's'} de prueba.` : 'Tu prueba gratuita ya venció.'}
            </p>
          ) : (
            plan.monthlyOrderLimit && (
              <div className="mt-4">
                <p className="text-xs text-muted">
                  {usedThisMonth} de {plan.monthlyOrderLimit} pedidos usados este mes
                </p>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${Math.min(100, Math.round((usedThisMonth / plan.monthlyOrderLimit) * 100))}%` }}
                  />
                </div>
              </div>
            )
          )}

          <p className="mt-4 text-xs leading-relaxed text-muted">
            El cobro y el cambio de plan los gestiona el administrador manualmente por ahora — no hay pasarela
            de pago integrada. Ve a la pestaña "Planes" para ver las opciones disponibles.
          </p>
        </div>
      )}
    </div>
  )
}
