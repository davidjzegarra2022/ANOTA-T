import { useEffect, useState } from 'react'
import { countdownLevel, formatCountdown } from '../../utils/subscription'
import { supportWhatsAppUrl } from '../../utils/support'
import { IconLock, IconLogout, IconSparkles, IconWhatsapp } from '../icons'

/** Hora actual que se actualiza sola (cada `ms`). */
function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(id)
  }, [ms])
  return now
}

const LEVEL_STYLE = {
  ok: 'border-slate-300 bg-white text-navy',
  soon: 'border-amber-400 bg-amber-50 text-amber-800',
  urgent: 'border-red-400 bg-red-50 text-red-700 animate-pulse',
  expired: 'border-red-500 bg-red-600 text-white',
}

function fmtDateTime(d) {
  return d.toLocaleString('es-PE', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
}

/**
 * Contador de uso en el encabezado del panel: cuánto le queda al plan, en
 * vivo. Toca para ir a «Mi plan». No se muestra si el plan no vence.
 */
export function CountdownChip({ deadline, kind, compact = false, onClick }) {
  const now = useNow(1000)
  if (!deadline) return null
  const left = deadline.getTime() - now
  const level = countdownLevel(left)
  const text = formatCountdown(left)
  const short = left <= 0 ? 'Vencido' : compact && left > 86400000 ? `${Math.floor(left / 86400000)}d` : text
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${kind === 'trial' ? 'Tu prueba gratis' : 'Tu plan'} vence el ${fmtDateTime(deadline)}`}
      aria-label={`Tiempo restante de tu plan: ${text}`}
      className={`inline-flex h-10 items-center gap-1.5 rounded-xl border px-2.5 font-mono text-xs font-bold tabular-nums transition ${LEVEL_STYLE[level]}`}
    >
      <span aria-hidden="true">⏳</span>
      {short}
    </button>
  )
}

/** Aviso cuando quedan 3 días o menos. */
export function ExpiryBanner({ deadline, kind, merchant, onPlans }) {
  const now = useNow(1000)
  if (!deadline) return null
  const left = deadline.getTime() - now
  const level = countdownLevel(left)
  if (level === 'ok' || level === 'expired') return null
  return (
    <div role="status" className={`mb-5 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center ${level === 'urgent' ? 'border-red-300 bg-red-50' : 'border-amber-300 bg-amber-50'}`}>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-bold ${level === 'urgent' ? 'text-red-700' : 'text-amber-900'}`}>
          {kind === 'trial' ? 'Tu prueba gratis' : 'Tu plan'} vence en <span className="font-mono tabular-nums">{formatCountdown(left)}</span>
        </p>
        <p className={`mt-0.5 text-[13px] ${level === 'urgent' ? 'text-red-700' : 'text-amber-900'}`}>
          Al llegar a cero se bloquea tu panel y tu formulario deja de recibir pedidos. Renueva ahora y no pierdas ventas.
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button type="button" onClick={onPlans} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-navy hover:bg-surface">
          Ver planes
        </button>
        <a
          href={supportWhatsAppUrl(kind === 'trial' ? 'upgrade' : 'renew', { merchant, daysLeft: Math.max(0, Math.ceil(left / 86400000)) })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-600"
        >
          <IconWhatsapp className="h-4 w-4" /> Renovar
        </a>
      </div>
    </div>
  )
}

/**
 * Bloqueo total: el plan llegó a cero (o la tienda no puede recibir
 * pedidos). Tapa todo el panel; solo deja contactar a soporte para
 * reactivar o contratar, ver los planes y cerrar sesión.
 */
export function SubscriptionLock({ kind, planName, deadline, merchant, onPlans, onLogout }) {
  const trial = kind === 'trial'
  return (
    <div role="alertdialog" aria-modal="true" aria-labelledby="lock-title" className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white text-center shadow-2xl">
        <div className="bg-navy px-6 py-6 text-white">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-600">
            <IconLock className="h-7 w-7" />
          </span>
          <p id="lock-title" className="mt-3 text-xl font-extrabold">
            {trial ? 'Tu prueba gratis terminó' : `Tu plan${planName ? ` ${planName}` : ''} venció`}
          </p>
          {deadline && <p className="mt-1 text-xs text-slate-300">Venció el {fmtDateTime(deadline)}</p>}
        </div>
        <div className="space-y-4 px-6 py-5">
          <p className="text-sm leading-relaxed text-ink">
            Tu panel está <b>bloqueado</b> y tu formulario <b>no está recibiendo pedidos</b>. Tus datos y pedidos siguen guardados: en cuanto
            {trial ? ' contrates un plan' : ' renueves'} vuelves a operar con todo.
          </p>
          <a
            href={supportWhatsAppUrl(trial ? 'upgrade' : 'renew', { merchant, daysLeft: 0 })}
            target="_blank"
            rel="noopener noreferrer"
            className="upgrade-cta flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 text-base font-extrabold text-white transition hover:bg-emerald-600"
          >
            <IconWhatsapp className="h-5 w-5" /> {trial ? 'Contratar el servicio' : 'Reactivar mi servicio'}
          </a>
          <button type="button" onClick={onPlans} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-navy hover:bg-surface">
            <IconSparkles className="h-4 w-4" /> Ver planes y precios
          </button>
          <button type="button" onClick={onLogout} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-red-600">
            <IconLogout className="h-3.5 w-3.5" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
