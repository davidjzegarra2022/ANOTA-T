import { useEffect, useMemo, useState } from 'react'
import {
  REMINDER_CATEGORIES,
  REMINDER_FILTERS,
  categoryOf,
  countReminders,
  dayKey,
  dueLabel,
  filterReminders,
  groupReminders,
  loadReminders,
  newReminder,
  saveReminders,
  timeLabel,
} from '../../utils/reminders'
import { IconBell, IconCheck, IconChevronLeft, IconChevronRight, IconStar, IconTrash } from '../icons'

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre']

// Frases cortas que rotan por día: la app es una herramienta de trabajo, un
// empujoncito diario no le hace daño a nadie.
const TIPS = [
  'El que anota, despacha. El que improvisa, reenvía.',
  'Un recordatorio a tiempo evita un reclamo.',
  'Confirma el número de guía antes de cerrar el día.',
  'Los clientes que repiten agradecen un mensaje a tiempo.',
  'Pasos pequeños. Gran cambio.',
  'Revisa tus envíos pendientes antes de que cierre la agencia.',
  'Hoy es buen día para reactivar a un cliente dormido.',
]

/** Rejilla de 6 semanas (42 días) que empieza en lunes. */
function monthCells(base) {
  const first = new Date(base.getFullYear(), base.getMonth(), 1)
  const offset = (first.getDay() + 6) % 7
  const start = new Date(first)
  start.setDate(1 - offset)
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

export default function RecordatoriosPage({ merchant }) {
  const merchantId = merchant?.id
  const today = dayKey()
  const [items, setItems] = useState(() => loadReminders(merchantId))
  const [draft, setDraft] = useState({ text: '', date: today, time: '', category: 'envios', important: false })
  const [filter, setFilter] = useState('todos')
  const [dayFilter, setDayFilter] = useState(null)
  const [month, setMonth] = useState(() => new Date())
  const [error, setError] = useState(null)

  // Cada cambio se guarda de una: no hay botón "Guardar" ni estado sucio.
  useEffect(() => {
    saveReminders(merchantId, items)
  }, [items, merchantId])

  const counts = useMemo(() => countReminders(items, today), [items, today])

  const visible = useMemo(() => {
    const byFilter = filterReminders(items, filter, today)
    return dayFilter ? byFilter.filter((r) => r.dueDate === dayFilter) : byFilter
  }, [items, filter, dayFilter, today])

  const groups = useMemo(() => groupReminders(visible, today), [visible, today])

  const byDay = useMemo(() => {
    const map = new Map()
    for (const r of items) {
      if (!r.dueDate || r.done) continue
      map.set(r.dueDate, (map.get(r.dueDate) || 0) + 1)
    }
    return map
  }, [items])

  const tip = TIPS[(Math.floor(Date.parse(`${today}T00:00:00`) / 86400000) % TIPS.length + TIPS.length) % TIPS.length]

  function addReminder(e) {
    e?.preventDefault?.()
    const text = draft.text.trim()
    if (!text) {
      setError('Escribe qué tienes que recordar.')
      return
    }
    setError(null)
    setItems((list) => [...list, newReminder({ ...draft, text, dueDate: draft.date })])
    setDraft((d) => ({ ...d, text: '', time: '' }))
  }

  function toggle(id, patch) {
    setItems((list) => list.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  function remove(id) {
    setItems((list) => list.filter((r) => r.id !== id))
  }

  function selectDay(key) {
    setDayFilter((current) => (current === key ? null : key))
  }

  function shiftMonth(delta) {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1))
  }

  const cells = monthCells(month)
  const monthLabel = `${MONTHS[month.getMonth()].charAt(0).toUpperCase()}${MONTHS[month.getMonth()].slice(1)} de ${month.getFullYear()}`

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-navy sm:text-2xl">
            <IconBell className="h-5 w-5 text-brand-dark" /> Recordatorios
          </h1>
          <p className="mt-1 text-sm text-muted">
            Anota lo que no puede olvidarse: envíos por despachar, clientes que prometiste llamar, pagos y renovaciones.
          </p>
        </div>
        <p className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
          {counts.pendientes} pendiente{counts.pendientes === 1 ? '' : 's'}
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          {/* Alta rápida: texto + cuándo + de qué es. */}
          <form onSubmit={addReminder} className="card p-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={draft.text}
                onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))}
                placeholder="Ej.: Enviar 15 paquetes a Juan Ponce (Arequipa)"
                aria-label="Qué tienes que recordar"
                maxLength={160}
                className="input-field min-w-0 flex-1"
              />
              <button type="submit" className="btn btn-primary shrink-0">
                Añadir
              </button>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={draft.date}
                onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
                aria-label="Fecha"
                className="input-field w-auto min-w-0 max-w-full py-2 text-[13px]"
              />
              <input
                type="time"
                value={draft.time}
                onChange={(e) => setDraft((d) => ({ ...d, time: e.target.value }))}
                aria-label="Hora"
                className="input-field w-auto min-w-0 max-w-full py-2 text-[13px]"
              />
              <select
                value={draft.category}
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                aria-label="Categoría"
                className="input-field w-auto min-w-0 max-w-full py-2 text-[13px]"
              >
                {REMINDER_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, important: !d.important }))}
                aria-pressed={draft.important}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition ${
                  draft.important ? 'bg-brand text-navy' : 'bg-surface text-muted hover:bg-slate-200'
                }`}
              >
                <IconStar className="h-4 w-4" filled={draft.important} /> Importante
              </button>
            </div>

            {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
          </form>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            {REMINDER_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilter(f.id)
                  setDayFilter(null)
                }}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  filter === f.id ? 'bg-brand text-navy' : 'bg-white/70 text-muted hover:bg-slate-200'
                }`}
              >
                {f.label} {counts[f.id] ?? 0}
              </button>
            ))}
          </div>

          {dayFilter && (
            <div className="flex items-center justify-between rounded-xl border border-brand/40 bg-brand/10 px-3 py-2 text-xs font-semibold text-navy">
              <span>Mostrando {dueLabel(dayFilter, today).toLowerCase()}</span>
              <button type="button" onClick={() => setDayFilter(null)} className="text-muted underline">
                Quitar filtro
              </button>
            </div>
          )}

          {groups.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <IconBell className="mx-auto h-6 w-6 text-muted" />
              <p className="mt-2 text-sm text-muted">
                {items.length === 0
                  ? 'Todavía no hay recordatorios. Anota el primero arriba y aparecerá aquí.'
                  : 'Nada pendiente con este filtro.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <section key={group.id}>
                  <h2 className="mb-1.5 flex items-center gap-2 px-1 text-[11px] font-bold tracking-wide text-muted uppercase">
                    {group.label}
                    <span className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] font-bold text-muted">{group.items.length}</span>
                  </h2>
                  <ul className="card divide-y divide-slate-100 overflow-hidden">
                    {group.items.map((r) => (
                      <ReminderRow key={r.id} reminder={r} today={today} onToggle={toggle} onRemove={remove} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Columna lateral: calendario, resumen y la frase del día. */}
        <aside className="min-w-0 space-y-4">
          <div className="card p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-bold text-navy">{monthLabel}</p>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => shiftMonth(-1)} aria-label="Mes anterior" className="rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy">
                  <IconChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => shiftMonth(1)} aria-label="Mes siguiente" className="rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy">
                  <IconChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted">
              {WEEKDAYS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {cells.map((d) => {
                const key = dayKey(d)
                const otherMonth = d.getMonth() !== month.getMonth()
                const isToday = key === today
                const selected = key === dayFilter
                const count = byDay.get(key) || 0
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectDay(key)}
                    title={count ? `${count} recordatorio(s)` : undefined}
                    className={`relative flex h-8 flex-col items-center justify-center rounded-lg text-xs transition ${
                      selected
                        ? 'bg-navy font-bold text-white'
                        : isToday
                          ? 'bg-brand font-bold text-navy'
                          : otherMonth
                            ? 'text-slate-300 hover:bg-surface'
                            : 'text-ink hover:bg-surface'
                    }`}
                  >
                    {d.getDate()}
                    {count > 0 && (
                      <span className={`absolute bottom-0.5 h-1 w-1 rounded-full ${selected ? 'bg-white' : 'bg-brand-dark'}`} />
                    )}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-[11px] text-muted">Toca un día para ver solo sus recordatorios.</p>
          </div>

          <div className="card p-4">
            <p className="text-[11px] font-bold tracking-wide text-muted uppercase">Resumen</p>
            <dl className="mt-2 space-y-1.5 text-sm">
              {[
                ['Pendientes', counts.pendientes],
                ['Para hoy', counts.hoy],
                ['Importantes', counts.importantes],
                ['Listos', counts.listos],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-bold text-navy tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl bg-navy p-4 text-white">
            <p className="text-[11px] font-bold tracking-wide text-brand uppercase">Idea del día</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">“{tip}”</p>
          </div>

          <p className="px-1 text-[11px] leading-relaxed text-muted">
            Los recordatorios se guardan en este dispositivo, ligados a tu cuenta de tienda.
          </p>
        </aside>
      </div>
    </div>
  )
}

function ReminderRow({ reminder, today, onToggle, onRemove }) {
  const category = categoryOf(reminder.category)
  const overdue = !reminder.done && reminder.dueDate && reminder.dueDate < today
  const meta = [dueLabel(reminder.dueDate, today), timeLabel(reminder.dueTime)].filter(Boolean).join(' · ')

  return (
    <li className="group flex items-start gap-2.5 px-3 py-2.5 transition hover:bg-surface/70">
      <button
        type="button"
        onClick={() => onToggle(reminder.id, { done: !reminder.done })}
        aria-label={reminder.done ? 'Marcar como pendiente' : 'Marcar como hecho'}
        aria-pressed={reminder.done}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          reminder.done ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 text-transparent hover:border-brand-dark'
        }`}
      >
        <IconCheck className="h-3 w-3" />
      </button>

      <div className="min-w-0 flex-1">
        <p className={`text-sm leading-snug ${reminder.done ? 'text-muted line-through' : 'font-semibold text-ink'}`}>{reminder.text}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category.color }} />
            {category.label}
          </span>
          <span className={overdue ? 'font-bold text-red-600' : ''}>· {meta}</span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => onToggle(reminder.id, { important: !reminder.important })}
        aria-label={reminder.important ? 'Quitar de importantes' : 'Marcar como importante'}
        aria-pressed={reminder.important}
        className={`mt-0.5 rounded-lg p-1.5 transition ${
          reminder.important ? 'text-brand-dark' : 'text-slate-300 hover:text-brand-dark'
        }`}
      >
        <IconStar className="h-4 w-4" filled={reminder.important} />
      </button>

      <button
        type="button"
        onClick={() => onRemove(reminder.id)}
        aria-label="Eliminar recordatorio"
        className="mt-0.5 rounded-lg p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-600"
      >
        <IconTrash className="h-4 w-4" />
      </button>
    </li>
  )
}
