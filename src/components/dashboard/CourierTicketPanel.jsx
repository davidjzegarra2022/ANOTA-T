import { useState } from 'react'
import { consultCourier, updateCourierTicket } from '../../utils/orders'
import { IconRefresh, IconSearch } from '../icons'

const STATUS_STYLE = {
  'En origen': 'bg-slate-100 text-slate-700',
  'En tránsito': 'bg-blue-100 text-blue-700',
  'En destino': 'bg-amber-100 text-amber-800',
  Entregado: 'bg-emerald-100 text-emerald-700',
}

function fmtChecked(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('es-PE', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
}

/**
 * Ticket de Shalom de un pedido: N° de orden + código, y «Consultar en
 * Shalom» (bajo demanda). El estado que responde Shalom lo ve también el
 * cliente en su página de rastreo; los números del ticket no.
 */
export default function CourierTicketPanel({ order, onUpdated }) {
  const [number, setNumber] = useState(order.courierTrackingNumber || '')
  const [code, setCode] = useState(order.courierTrackingCode || '')
  const [saved, setSaved] = useState({ number: order.courierTrackingNumber || '', code: order.courierTrackingCode || '' })
  const [busy, setBusy] = useState(null) // 'save' | 'check'
  const [msg, setMsg] = useState(null)
  const [state, setState] = useState({ status: order.courierStatus, registered: order.courierRegisteredAt, delivered: order.courierDeliveredAt, checked: order.courierCheckedAt })
  const dirty = number !== saved.number || code !== saved.code

  async function save() {
    setBusy('save')
    setMsg(null)
    const res = await updateCourierTicket(order.id, number, code)
    setBusy(null)
    if (!res.ok) return setMsg({ ok: false, text: res.error })
    setSaved({ number: res.number, code: res.code })
    setState({ status: null, registered: null, delivered: null, checked: null })
    onUpdated?.({ courierTrackingNumber: res.number, courierTrackingCode: res.code, courierStatus: null, courierRegisteredAt: null, courierDeliveredAt: null, courierCheckedAt: null })
    setMsg({ ok: true, text: res.number ? 'Ticket guardado. Ya puedes consultar en Shalom.' : 'Ticket borrado.' })
  }

  async function check(force = false) {
    setBusy('check')
    setMsg(null)
    const res = await consultCourier(order.id, { force })
    setBusy(null)
    if (!res.ok) return setMsg({ ok: false, text: res.mensaje })
    const next = { status: res.estado, registered: res.registrado_el, delivered: res.entregado_el, checked: res.consultado_en }
    setState(next)
    onUpdated?.({ courierStatus: next.status, courierRegisteredAt: next.registered, courierDeliveredAt: next.delivered, courierCheckedAt: next.checked })
    setMsg({ ok: true, text: res.reused ? 'Consultado hace poco: este es el último estado (vuelve a consultar en unos minutos).' : 'Estado actualizado desde Shalom.' })
  }

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-surface p-3 print:hidden">
      <p className="text-[11px] font-bold tracking-wide text-muted uppercase">Guía de Shalom (del ticket)</p>
      <div className="mt-1.5 grid grid-cols-[1fr_6rem] gap-2">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
          inputMode="numeric"
          placeholder="N° de orden"
          aria-label="N° de orden de Shalom"
          className="input-field font-mono"
        />
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4))}
          placeholder="Código"
          aria-label="Código de Shalom"
          className="input-field font-mono uppercase"
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button type="button" onClick={save} disabled={!dirty || busy} className="btn btn-outline !py-2 text-sm">
          {busy === 'save' ? 'Guardando…' : 'Guardar'}
        </button>
        <button type="button" onClick={() => check(false)} disabled={dirty || !saved.number || busy} className="btn btn-primary !py-2 text-sm">
          {busy === 'check' ? <IconRefresh className="h-4 w-4 animate-spin" /> : <IconSearch className="h-4 w-4" />}
          {busy === 'check' ? 'Consultando… (unos segundos)' : 'Consultar en Shalom'}
        </button>
        {state.status && (
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLE[state.status] || 'bg-slate-100 text-slate-700'}`}>Shalom: {state.status}</span>
        )}
      </div>
      {state.status && (
        <p className="mt-1.5 text-[11px] text-muted">
          {state.registered ? `Registrado en Shalom ${state.registered}. ` : ''}
          {state.delivered ? `Entregado ${state.delivered}. ` : ''}
          Consultado el {fmtChecked(state.checked)} · Tu cliente lo ve en su página de rastreo.
        </p>
      )}
      {state.status === 'En destino' && <p className="mt-1 text-[11px] font-semibold text-amber-800">Recuérdale al cliente que para recoger necesita su DNI y la clave del envío, y que hay plazo de recojo.</p>}
      {msg && <p role="status" className={`mt-1.5 text-xs font-semibold ${msg.ok ? 'text-emerald-700' : 'text-red-600'}`}>{msg.text}</p>}
      <p className="mt-1.5 text-[10px] text-muted">Se consulta la página pública de rastreo de Shalom, un pedido a la vez y solo cuando tú lo pides.</p>
    </div>
  )
}
