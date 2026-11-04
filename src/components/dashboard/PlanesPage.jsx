import { useEffect, useState } from 'react'
import { fetchMyOrders } from '../../utils/orders'
import { fetchActivePlans, isProPlan, planDescription, trialEndsAt, TRIAL_DAYS } from '../../utils/plans'
import { supportWhatsAppUrl } from '../../utils/support'
import { IconCheck, IconRefresh, IconSparkles, IconWhatsapp } from '../icons'

// «Mi plan»: antes eran dos pestañas (Planes y Suscripción) que repetían lo
// mismo. Ahora en una sola pantalla: estado de la suscripción arriba, la
// mejora de plan destacada en el medio y todos los planes abajo.
// Sin pasarela de pago: el plan lo asigna el administrador; cada botón abre
// el WhatsApp de soporte con un mensaje ya escrito (utils/support.js).

function startOfMonthIso() {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

/** Plan al que conviene subir: el Pro si no lo tiene; si no hay Pro, el siguiente más caro. */
export function recommendedUpgrade(plans, current) {
  const paid = plans.filter((p) => !p.trialDays)
  if (current && isProPlan(current)) return null
  const pro = paid.find((p) => isProPlan(p))
  if (pro && pro.id !== current?.id) return pro
  const price = current && !current.trialDays ? current.pricePerDay : -1
  return paid.filter((p) => p.pricePerDay > price && p.id !== current?.id).sort((a, b) => a.pricePerDay - b.pricePerDay)[0] || null
}

function priceOf(p) {
  const trialDays = p.trialDays ? Math.max(p.trialDays, TRIAL_DAYS) : null
  return trialDays ? { big: `${trialDays} días`, small: 'gratis' } : { big: `S/ ${p.pricePerDay.toFixed(2)}`, small: 'al día' }
}

export default function PlanesPage({ merchant }) {
  const [plans, setPlans] = useState(null)
  const [usedThisMonth, setUsedThisMonth] = useState(null)

  useEffect(() => {
    fetchActivePlans().then(setPlans)
    fetchMyOrders({ createdFrom: startOfMonthIso().slice(0, 10) }).then((orders) =>
      setUsedThisMonth(orders.filter((o) => o.status !== 'cancelled').length),
    )
  }, [merchant.planId])

  if (!plans) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  const current = plans.find((p) => p.id === merchant.planId) || null
  const trialEnd = current ? trialEndsAt(merchant, current) : null
  const trialDaysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd - Date.now()) / 86400000)) : null
  const upgrade = recommendedUpgrade(plans, current)
  const upgradeUrl = upgrade
    ? trialEnd
      ? supportWhatsAppUrl(trialDaysLeft > 0 ? 'upgrade' : 'renew', { merchant, daysLeft: trialDaysLeft })
      : supportWhatsAppUrl('changePlan', { merchant, planName: upgrade.name })
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-navy sm:text-2xl">Mi plan</h1>
        <p className="mt-1 text-sm text-muted">Tu suscripción, lo que te falta por desbloquear y todos los planes. Los activa soporte de ANOTA-T por WhatsApp.</p>
      </div>

      {/* 1. Estado de la suscripción */}
      {!current ? (
        <div className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <p className="min-w-0 flex-1 text-sm text-ink">
            <b>Todavía no tienes un plan activo.</b> Escríbenos y te lo activamos en minutos.
          </p>
          <a href={supportWhatsAppUrl('activate', { merchant })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600">
            <IconWhatsapp className="h-4 w-4" /> Activar un plan
          </a>
        </div>
      ) : (
        <div className="card grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Tu plan actual</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-2 text-xl font-bold text-navy">
              {current.name}
              <span className="text-sm font-semibold text-muted">
                {priceOf(current).big} {priceOf(current).small}
              </span>
            </p>
            {trialEnd ? (
              <p className={`mt-2 text-sm font-semibold ${trialDaysLeft > 3 ? 'text-brand-dark' : 'text-red-600'}`}>
                {trialDaysLeft > 0 ? `Te quedan ${trialDaysLeft} día${trialDaysLeft === 1 ? '' : 's'} de prueba gratis.` : 'Tu prueba gratis terminó: elige un plan para seguir recibiendo pedidos.'}
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted">Activo. Este mes llevas {usedThisMonth ?? '…'} pedido{usedThisMonth === 1 ? '' : 's'}.</p>
            )}
            {current.monthlyOrderLimit && usedThisMonth != null && (
              <div className="mt-2 max-w-sm">
                <p className="text-xs text-muted">
                  {usedThisMonth} de {current.monthlyOrderLimit} pedidos usados este mes
                </p>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(100, Math.round((usedThisMonth / current.monthlyOrderLimit) * 100))}%` }} />
                </div>
              </div>
            )}
          </div>
          {!upgrade && (
            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <IconCheck className="h-3.5 w-3.5" /> Tienes el mejor plan
            </span>
          )}
        </div>
      )}

      {/* 2. La mejora, bien visible */}
      {upgrade && (
        <section aria-label={`Mejorar a ${upgrade.name}`} className="upgrade-hero relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl sm:p-8">
          <span aria-hidden="true" className="upgrade-shine" />
          <div className="relative grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-extrabold tracking-wide text-navy uppercase">
                <IconSparkles className="h-3.5 w-3.5" /> Recomendado para ti
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Sube a <span className="text-brand">{upgrade.name}</span>
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-200">
                {planDescription(upgrade) || 'Vende en equipo, no se te escapa ningún pendiente y tienes soporte prioritario.'}
              </p>
              {upgrade.features?.length > 0 && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {upgrade.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-white">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand text-navy">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-2xl bg-white/10 p-5 text-center ring-1 ring-white/15 backdrop-blur">
              <p className="text-xs font-semibold text-slate-300 uppercase">Solo</p>
              <p className="text-4xl font-extrabold text-brand">S/ {upgrade.pricePerDay.toFixed(2)}</p>
              <p className="text-sm text-slate-200">al día · menos que un pasaje</p>
              <a
                href={upgradeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="upgrade-cta mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-base font-extrabold text-navy shadow-lg transition hover:brightness-105 active:scale-[0.98]"
              >
                <IconWhatsapp className="h-5 w-5" /> Quiero {upgrade.name}
              </a>
              <p className="mt-2 text-[11px] text-slate-300">Te escribimos por WhatsApp y lo activamos al toque.</p>
            </div>
          </div>
        </section>
      )}

      {/* 3. Todos los planes */}
      <div>
        <p className="mb-3 text-sm font-bold text-navy">Todos los planes</p>
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${plans.length >= 4 ? 'lg:grid-cols-4' : plans.length > 2 ? 'lg:grid-cols-3' : 'max-w-3xl'}`}>
          {plans.map((p) => {
            const isCurrent = p.id === merchant.planId
            const isRecommended = upgrade?.id === p.id
            const trialEndP = isCurrent ? trialEndsAt(merchant, p) : null
            const expired = trialEndP ? trialEndP <= new Date() : false
            // La prueba gratis se usa una sola vez (al registrarse).
            const trialUsed = Boolean(p.trialDays) && !isCurrent
            const cta = trialUsed
              ? null
              : isCurrent
                ? expired && !p.trialDays
                  ? { label: 'Renovar plan', url: supportWhatsAppUrl('renew', { merchant }) }
                  : null
                : { label: `Solicitar ${p.name}`, url: supportWhatsAppUrl('changePlan', { merchant, planName: p.name }) }
            const price = priceOf(p)
            return (
              <div
                key={p.id}
                className={`card relative flex flex-col p-5 ${isCurrent ? 'border-2 border-emerald-500' : ''} ${isRecommended ? 'border-2 border-brand shadow-xl ring-4 ring-brand/20' : ''} ${trialUsed ? 'opacity-60' : ''}`}
              >
                {isRecommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold tracking-wide whitespace-nowrap text-navy uppercase shadow">
                    ⭐ Recomendado
                  </span>
                )}
                {isCurrent && (
                  <span className="mb-2 inline-flex items-center gap-1 self-start rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    <IconCheck className="h-3 w-3" /> Tu plan actual
                  </span>
                )}
                <p className="text-lg font-bold text-navy">{p.name}</p>
                <p className="mt-1 text-2xl font-bold text-navy">
                  {price.big} <span className="text-xs font-normal text-muted">{price.small}</span>
                </p>
                {planDescription(p) && <p className="mt-2 text-xs text-muted">{planDescription(p)}</p>}
                {p.features?.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-xs text-muted">
                        <IconCheck className="mt-0.5 h-3 w-3 shrink-0 text-brand-dark" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
                {trialUsed && (
                  <div className="mt-auto pt-4">
                    <span className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm font-bold text-muted">
                      Prueba gratis ya utilizada
                    </span>
                  </div>
                )}
                {isCurrent && p.trialDays && expired && (
                  <p className="mt-auto pt-4 text-xs font-semibold text-red-600">Tu prueba gratis terminó: solicita un plan para seguir.</p>
                )}
                {cta && (
                  <div className="mt-auto pt-4">
                    <a
                      href={cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                        isRecommended ? 'bg-brand text-navy hover:brightness-105' : 'bg-emerald-700 text-white hover:bg-emerald-600'
                      }`}
                    >
                      <IconWhatsapp className="h-4 w-4" /> {cta.label}
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <a
        href={supportWhatsAppUrl(merchant.planId ? 'help' : 'activate', { merchant })}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-surface"
      >
        <IconWhatsapp className="h-4 w-4 text-emerald-700" /> ¿Dudas? Habla con soporte
      </a>
    </div>
  )
}
