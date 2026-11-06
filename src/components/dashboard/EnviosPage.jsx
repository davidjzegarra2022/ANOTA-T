import { useEffect, useState } from 'react'
import { fetchMyOrders, limaTodayIso, ORDER_STATUS_LABELS, orderDayLabel, orderTimeLabel, updateOrderStatus } from '../../utils/orders'
import { deliveryMethodLabel, orderDestination } from '../../utils/orderSummary'
import { customerStatusWhatsAppUrl } from '../../utils/whatsapp'
import { exportOrdersToPdf } from '../../utils/ordersExport'
import { collectSellerNames } from '../../utils/sellers'
import { IconBell, IconChevronLeft, IconChevronRight, IconEye, IconFile, IconLock, IconPrinter, IconSearch, IconTrash, IconWhatsapp } from '../icons'
import { dueLabel, loadReminders, reminderForOrder, timeLabel } from '../../utils/reminders'
import SaleReminderDialog from './SaleReminderDialog'
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

/** Fecha de envío legible ("Hoy", "Mañana", "vie 07 nov"); deja tal cual lo que no sea AAAA-MM-DD. */
function fmtShipDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value || '—'
  const today = todayIso()
  if (value === today) return 'Hoy'
  if (value === addDays(today, 1)) return 'Mañana'
  return fmtDay(value)
}

const STATUS_ORDER = ['pending', 'packed', 'shipped', 'cancelled']

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

