import { useState } from 'react'

// Gráficos del Panel Pro en HTML/SVG puro (sin librerías): barras por
// tramo de tiempo, torta/dona con leyenda numérica y barras horizontales.
// Cada uno muestra el detalle al pasar el dedo o el mouse por encima, y la
// leyenda siempre lleva el número (el color nunca va solo).

export function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`card p-4 ${className}`}>
      <p className="text-sm font-bold text-navy">{title}</p>
      {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      {children}
    </div>
  )
}

function EmptyChart({ text = 'Sin pedidos en este periodo.' }) {
  return <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-muted">{text}</p>
}

const pctOf = (n, total) => (total ? Math.round((n / total) * 100) : 0)

/** Barras verticales: pedidos por hora, día de la semana o día del mes. */
export function TimelineBars({ buckets, unit = 'pedidos' }) {
  const [hover, setHover] = useState(null)
  const max = Math.max(0, ...buckets.map((b) => b.count))
  const total = buckets.reduce((n, b) => n + b.count, 0)
  if (!total) return <EmptyChart />
  const peak = buckets.reduce((best, b) => (b.count > best.count ? b : best), buckets[0])
  // Con muchos tramos se rotula uno de cada N para que no se encimen.
  const every = buckets.length > 24 ? 5 : buckets.length > 12 ? 3 : 1
  const shown = hover != null ? buckets[hover] : null
  const top = Math.max(1, max)

  return (
    <div className="mt-3">
      <p className="h-5 text-xs text-muted" aria-live="polite">
        {shown ? (
          <>
            <b className="text-ink">{shown.tip}</b> · {shown.count} {shown.count === 1 ? unit.replace(/s$/, '') : unit}
          </>
        ) : (
          <>
            Pico: <b className="text-ink">{peak.tip}</b> con {peak.count}
          </>
        )}
      </p>
      <div className="relative mt-1 h-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 border-t border-dashed" style={{ borderColor: 'var(--viz-grid)' }}>
          <span className="absolute -top-2 right-0 bg-white px-1 text-[10px] leading-none text-muted">{max}</span>
        </div>
        <div className="absolute inset-0 flex items-end gap-[2px] border-b" style={{ borderColor: 'var(--viz-grid)' }}>
          {buckets.map((b, i) => (
            <button
              key={b.key}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => setHover(i)}
              aria-label={`${b.tip}: ${b.count} ${unit}`}
              className="group flex h-full min-w-0 flex-1 items-end"
            >
              <span
                className="mx-auto block w-full max-w-[44px] rounded-t-[4px] transition-[height,opacity]"
                style={{
                  height: b.count ? `${Math.max(3, (b.count / top) * 100)}%` : '0%',
                  background: b === peak ? 'var(--viz-bar-hi)' : 'var(--viz-bar)',
                  opacity: hover == null || hover === i ? 1 : 0.45,
                }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-1 flex gap-[2px]">
        {buckets.map((b, i) => (
          <span key={b.key} className="min-w-0 flex-1 text-center text-[10px] leading-tight text-muted">
            {i % every === 0 ? b.label : ''}
          </span>
        ))}
      </div>
    </div>
  )
}

function arcPath(cx, cy, r, ri, a0, a1) {
  const p = (rad, a) => [cx + rad * Math.sin(a), cy - rad * Math.cos(a)]
  const large = a1 - a0 > Math.PI ? 1 : 0
  const [x0, y0] = p(r, a0)
  const [x1, y1] = p(r, a1)
  if (ri <= 0) return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`
  const [x2, y2] = p(ri, a1)
  const [x3, y3] = p(ri, a0)
  return `M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${ri},${ri} 0 ${large} 0 ${x3},${y3} Z`
}

/**
 * Torta (`donut=false`) o dona con leyenda: color, nombre, cantidad y %.
 * `items` = [{key, label, count, color}].
 */
export function PieChart({ items, donut = false, centerLabel = 'total' }) {
  const [hover, setHover] = useState(null)
  const total = items.reduce((n, i) => n + i.count, 0)
  if (!total) return <EmptyChart />
  const R = 80
  const RI = donut ? 50 : 0
  let a = 0
  const slices = items
    .filter((i) => i.count > 0)
    .map((i) => {
      const a0 = a
      a += (i.count / total) * Math.PI * 2
      return { ...i, a0, a1: a }
    })
  const active = hover ? slices.find((s) => s.key === hover) : null

  return (
    <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <svg viewBox="0 0 180 180" className="h-40 w-40 shrink-0" role="img" aria-label={slices.map((s) => `${s.label}: ${s.count}`).join(', ')}>
        {slices.length === 1 ? (
          <circle cx="90" cy="90" r={donut ? (R + RI) / 2 : R / 2} fill="none" stroke={slices[0].color} strokeWidth={donut ? R - RI : R} />
        ) : (
          slices.map((s) => (
            <path
              key={s.key}
              d={arcPath(90, 90, active?.key === s.key ? R + 4 : R, RI, s.a0, s.a1)}
              fill={s.color}
              stroke="var(--viz-gap)"
              strokeWidth="2"
              strokeLinejoin="round"
              opacity={active && active.key !== s.key ? 0.45 : 1}
              onMouseEnter={() => setHover(s.key)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setHover(s.key)}
              className="cursor-pointer transition-opacity"
            >
              <title>{`${s.label}: ${s.count} (${pctOf(s.count, total)}%)`}</title>
            </path>
          ))
        )}
        {donut && (
          <>
            <text x="90" y="88" textAnchor="middle" className="fill-current text-navy" style={{ fontSize: 26, fontWeight: 800 }}>
              {active ? active.count : total}
            </text>
            <text x="90" y="106" textAnchor="middle" className="fill-current text-muted" style={{ fontSize: 10.5, fontWeight: 600 }}>
              {active ? `${pctOf(active.count, total)}% · ${active.label}` : centerLabel}
            </text>
          </>
        )}
      </svg>
      <ul className="w-full min-w-0 flex-1 space-y-1">
        {items.map((i) => (
          <li
            key={i.key}
            onMouseEnter={() => setHover(i.key)}
            onMouseLeave={() => setHover(null)}
            className={`flex items-center gap-2 rounded-lg px-2 py-1 text-xs transition ${hover === i.key ? 'bg-surface' : ''}`}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: i.color }} />
            <span className="min-w-0 flex-1 truncate text-ink">{i.label}</span>
            <span className="font-bold text-navy tabular-nums">{i.count}</span>
            <span className="w-9 text-right text-muted tabular-nums">{pctOf(i.count, total)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Barras horizontales con % y cantidad (couriers / canal de despacho). */
export function HorizontalBars({ items }) {
  const total = items.reduce((n, i) => n + i.count, 0)
  if (!total) return <EmptyChart />
  const max = Math.max(...items.map((i) => i.count))
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((i) => {
        const pct = pctOf(i.count, total)
        return (
          <li key={i.key} title={`${i.label}: ${i.count} pedidos (${pct}%)`}>
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="flex min-w-0 items-center gap-1.5 font-semibold text-ink">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: i.dot || i.color }} />
                <span className="truncate">{i.label}</span>
              </span>
              <span className="shrink-0 text-muted tabular-nums">
                <b className="text-navy">{i.count}</b> · {pct}%
              </span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-surface">
              <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${Math.max(2, (i.count / max) * 100)}%`, background: i.color }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
