import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  adminAdjustDays,
  adminListPayments,
  adminRegisterPayment,
  adminRestorePayment,
  adminVoidPayment,
  hasPaymentToday,
  limaTodayText,
} from '../utils/adminMerchants'
import { IconCheck, IconX } from './icons'

const METHODS = ['Yape', 'Plin', 'Transferencia', 'Efectivo', 'Otro']
const DAY_PRESETS = [7, 15, 30, 90]
const ADJUST_PRESETS = [-30, -7, -1, 1, 7, 30]
const DAY_MS = 86400000

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

function signed(n) {
  return n > 0 ? `+${n}` : `${n}`
}

function daysLeft(iso) {
  if (!iso) return null
  return Math.ceil((new Date(iso).getTime() - Date.now()) / DAY_MS)
}

/**
 * Registrar el pago de un cliente y ver su historial. Solo existe en /admin.
 * Al guardar: se le asigna el plan elegido, se suman los días de vigencia
 * (si renueva el mismo plan antes de vencer, se suman a lo que le queda) y
 * la tienda se reactiva si estaba bloqueada.
 *
 * - Si ya hubo un pago HOY, pide escribir la fecha de hoy para registrar otro
 *   (evita registrar el mismo pago dos veces por error).
 * - «Ajustar días» suma o resta días a mano, con motivo.
 * - Cualquier pago o ajuste se puede ANULAR (deja de contar) y RESTAURAR.
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
  const [paidUntil, setPaidUntil] = useState(merchant.paidUntil || null)
  // Palabra de seguridad para un segundo pago en el mismo día.
  const [needConfirm, setNeedConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  // Ajuste manual de días.
  const [adjDays, setAdjDays] = useState('')
  const [adjReason, setAdjReason] = useState('')
  const [adjBusy, setAdjBusy] = useState(false)
  const [adjMsg, setAdjMsg] = useState(null)
  // Anular / restaurar un movimiento del historial.
  const [voidingId, setVoidingId] = useState(null)
  const [voidReason, setVoidReason] = useState('')
  const [rowBusy, setRowBusy] = useState(null)
  const [rowMsg, setRowMsg] = useState(null)
  const today = limaTodayText()

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
    // ¿Segundo pago hoy? Primero hay que escribir la fecha de hoy.
    if (!needConfirm && hasPaymentToday(history)) {
      setNeedConfirm(true)
      return
    }
    if (needConfirm && confirmText.trim() !== today) {
      return setMsg({ ok: false, text: `Escribe exactamente la fecha de hoy: ${today}` })
    }
    setBusy(true)
    const res = await adminRegisterPayment({
      merchantId: merchant.id,
      planId: plan.id,
      days: d,
      amount: Number(amount) || 0,
      method,
      note,
      confirm: needConfirm ? confirmText.trim() : undefined,
    })
    setBusy(false)
    if (!res.ok) {
      if (res.duplicateToday) setNeedConfirm(true)
      return setMsg({ ok: false, text: res.error })
    }
    setMsg({ ok: true, text: `Pago registrado. ${merchant.businessName} queda con ${plan.name} hasta el ${fmtDate(res.payment?.period_end)}.` })
    if (res.payment?.period_end) setPaidUntil(res.payment.period_end)
    setNote('')
    setNeedConfirm(false)
    setConfirmText('')
    await loadHistory()
    onSaved?.()
  }

  const adjN = Math.round(Number(adjDays)) || 0
  const adjPreview = adjN ? new Date((paidUntil ? new Date(paidUntil).getTime() : Date.now()) + adjN * DAY_MS).toISOString() : null

  async function submitAdjust(e) {
    e.preventDefault()
    setAdjMsg(null)
    if (!adjN) return setAdjMsg({ ok: false, text: 'Indica cuántos días sumar (+) o restar (−).' })
    if (!adjReason.trim()) return setAdjMsg({ ok: false, text: 'Escribe el motivo del ajuste.' })
    setAdjBusy(true)
    const res = await adminAdjustDays({ merchantId: merchant.id, days: adjN, reason: adjReason.trim() })
    setAdjBusy(false)
    if (!res.ok) return setAdjMsg({ ok: false, text: res.error })
    if (res.payment?.period_end) setPaidUntil(res.payment.period_end)
    setAdjMsg({ ok: true, text: `Ajuste aplicado (${signed(adjN)} días). Ahora vence el ${fmtDate(res.payment?.period_end)}.` })
    setAdjDays('')
    setAdjReason('')
    await loadHistory()
    onSaved?.()
  }

  async function voidRow(p) {
    setRowMsg(null)
    setRowBusy(p.id)
    const res = await adminVoidPayment(p.id, voidReason.trim())
    setRowBusy(null)
    if (!res.ok) return setRowMsg({ ok: false, text: res.error })
    if (paidUntil) setPaidUntil(new Date(new Date(paidUntil).getTime() - p.days * DAY_MS).toISOString())
    setVoidingId(null)
    setVoidReason('')
    setRowMsg({ ok: true, text: `Anulado. Se ${p.days > 0 ? 'restaron' : 'devolvieron'} ${Math.abs(p.days)} días. Puedes restaurarlo cuando quieras.` })
    await loadHistory()
    onSaved?.()
  }

  async function restoreRow(p) {
    setRowMsg(null)
    setRowBusy(p.id)
    const res = await adminRestorePayment(p.id)
    setRowBusy(null)
    if (!res.ok) return setRowMsg({ ok: false, text: res.error })
    if (paidUntil) setPaidUntil(new Date(new Date(paidUntil).getTime() + p.days * DAY_MS).toISOString())
    setRowMsg({ ok: true, text: `Restaurado: vuelven a contar sus ${signed(p.days)} días.` })
    await loadHistory()
    onSaved?.()
  }

  const total = (history || []).filter((p) => p.kind !== 'adjustment' && !p.voidedAt).reduce((sum, p) => sum + p.amount, 0)
  const left = daysLeft(paidUntil)

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
          <div className="border-b border-slate-100 bg-surface px-5 py-3 text-sm">
            {paidUntil ? (
              <p>
                Servicio vigente hasta el <b className="text-ink">{fmtDate(paidUntil)}</b>{' '}
                <span className={left > 0 ? 'text-emerald-700' : 'font-semibold text-red-600'}>
                  ({left > 0 ? `quedan ${left} días` : 'vencido'})
                </span>
              </p>
            ) : (
              <p className="text-muted">Sin fecha de vencimiento todavía.</p>
            )}
          </div>

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
            {needConfirm && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-3">
                <p className="text-sm font-bold text-amber-900">⚠️ Ya registraste un pago hoy a esta tienda.</p>
                <label className="mt-1 block text-sm text-amber-900" htmlFor="pay-confirm">
                  ¿Deseas agregar un nuevo pago? Introduce la fecha actual <b className="font-mono">«{today}»</b> para continuar.
                </label>
                <input
                  id="pay-confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={today}
                  inputMode="numeric"
                  autoComplete="off"
                  autoFocus
                  className="input-field mt-2 font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    setNeedConfirm(false)
                    setConfirmText('')
                    setMsg(null)
                  }}
                  className="mt-2 text-xs font-semibold text-amber-900 underline"
                >
                  No, cancelar
                </button>
              </div>
            )}
            {msg && <p role="status" className={`text-sm font-semibold ${msg.ok ? 'text-emerald-600' : 'text-red-600'}`}>{msg.text}</p>}
            <button type="submit" disabled={busy || !plan || (needConfirm && confirmText.trim() !== today)} className="btn btn-primary w-full justify-center">
              <IconCheck className="h-4 w-4" />{' '}
              {busy ? 'Guardando…' : needConfirm ? 'Confirmar nuevo pago' : `Registrar pago y activar ${days || 0} días`}
            </button>
          </form>

          <form onSubmit={submitAdjust} className="space-y-3 border-t border-slate-100 px-5 py-4">
            <div>
              <p className="text-sm font-bold text-navy">Ajustar días de servicio</p>
              <p className="text-xs text-muted">Para corregir un error: suma (+) o resta (−) días. Queda en el historial y se puede anular.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {ADJUST_PRESETS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setAdjDays(String(d))}
                  className={`rounded-lg px-2.5 py-1.5 text-sm font-bold ${adjN === d ? (d < 0 ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white') : 'border border-slate-300 bg-white text-navy hover:bg-surface'}`}
                >
                  {signed(d)}
                </button>
              ))}
              <input
                type="number"
                min={-3650}
                max={3650}
                value={adjDays}
                onChange={(e) => setAdjDays(e.target.value)}
                placeholder="±días"
                aria-label="Días a sumar o restar"
                className="input-field w-24"
              />
            </div>
            <input value={adjReason} onChange={(e) => setAdjReason(e.target.value)} maxLength={200} placeholder="Motivo (ej. pago registrado dos veces)" aria-label="Motivo del ajuste" className="input-field" />
            {adjPreview && (
              <p className="text-xs text-muted">
                Pasará de <b className="text-ink">{fmtDate(paidUntil) === '—' ? 'hoy' : fmtDate(paidUntil)}</b> a <b className="text-ink">{fmtDate(adjPreview)}</b>.
              </p>
            )}
            {adjMsg && <p role="status" className={`text-sm font-semibold ${adjMsg.ok ? 'text-emerald-600' : 'text-red-600'}`}>{adjMsg.text}</p>}
            <button type="submit" disabled={adjBusy || !adjN || !adjReason.trim()} className="btn btn-outline w-full justify-center">
              {adjBusy ? 'Aplicando…' : adjN ? `Aplicar ajuste (${signed(adjN)} días)` : 'Aplicar ajuste'}
            </button>
          </form>

          <div className="border-t border-slate-100 px-5 py-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-bold text-navy">Historial</p>
              {history?.length > 0 && <p className="text-xs text-muted">Total pagado: <b className="text-ink">S/ {total.toFixed(2)}</b></p>}
            </div>
            {rowMsg && <p role="status" className={`mt-1 text-sm font-semibold ${rowMsg.ok ? 'text-emerald-600' : 'text-red-600'}`}>{rowMsg.text}</p>}
            {history === null ? (
              <p className="mt-2 text-sm text-muted">Cargando…</p>
            ) : history.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Todavía no hay pagos registrados.</p>
            ) : (
              <ul className="mt-2 divide-y divide-slate-100">
                {history.map((p) => {
                  const isAdj = p.kind === 'adjustment'
                  const voided = Boolean(p.voidedAt)
                  return (
                    <li key={p.id} className={`py-2 text-sm ${voided ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className={`font-semibold text-ink ${voided ? 'line-through' : ''}`}>
                            {isAdj ? `Ajuste ${signed(p.days)} días` : `${p.planName} · ${p.days} días`}
                          </p>
                          <p className="text-xs text-muted">
                            {isAdj ? 'Ajustado' : 'Pagó'} el {fmtDate(p.createdAt)} · {isAdj ? 'vencimiento' : 'cubre'} {fmtDate(p.periodStart)} → {fmtDate(p.periodEnd)}
                            {p.method ? ` · ${p.method}` : ''}
                          </p>
                          {p.note && <p className="text-xs break-words text-muted">{isAdj ? `Motivo: ${p.note}` : p.note}</p>}
                          {voided && (
                            <p className="text-xs font-semibold text-red-600">
                              Anulado el {fmtDate(p.voidedAt)}
                              {p.voidReason ? ` · ${p.voidReason}` : ''}
                            </p>
                          )}
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          {!isAdj && <p className={`font-mono font-bold text-ink ${voided ? 'line-through' : ''}`}>S/ {p.amount.toFixed(2)}</p>}
                          {voided ? (
                            <button type="button" disabled={rowBusy === p.id} onClick={() => restoreRow(p)} className="text-xs font-bold text-emerald-700 underline">
                              {rowBusy === p.id ? '…' : '↺ Restaurar'}
                            </button>
                          ) : (
                            voidingId !== p.id && (
                              <button
                                type="button"
                                onClick={() => {
                                  setVoidingId(p.id)
                                  setVoidReason('')
                                  setRowMsg(null)
                                }}
                                className="text-xs font-bold text-red-600 underline"
                              >
                                Anular
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      {voidingId === p.id && (
                        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-2">
                          <p className="text-xs text-red-800">
                            Se {p.days > 0 ? 'restarán' : 'devolverán'} <b>{Math.abs(p.days)} días</b> a la tienda. Podrás restaurarlo después.
                          </p>
                          <input
                            value={voidReason}
                            onChange={(e) => setVoidReason(e.target.value)}
                            maxLength={200}
                            placeholder="Motivo (opcional)"
                            aria-label="Motivo de la anulación"
                            className="input-field mt-1 !py-1.5 text-sm"
                          />
                          <div className="mt-2 flex gap-2">
                            <button type="button" disabled={rowBusy === p.id} onClick={() => voidRow(p)} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">
                              {rowBusy === p.id ? 'Anulando…' : 'Confirmar anulación'}
                            </button>
                            <button type="button" onClick={() => setVoidingId(null)} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-navy">
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
