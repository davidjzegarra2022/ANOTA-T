import { useCallback, useEffect, useState } from 'react'
import { adminListActivity } from '../utils/adminMerchants'
import { IconRefresh } from './icons'

// Evento que disparan las pantallas de admin después de guardar algo, para
// que el registro se actualice al instante (además del refresco periódico).
export const ADMIN_ACTIVITY_EVENT = 'anota:admin-activity'

export function notifyAdminActivity() {
  window.dispatchEvent(new Event(ADMIN_ACTIVITY_EVENT))
}

const ADMIN_COLORS = ['#ffc400', '#8bd5ca', '#f5a97f', '#c6a0f6', '#a6da95']

function colorFor(name) {
  let h = 0
  for (const ch of String(name || '')) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return ADMIN_COLORS[h % ADMIN_COLORS.length]
}

function fmtDay(iso) {
  return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

/**
 * Ventana inferior del panel de administrador: fecha, hora, qué admin y qué
 * cambio hizo. Si nadie cambió nada, solo se ven los inicios de sesión. Lo
 * escribe la base de datos (admin_activity_log), no el navegador.
 */
export default function AdminActivityLog() {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(true)

  const load = useCallback(async () => {
    const res = await adminListActivity(150)
    setLoading(false)
    if (res.ok) {
      setEvents(res.events)
      setError(null)
    } else setError(res.error)
  }, [])

  useEffect(() => {
    load()
    const id = setInterval(load, 20000)
    window.addEventListener(ADMIN_ACTIVITY_EVENT, load)
    return () => {
      clearInterval(id)
      window.removeEventListener(ADMIN_ACTIVITY_EVENT, load)
    }
  }, [load])

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] text-slate-200 shadow-xl" aria-label="Registro de actividad de administradores">
      <header className="flex items-center gap-3 border-b border-white/10 bg-[#111c33] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <p className="min-w-0 flex-1 truncate font-mono text-xs font-semibold text-slate-300">
          registro-de-actividad — administradores
        </p>
        <span className="hidden items-center gap-1.5 font-mono text-[11px] text-emerald-300 sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> en vivo
        </span>
        <button type="button" onClick={load} aria-label="Actualizar registro" className="rounded-md p-1 text-slate-400 transition hover:bg-white/10 hover:text-white">
          <IconRefresh className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          {open ? 'ocultar' : 'mostrar'}
        </button>
      </header>

      {open && (
        <div className="max-h-72 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed">
          {loading ? (
            <p className="text-slate-400">cargando registro…</p>
          ) : error ? (
            <p className="text-red-300">✗ {error}</p>
          ) : events.length === 0 ? (
            <p className="text-slate-400">Sin actividad todavía. Aquí aparecerán los inicios de sesión y cada cambio de los administradores.</p>
          ) : (
            <ol className="space-y-1.5">
              {events.map((e) => {
                const isLogin = e.action === 'Inicio de sesión'
                return (
                  <li key={e.id} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="text-slate-400">{fmtDay(e.createdAt)}</span>
                    <span className="text-slate-300 tabular-nums">{fmtTime(e.createdAt)}</span>
                    <span className="font-bold" style={{ color: colorFor(e.adminName) }}>
                      {e.adminName}
                    </span>
                    <span className={isLogin ? 'text-slate-400' : 'font-semibold text-white'}>
                      {isLogin ? '→ inició sesión' : e.action}
                    </span>
                    {e.details && <span className="min-w-0 break-words text-slate-300">· {e.details}</span>}
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      )}
    </section>
  )
}