export default function EnviosPage({ merchant, proEnabled = false, onUpgrade }) {
  const [day, setDay] = useState(todayIso())
  const [rangeFrom, setRangeFrom] = useState('')
  const [rangeTo, setRangeTo] = useState('')
  const [status, setStatus] = useState('')
  const [seller, setSeller] = useState('')
  const [sellerNames, setSellerNames] = useState(() => collectSellerNames(merchant?.sellers, []))
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
  // Recordatorios inteligentes por venta (campana): venta abierta y lista
  // de recordatorios para pintar la campana de las que ya tienen uno.
  const [reminderOrder, setReminderOrder] = useState(null)
  const [reminders, setReminders] = useState(() => loadReminders(merchant?.id))
  useEffect(() => {
    const reload = () => setReminders(loadReminders(merchant?.id))
    window.addEventListener('anotat-reminders', reload)
    return () => window.removeEventListener('anotat-reminders', reload)
  }, [merchant?.id])
  // Cuántos pedidos hay por estado en el día/rango (para los atajos de arriba).
  const [statusCounts, setStatusCounts] = useState(null)
  // En el celular el rango de fechas va plegado: casi siempre se mira «Hoy».
  const [showRange, setShowRange] = useState(false)

  const usingRange = Boolean(rangeFrom || rangeTo)
  // Al buscar sin rango de fechas se busca en TODOS los días (para encontrar
  // un pedido por número, nombre, día u hora aunque no sea de hoy).
  const searchingAll = Boolean(search.trim()) && !usingRange

  async function refresh({ silent = false } = {}) {
    if (!silent) setLoading(true)
    const rows = await fetchMyOrders({
      // Día (o rango) en que el cliente llenó el formulario, no la fecha de envío.
      createdFrom: usingRange ? rangeFrom || undefined : searchingAll ? undefined : day,
      createdTo: usingRange ? rangeTo || undefined : searchingAll ? undefined : day,
      status: status || undefined,
      search,
      dailySearch: true,
    })
    setSellerNames(collectSellerNames(merchant?.sellers, rows))
    if (!status) {
      const counts = Object.fromEntries(STATUS_ORDER.map((k) => [k, 0]))
      for (const o of rows) counts[o.status] = (counts[o.status] || 0) + 1
      setStatusCounts(counts)
    }
    // El filtro por vendedor se aplica en memoria: la consulta ya trae el día
    // o el rango, y así el selector no dispara otra llamada a la base.
    const visible = seller
      ? rows.filter((o) => (seller === '__none' ? !o.sellerName : o.sellerName === seller))
      : rows
    setOrders(visible)
    // Conserva solo la selección de pedidos que siguen en la lista.
    setSelected((prev) => new Set(visible.filter((o) => prev.has(o.id)).map((o) => o.id)))
    setLoading(false)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh usa el estado más reciente por closure
  }, [day, rangeFrom, rangeTo, status, seller, search])

  // Un pedido nuevo (lo detecta la campanita) aparece sin recargar la página.
  useEffect(() => {
    const onNew = () => refresh({ silent: true })
    window.addEventListener('anotat-orders-changed', onNew)
    return () => window.removeEventListener('anotat-orders-changed', onNew)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh usa el estado más reciente por closure
  }, [day, rangeFrom, rangeTo, status, seller, search])

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
    setNotice({ text: `${count} pedido${count === 1 ? '' : 's'} eliminado${count === 1 ? '' : 's'}.` })
    setTimeout(() => setNotice(null), 4000)
    await refresh()
  }

  async function handleStatusChange(id, newStatus) {
    setBusyId(id)
    const res = await updateOrderStatus(id, newStatus)
    if (!res?.ok) {
      setNotice({ error: true, text: 'No se pudo cambiar el estado. Revisa tu conexión e inténtalo otra vez.' })
      setTimeout(() => setNotice(null), 5000)
    }
    await refresh({ silent: true })
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

          {sellerNames.length > 0 && (
            <select
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              aria-label="Filtrar por vendedor"
              className="input-field w-full sm:w-auto"
            >
              <option value="">Todos los vendedores</option>
              {sellerNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
              <option value="__none">Dueño (link de la tienda)</option>
            </select>
          )}

          <div className={`flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-1.5 py-1.5 ${usingRange ? 'opacity-50' : ''}`}>
            <button type="button" onClick={() => setDay((d) => addDays(d, -1))} disabled={usingRange} aria-label="Día anterior" className="rounded-md p-1.5 text-navy hover:bg-surface">
              <IconChevronLeft className="h-4 w-4" />
            </button>
            <span className="min-w-14 px-1 text-center text-sm font-semibold text-ink">{day === todayIso() ? 'Hoy' : fmtDay(day)}</span>
            <button type="button" onClick={() => setDay((d) => addDays(d, 1))} disabled={usingRange} aria-label="Día siguiente" className="rounded-md p-1.5 text-navy hover:bg-surface">
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
          {day !== todayIso() && !usingRange && (
            <button type="button" onClick={() => setDay(todayIso())} className="rounded-xl bg-brand px-3 py-2 text-sm font-bold text-navy transition hover:brightness-95">
              Volver a hoy
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowRange((v) => !v)}
            aria-expanded={showRange || usingRange}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-navy sm:hidden"
          >
            {showRange || usingRange ? 'Ocultar rango de fechas' : 'Buscar por rango de fechas'}
          </button>
          <div className={`w-full items-center gap-2 sm:flex sm:w-auto ${showRange || usingRange ? 'flex' : 'hidden'}`}>
            <input type="date" value={rangeFrom} onChange={(e) => setRangeFrom(e.target.value)} aria-label="Desde" className="input-field min-w-0 flex-1 sm:w-auto sm:flex-none" />
            <span className="shrink-0 text-muted">–</span>
            <input type="date" value={rangeTo} onChange={(e) => setRangeTo(e.target.value)} aria-label="Hasta" className="input-field min-w-0 flex-1 sm:w-auto sm:flex-none" />
            {usingRange && (
              <button
                type="button"
                onClick={() => {
                  setRangeFrom('')
                  setRangeTo('')
                }}
                className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50"
              >
                Quitar rango
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Atajos por estado: lo primero que se mira en el día. */}
      {statusCounts && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
          {STATUS_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setStatus((cur) => (cur === k ? '' : k))}
              aria-pressed={status === k}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${STATUS_BADGE[k]} ${
                status === k ? 'ring-2 ring-navy/60' : 'opacity-90 hover:opacity-100'
              }`}
            >
              {ORDER_STATUS_LABELS[k]} <span className="rounded-full bg-white/70 px-1.5 tabular-nums">{statusCounts[k] || 0}</span>
            </button>
          ))}
        </div>
      )}

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
            <IconPrinter className="h-4 w-4" />
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
          <p className="text-sm text-muted">
            {search.trim()
              ? `No encontramos pedidos para «${search.trim()}». Revisa lo que escribiste o busca por número (#12), nombre o código.`
              : status || seller
                ? 'No hay pedidos con estos filtros. Prueba con «Todos los estados» o «Todos los vendedores».'
                : usingRange
                  ? 'No hay pedidos en ese rango de fechas.'
                  : day === todayIso()
                    ? 'Todavía no llegan pedidos hoy. Comparte tu link y aparecerán aquí solos, sin recargar.'
                    : 'No hay pedidos registrados este día. Usa las flechas o «Volver a hoy».'}
          </p>
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
                  <dt className="w-24 shrink-0 text-muted">Vendido por</dt>
                  <dd className="min-w-0 break-words text-ink">{o.sellerName || 'Dueño (tu link)'}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-muted">Entrega</dt>
                  <dd className="min-w-0 break-words text-ink">
                    <Destination order={o} />
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-muted">Fecha envío</dt>
                  <dd className="min-w-0 text-ink">{fmtShipDate(o.shippingDate)}</dd>
                </div>
              </dl>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => setPrintIds([o.id])} className="btn btn-outline flex-1 !py-2 text-xs">
                  <IconPrinter className="h-4 w-4" /> Imprimir etiqueta
                </button>
                {o.customerPhone && (
                  <RowIcon label="Avisar al cliente por WhatsApp" ok href={customerStatusWhatsAppUrl(o, merchant)}>
                    <IconWhatsapp className="h-4 w-4" />
                  </RowIcon>
                )}
                <SaleBell order={o} reminders={reminders} proEnabled={proEnabled} onClick={() => setReminderOrder(o)} />
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
          <table className="w-full min-w-[900px] text-left text-[13px]">
            <thead className="bg-surface text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="w-10 py-2 pr-1 pl-3">
                  <SelectBox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} disabled={!orders.length} label="Seleccionar todos los pedidos" />
                </th>
                <th className="px-3 py-2 font-semibold" title="Número del pedido en el día">N° día</th>
                <th className="px-3 py-2 font-semibold" title="Código de rastreo y hora en que el cliente llenó el formulario">Código y hora</th>
                <th className="px-3 py-2 font-semibold">Cliente</th>
                <th className="px-3 py-2 font-semibold" title="Quién compartió el link: el dueño o un vendedor">Vendido por</th>
                <th className="px-3 py-2 font-semibold" title="Cómo recibe el pedido, a dónde va y cuándo se envía">Entrega, destino y fecha</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="sticky right-0 bg-surface px-3 py-2 font-semibold shadow-[-8px_0_12px_-10px_rgba(7,29,45,.35)]">Acciones</th>
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
                    <span className="block font-mono text-brand-dark">{o.trackingCode}</span>
                    <span className="block text-[11px] text-muted">
                      <b className="font-semibold text-ink">{orderTimeLabel(o)}</b> · {orderDayLabel(o)}
                    </span>
                  </td>
                  <td className="min-w-[140px] px-3 py-2">
                    {o.customerName}
                    {o.customerPhone && <span className="block font-mono text-[11px] text-muted">{o.customerPhone}</span>}
                  </td>
                  <td className="px-3 py-2 text-xs whitespace-nowrap">
                    {o.sellerName ? (
                      <span className="rounded-full bg-brand/15 px-2 py-0.5 font-semibold text-brand-dark">{o.sellerName}</span>
                    ) : (
                      <span className="rounded-full bg-navy/10 px-2 py-0.5 font-semibold text-navy" title="Llegó por el link del dueño de la tienda">
                        Dueño
                      </span>
                    )}
                  </td>
                  <td className="max-w-[240px] min-w-[180px] px-3 py-2 text-xs">
                    <Destination order={o} />
                    <span className="mt-0.5 inline-block rounded-md bg-surface px-1.5 py-0.5 font-semibold text-ink">
                      📅 {o.deliveryMethod === 'store' ? 'Entrega' : 'Envío'}: {fmtShipDate(o.shippingDate)}
                    </span>
                  </td>
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
                  <td className={`sticky right-0 px-3 py-2 shadow-[-8px_0_12px_-10px_rgba(7,29,45,.35)] ${selected.has(o.id) ? 'bg-amber-50' : 'bg-white'}`}>
                    <div className="flex items-center gap-1.5">
                      <RowIcon label="Imprimir la etiqueta de envío" small onClick={() => setPrintIds([o.id])}>
                        <IconPrinter className="h-4 w-4" />
                      </RowIcon>
                      {o.customerPhone && (
                        <RowIcon label="Avisar al cliente por WhatsApp" small ok href={customerStatusWhatsAppUrl(o, merchant)}>
                          <IconWhatsapp className="h-4 w-4" />
                        </RowIcon>
                      )}
                      <SaleBell order={o} reminders={reminders} proEnabled={proEnabled} small onClick={() => setReminderOrder(o)} />
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
        <div
          role={notice.error ? 'alert' : 'status'}
          className={`animate-fade-in-up fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-xl ${notice.error ? 'bg-red-700' : 'bg-navy'}`}
        >
          {notice.error ? '⚠️' : '✓'} {notice.text}
        </div>
      )}
      {reminderOrder && (
        <SaleReminderDialog
          order={reminderOrder}
          merchant={merchant}
          locked={!proEnabled}
          onUpgrade={() => {
            setReminderOrder(null)
            onUpgrade?.()
          }}
          onClose={() => setReminderOrder(null)}
          onSaved={(text) => {
            setNotice({ text })
            setTimeout(() => setNotice(null), 4000)
          }}
        />
      )}
      {summaryOrder && (
        <OrderSummaryModal
          order={summaryOrder}
          onClose={() => setSummaryOrder(null)}
          onAmountSaved={(id, amount) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, amount } : o)))}
        />
      )}
      {toDelete && (
        <DeleteOrdersDialog orders={toDelete} businessName={merchant?.businessName} onClose={() => setToDelete(null)} onDeleted={handleDeleted} />
      )}
      {printIds && (
        <PrintLabelsModal orders={orders} initialSelected={printIds} merchant={merchant} onClose={() => setPrintIds(null)} />
      )}
    </div>
  )
}

