import { useEffect, useState } from 'react'
import { fetchMyOrders, ORDER_STATUS_LABELS, updateOrderStatus } from '../../utils/orders'
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
  pending: 'bg-amber-400/15 text-amber-300',
  confirmed: 'bg-cyan-400/15 text-cyan-300',
  shipped: 'bg-blue-400/15 text-blue-300',
  delivered: 'bg-emerald-400/15 text-emerald-300',
  cancelled: 'bg-red-400/15 text-red-300',
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
        <h1 className="text-2xl font-bold text-white">Envíos</h1>
        <p className="mt-1 text-sm text-gray-400">Todos los pedidos que agendaron tus clientes. Gestiónalos por estado o por courier.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <IconSearch className="h-4 w-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar N° de pedido, cliente o WhatsApp…"
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
          >
            <option value="" className="bg-gray-900">Todos los estados</option>
            {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value} className="bg-gray-900">{label}</option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-1.5 py-1.5">
            <button type="button" onClick={() => setDay((d) => addDays(d, -1))} className="rounded-md p-1.5 text-gray-300 hover:bg-white/10">
              <IconChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-1 text-sm font-semibold text-gray-200">{day === todayIso() ? 'Hoy' : fmtDay(day)}</span>
            <button type="button" onClick={() => setDay((d) => addDays(d, 1))} className="rounded-md p-1.5 text-gray-300 hover:bg-white/10">
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>

          <input
            type="date"
            value={rangeFrom}
            onChange={(e) => setRangeFrom(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
          />
          <span className="text-gray-500">–</span>
          <input
            type="date"
            value={rangeTo}
            onChange={(e) => setRangeTo(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => exportOrdersToExcel(orders)}
            disabled={!orders.length}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-gray-200 transition hover:bg-white/10 disabled:opacity-40"
          >
            <IconDownload className="h-4 w-4" /> Excel
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-400">{loading ? 'Cargando…' : `${orders.length} pedidos`}</p>

      {!loading && orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
          <p className="text-sm text-gray-400">No tienes pedidos pendientes por despachar. Usa las flechas para revisar otros días.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead className="bg-white/5 text-[11px] tracking-wide text-gray-400 uppercase">
              <tr>
                <th className="px-3 py-2 font-semibold">N°</th>
                <th className="px-3 py-2 font-semibold">Cliente</th>
                <th className="px-3 py-2 font-semibold">WhatsApp</th>
                <th className="px-3 py-2 font-semibold">Método</th>
                <th className="px-3 py-2 font-semibold">Fecha envío</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((o) => (
                <tr key={o.id} className="text-gray-200">
                  <td className="px-3 py-2 font-mono text-xs">#{o.id}</td>
                  <td className="px-3 py-2">{o.customerName}</td>
                  <td className="px-3 py-2 font-mono text-xs">{o.customerPhone}</td>
                  <td className="px-3 py-2 text-xs">{o.courier || o.deliveryMethod}</td>
                  <td className="px-3 py-2 text-xs">{o.shippingDate}</td>
                  <td className="px-3 py-2">
                    <select
                      value={o.status}
                      disabled={busyId === o.id}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className={`rounded-full border-none px-2 py-0.5 text-[11px] font-semibold focus:outline-none ${STATUS_BADGE[o.status]}`}
                    >
                      {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value} className="bg-gray-900 text-white">{label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
