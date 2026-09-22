import { useEffect, useMemo, useState } from 'react'
import { fetchMyOrders, ORDER_STATUS_LABELS } from '../../utils/orders'
import { deliveryMethodLabel } from '../../utils/orderSummary'
import { fetchActivePlans, trialEndsAt } from '../../utils/plans'
import { IconBox, IconRefresh } from '../icons'
import OrderSummaryModal from './OrderSummaryModal'

function startOfMonthIso() {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

function daysAgoIso(days) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

export default function PanelProPage({ merchant }) {
  const [orders, setOrders] = useState(null)
  const [plan, setPlan] = useState(null)
  const [summaryOrder, setSummaryOrder] = useState(null)

  useEffect(() => {
    fetchMyOrders().then(setOrders)
    fetchActivePlans().then((plans) => setPlan(plans.find((p) => p.id === merchant.planId) || null))
  }, [merchant.planId])

  const stats = useMemo(() => {
    if (!orders) return null
    const nonCancelled = orders.filter((o) => o.status !== 'cancelled')
    const monthStart = startOfMonthIso()
    const thisMonth = nonCancelled.filter((o) => o.createdAt >= monthStart)

    const todayStart = daysAgoIso(0)
    const last7 = daysAgoIso(7)
    const last30 = daysAgoIso(30)

    const byStatus = {}
    for (const o of orders.filter((o) => o.createdAt >= last30)) {
      byStatus[o.status] = (byStatus[o.status] || 0) + 1
    }

    const courierCounts = new Map()
    for (const o of nonCancelled.filter((o) => o.createdAt >= last30 && o.courier)) {
      courierCounts.set(o.courier, (courierCounts.get(o.courier) || 0) + 1)
    }
    const topCouriers = [...courierCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)

    return {
      thisMonthCount: thisMonth.length,
      today: nonCancelled.filter((o) => o.createdAt >= todayStart).length,
      last7: nonCancelled.filter((o) => o.createdAt >= last7).length,
      last30: nonCancelled.filter((o) => o.createdAt >= last30).length,
      byStatus,
      last30Total: orders.filter((o) => o.createdAt >= last30).length,
      topCouriers,
    }
  }, [orders])

  const recentOrders = (orders || []).slice(0, 15)

  if (!stats) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  const limit = plan?.monthlyOrderLimit ?? null
  const pct = limit ? Math.min(100, Math.round((stats.thisMonthCount / limit) * 100)) : 0
  const trialEnd = plan ? trialEndsAt(merchant, plan) : null
  const trialDaysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd - Date.now()) / 86400000)) : null

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-navy sm:text-2xl">Panel Pro</h1>
        <p className="mt-1 text-sm text-muted">Pedidos, couriers más usados y tus clientes recurrentes (los cancelados no cuentan).</p>
      </div>

      {trialEnd ? (
        <div className="card p-4">
          <p className="text-sm font-bold text-navy">Prueba gratuita</p>
          <p className="mt-1 text-xs text-muted">
            {trialDaysLeft > 0 ? `Te quedan ${trialDaysLeft} día${trialDaysLeft === 1 ? '' : 's'} de prueba.` : 'Tu prueba gratuita ya venció.'}
          </p>
        </div>
      ) : limit ? (
        <div className="card p-4">
          <p className="text-sm font-bold text-navy">Pedidos de este mes</p>
          <p className="mt-1 text-xs text-muted">
            {stats.thisMonthCount} de {limit} pedidos usados este mes en tu plan{plan ? ` (${plan.name})` : ''}.
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Hoy" value={stats.today} />
        <StatCard label="Últimos 7 días" value={stats.last7} />
        <StatCard label="Últimos 30 días" value={stats.last30} />
      </div>

      <div className="card p-4">
        <p className="text-sm font-bold text-navy">Pedidos por estado</p>
        <p className="mt-1 text-xs text-muted">Últimos 30 días — a diferencia del resto del Panel Pro, sí incluye cancelados.</p>
        {stats.last30Total === 0 ? (
          <p className="mt-4 text-center text-sm text-muted">Todavía no tienes pedidos en los últimos 30 días.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => {
              const count = stats.byStatus[status] || 0
              const pctBar = Math.round((count / stats.last30Total) * 100)
              return (
                <div key={status} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-xs text-ink sm:w-24">{label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-navy" style={{ width: `${pctBar}%` }} />
                  </div>
                  <span className="w-6 shrink-0 text-right text-xs text-muted">{count}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="card p-4">
        <p className="text-sm font-bold text-navy">Top couriers</p>
        <p className="mt-1 text-xs text-muted">Por cantidad de pedidos (últimos 30 días).</p>
        {stats.topCouriers.length === 0 ? (
          <p className="mt-4 text-center text-sm text-muted">Aún no hay pedidos suficientes.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {stats.topCouriers.map(([courier, count]) => (
              <div key={courier} className="flex items-center justify-between text-sm text-ink">
                <span className="capitalize">{courier}</span>
                <span className="font-semibold text-brand-dark">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card p-4">
        <p className="text-sm font-bold text-navy">Pedidos recientes</p>
        <p className="mt-1 text-xs text-muted">
          Abre el resumen para ver todo lo que escribió el cliente, copiarlo o imprimirlo.
        </p>

        {recentOrders.length === 0 ? (
          <div className="mt-4 text-center">
            <IconBox className="mx-auto h-6 w-6 text-muted" />
            <p className="mt-2 text-sm text-muted">Todavía no tienes pedidos.</p>
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {recentOrders.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{o.customerName}</p>
                  <p className="truncate text-xs text-muted">
                    <span className="font-mono text-brand-dark">{o.trackingCode}</span> · {deliveryMethodLabel(o)}
                    {o.shippingDate ? ` · ${o.shippingDate}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSummaryOrder(o)}
                  className="btn btn-outline shrink-0 !px-3 !py-1.5 text-xs"
                >
                  Resumen
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {summaryOrder && <OrderSummaryModal order={summaryOrder} onClose={() => setSummaryOrder(null)} />}
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="card p-4">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-navy">{value}</p>
      <p className="text-[11px] text-muted">pedidos</p>
    </div>
  )
}