/**
 * Campana de recordatorio de una venta. Amarilla (y con el día/hora en el
 * título) si la venta ya tiene recordatorio; con candado si el plan no es Pro.
 */
function SaleBell({ order, reminders, proEnabled, small, onClick }) {
  const rem = proEnabled ? reminderForOrder(reminders, order.id) : null
  const label = !proEnabled
    ? 'Recordatorio inteligente (plan Pro)'
    : rem
      ? `Recordatorio: ${dueLabel(rem.dueDate)} · ${timeLabel(rem.dueTime)}`
      : 'Crear recordatorio de esta venta'
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-xl border transition ${small ? 'h-8 w-8' : 'h-9 w-10'} ${
        rem ? 'border-brand-dark bg-brand text-navy' : 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100'
      }`}
    >
      <IconBell className={`h-4 w-4 ${rem ? 'bell-ring' : ''}`} />
      {!proEnabled && (
        <span className="absolute -right-1 -bottom-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-navy text-white">
          <IconLock className="h-2.5 w-2.5" />
        </span>
      )}
    </button>
  )
}

/** Tipo de entrega + a dónde va (agencia o dirección), para ubicar el pedido de un vistazo. */
function Destination({ order }) {
  const dest = orderDestination(order)
  return (
    <>
      <span className="block font-semibold text-ink">{deliveryMethodLabel(order)}</span>
      {order.deliveryMethod !== 'store' && <span className="block leading-snug break-words text-ink">{dest.main}</span>}
      {dest.detail && <span className="block leading-snug break-words text-muted">{dest.detail}</span>}
    </>
  )
}

function RowIcon({ label, onClick, href, danger, ok, small, children }) {
  // Fondo de color suave + borde marcado: en modo día los íconos sobre blanco
  // con borde gris claro casi no se veían.
  const cls = `inline-flex shrink-0 items-center justify-center rounded-xl border transition ${small ? 'h-8 w-8' : 'h-9 w-10'} ${
    danger
      ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
      : ok
        ? 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
        : 'border-slate-300 bg-slate-50 text-navy hover:bg-slate-100'
  }`
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} title={label} aria-label={label} className={cls}>
      {children}
    </button>
  )
}
