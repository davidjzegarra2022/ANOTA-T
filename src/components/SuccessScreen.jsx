import { useState } from 'react'
import { COURIERS } from '../data/agencies'
import { PAYMENT_LABELS } from '../data/paymentMethods'
import { copyText } from '../utils/clipboard'
import { ORDER_STATUS_LABELS } from '../utils/orders'
import { sellerWhatsAppWithCountry } from '../utils/sellers'
import { buildWhatsAppSummary, buildWhatsAppUrl } from '../utils/whatsapp'
import { IconArrowLeft, IconCheck, IconCopy, IconWhatsapp } from './icons'

const DELIVERY_TITLES = {
  store: 'Recojo en tienda',
  agency: 'Nuevo envío (agencia)',
  home: 'Envío a domicilio',
}

function Row({ icon, children }) {
  return (
    <p className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink">
      <span className="mt-px shrink-0">{icon}</span>
      <span className="min-w-0 break-words">{children}</span>
    </p>
  )
}

export default function SuccessScreen({ form, merchant, onNewOrder, onBackToPanel }) {
  const message = buildWhatsAppSummary(form, merchant)
  // El resumen va al vendedor que compartió el link; sin vendedor, a la tienda.
  const sellerTarget = sellerWhatsAppWithCountry(form.sellerWhatsapp)
  const whatsappUrl = buildWhatsAppUrl(sellerTarget || merchant.whatsappNumber, message)
  const rawFirst = sellerTarget ? String(form.sellerName || '').trim().split(/\s+/)[0] : ''
  const sellerFirstName = rawFirst ? rawFirst.charAt(0).toLocaleUpperCase('es') + rawFirst.slice(1).toLocaleLowerCase('es') : ''
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    copyText(message).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-300 animate-pop-in">
        <IconCheck className="h-8 w-8" />
      </div>

      <h1 className="mt-4 text-xl font-bold text-navy">¡Pedido registrado!</h1>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">
        Falta <b className="text-ink">un último paso</b>: envía el resumen por WhatsApp{sellerFirstName ? ` a ${sellerFirstName}` : ''} para confirmar tu pedido.
      </p>

      {/* Dónde está el cliente: los dos primeros pasos ya están hechos. */}
      <ol className="mt-4 flex w-full items-center justify-center gap-1.5 text-[11px] font-semibold" aria-label="Pasos del pedido">
        <li className="flex items-center gap-1 text-emerald-700"><IconCheck className="h-3.5 w-3.5" /> Datos</li>
        <li aria-hidden="true" className="h-px w-4 bg-slate-300" />
        <li className="flex items-center gap-1 text-emerald-700"><IconCheck className="h-3.5 w-3.5" /> Registrado</li>
        <li aria-hidden="true" className="h-px w-4 bg-slate-300" />
        <li className="flex items-center gap-1 rounded-full bg-emerald-700 px-2 py-0.5 text-white">3 · Enviar por WhatsApp</li>
      </ol>

      <div className="mt-5 flex w-full items-stretch gap-2.5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_-8px_rgba(16,185,129,0.55)] ring-4 ring-emerald-500/25 transition hover:bg-emerald-600 active:scale-[0.99]"
        >
          {sellerFirstName ? `Enviar a ${sellerFirstName} por WhatsApp` : 'Enviar por WhatsApp'}
          <IconWhatsapp className="h-5 w-5" />
        </a>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar resumen al portapapeles"
          title="Copiar resumen"
          className={`flex w-14 shrink-0 items-center justify-center rounded-xl border transition active:scale-[0.97] ${
            copied
              ? 'border-emerald-300 bg-emerald-50 text-emerald-600'
              : 'border-slate-200 bg-white text-ink hover:bg-surface hover:text-navy'
          }`}
        >
          {copied ? <IconCheck className="h-5 w-5" /> : <IconCopy className="h-5 w-5" />}
        </button>
      </div>
      {copied && <p className="mt-2 text-xs font-medium text-emerald-600">Resumen copiado</p>}

      <div className="animate-fade-in-up mt-6 w-full space-y-2.5 card p-5 text-left shadow-xl">
        <p className="text-[11px] font-bold tracking-wide text-muted uppercase">Resumen</p>

        {form.trackingCode && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
            <div className="min-w-0">
              <p className="text-[10.5px] font-semibold tracking-wide text-muted uppercase">
                {form.orderNumber != null ? `Pedido N° ${form.orderNumber} · código` : 'Código de pedido'}
              </p>
              <p className="font-mono text-sm font-bold text-brand-dark">{form.trackingCode}</p>
            </div>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
              {ORDER_STATUS_LABELS[form.orderStatus] ?? 'Pendiente'}
            </span>
          </div>
        )}

        <p className="text-sm font-bold text-navy">
          📦 {DELIVERY_TITLES[form.deliveryMethod] ?? 'Nuevo pedido'}
        </p>

        <div className="space-y-1.5 pt-1">
          <Row icon="👤">{form.fullName}</Row>
          <Row icon="📱">{form.phone}</Row>

          {form.deliveryMethod === 'agency' && (
            <>
              <Row icon="🆔">DNI: {form.dni}</Row>
              <Row icon="🏬">Agencia: {form.agency?.label}</Row>
              {form.agency?.address && (
                <Row icon="📍">
                  {form.agency.address}
                  {form.agency.reference ? `, Referencia: ${form.agency.reference}` : ''}
                </Row>
              )}
            </>
          )}

          {form.deliveryMethod === 'home' && (
            <>
              <Row icon="📍">{form.address}</Row>
              <Row icon="🏙️">
                {[form.department, form.provinceDistrict].filter(Boolean).join(' / ')}
              </Row>
              {form.reference && <Row icon="📝">{form.reference}</Row>}
              <Row icon="💳">{PAYMENT_LABELS[form.paymentMethod] ?? form.paymentMethod}</Row>
            </>
          )}

          {form.notes && <Row icon="🗒️">{form.notes}</Row>}
        </div>

        {(form.courier || form.shippingDate) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-200 pt-2.5">
            {form.courier && (
              <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink">
                🚚 {COURIERS[form.courier]?.label ?? form.agency?.courierLabel ?? form.courier}
              </span>
            )}
            {form.shippingDate && (
              <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink">
                📅 {form.shippingDate.shortLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {form.trackingCode && (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Guarda tu código <span className="font-mono font-semibold text-ink">{form.trackingCode}</span> para consultar el estado de tu pedido en{' '}
          <a href="/#rastreo" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-dark hover:underline">Rastrear pedido</a>.
        </p>
      )}

      <div className="mt-3 flex w-full items-center gap-2.5">
        {onBackToPanel && (
          <button
            type="button"
            onClick={onBackToPanel}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-surface hover:text-navy active:scale-[0.99]"
          >
            <IconArrowLeft className="h-4 w-4" /> Panel
          </button>
        )}
        <button
          type="button"
          onClick={onNewOrder}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-[14px] font-bold text-ink transition hover:bg-surface hover:text-navy active:scale-[0.99]"
        >
          + Nuevo pedido
        </button>
      </div>
    </div>
  )
}
