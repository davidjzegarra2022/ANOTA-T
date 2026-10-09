import { useEffect, useState } from 'react'
import { fetchMyOrders, limaTodayIso, ORDER_STATUS_LABELS, orderDayLabel, orderTimeLabel, updateOrderStatus } from '../../utils/orders'
import { deliveryMethodLabel } from '../../utils/orderSummary'
import { exportOrdersToPdf } from '../../utils/ordersExport'
import { IconChevronLeft, IconChevronRight, IconEye, IconFile, IconSearch, IconTag, IconTrash } from '../icons'
import CourierTemplatesCard from './CourierTemplatesCard'
import DeleteOrdersDialog from './DeleteOrdersDialog'
import ExcelExportMenu from './ExcelExportMenu'
import OrderSummaryModal from './OrderSummaryModal'
import PrintLabelsModal from './PrintLabelsModal'

function todayIso() {
  return limaTodayIso()
}

function addDays(iso, delta) {
  const d = new Date(iso + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + delta)
  return d.toISOString().slice(0, 10)
}

function fmtDay(iso) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('es-PE', { weekday: 'short', day: '2-digit', month: 'short', timeZone: 'UTC' })
}

const STATUS_BADGE = {
  pending: 'bg-amber-100 text-amber-700',
  packed: 'bg-violet-100 text-violet-700',
  shipped: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
}

// N° del día: se reinicia cada medianoche (hora de Lima). El correlativo
// general de la tienda queda en el título por si se necesita.
function OrderNumber({ order }) {
  const n = order.dailyNumber ?? order.orderNumber
  if (n == null) return null
  return (
    <span
      title={order.orderNumber != null ? `Pedido N° ${n} del día · N° general #${order.orderNumber}` : undefined}
      className="inline-flex min-w-7 shrink-0 items-center justify-center rounded-lg bg-navy px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand tabular-nums">
      #{n}
    </span>
  )
}

function SelectBox({ checked, indeterminate = false, onChange, disabled, label, className = '' }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      ref={(el) => {
        if (el) el.indeterminate = indeterminate
      }}
      onChange={onChange}
      disabled={disabled}
      aria-label={label}
      className={`h-4 w-4 shrink-0 cursor-pointer rounded accent-[#a16207] ${className}`}
    />
  )
}

