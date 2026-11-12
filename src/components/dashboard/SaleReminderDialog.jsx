import { useState } from 'react'
import { createPortal } from 'react-dom'
import { copyText } from '../../utils/clipboard'
import { dayKey, dueLabel, loadReminders, newReminder, reminderForOrder, saveReminders, timeLabel } from '../../utils/reminders'
import { saleSummary, suggestSaleReminder } from '../../utils/saleReminders'
import { buildWhatsAppUrl } from '../../utils/whatsapp'
import { IconBell, IconCheck, IconCopy, IconLock, IconSparkles, IconTrash, IconWhatsapp, IconX } from '../icons'

const NOTE_MAX = 140

function phoneWithCc(phone) {
  const d = String(phone || '').replace(/\D/g, '')
  if (!d) return ''
  return d.length <= 9 ? `51${d}` : d
}

/**
 * Recordatorio inteligente de una venta (Envíos → campana). Solo plan Pro.
 * Muestra RESUMEN BREVE, TELÉFONO y NOTA BREVE, y pregunta si se agrega la
 * venta a Recordatorios, con fecha y hora sugeridas según el pedido.
 */
export default function SaleReminderDialog({ order, merchant, locked = false, onUpgrade, onClose, onSaved }) {
  const summary = saleSummary(order, { currency: 'S/' })
  const suggestion = suggestSaleReminder(order, { cutoffHour: merchant?.cutoffHour })
  const existing = reminderForOrder(loadReminders(merchant?.id), order.id)

  const [note, setNote] = useState(existing?.sale?.note || '')
  const [add, setAdd] = useState(existing ? true : null) // null = aún no responde
  const [date, setDate] = useState(existing?.dueDate || suggestion.date)
  const [time, setTime] = useState(existing?.dueTime || suggestion.time)
  const [title, setTitle] = useState(existing?.text || suggestion.title)
  const [copied, setCopied] = useState(null)
  const [msg, setMsg] = useState(null)

  const cc = phoneWithCc(order.customerPhone)
  const today = dayKey()

  function flash(what) {
    setCopied(what)
    setTimeout(() => setCopied(null), 1800)
  }

  function save() {
    setMsg(null)
    if (!date || !time) return setMsg({ ok: false, text: 'Elige el día y la hora del recordatorio.' })
    const [y, m, d] = date.split('-').map(Number)
    const [h, mi] = time.split(':').map(Number)
    if (new Date(y, m - 1, d, h, mi) < new Date(Date.now() - 60000)) return setMsg({ ok: false, text: 'Esa fecha y hora ya pasaron: elige una próxima.' })
    const sale = {
      orderId: order.id,
      trackingCode: order.trackingCode,
      customerName: order.customerName,
      phone: order.customerPhone,
      note: note.trim(),
      summary,
    }
    const list = loadReminders(merchant.id)
    const base = newReminder({ text: title.trim() || suggestion.title, dueDate: date, dueTime: time, category: 'envios', important: order.status !== 'shipped', sale })
    // Una venta tiene un solo recordatorio pendiente: si ya había, se actualiza.
    const next = existing ? list.map((r) => (r.id === existing.id ? { ...base, id: existing.id, createdAt: existing.createdAt } : r)) : [...list, base]
    saveReminders(merchant.id, next)
    onSaved?.(`Recordatorio ${existing ? 'actualizado' : 'creado'}: ${dueLabel(date)} · ${timeLabel(time)}`)
    onClose()
  }

  function removeExisting() {
    saveReminders(
      merchant.id,
      loadReminders(merchant.id).filter((r) => r.id !== existing.id),
    )
    onSaved?.('Recordatorio quitado.')
    onClose()
  }

  return createPortal(
    <div role="dialog" aria-modal="true" aria-labelledby="sale-rem-title" className="fixed inset-0 z-[85] flex items-end justify-center bg-navy/70 sm:items-center sm:p-4">
      <div className="flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-start gap-3 bg-navy px-5 py-4 text-white">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-navy">
            <IconBell className="bell-ring h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold tracking-wide text-brand uppercase">Recordatorio inteligente</p>
            <p id="sale-rem-title" className="truncate text-base font-bold">
              {order.customerName} {order.trackingCode ? <span className="font-mono text-xs text-slate-300">· {order.trackingCode}</span> : null}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white">
            <IconX className="h-5 w-5" />
          </button>
        </div>

        {locked ? (
          <div className="space-y-4 px-5 py-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <IconLock className="h-6 w-6" />
            </span>
            <p className="text-base font-bold text-navy">Recordatorios inteligentes es del plan Emprendedor Pro</p>
            <p className="text-sm text-muted">
              Resume cada venta, guarda el teléfono y una nota, y te avisa en el momento justo para despachar, cobrar o confirmar la entrega.
            </p>
            <button type="button" onClick={onUpgrade} className="btn btn-primary w-full justify-center">
              <IconSparkles className="h-4 w-4" /> Ver Mi plan y mejorar
            </button>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto px-5 py-4">
            <section aria-label="Resumen breve">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-extrabold tracking-wide text-muted uppercase">Resumen breve</p>
                <button
                  type="button"
                  onClick={() => copyText(summary).then(() => flash('summary'))}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-dark hover:underline"
                >
                  {copied === 'summary' ? <IconCheck className="h-3.5 w-3.5" /> : <IconCopy className="h-3.5 w-3.5" />} {copied === 'summary' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <p className="mt-1 rounded-xl bg-surface p-3 text-[13px] leading-relaxed text-ink">{summary}</p>
            </section>

            <section aria-label="Teléfono">
              <p className="text-[11px] font-extrabold tracking-wide text-muted uppercase">Teléfono</p>
              {cc ? (
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <a href={`tel:+${cc}`} className="font-mono text-base font-bold text-navy hover:underline" aria-label={`Llamar al +${cc}`}>
                    +51 {String(order.customerPhone).replace(/\D/g, '').slice(-9)}
                  </a>
                  <a href={`tel:+${cc}`} className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-bold text-navy hover:bg-surface">
                    📞 Llamar
                  </a>
                  <a
                    href={buildWhatsAppUrl(cc, `Hola ${String(order.customerName || '').split(' ')[0]} 👋`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                  >
                    <IconWhatsapp className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => copyText(`+${cc}`).then(() => flash('phone'))}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-bold text-navy hover:bg-surface"
                  >
                    {copied === 'phone' ? <IconCheck className="h-3.5 w-3.5" /> : <IconCopy className="h-3.5 w-3.5" />} {copied === 'phone' ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              ) : (
                <p className="mt-1 text-sm text-muted">El cliente no dejó teléfono.</p>
              )}
            </section>

            <section>
              <label htmlFor="sale-note" className="text-[11px] font-extrabold tracking-wide text-muted uppercase">
                Nota breve
              </label>
              <textarea
                id="sale-note"
                rows={2}
                maxLength={NOTE_MAX}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ej. Cobrar saldo S/ 20 por Yape antes de despachar"
                className="input-field mt-1 resize-none text-sm"
              />
              <p className="text-right text-[10px] text-muted">
                {note.length}/{NOTE_MAX}
              </p>
            </section>

            <section aria-label="Agregar al recordatorio" className="rounded-2xl border-2 border-brand/60 bg-amber-50/60 p-3.5">
              <p className="text-sm font-bold text-navy">¿Desea agregar esta venta al recordatorio?</p>
              <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label="¿Desea agregar esta venta al recordatorio?">
                <button
                  type="button"
                  role="radio"
                  aria-checked={add === true}
                  onClick={() => setAdd(true)}
                  className={`rounded-xl px-3 py-2 text-sm font-bold transition ${add === true ? 'bg-brand text-navy ring-2 ring-brand-dark' : 'border border-slate-300 bg-white text-navy hover:bg-surface'}`}
                >
                  Sí, agregar
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={add === false}
                  onClick={() => setAdd(false)}
                  className={`rounded-xl px-3 py-2 text-sm font-bold transition ${add === false ? 'bg-navy text-white' : 'border border-slate-300 bg-white text-navy hover:bg-surface'}`}
                >
                  No, por ahora no
                </button>
              </div>

              {add === true && (
                <div className="mt-3 space-y-2.5">
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-muted uppercase">Recordarme</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} className="input-field text-sm" />
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} aria-label="Día del recordatorio" className="input-field text-sm" />
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} aria-label="Hora del recordatorio" className="input-field text-sm" />
                  </div>
                </div>
              )}
            </section>

            {msg && <p role="alert" className="text-sm font-semibold text-red-600">{msg.text}</p>}

            <div className="flex flex-wrap gap-2 pb-1">
              {add === true ? (
                <button type="button" onClick={save} className="btn btn-primary flex-1 justify-center">
                  <IconBell className="h-4 w-4" /> {existing ? 'Actualizar recordatorio' : 'Agregar al recordatorio'}
                </button>
              ) : (
                <button type="button" onClick={onClose} className="btn btn-outline flex-1 justify-center">
                  Cerrar
                </button>
              )}
              {existing && (
                <button type="button" onClick={removeExisting} className="btn border border-red-300 bg-red-50 text-red-700 hover:bg-red-100">
                  <IconTrash className="h-4 w-4" /> Quitar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
