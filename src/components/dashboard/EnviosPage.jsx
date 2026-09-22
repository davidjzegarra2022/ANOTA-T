import { useEffect, useState } from 'react'
import { fetchMyOrders, ORDER_STATUS_LABELS, updateOrderStatus } from '../../utils/orders'
import { deliveryMethodLabel } from '../../utils/orderSummary'
import { exportOrdersToExcel } from '../../utils/ordersExport'
import { IconChevronLeft, IconChevronRight, IconDownload, IconSearch } from '../icons'

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function addDays(iso, delta) {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + delta)
  return d.toISOString().slice(0, 10)
}

function fmtDay(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('es-PE', { weekday: 'short', day: '2-digit', month: 'short' })
}

const STATUS_BADGE = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-cyan-100 text-cyan-700',
  shipped: 'bg-blue-100 text-blue-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function EnviosPage() {
  const [day, setDay] = useState(todayIso())
  const [rangeFrom, setRangeFrom] = useState('')
  const [rangeTo, setRangeTo] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)

  const usingRange = Boolean(rangeFrom || rangeTo)

  async function refresh() {
    setLoading(true)
    const rows = await fetchMyOrders({
      shippingDateFrom: usingRange ? rangeFrom || undefined : day,
      shippingDateTo: usingRange ? rangeTo || undefined : day,
      status: status || undefined,
      search,
    })
    setOrders(rows)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh usa el estado más reciente por closure
  }, [day, rangeFrom, rangeTo, status, search])

  async function handleStatusChange(id, newStatus) {
    setBusyId(id)
    await updateOrderStatus(id, newStatus)
    await refresh()
    setBusyId(null)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-navy sm:text-2xl">Envíos</h1>
        <p className="mt-1 text-sm text-muted">Todos los pedidos que agendaron tus clientes. Gestiónalos por estado o por courier.</p>
      </div>

      <div className="card p-4">
        <div className="input-field flex items-center gap-2">
          <IconSearch className="h-4 w-4 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar N° de pedido, cliente o WhatsApp…"
            className="min-w-0 flex-1 bg-transparent focus:outline-none"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field w-full sm:w-auto">
            <option value="">Todos los estados</option>
            {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-1.5 py-1.5">
            <button type="button" onClick={() => setDay((d) => addDays(d, -1))} className="rounded-md p-1.5 text-muted hover:bg-surface">
              <IconChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-1 text-sm font-semibold text-ink">{day === todayIso() ? 'Hoy' : fmtDay(day)}</span>
            <button type="button" onClick={() => setDay((d) => addDays(d, 1))} className="rounded-md p-1.5 text-muted hover:bg-surface">
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <input type="date" value={rangeFrom} onChange={(e) => setRangeFrom(e.target.value)} className="input-field min-w-0 flex-1 sm:w-auto sm:flex-none" />
            <span className="shrink-0 text-muted">–</span>
            <input type="date" value={rangeTo} onChange={(e) => setRangeTo(e.target.value)} className="input-field min-w-0 flex-1 sm:w-auto sm:flex-none" />
          </div>

          <button
            type="button"
            onClick={() => exportOrdersToExcel(orders)}
            disabled={!orders.length}
            className="btn btn-outline w-full sm:ml-auto sm:w-auto"
          >
            <IconDownload className="h-4 w-4" /> Excel
          </button>
        </div>
      </div>

      <p className="text-sm text-muted">{loading ? 'Cargando…' : `${orders.length} pedidos`}</p>

      {!loading && orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-muted">No tienes pedidos pendientes por despachar. Usa las flechas para revisar otros días.</p>
        </div>
      ) : (
        <>
        {/* Móvil: una tarjeta por pedido (la tabla de 6 columnas no entra en
            una pantalla de teléfono sin scroll horizontal). */}
        <ul className="space-y-2.5 md:hidden">
          {orders.map((o) => (
            <li key={o.id} className="card p-3.5">
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{o.customerName}</p>
                  <p className="font-mono text-xs text-brand-dark">{o.trackingCode}</p>
                </div>
                <select
                  value={o.status}
                  disabled={busyId === o.id}
                  onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  className={`shrink-0 rounded-full border-none px-2 py-1 text-[11px] font-semibold focus:outline-none ${STATUS_BADGE[o.status]}`}
                >
                  {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <dl className="mt-2.5 space-y-1 text-xs">
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-muted">WhatsApp</dt>
                  <dd className="min-w-0 font-mono break-all text-ink">{o.customerPhone || '—'}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-muted">Método</dt>
                  <dd className="min-w-0 break-words text-ink">{deliveryMethodLabel(o)}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-muted">Fecha envío</dt>
                  <dd className="min-w-0 text-ink">{o.shippingDate || '—'}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="card hidden overflow-x-auto md:block">
          <table className="w-full min-w-[820px] text-left text-[13px]">
            <thead className="bg-surface text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-semibold">Código</th>
                <th className="px-3 py-2 font-semibold">Cliente</th>
                <th className="px-3 py-2 font-semibold">WhatsApp</th>
                <th className="px-3 py-2 font-semibold">Método</th>
                <th className="px-3 py-2 font-semibold">Fecha envío</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="text-ink">
                  <td className="px-3 py-2 font-mono text-xs text-brand-dark">{o.trackingCode}</td>
                  <td className="px-3 py-2">{o.customerName}</td>
                  <td className="px-3 py-2 font-mono text-xs">{o.customerPhone}</td>
                  <td className="px-3 py-2 text-xs">{deliveryMethodLabel(o)}</td>
                  <td className="px-3 py-2 text-xs">{o.shippingDate}</td>
                  <td className="px-3 py-2">
                    <select
                      value={o.status}
                      disabled={busyId === o.id}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className={`rounded-full border-none px-2 py-0.5 text-[11px] font-semibold focus:outline-none ${STATUS_BADGE[o.status]}`}
                    >
                      {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
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
