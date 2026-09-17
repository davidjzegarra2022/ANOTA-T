import { useEffect, useMemo, useState } from 'react'
import { fetchMyOrders, ORDER_STATUS_LABELS } from '../../utils/orders'
import { fetchActivePlans } from '../../utils/plans'
import { IconRefresh } from '../icons'

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

  if (!stats) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  const limit = plan?.monthlyOrderLimit ?? null
  const pct = limit ? Math.min(100, Math.round((stats.thisMonthCount / limit) * 100)) : 0

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Panel Pro</h1>
        <p className="mt-1 text-sm text-gray-400">Pedidos, couriers más usados y tus clientes recurrentes (los cancelados no cuentan).</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <p className="text-sm font-bold text-white">Pedidos de este mes</p>
        <p className="mt-1 text-xs text-gray-400">
          {stats.thisMonthCount} de {limit ?? '∞'} pedidos usados este mes en tu plan{plan ? ` (${plan.name})` : ''}.
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Hoy" value={stats.today} />
        <StatCard label="Últimos 7 días" value={stats.last7} />
        <StatCard label="Últimos 30 días" value={stats.last30} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <p className="text-sm font-bold text-white">Pedidos por estado</p>
        <p className="mt-1 text-xs text-gray-400">Últimos 30 días — a diferencia del resto del Panel Pro, sí incluye cancelados.</p>
        {stats.last30Total === 0 ? (
          <p className="mt-4 text-center text-sm text-gray-500">Todavía no tienes pedidos en los últimos 30 días.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => {
              const count = stats.byStatus[status] || 0
              const pctBar = Math.round((count / stats.last30Total) * 100)
              return (
                <div key={status} className="flex items-center gap-2">
                  <span className="w-24 shrink-0 text-xs text-gray-300">{label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-cyan-400" style={{ width: `${pctBar}%` }} />
                  </div>
                  <span className="w-6 shrink-0 text-right text-xs text-gray-400">{count}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <p className="text-sm font-bold text-white">Top couriers</p>
        <p className="mt-1 text-xs text-gray-400">Por cantidad de pedidos (últimos 30 días).</p>
        {stats.topCouriers.length === 0 ? (
          <p className="mt-4 text-center text-sm text-gray-500">Aún no hay pedidos suficientes.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {stats.topCouriers.map(([courier, count]) => (
              <div key={courier} className="flex items-center justify-between text-sm text-gray-200">
                <span className="capitalize">{courier}</span>
                <span className="font-semibold text-amber-300">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <p className="text-xs font-semibold text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      <p className="text-[11px] text-gray-500">pedidos</p>
    </div>
  )
}
