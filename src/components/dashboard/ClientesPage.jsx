import { useEffect, useMemo, useState } from 'react'
import { fetchMyOrders } from '../../utils/orders'
import { IconRefresh, IconSearch, IconUsers } from '../icons'

const DAY_MS = 24 * 60 * 60 * 1000

function buildCustomers(orders) {
  const byPhone = new Map()
  for (const o of orders) {
    const key = o.customerPhone || o.customerName
    if (!key) continue
    const entry = byPhone.get(key) || { phone: o.customerPhone, name: o.customerName, orders: [] }
    entry.orders.push(o)
    if (!entry.name) entry.name = o.customerName
    byPhone.set(key, entry)
  }

  const now = Date.now()
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  return [...byPhone.values()].map((c) => {
    const dates = c.orders.map((o) => new Date(o.createdAt).getTime())
    const first = Math.min(...dates)
    const last = Math.max(...dates)
    const daysSinceLast = (now - last) / DAY_MS
    return {
      ...c,
      count: c.orders.length,
      firstAt: first,
      lastAt: last,
      isRecurring: c.orders.length >= 2,
      isNewThisMonth: first >= startOfMonth.getTime(),
      isDormant: daysSinceLast > 30,
      isAtRisk: daysSinceLast > 15 && daysSinceLast <= 30,
    }
  })
}

export default function ClientesPage() {
  const [orders, setOrders] = useState(null)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('todos')

  useEffect(() => {
    fetchMyOrders().then(setOrders)
  }, [])

  const customers = useMemo(() => buildCustomers(orders || []), [orders])

  const filtered = useMemo(() => {
    let list = customers
    if (tab === 'recurrentes') list = list.filter((c) => c.isRecurring)
    if (tab === 'nuevos') list = list.filter((c) => c.isNewThisMonth)
    if (tab === 'dormidos') list = list.filter((c) => c.isDormant)
    if (tab === 'riesgo') list = list.filter((c) => c.isAtRisk)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((c) => c.name?.toLowerCase().includes(q) || c.phone?.toLowerCase().includes(q))
    }
    return list
  }, [customers, tab, search])

  const counts = {
    todos: customers.length,
    recurrentes: customers.filter((c) => c.isRecurring).length,
    nuevos: customers.filter((c) => c.isNewThisMonth).length,
    dormidos: customers.filter((c) => c.isDormant).length,
    riesgo: customers.filter((c) => c.isAtRisk).length,
  }

  if (orders === null) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-navy sm:text-2xl">Clientes</h1>
        <p className="mt-1 text-sm text-muted">Tu base de clientes: quién te compra, quién repite y a quién conviene reactivar.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Clientes" value={counts.todos} />
        <StatTile label="Recurrentes" value={counts.recurrentes} />
        <StatTile label="Nuevos este mes" value={counts.nuevos} />
        <StatTile label="Para reactivar" value={counts.dormidos} hint="Sin comprar +30 días" />
      </div>

      <div className="card p-4">
        <div className="input-field flex items-center gap-2">
          <IconSearch className="h-4 w-4 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o WhatsApp…"
            className="min-w-0 flex-1 bg-transparent focus:outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ['todos', 'Todos'],
            ['recurrentes', 'Recurrentes'],
            ['nuevos', 'Nuevos'],
            ['dormidos', 'Dormidos'],
            ['riesgo', 'Riesgo'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                tab === value ? 'bg-brand text-navy' : 'bg-surface text-muted hover:bg-slate-200'
              }`}
            >
              {label} {counts[value]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <IconUsers className="mx-auto h-6 w-6 text-muted" />
          <p className="mt-2 text-sm text-muted">
            {customers.length === 0 ? 'Todavía no tienes clientes. Aparecerán aquí en cuanto recibas tu primer pedido.' : 'Nada coincide con ese filtro.'}
          </p>
        </div>
      ) : (
        <>
        {/* Móvil: una tarjeta por cliente en vez de scroll horizontal. */}
        <ul className="space-y-2.5 sm:hidden">
          {filtered.map((c) => (
            <li key={c.phone || c.name} className="card flex items-center gap-3 p-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{c.name || '—'}</p>
                <p className="truncate font-mono text-xs text-muted">{c.phone || '—'}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-navy">{c.count}</p>
                <p className="text-[10px] text-muted">{new Date(c.lastAt).toLocaleDateString('es-PE')}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="card hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[560px] text-left text-[13px]">
            <thead className="bg-surface text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-semibold">Cliente</th>
                <th className="px-3 py-2 font-semibold">WhatsApp</th>
                <th className="px-3 py-2 font-semibold">Pedidos</th>
                <th className="px-3 py-2 font-semibold">Última compra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.phone || c.name} className="text-ink">
                  <td className="px-3 py-2">{c.name || '—'}</td>
                  <td className="px-3 py-2 font-mono text-xs">{c.phone || '—'}</td>
                  <td className="px-3 py-2">{c.count}</td>
                  <td className="px-3 py-2 text-xs text-muted">{new Date(c.lastAt).toLocaleDateString('es-PE')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  )
}

function StatTile({ label, value, hint }) {
  return (
    <div className="card p-3 sm:p-3.5">
      <p className="text-[11px] leading-tight font-semibold text-muted sm:tracking-wide sm:uppercase">{label}</p>
      <p className="mt-1 text-xl font-bold text-navy sm:text-2xl">{value}</p>
      {hint && <p className="text-[10px] leading-tight text-muted">{hint}</p>}
    </div>
  )
}
