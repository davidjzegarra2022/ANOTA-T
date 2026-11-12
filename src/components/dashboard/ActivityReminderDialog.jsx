import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { REMINDER_CATEGORIES, dayKey, newReminder } from '../../utils/reminders'
import { IconBell, IconCalendar, IconStar, IconX } from '../icons'

const pad = (n) => String(n).padStart(2, '0')

/** Próximo cuarto de hora, con 30 minutos de margen, como hora por defecto. */
function defaultWhen() {
  const d = new Date(Date.now() + 30 * 60000)
  d.setSeconds(0, 0)
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15)
  return { date: dayKey(d), time: `${pad(d.getHours())}:${pad(d.getMinutes())}` }
}

/**
 * Cuadro "Recordar una actividad": crea un recordatorio normal (misma lógica
 * que los de la lista) con día, hora, categoría y marca de importante. Así
 * entra a los avisos de la campanita: 6 h antes y a la hora exacta.
 */
export default function ActivityReminderDialog({ onCreate, onClose }) {
  const when = useRef(defaultWhen()).current
  const [text, setText] = useState('')
  const [date, setDate] = useState(when.date)
  const [time, setTime] = useState(when.time)
  const [category, setCategory] = useState('general')
  const [important, setImportant] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const today = dayKey()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function submit(e) {
    e.preventDefault()
    const value = text.trim()
    if (!value) {
      setError('Escribe qué actividad quieres recordar.')
      return
    }
    const [y, m, d] = date.split('-').map(Number)
    const [h, mi] = String(time).split(':').map(Number)
    if (!y || !m || !d || Number.isNaN(h) || Number.isNaN(mi)) {
      setError('Elige el día y la hora de la actividad.')
      return
    }
    if (new Date(y, m - 1, d, h, mi) < new Date(Date.now() - 60000)) {
      setError('Esa fecha y hora ya pasaron: elige una próxima.')
      return
    }
    setError(null)
    onCreate(newReminder({ text: value, dueDate: date, dueTime: time, category, important }))
    onClose()
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-rem-title"
      className="fixed inset-0 z-[85] flex items-end justify-center bg-navy/70 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[94vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start gap-3 bg-navy px-5 py-4 text-white">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-navy">
            <IconBell className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold tracking-wide text-brand uppercase">Recordar una actividad</p>
            <p id="activity-rem-title" className="text-base font-bold">¿Qué no puedes olvidar?</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white">
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3.5 overflow-y-auto px-5 py-4">
          <label className="block">
            <span className="mb-1 block text-[11px] font-extrabold tracking-wide text-muted uppercase">Actividad</span>
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={160}
              placeholder="Ej.: Llamar a la agencia por el lote de Arequipa"
              aria-label="Actividad a recordar"
              className="input-field text-sm"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1 flex items-center gap-1 text-[11px] font-extrabold tracking-wide text-muted uppercase">
                <IconCalendar className="h-3.5 w-3.5" /> Día
              </span>
              <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} className="input-field text-sm" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-extrabold tracking-wide text-muted uppercase">Hora</span>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input-field text-sm" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-extrabold tracking-wide text-muted uppercase">Categoría</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field text-sm">
                {REMINDER_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="block">
              <span className="mb-1 block text-[11px] font-extrabold tracking-wide text-muted uppercase">Prioridad</span>
              <button
                type="button"
                onClick={() => setImportant((v) => !v)}
                aria-pressed={important}
                className={`inline-flex h-[42px] w-full items-center justify-center gap-1.5 rounded-xl px-3 text-[13px] font-semibold transition ${
                  important ? 'bg-brand text-navy' : 'bg-surface text-muted hover:bg-slate-200'
                }`}
              >
                <IconStar className="h-4 w-4" filled={important} /> Importante
              </button>
            </div>
          </div>

          <p className="rounded-xl bg-surface px-3 py-2 text-[11.5px] leading-relaxed text-muted">
            Te avisamos <b className="text-navy">6 horas antes</b> y otra vez <b className="text-navy">a la hora exacta</b>. Se guarda en tu lista y se
            sincroniza con tu cuenta.
          </p>

          {error && (
            <p role="alert" className="text-sm font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-3">
          <button type="submit" className="btn btn-primary flex-1 justify-center">
            <IconBell className="h-4 w-4" /> Guardar recordatorio
          </button>
          <button type="button" onClick={onClose} className="btn btn-outline justify-center">
            Cancelar
          </button>
        </div>
      </form>
    </div>,
    document.body,
  )
}