export default function EnviosPage({ merchant }) {
  const [day, setDay] = useState(todayIso())
  const [rangeFrom, setRangeFrom] = useState('')
  const [rangeTo, setRangeTo] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)
  // Pedidos preseleccionados al abrir el formato de impresión (null = cerrado).
  const [printIds, setPrintIds] = useState(null)
  const [selected, setSelected] = useState(() => new Set())
  const [exporting, setExporting] = useState(null)
  const [summaryOrder, setSummaryOrder] = useState(null)
  // Pedidos a borrar (null = diálogo cerrado).
  const [toDelete, setToDelete] = useState(null)
  const [notice, setNotice] = useState(null)

  const usingRange = Boolean(rangeFrom || rangeTo)
  // Al buscar sin rango de fechas se busca en TODOS los días (para encontrar
  // un pedido por número, nombre, día u hora aunque no sea de hoy).
  const searchingAll = Boolean(search.trim()) && !usingRange

  async function refresh() {
    setLoading(true)
    const rows = await fetchMyOrders({
      // Día (o rango) en que el cliente llenó el formulario, no la fecha de envío.
      createdFrom: usingRange ? rangeFrom || undefined : searchingAll ? undefined : day,
      createdTo: usingRange ? rangeTo || undefined : searchingAll ? undefined : day,
      status: status || undefined,
      search,
      dailySearch: true,
    })
    setOrders(rows)
    // Conserva solo la selección de pedidos que siguen en la lista.
    setSelected((prev) => new Set(rows.filter((o) => prev.has(o.id)).map((o) => o.id)))
    setLoading(false)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh usa el estado más reciente por closure
  }, [day, rangeFrom, rangeTo, status, search])

  const selectedOrders = orders.filter((o) => selected.has(o.id))
  const allSelected = orders.length > 0 && selectedOrders.length === orders.length
  const someSelected = selectedOrders.length > 0 && !allSelected
  // Con pedidos marcados exporta solo esos; sin marcar, toda la lista visible.
  const exportTarget = selectedOrders.length ? selectedOrders : orders

  function toggleOne(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(orders.map((o) => o.id)))
  }

  async function handleExportPdf() {
    setExporting('pdf')
    try {
      await exportOrdersToPdf(exportTarget, { businessName: merchant?.businessName })
    } finally {
      setExporting(null)
    }
  }

  async function handleDeleted(count) {
    setToDelete(null)
    setNotice(`${count} pedido${count === 1 ? '' : 's'} eliminado${count === 1 ? '' : 's'}.`)
    setTimeout(() => setNotice(null), 4000)
    await refresh()
  }

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
        <p className="mt-1 text-sm text-muted">Los pedidos según el día y la hora en que tu cliente llenó el formulario. Gestiónalos por estado o por courier.</p>
      </div>

      <div className="card p-4">
        <div className="input-field flex items-center gap-2">
          <IconSearch className="h-4 w-4 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar N° de pedido, cliente, código, día u hora…"
            maxLength={80}
            enterKeyHint="search"
            aria-label="Buscar pedidos"
            className="min-w-0 flex-1 bg-transparent focus:outline-none"
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} aria-label="Limpiar búsqueda" className="shrink-0 rounded-md px-1.5 text-muted hover:text-navy">
              ✕
            </button>
          )}
        </div>
        {searchingAll && (
          <p className="mt-2 text-xs text-muted">
            Buscando en <b>todas las fechas</b>. Prueba: <span className="font-mono">#12</span>, un nombre, <span className="font-mono">30/09</span>,{' '}
            <span className="font-mono">lunes</span> o <span className="font-mono">10:26</span>.
          </p>
        )}

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

        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label
          className={`flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-ink select-none ${
            !orders.length ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <SelectBox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} disabled={!orders.length} label="Seleccionar todos los pedidos" />
          Todo
        </label>
        <p className="text-sm text-muted">
          {loading
            ? 'Cargando…'
            : selectedOrders.length
              ? `${selectedOrders.length} de ${orders.length} seleccionados`
              : `${orders.length} pedidos`}
        </p>
        <div className="ml-auto flex w-full flex-wrap gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => setPrintIds(selectedOrders.map((o) => o.id))}
            disabled={!orders.length}
            className="btn btn-outline flex-1 sm:flex-none"
            title="Imprimir etiquetas de envío"
          >
            <IconTag className="h-4 w-4" />
            Etiquetas{selectedOrders.length ? ` (${selectedOrders.length})` : ''}
          </button>
          <ExcelExportMenu
            orders={exportTarget}
            merchant={merchant}
            disabled={!orders.length || Boolean(exporting)}
            label={`Excel${selectedOrders.length ? ` (${selectedOrders.length})` : ''}`}
          />
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={!orders.length || Boolean(exporting)}
            className="btn btn-outline flex-1 sm:flex-none"
            title={selectedOrders.length ? 'Exportar los pedidos seleccionados a PDF' : 'Exportar todos los pedidos de la lista a PDF'}
          >
            <IconFile className="h-4 w-4" />
            {exporting === 'pdf' ? 'Exportando…' : `PDF${selectedOrders.length ? ` (${selectedOrders.length})` : ''}`}
          </button>
          {selectedOrders.length > 0 && (
            <button
              type="button"
              onClick={() => setToDelete(selectedOrders)}
              className="btn flex-1 border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 sm:flex-none"
              title="Eliminar los pedidos seleccionados"
            >
              <IconTrash className="h-4 w-4" /> Eliminar ({selectedOrders.length})
            </button>
          )}
        </div>
      </div>

      {!loading && orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-muted">No hay pedidos registrados este día. Usa las flechas para revisar otros días.</p>
        </div>
      ) : (
        <>
        {/* Móvil: una tarjeta por pedido (la tabla de 6 columnas no entra en
            una pantalla de teléfono sin scroll horizontal). */}
        <ul className="space-y-2.5 md:hidden">
          {orders.map((o) => (
            <li key={o.id} className={`card p-3.5 ${selected.has(o.id) ? 'ring-2 ring-brand/60' : ''}`}>
              <div className="flex items-start gap-2.5">
                <SelectBox checked={selected.has(o.id)} onChange={() => toggleOne(o.id)} label={`Seleccionar pedido ${o.trackingCode || o.id}`} className="mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <OrderNumber order={o} />
                    <span className="truncate">{o.customerName}</span>
                  </p>
                  <p className="font-mono text-xs text-brand-dark">{o.trackingCode}</p>
                  <p className="text-[11px] text-muted">
                    Registrado {orderDayLabel(o)} · {orderTimeLabel(o)}
                  </p>
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
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => setPrintIds([o.id])} className="btn btn-outline flex-1 !py-2 text-xs">
                  <IconTag className="h-4 w-4" /> Imprimir etiqueta
                </button>
                <RowIcon label="Ver resumen" onClick={() => setSummaryOrder(o)}>
                  <IconEye className="h-4 w-4" />
                </RowIcon>
                <RowIcon label="Eliminar pedido" danger onClick={() => setToDelete([o])}>
                  <IconTrash className="h-4 w-4" />
                </RowIcon>
              </div>
            </li>
          ))}
        </ul>

        <div className="card hidden overflow-x-auto md:block">
          <table className="w-full min-w-[1000px] text-left text-[13px]">
            <thead className="bg-surface text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="w-10 py-2 pr-1 pl-3">
                  <SelectBox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} disabled={!orders.length} label="Seleccionar todos los pedidos" />
                </th>
                <th className="px-3 py-2 font-semibold" title="Número del pedido en el día">N° día</th>
                <th className="px-3 py-2 font-semibold">Registrado</th>
                <th className="px-3 py-2 font-semibold">Código</th>
                <th className="px-3 py-2 font-semibold">Cliente</th>
                <th className="px-3 py-2 font-semibold">WhatsApp</th>
                <th className="px-3 py-2 font-semibold">Método</th>
                <th className="px-3 py-2 font-semibold">Fecha envío</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="px-3 py-2 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className={`text-ink ${selected.has(o.id) ? 'bg-amber-50/60' : ''}`}>
                  <td className="w-10 py-2 pr-1 pl-3">
                    <SelectBox checked={selected.has(o.id)} onChange={() => toggleOne(o.id)} label={`Seleccionar pedido ${o.trackingCode || o.id}`} />
                  </td>
                  <td className="px-3 py-2"><OrderNumber order={o} /></td>
                  <td className="px-3 py-2 text-xs whitespace-nowrap">
                    <span className="font-semibold">{orderTimeLabel(o)}</span>
                    <span className="block text-[11px] text-muted">{orderDayLabel(o)}</span>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs whitespace-nowrap text-brand-dark">{o.trackingCode}</td>
                  <td className="px-3 py-2">{o.customerName}</td>
                  <td className="px-3 py-2 font-mono text-xs">{o.customerPhone}</td>
                  <td className="px-3 py-2 text-xs">{deliveryMethodLabel(o)}</td>
                  <td className="px-3 py-2 text-xs whitespace-nowrap">{o.shippingDate}</td>
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
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <RowIcon label="Imprimir la etiqueta de envío" small onClick={() => setPrintIds([o.id])}>
                        <IconTag className="h-4 w-4" />
                      </RowIcon>
                      <RowIcon label="Ver resumen" small onClick={() => setSummaryOrder(o)}>
                        <IconEye className="h-4 w-4" />
                      </RowIcon>
                      <RowIcon label="Eliminar pedido" small danger onClick={() => setToDelete([o])}>
                        <IconTrash className="h-4 w-4" />
                      </RowIcon>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      <CourierTemplatesCard />

      {notice && (
        <div role="status" className="animate-fade-in-up fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-xl">
          ✓ {notice}
        </div>
      )}
      {summaryOrder && <OrderSummaryModal order={summaryOrder} onClose={() => setSummaryOrder(null)} />}
      {toDelete && (
        <DeleteOrdersDialog orders={toDelete} businessName={merchant?.businessName} onClose={() => setToDelete(null)} onDeleted={handleDeleted} />
      )}
      {printIds && (
        <PrintLabelsModal orders={orders} initialSelected={printIds} merchant={merchant} onClose={() => setPrintIds(null)} />
      )}
    </div>
  )
}

function RowIcon({ label, onClick, danger, small, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`inline-flex shrink-0 items-center justify-center rounded-xl border transition ${small ? 'h-8 w-8' : 'h-9 w-10'} ${
        danger ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-slate-200 text-navy hover:bg-surface'
      }`}
    >
      {children}
    </button>
  )
}
