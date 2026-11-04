import { useCallback, useEffect, useRef, useState } from 'react'
import {
  dueSlot,
  isOverdue,
  loadAlertState,
  newOrdersSince,
  notificationsSupported,
  pendingReminders,
  saveAlertState,
  systemNotify,
  timedReminderDue,
} from '../../utils/alerts'
import { fetchMyOrders, limaTodayIso } from '../../utils/orders'
import { dueLabel, loadReminders, saveReminders, timeLabel } from '../../utils/reminders'
import { IconBell, IconCheck, IconX } from '../icons'

const POLL_MS = 60 * 1000

/** Día 'AAAA-MM-DD' (Lima) de una fecha ISO, para pedir pedidos desde ahí. */
function limaDayOf(iso) {
  return limaTodayIso(new Date(iso))
}

/**
 * Campanita del panel. Junta lo que pide atención:
 *  - recordatorios vencidos, de hoy o importantes (solo plan Pro);
 *  - pedidos nuevos desde la última vez que se miró Envíos.
 * Se mueve (animación) mientras haya algo pendiente, y abre una ventanita de
 * aviso al iniciar sesión, a las 9:00, 13:00 y 18:00, a la hora de cada
 * recordatorio y cuando entra un pedido.
 */
export default function NotificationBell({ merchant, remindersEnabled, currentTab, onGoTo, compact = false }) {
  const merchantId = merchant.id
  const [reminders, setReminders] = useState(() => loadReminders(merchantId))
  const [newOrders, setNewOrders] = useState([])
  const [open, setOpen] = useState(false)
  const [popup, setPopup] = useState(null)
  const [permission, setPermission] = useState(() => (notificationsSupported() ? Notification.permission : 'unsupported'))
  const stateRef = useRef(loadAlertState(merchantId))
  const knownIds = useRef(null)
  const boxRef = useRef(null)
  // El temporizador lee siempre la pestaña y el plan actuales.
  const tabRef = useRef(currentTab)
  const enabledRef = useRef(remindersEnabled)
  tabRef.current = currentTab
  enabledRef.current = remindersEnabled

  const pending = remindersEnabled ? pendingReminders(reminders) : []
  const count = pending.length + newOrders.length

  const persist = useCallback((patch) => {
    stateRef.current = saveAlertState(merchantId, { ...stateRef.current, ...patch })
  }, [merchantId])

  // La lista de recordatorios cambia desde la pestaña Recordatorios (o desde
  // aquí mismo): se relee sin pisar nada.
  useEffect(() => {
    const reload = () =>
      setReminders((cur) => {
        const next = loadReminders(merchantId)
        return JSON.stringify(next) === JSON.stringify(cur) ? cur : next
      })
    window.addEventListener('anotat-reminders', reload)
    window.addEventListener('storage', reload)
    return () => {
      window.removeEventListener('anotat-reminders', reload)
      window.removeEventListener('storage', reload)
    }
  }, [merchantId])

  // Mirar Envíos = pedidos vistos.
  useEffect(() => {
    if (currentTab === 'envios') {
      persist({ ordersSeenAt: new Date().toISOString() })
      setNewOrders([])
    }
  }, [currentTab, persist])

  const tick = useCallback(
    async (first = false) => {
      const now = new Date()
      if (!stateRef.current.ordersSeenAt) persist({ ordersSeenAt: now.toISOString() })
      const seenAt = stateRef.current.ordersSeenAt

      // --- Pedidos --------------------------------------------------------
      const rows = await fetchMyOrders({ createdFrom: limaDayOf(seenAt) })
      const fresh = tabRef.current === 'envios' ? [] : newOrdersSince(rows, seenAt)
      setNewOrders(fresh)
      const ids = new Set(rows.map((o) => o.id))
      if (knownIds.current) {
        const arrived = rows.filter((o) => !knownIds.current.has(o.id))
        if (arrived.length) {
          // Envíos se refresca solo, y se avisa aunque se esté en otra pestaña.
          window.dispatchEvent(new Event('anotat-orders-changed'))
          const who = arrived[0].customerName || 'un cliente'
          const title = arrived.length === 1 ? `Nuevo pedido de ${who}` : `${arrived.length} pedidos nuevos`
          const body = arrived.length === 1 ? `${arrived[0].trackingCode || ''} · ${arrived[0].sellerName ? `vía ${arrived[0].sellerName}` : 'desde tu link'}` : `El último es de ${who}.`
          systemNotify(title, body)
          setPopup({ kind: 'order', title, lines: [body], at: Date.now() })
        }
      }
      knownIds.current = ids

      // --- Recordatorios --------------------------------------------------
      const list = loadReminders(merchantId)
      const on = enabledRef.current
      const pend = on ? pendingReminders(list) : []
      const timed = on ? timedReminderDue(list, now, stateRef.current.notified) : []
      const slot = dueSlot(now, stateRef.current.shown)

      if (first) {
        // Al iniciar sesión: un solo aviso con todo, y el turno y los
        // recordatorios con hora de este momento cuentan como avisados.
        persist({ shown: slot ? [...stateRef.current.shown, slot] : stateRef.current.shown, notified: [...stateRef.current.notified, ...timed.map((r) => r.id)] })
        let flag = null
        try {
          flag = sessionStorage.getItem(`anotat-login-alert:${merchantId}`)
          sessionStorage.setItem(`anotat-login-alert:${merchantId}`, '1')
        } catch {
          // sin sessionStorage
        }
        if (!flag && (pend.length || fresh.length)) {
          setPopup({
            kind: 'login',
            title: 'Tienes pendientes',
            lines: [
              ...(fresh.length ? [`${fresh.length} pedido${fresh.length === 1 ? '' : 's'} nuevo${fresh.length === 1 ? '' : 's'} desde tu última visita`] : []),
              ...pend.slice(0, 3).map((r) => r.text),
            ],
            more: Math.max(0, pend.length - 3),
          })
        }
        return
      }

      if (timed.length) {
        persist({ notified: [...stateRef.current.notified, ...timed.map((r) => r.id)] })
        const r = timed[0]
        systemNotify(`⏰ ${r.text}`, `Recordatorio de las ${timeLabel(r.dueTime)}`)
        setPopup({ kind: 'timed', title: 'Es hora de tu recordatorio', lines: timed.map((t) => `${timeLabel(t.dueTime)} · ${t.text}`) })
      } else if (slot) {
        persist({ shown: [...stateRef.current.shown, slot] })
        if (pend.length) {
          systemNotify('Tienes recordatorios pendientes', pend.slice(0, 3).map((x) => x.text).join(' · '))
          setPopup({ kind: 'slot', title: `Tienes ${pend.length} pendiente${pend.length === 1 ? '' : 's'}`, lines: pend.slice(0, 3).map((x) => x.text), more: Math.max(0, pend.length - 3) })
        }
      }
    },
    [merchantId, persist],
  )

  useEffect(() => {
    tick(true)
    // Con la pestaña oculta se sigue revisando solo si hay permiso para
    // avisar fuera del navegador (si no, nadie vería el aviso).
    const id = setInterval(() => {
      const canNotify = notificationsSupported() && Notification.permission === 'granted'
      if (document.visibilityState === 'visible' || canNotify) tick(false)
    }, POLL_MS)
    return () => clearInterval(id)
  }, [tick])

  // Los avisos de pedido se cierran solos; los de recordatorios esperan.
  useEffect(() => {
    if (popup?.kind !== 'order') return
    const t = setTimeout(() => setPopup(null), 9000)
    return () => clearTimeout(t)
  }, [popup])

  // Cerrar el panel al tocar fuera.
  useEffect(() => {
    if (!open) return
    const close = (e) => boxRef.current && !boxRef.current.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  function markDone(id) {
    const next = loadReminders(merchantId).map((r) => (r.id === id ? { ...r, done: true } : r))
    saveReminders(merchantId, next)
    setReminders(next)
  }

  async function askPermission() {
    try {
      setPermission(await Notification.requestPermission())
    } catch {
      // el navegador no dejó pedir permiso
    }
  }

  function go(tab) {
    setOpen(false)
    setPopup(null)
    onGoTo(tab)
  }

  const ringing = count > 0

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={count ? `Avisos: ${count} pendiente${count === 1 ? '' : 's'}` : 'Avisos'}
        aria-expanded={open}
        title="Avisos"
        className={`relative flex items-center justify-center rounded-xl border transition ${compact ? 'h-10 w-10' : 'h-11 w-11'} ${
          ringing ? 'border-brand bg-brand/15 text-navy' : 'border-slate-300 bg-white text-navy hover:bg-surface'
        }`}
      >
        <IconBell className={`h-5.5 w-5.5 ${ringing ? 'bell-ring' : ''}`} />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-extrabold text-white shadow ring-2 ring-white">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed top-16 right-3 left-3 z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-2xl sm:absolute sm:top-auto sm:right-0 sm:left-auto sm:mt-2 sm:w-[22rem]">
          <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
            <p className="text-sm font-bold">Avisos</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar avisos" className="rounded-lg p-1 text-slate-300 hover:bg-white/10 hover:text-white">
              <IconX className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {newOrders.length > 0 && (
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-[11px] font-bold tracking-wide text-muted uppercase">Pedidos nuevos · {newOrders.length}</p>
                <ul className="mt-1.5 space-y-1">
                  {newOrders.slice(0, 4).map((o) => (
                    <li key={o.id} className="truncate text-sm text-ink">🛍️ {o.customerName}{o.sellerName ? <span className="text-muted"> · {o.sellerName}</span> : null}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => go('envios')} className="btn btn-primary mt-2 w-full justify-center !py-2 text-sm">
                  Ver en Envíos
                </button>
              </div>
            )}
            {remindersEnabled && (
              <div className="px-4 py-3">
                <p className="text-[11px] font-bold tracking-wide text-muted uppercase">Recordatorios pendientes · {pending.length}</p>
                {pending.length === 0 ? (
                  <p className="mt-1.5 text-sm text-muted">Nada pendiente por ahora. 🎉</p>
                ) : (
                  <ul className="mt-1.5 space-y-1.5">
                    {pending.slice(0, 6).map((r) => (
                      <li key={r.id} className="flex items-start gap-2">
                        <button
                          type="button"
                          onClick={() => markDone(r.id)}
                          aria-label={`Marcar como listo: ${r.text}`}
                          title="Marcar como listo"
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-slate-400 text-transparent transition hover:border-emerald-600 hover:text-emerald-600"
                        >
                          <IconCheck className="h-3 w-3" />
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-snug break-words text-ink">{r.text}</p>
                          <p className={`text-[11px] font-semibold ${isOverdue(r) ? 'text-red-600' : 'text-muted'}`}>
                            {isOverdue(r) ? 'Vencido · ' : ''}
                            {dueLabel(r.dueDate)}
                            {r.dueTime ? ` · ${timeLabel(r.dueTime)}` : ''}
                            {r.important ? ' · ★ importante' : ''}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <button type="button" onClick={() => go('recordatorios')} className="btn btn-outline mt-2.5 w-full justify-center !py-2 text-sm">
                  Ver todos los recordatorios
                </button>
              </div>
            )}
            {!remindersEnabled && newOrders.length === 0 && <p className="px-4 py-4 text-sm text-muted">Sin avisos nuevos. Aquí verás los pedidos que lleguen.</p>}
          </div>
          {permission === 'default' && (
            <div className="border-t border-slate-100 bg-surface px-4 py-2.5">
              <button type="button" onClick={askPermission} className="text-xs font-bold text-brand-dark hover:underline">
                🔔 Recibir avisos aunque la pestaña esté cerrada o minimizada
              </button>
            </div>
          )}
        </div>
      )}

      {popup && (
        <div
          role="alert"
          className="animate-fade-in-up fixed top-4 right-4 left-4 z-[70] mx-auto max-w-sm overflow-hidden rounded-2xl border border-brand bg-white text-left shadow-2xl sm:left-auto"
        >
          <div className="flex items-start gap-3 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-navy">
              <IconBell className="bell-ring h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-navy">{popup.title}</p>
              <ul className="mt-1 space-y-0.5">
                {popup.lines.map((l, i) => (
                  <li key={i} className="truncate text-[13px] text-ink">• {l}</li>
                ))}
                {popup.more > 0 && <li className="text-[12px] text-muted">y {popup.more} más…</li>}
              </ul>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => go(popup.kind === 'order' || (popup.kind === 'login' && newOrders.length && !pending.length) ? 'envios' : 'recordatorios')}
                  className="btn btn-primary !px-3 !py-1.5 text-xs"
                >
                  {popup.kind === 'order' ? 'Ver pedido' : 'Revisar ahora'}
                </button>
                <button type="button" onClick={() => setPopup(null)} className="btn btn-outline !px-3 !py-1.5 text-xs">
                  Más tarde
                </button>
              </div>
            </div>
            <button type="button" onClick={() => setPopup(null)} aria-label="Cerrar aviso" className="shrink-0 rounded-lg p-1 text-muted hover:bg-surface hover:text-navy">
              <IconX className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
