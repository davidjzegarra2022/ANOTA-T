import { useEffect, useMemo, useState } from 'react'
import { fetchMyOrders, ORDER_STATUS_LABELS } from '../../utils/orders'
import { fetchActivePlans, trialEndsAt } from '../../utils/plans'
import {
  buyerKey,
  countBy,
  destinationCity,
  dispatchChannel,
  foldOthers,
  ordersInPeriod,
  periodLabel,
  periodRange,
  periodSlug,
  shiftAnchor,
  timelineBuckets,
} from '../../utils/periods'
import { IconChevronLeft, IconChevronRight, IconRefresh } from '../icons'
import OrderSummaryModal from './OrderSummaryModal'
import OrdersReportCard from './OrdersReportCard'
import { ChartCard, HorizontalBars, PieChart, TimelineBars } from './PanelCharts'

// Un color por estado (mismos tonos que las pastillas de Envíos).
const STATUS_COLORS = {
  pending: '#f59e0b',
  packed: '#8b5cf6',
  shipped: '#2563eb',
  cancelled: '#ef4444',
}

// Color de cada canal de despacho: los couriers mantienen su color de
// marca; delivery y retiro en tienda tienen el suyo.
const CHANNEL_COLORS = {
  shalom: { color: '#dc2626' }, // rojo
  marvisur: { color: 'linear-gradient(90deg, #d7dce2, #9aa3ad)', dot: '#a3acb6' }, // plata
  emtrafesa: { color: '#2563eb' }, // azul
  flores: { color: '#facc15' }, // amarillo
  olva: { color: '#7c3aed' }, // morado
  delivery: { color: '#0d9488' }, // verde azulado
  store: { color: 'var(--viz-neutral)' },
}
const CITY_COLORS = ['var(--viz-1)', 'var(--viz-2)', 'var(--viz-3)', 'var(--viz-4)', 'var(--viz-5)']

const MODES = [
  ['day', 'Día'],
  ['week', 'Semana'],
  ['month', 'Mes'],
]
const PREV_LABEL = { day: 'ayer', week: 'la semana anterior', month: 'el mes anterior' }
const TIMELINE_TITLE = { day: 'Pedidos por hora', week: 'Pedidos por día de la semana', month: 'Pedidos por día del mes' }

