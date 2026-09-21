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
} from '../utils/adminMerchants'
import { getAdminSecret, setAdminSecret } from '../utils/adminSecret'
import { IconCheck, IconKey, IconRefresh, IconStore, IconX } from './icons'

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

export default function AdminMerchantsManager() {
  const configured = isSupabaseConfigured()
  const [secretDraft, setSecretDraft] = useState(() => getAdminSecret())
  const [secretSaved, setSecretSaved] = useState(false)

  const [merchants, setMerchants] = useState([])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [listError, setListError] = useState(null)
  const [busyId, setBusyId] = useState(null)

  const [domains, setDomains] = useState([])
  const [domainDraft, setDomainDraft] = useState('')
  const [domainMsg, setDomainMsg] = useState(null)

  async function refresh() {
    if (!configured || !getAdminSecret()) return
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
    setDomainDraft('')
    setDomainMsg({ ok: true, text: 'Dominio agregado.' })
    refresh()
  }

  async function handleDeleteDomain(domain) {
    if (!window.confirm(`¿Quitar "${domain}"? Nadie con ese correo podrá registrarse.`)) return
    const res = await adminDeleteEmailDomain(domain)
    if (!res.ok) return setDomainMsg({ ok: false, text: res.error })
    refresh()
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo al montar
  }, [])

  function handleSaveSecret() {
    setAdminSecret(secretDraft)
    setSecretSaved(true)
    setTimeout(() => setSecretSaved(false), 2000)
    refresh()
  }

  async function handleToggleActive(m) {
    setBusyId(m.id)
    const res = await adminSetMerchantActive(m.id, !m.active)
    setBusyId(null)
    if (res.ok) refresh()
    else setListError(res.error)
  }

  async function handlePlanChange(m, planId) {
    setBusyId(m.id)
    const res = await adminSetMerchantPlan(m.id, planId ? Number(planId) : null)
    setBusyId(null)
    if (res.ok) refresh()
    else setListError(res.error)
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
        <div className="card p-4">
          <p className="text-sm font-semibold text-navy">Clave de administrador</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="password"
              value={secretDraft}
              onChange={(e) => setSecretDraft(e.target.value)}
              placeholder="Clave de administrador"
              spellCheck={false}
              className="input-field min-w-0 flex-1"
            />
            <button
              type="button"
              onClick={handleSaveSecret}
              className="btn btn-primary shrink-0"
            >
              Guardar y probar
            </button>
          </div>
          {secretSaved && <p className="mt-1.5 text-xs font-semibold text-emerald-600">Guardada.</p>}
        </div>
      )}

      {configured && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-navy">Negociantes ({merchants.length})</p>
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="btn btn-outline !px-3 !py-1.5 text-xs disabled:opacity-50"
            >
              <IconRefresh className="h-3.5 w-3.5" /> {loading ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>

          {listError && (
            <p className="mt-2 text-xs font-semibold text-red-600">
              <IconKey className="mr-1 inline h-3.5 w-3.5" /> {listError}
            </p>
          )}

          {!listError && merchants.length === 0 && !loading && (
            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm text-muted">
                {getAdminSecret() ? 'Aún no se ha registrado ningún negociante.' : 'Ingresa la clave de administrador arriba para ver la lista.'}
              </p>
            </div>
          )}

          {merchants.length > 0 && (
            <div className="mt-3 card overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-[13px]">
                <thead className="bg-surface text-[11px] tracking-wide text-muted uppercase">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Tienda</th>
                    <th className="px-3 py-2 font-semibold">Correo</th>
                    <th className="px-3 py-2 font-semibold">WhatsApp</th>
                    <th className="px-3 py-2 font-semibold">Plan</th>
                    <th className="px-3 py-2 font-semibold">Estado</th>
                    <th className="px-3 py-2 font-semibold">Desde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {merchants.map((m) => (
                    <tr key={m.id} className="text-ink">
                      <td className="px-3 py-2">{m.businessName}</td>
                      <td className="px-3 py-2 text-xs text-muted">{m.email}</td>
                      <td className="px-3 py-2 font-mono text-xs">{m.whatsappNumber}</td>
                      <td className="px-3 py-2">
                        <select
                          value={m.planId || ''}
                          disabled={busyId === m.id}
                          onChange={(e) => handlePlanChange(m, e.target.value)}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-ink focus:border-brand-dark focus:outline-none"
                        >
                          <option value="">Sin plan</option>
                          {plans.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(m)}
                          disabled={busyId === m.id}
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition disabled:opacity-50 ${
                            m.active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                          }`}
                        >
                          {m.active ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="px-3 py-2 text-xs text-muted">{fmtDate(m.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                {getAdminSecret() ? 'Sin dominios cargados.' : 'Ingresa la clave de administrador arriba para verlos.'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
