import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { adminListPayments, adminRegisterPayment } from '../utils/adminMerchants'
import { IconCheck, IconX } from './icons'

const METHODS = ['Yape', 'Plin', 'Transferencia', 'Efectivo', 'Otro']
const DAY_PRESETS = [7, 15, 30, 90]

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

/**
 * Registrar el pago de un cliente y ver su historial. Solo existe en /admin.
 * Al guardar: se le asigna el plan elegido, se suman los días de vigencia
 * (si renueva el mismo plan antes de vencer, se suman a lo que le queda) y
 * la tienda se reactiva si estaba bloqueada.
 */
export default function AdminPaymentsDialog({ merchant, plans, onClose, onSaved }) {
  const paidPlans = plans.filter((p) => !p.trialDays)
  const initialPlan = paidPlans.find((p) => p.id === merchant.planId) || paidPlans[paidPlans.length - 1] || null
  const [planId, setPlanId] = useState(initialPlan?.id || '')
  const [days, setDays] = useState(30)
  const plan = paidPlans.find((p) => p.id === Number(planId)) || null
  const [amount, setAmount] = useState(() => (initialPlan ? (initialPlan.pricePerDay * 30).toFixed(2) : '0'))
  const [amountTouched, setAmountTouched] = useState(false)
  const [method, setMethod] = useState('Yape')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)
  const [history, setHistory] = useState(null)

  async function loadHistory() {
    const res = await adminListPayments(merchant.id)
    setHistory(res.ok ? res.payments : [])
  }
  useEffect(() => {
    loadHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo al abrir
  }, [merchant.id])

  // El monto se sugiere solo (precio por día × días) hasta que el admin lo cambie.
  useEffect(() => {
    if (!amountTouched && plan) setAmount((plan.pricePerDay * (Number(days) || 0)).toFixed(2))
  }, [plan, days, amountTouched])

  async function submit(e) {
    e.preventDefault()
    setMsg(null)
    if (!plan) return setMsg({ ok: false, text: 'Elige el plan que pagó.' })
    const d = Math.round(Number(days))
    if (!d || d < 1) return setMsg({ ok: false, text: 'Indica cuántos días pagó.' })
    setBusy(true)
    const res = await adminRegisterPayment({ merchantId: merchant.id, planId: plan.id, days: d, amount: Number(amount) || 0, method, note })
    setBusy(false)
    if (!res.ok) return setMsg({ ok: false, text: res.error })
    setMsg({ ok: true, text: `Pago registrado. ${merchant.businessName} queda con ${plan.name} hasta el ${fmtDate(res.payment?.period_end)}.` })
    setNote('')
    await loadHistory()
    onSaved?.()
  }

  const total = (history || []).reduce((sum, p) => sum + p.amount, 0)

  // Se monta en <body>: dentro del panel, un contenedor con efecto de vidrio
  // atrapaba el «fixed» y el diálogo se cortaba.
  return createPortal(
    <div role="dialog" aria-modal="true" aria-labelledby="pay-title" className="fixed inset-0 z-[90] flex items-end justify-center bg-navy/70 p-0 sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-start gap-3 bg-navy px-5 py-4 text-white">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold tracking-wide text-brand uppercase">Pagos</p>
            <p id="pay-title" className="truncate text-lg font-bold">{merchant.businessName}</p>
            <p className="truncate text-xs text-slate-300">{merchant.email}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white">
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <form onSubmit={submit} className="space-y-3 px-5 py-4">
            <p className="text-sm font-bold text-navy">Registrar pago</p>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted uppercase">Plan que pagó</span>
              <select value={planId} onChange={(e) => setPlanId(e.target.value)} className="input-field">
                {paidPlans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · S/ {p.pricePerDay.toFixed(2)} al día
                  </option>
                ))}
              </select>
            </label>
            <div>
              <span className="mb-1 block text-xs font-semibold text-muted uppercase">Días pagados</span>
              <div className="flex flex-wrap items-center gap-2">
                {DAY_PRESETS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-bold ${Number(days) === d ? 'bg-brand text-navy' : 'border border-slate-300 bg-white text-navy hover:bg-surface'}`}
                  >
                    {d} días
                  </button>
                ))}
                <input type="number" min={1} max={3650} value={days} onChange={(e) => setDays(e.target.value)} aria-label="Otro número de días" className="input-field w-24" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted uppercase">Monto (S/)</span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    setAmountTouched(true)
                  }}
                  className="input-field"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted uppercase">Método</span>
                <select value={method} onChange={(e) => setMethod(e.target.value)} className="input-field">
                  {METHODS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted uppercase">Nota (opcional)</span>
              <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} placeholder="Ej. N° de operación Yape 123456" className="input-field" />
            </label>
            {msg && <p role="status" className={`text-sm font-semibold ${msg.ok ? 'text-emerald-600' : 'text-red-600'}`}>{msg.text}</p>}
            <button type="submit" disabled={busy || !plan} className="btn btn-primary w-full justify-center">
              <IconCheck className="h-4 w-4" /> {busy ? 'Guardando…' : `Registrar pago y activar ${days || 0} días`}
            </button>
          </form>

          <div className="border-t border-slate-100 px-5 py-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-bold text-navy">Historial</p>
              {history?.length > 0 && <p className="text-xs text-muted">Total pagado: <b className="text-ink">S/ {total.toFixed(2)}</b></p>}
            </div>
            {history === null ? (
              <p className="mt-2 text-sm text-muted">Cargando…</p>
            ) : history.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Todavía no hay pagos registrados.</p>
            ) : (
              <ul className="mt-2 divide-y divide-slate-100">
                {history.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-3 py-2 text-sm">
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        {p.planName} · {p.days} días
                      </p>
                      <p className="text-xs text-muted">
                        Pagó el {fmtDate(p.createdAt)} · cubre {fmtDate(p.periodStart)} → {fmtDate(p.periodEnd)}
                        {p.method ? ` · ${p.method}` : ''}
                      </p>
                      {p.note && <p className="text-xs break-words text-muted">{p.note}</p>}
                    </div>
                    <p className="shrink-0 font-mono font-bold text-ink">S/ {p.amount.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
