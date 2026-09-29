import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../utils/supabaseClient'
import {
  adminAddEmailDomain,
  adminDeleteEmailDomain,
  adminListEmailDomains,
  adminListMerchants,
  adminListPlans,
  adminSetMerchantActive,
  adminSetMerchantPlan,
  planRemaining,
} from '../utils/adminMerchants'
import { IconCheck, IconKey, IconRefresh, IconStore, IconX } from './icons'
import ClaudeCodeLoader from './ClaudeCodeLoader'
import { notifyAdminActivity } from './AdminActivityLog'

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

export default function AdminMerchantsManager() {
  const configured = isSupabaseConfigured()
  const [merchants, setMerchants] = useState([])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [listError, setListError] = useState(null)
  // Cambios sin guardar por negociante: { [id]: { planId?, renew?, active? } }.
  // Nada se escribe hasta presionar "Guardar cambios".
  const [pending, setPending] = useState({})
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState(null)

  const [domains, setDomains] = useState([])
  const [domainDraft, setDomainDraft] = useState('')
  const [domainMsg, setDomainMsg] = useState(null)

  async function refresh() {
    if (!configured) return
    setLoading(true)
    setListError(null)
    const [merchantsRes, plansRes, domainsRes] = await Promise.all([
      adminListMerchants(),
      adminListPlans(),
      adminListEmailDomains(),
    ])
    setLoading(false)
    if (merchantsRes.ok) setMerchants(merchantsRes.merchants)
    else setListError(merchantsRes.error)
    if (plansRes.ok) setPlans(plansRes.plans)
    if (domainsRes.ok) setDomains(domainsRes.domains)
  }

  async function handleAddDomain(e) {
    e.preventDefault()
    if (!domainDraft.trim()) return
    const res = await adminAddEmailDomain(domainDraft)
    if (!res.ok) return setDomainMsg({ ok: false, text: res.error })
    notifyAdminActivity()
    setDomainDraft('')
    setDomainMsg({ ok: true, text: 'Dominio agregado.' })
    refresh()
  }

  async function handleDeleteDomain(domain) {
    if (!window.confirm(`¿Quitar "${domain}"? Nadie con ese correo podrá registrarse.`)) return
    const res = await adminDeleteEmailDomain(domain)
    if (!res.ok) return setDomainMsg({ ok: false, text: res.error })
    notifyAdminActivity()
    refresh()
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo al montar
  }, [])

  // Aplica un cambio sobre lo pendiente de un negociante; si todo vuelve a
  // su valor original, la fila deja de estar "sin guardar".
  function stage(m, patch) {
    setSaveMsg(null)
    setPending((prev) => {
      const next = { ...prev[m.id], ...patch }
      if ('planId' in next && next.planId === (m.planId || null) && !next.renew) delete next.planId
      if ('active' in next && next.active === m.active) delete next.active
      if (!next.renew) delete next.renew
      const all = { ...prev }
      if (Object.keys(next).length) all[m.id] = next
      else delete all[m.id]
      return all
    })
  }

  function effective(m) {
    const p = pending[m.id] || {}
    return {
      planId: 'planId' in p ? p.planId : m.planId || null,
      active: 'active' in p ? p.active : m.active,
      renew: Boolean(p.renew),
    }
  }

  const pendingCount = Object.keys(pending).length

  async function handleSave() {
    setSaving(true)
    setSaveMsg(null)
    const errors = []
    let done = 0
    for (const m of merchants) {
      const p = pending[m.id]
      if (!p) continue
      if ('planId' in p || p.renew) {
        const planId = 'planId' in p ? p.planId : m.planId
        const res = await adminSetMerchantPlan(m.id, planId ? Number(planId) : null)
        if (res.ok) done++
        else errors.push(`${m.businessName}: ${res.error}`)
      }
      if ('active' in p) {
        const res = await adminSetMerchantActive(m.id, p.active)
        if (res.ok) done++
        else errors.push(`${m.businessName}: ${res.error}`)
      }
    }
    setPending({})
    await refresh() // vuelve a leer todo de la base: lo que se ve es lo que quedó guardado
    notifyAdminActivity()
    setSaving(false)
    setSaveMsg(
      errors.length
        ? { ok: false, text: `Se guardaron ${done} cambio(s), pero fallaron: ${errors.join(' · ')}` }
        : { ok: true, text: `✓ ${done} cambio${done === 1 ? '' : 's'} guardado${done === 1 ? '' : 's'}.` },
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="flex items-center gap-2 text-base font-bold text-navy">
          <IconStore className="h-5 w-5 text-brand-dark" />
          Negociantes
        </h2>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">
          Cada negociante crea su propia cuenta (correo + contraseña) desde el link normal. Acá activas/
          desactivas su acceso y le asignas un plan — la creación de planes está en la pestaña "Planes".
        </p>
      </div>

      {!configured && (
        <div className="card border-amber-300 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800">
          Supabase no está configurado.
        </div>
      )}

      {configured && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-navy">Negociantes ({merchants.length})</p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={refresh}
                disabled={loading || saving}
                className="btn btn-outline !px-3 !py-1.5 text-xs disabled:opacity-50"
              >
                <IconRefresh className="h-3.5 w-3.5" /> {loading ? 'Cargando…' : 'Actualizar'}
              </button>
            </div>
          </div>

          {listError && (
            <p className="mt-2 text-xs font-semibold text-red-600">
              <IconKey className="mr-1 inline h-3.5 w-3.5" /> {listError}
            </p>
          )}

          {!listError && merchants.length === 0 && !loading && (
            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm text-muted">
                Aún no se ha registrado ningún negociante.
              </p>
            </div>
          )}

          {merchants.length > 0 && (
            <div className="mt-3 card overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-[13px]">
                <thead className="bg-surface text-[11px] tracking-wide text-muted uppercase">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Tienda</th>
                    <th className="px-3 py-2 font-semibold">Correo</th>
                    <th className="px-3 py-2 font-semibold">WhatsApp</th>
                    <th className="px-3 py-2 font-semibold">Plan</th>
                    <th className="px-3 py-2 font-semibold">Usuario conectado</th>
                    <th className="px-3 py-2 font-semibold">Estado</th>
                    <th className="px-3 py-2 font-semibold">Desde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {merchants.map((m) => {
                    const eff = effective(m)
                    const dirty = Boolean(pending[m.id])
                    return (
                    <tr key={m.id} className={`text-ink ${dirty ? 'bg-amber-50/60' : ''}`}>
                      <td className="px-3 py-2">{m.businessName}</td>
                      <td className="px-3 py-2 text-xs text-muted">{m.email}</td>
                      <td className="px-3 py-2 font-mono text-xs">{m.whatsappNumber}</td>
                      <td className="px-3 py-2">
                        <select
                          value={eff.planId || ''}
                          disabled={saving}
                          onChange={(e) => stage(m, { planId: e.target.value ? Number(e.target.value) : null, renew: false })}
                          className={`rounded-lg border bg-white px-2 py-1 text-xs text-ink focus:border-brand-dark focus:outline-none ${
                            pending[m.id] && 'planId' in pending[m.id] ? 'border-brand-dark ring-2 ring-brand/30' : 'border-slate-200'
                          }`}
                        >
                          <option value="">Sin plan</option>
                          {plans.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                        {m.planId && eff.planId === m.planId && (
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => stage(m, { renew: !eff.renew, planId: m.planId })}
                            title="Reinicia la vigencia del plan desde hoy"
                            className={`mt-1 block rounded-md px-1.5 py-0.5 text-[11px] font-semibold transition ${
                              eff.renew ? 'bg-brand text-navy' : 'text-brand-dark hover:bg-amber-100'
                            }`}
                          >
                            {eff.renew ? '✓ Se renovará' : '↻ Renovar'}
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <RemainingCell merchant={m} />
                      </td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => stage(m, { active: !eff.active })}
                          disabled={saving}
                          title="Clic para cambiar; se aplica al guardar"
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition disabled:opacity-50 ${
                            eff.active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          } ${pending[m.id] && 'active' in pending[m.id] ? 'ring-2 ring-brand-dark' : ''}`}
                        >
                          {eff.active ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="px-3 py-2 text-xs text-muted">{fmtDate(m.createdAt)}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {merchants.length > 0 && (
            <div className="sticky bottom-3 z-10 mt-3 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg sm:flex-row sm:items-center">
              <p className="min-w-0 flex-1 text-xs">
                {pendingCount ? (
                  <span className="font-semibold text-brand-dark">
                    {pendingCount} negociante{pendingCount === 1 ? '' : 's'} con cambios sin guardar
                  </span>
                ) : saveMsg ? (
                  <span className={`font-semibold ${saveMsg.ok ? 'text-emerald-700' : 'text-red-600'}`}>{saveMsg.text}</span>
                ) : (
                  <span className="text-muted">Cambia plan, renueva o activa/desactiva y luego presiona Guardar cambios.</span>
                )}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setPending({}); setSaveMsg(null) }} disabled={!pendingCount || saving} className="btn btn-outline flex-1 !py-2 text-xs sm:flex-none">
                  Descartar
                </button>
                <button type="button" onClick={handleSave} disabled={!pendingCount || saving} className="btn btn-primary flex-1 !py-2 text-xs sm:flex-none">
                  <IconCheck className="h-4 w-4" /> Guardar cambios
                </button>
              </div>
            </div>
          )}

          {saving && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 backdrop-blur-sm">
              <div className="rounded-3xl bg-white px-8 py-6 shadow-2xl">
                <ClaudeCodeLoader label="Guardando cambios…" />
              </div>
            </div>
          )}
        </div>
      )}

      {configured && (
        <div className="card p-4">
          <p className="text-sm font-semibold text-navy">Dominios de correo permitidos ({domains.length})</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Solo se puede crear una cuenta con un correo de estos dominios — así no entran correos temporales
            ni de bots. Si un cliente tiene correo con dominio propio (ej. <b>contacto@sutienda.com</b>),
            agrégalo aquí para que pueda registrarse.
          </p>

          <form onSubmit={handleAddDomain} className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              value={domainDraft}
              onChange={(e) => setDomainDraft(e.target.value)}
              placeholder="sutienda.com"
              spellCheck={false}
              className="input-field min-w-0 flex-1"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              <IconCheck className="h-4 w-4" /> Agregar dominio
            </button>
          </form>
          {domainMsg && (
            <p className={`mt-1.5 text-xs font-semibold ${domainMsg.ok ? 'text-emerald-600' : 'text-red-600'}`}>
              {domainMsg.text}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {domains.map((d) => (
              <span key={d} className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs text-ink">
                {d}
                <button
                  type="button"
                  onClick={() => handleDeleteDomain(d)}
                  aria-label={`Quitar ${d}`}
                  className="rounded-full p-0.5 text-muted transition hover:bg-red-100 hover:text-red-600"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            ))}
            {domains.length === 0 && (
              <p className="text-xs text-muted">
                Sin dominios cargados.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/** Días que le quedan al plan del negociante, en rojo, tipo temporizador. */
function RemainingCell({ merchant }) {
  const { kind, days } = planRemaining(merchant)

  const label =
    kind === 'none' ? (
      <span className="text-xs text-muted">Sin plan</span>
    ) : kind === 'forever' ? (
      <span className="text-xs text-muted">Sin vencimiento</span>
    ) : days === 0 ? (
      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-700">Vencido</span>
    ) : (
      <span className="font-mono text-sm font-bold text-red-600 tabular-nums">
        {days} {days === 1 ? 'día' : 'días'}
      </span>
    )

  return (
    <div className="leading-tight">
      {label}
      <p className="mt-0.5 text-[10px] text-muted">
        {merchant.lastSignInAt ? `Últ. conexión ${fmtDate(merchant.lastSignInAt)}` : 'Nunca ingresó'}
      </p>
    </div>
  )
}