function Segmented({ value, onChange, options, label }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-xl border border-slate-200 bg-surface p-1">
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${value === v ? 'seg-on bg-navy text-white shadow' : 'text-muted hover:text-navy'}`}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

export default function PanelProPage({ merchant }) {
  const [orders, setOrders] = useState(null)
  const [plan, setPlan] = useState(null)
  const [summaryOrder, setSummaryOrder] = useState(null)
  const [mode, setMode] = useState('week')
  const [basis, setBasis] = useState('created')
  const [anchor, setAnchor] = useState(() => new Date())

  useEffect(() => {
    fetchMyOrders().then(setOrders)
    fetchActivePlans().then((plans) => setPlan(plans.find((p) => p.id === merchant.planId) || null))
  }, [merchant.planId])

  const range = useMemo(() => periodRange(mode, anchor), [mode, anchor])
  const label = periodLabel(mode, range)
  const isCurrent = range.from <= new Date() && new Date() < range.to

  // Todo el panel sale de los pedidos del periodo elegido.
  const view = useMemo(() => {
    if (!orders) return null
    const rows = ordersInPeriod(orders, basis, range)
    const valid = rows.filter((o) => o.status !== 'cancelled')
    const prevRange = periodRange(mode, shiftAnchor(mode, range.from, -1))
    const prevValid = ordersInPeriod(orders, basis, prevRange).filter((o) => o.status !== 'cancelled')

    const cities = foldOthers(countBy(valid, destinationCity), 6).map((c, i) => ({
      ...c,
      color: c.key === '__others' ? 'var(--viz-other)' : CITY_COLORS[i % CITY_COLORS.length],
    }))
    const channels = countBy(valid, dispatchChannel).map((c) => ({ ...(CHANNEL_COLORS[c.key] || { color: 'var(--viz-neutral)' }), ...c }))
    const statuses = Object.entries(ORDER_STATUS_LABELS).map(([key, name]) => ({
      key,
      label: name,
      count: rows.filter((o) => o.status === key).length,
      color: STATUS_COLORS[key],
    }))
    const buyers = countBy(valid, (o) => {
      const key = buyerKey(o)
      return key ? { key, label: String(o.customerName || 'Sin nombre').trim() } : null
    })
    const repeat = buyers.filter((b) => b.count > 1).length

    return {
      rows,
      valid,
      prevCount: prevValid.length,
      timeline: timelineBuckets(mode, range, valid, basis),
      cities,
      channels,
      statuses,
      buyers,
      topBuyers: buyers.slice(0, 5).map((b) => ({ ...b, color: 'var(--viz-bar)' })),
      repeat,
      cancelled: rows.length - valid.length,
    }
  }, [orders, basis, range, mode])

  if (!view) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  const trialEnd = plan ? trialEndsAt(merchant, plan) : null
  const trialDaysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd - Date.now()) / 86400000)) : null
  const delta = view.valid.length - view.prevCount
  const topCity = view.cities.find((c) => c.key !== '__others')

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-navy sm:text-2xl">Panel Pro</h1>
        <p className="mt-1 text-sm text-muted">Elige día, semana o mes: la lista y todos los indicadores cambian con el periodo (los cancelados no cuentan como venta).</p>
      </div>

      {trialEnd && (
        <div className="card p-4">
          <p className="text-sm font-bold text-navy">Prueba gratuita</p>
          <p className="mt-1 text-xs text-muted">
            {trialDaysLeft > 0 ? `Te quedan ${trialDaysLeft} día${trialDaysLeft === 1 ? '' : 's'} de prueba.` : 'Tu prueba gratuita ya venció.'}
          </p>
        </div>
      )}

      {/* Periodo: manda sobre todo lo de abajo. */}
      <div className="card p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            label="Vista"
            value={mode}
            onChange={(v) => {
              setMode(v)
              setAnchor(new Date())
            }}
            options={MODES}
          />
          <Segmented
            label="Fecha"
            value={basis}
            onChange={setBasis}
            options={[
              ['created', 'Fecha de registro'],
              ['shipping', 'Fecha de envío'],
            ]}
          />
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5">
          <button type="button" aria-label="Periodo anterior" onClick={() => setAnchor((a) => shiftAnchor(mode, a, -1))} className="rounded-md p-1.5 text-muted hover:bg-surface">
            <IconChevronLeft className="h-4 w-4" />
          </button>
          <p className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-ink">{label}</p>
          {!isCurrent && (
            <button type="button" onClick={() => setAnchor(new Date())} className="rounded-md px-2 py-1 text-xs font-bold text-brand-dark hover:bg-surface">
              Hoy
            </button>
          )}
          <button type="button" aria-label="Periodo siguiente" onClick={() => setAnchor((a) => shiftAnchor(mode, a, 1))} className="rounded-md p-1.5 text-muted hover:bg-surface">
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Pedidos"
          value={view.valid.length}
          note={delta === 0 ? `Igual que ${PREV_LABEL[mode]}` : `${delta > 0 ? '▲ +' : '▼ '}${delta} vs ${PREV_LABEL[mode]}`}
          tone={delta > 0 ? 'up' : delta < 0 ? 'down' : null}
        />
        <StatCard label="Compradores" value={view.buyers.length} note={view.repeat ? `${view.repeat} compraron más de una vez` : 'distintos en el periodo'} />
        <StatCard label="Ciudad top" value={topCity ? topCity.label : '—'} note={topCity ? `${topCity.count} envío${topCity.count === 1 ? '' : 's'}` : 'sin envíos a ciudades'} small />
        <StatCard label="Cancelados" value={view.cancelled} note="no cuentan como venta" />
      </div>

      <ChartCard title={TIMELINE_TITLE[mode]} subtitle={mode === 'day' ? 'Según la hora en que el cliente registró su pedido.' : 'Cuántos pedidos hiciste en cada tramo del periodo.'}>
        <TimelineBars buckets={view.timeline} />
      </ChartCard>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Ciudades de destino" subtitle="Las más frecuentes y cuántas veces se envió a cada una.">
          <PieChart items={view.cities} />
        </ChartCard>
        <ChartCard title="Estado de los pedidos" subtitle="Incluye los cancelados del periodo.">
          <PieChart items={view.statuses} donut centerLabel="pedidos" />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Couriers y despacho" subtitle="Por agencia, delivery o despacho en tienda.">
          <HorizontalBars items={view.channels} />
        </ChartCard>
        <ChartCard title="Top compradores" subtitle="Quiénes más te compraron en el periodo.">
          <HorizontalBars items={view.topBuyers} />
        </ChartCard>
      </div>

      <OrdersReportCard
        orders={orders}
        rows={view.rows}
        label={label}
        slug={periodSlug(mode, range)}
        basis={basis}
        merchant={merchant}
        onOpenSummary={setSummaryOrder}
      />

      {summaryOrder && <OrderSummaryModal order={summaryOrder} onClose={() => setSummaryOrder(null)} />}
    </div>
  )
}

function StatCard({ label, value, note, tone, small }) {
  const noteColor = tone === 'up' ? 'text-emerald-700' : tone === 'down' ? 'text-red-600' : 'text-muted'
  return (
    <div className="card min-w-0 p-4">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className={`mt-1 truncate font-bold text-navy ${small ? 'text-lg leading-8' : 'text-2xl'}`} title={String(value)}>
        {value}
      </p>
      {note && <p className={`truncate text-[11px] font-semibold ${noteColor}`}>{note}</p>}
    </div>
  )
}
