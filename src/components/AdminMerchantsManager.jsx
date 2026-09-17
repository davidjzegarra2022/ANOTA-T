import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../utils/supabaseClient'
import { adminListMerchants, adminListPlans, adminSetMerchantActive, adminSetMerchantPlan } from '../utils/adminMerchants'
import { getAdminSecret, setAdminSecret } from '../utils/adminSecret'
import { IconKey, IconRefresh, IconStore } from './icons'

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

  async function refresh() {
    if (!configured || !getAdminSecret()) return
    setLoading(true)
    setListError(null)
    const [merchantsRes, plansRes] = await Promise.all([adminListMerchants(), adminListPlans()])
    setLoading(false)
    if (merchantsRes.ok) setMerchants(merchantsRes.merchants)
    else setListError(merchantsRes.error)
    if (plansRes.ok) setPlans(plansRes.plans)
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
        <h2 className="flex items-center gap-2 text-base font-bold text-white">
          <IconStore className="h-5 w-5 text-amber-300" />
          Negociantes
        </h2>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
          Cada negociante crea su propia cuenta (correo + contraseña) desde el link normal. Acá activas/
          desactivas su acceso y le asignas un plan — la creación de planes está en la pestaña "Planes".
        </p>
      </div>

      {!configured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-xs leading-relaxed text-amber-200">
          Supabase no está configurado.
        </div>
      )}

      {configured && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">Clave de administrador</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="password"
              value={secretDraft}
              onChange={(e) => setSecretDraft(e.target.value)}
              placeholder="Clave de administrador"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSaveSecret}
              className="shrink-0 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:from-amber-400 hover:to-orange-500"
            >
              Guardar y probar
            </button>
          </div>
          {secretSaved && <p className="mt-1.5 text-xs font-semibold text-emerald-400">Guardada.</p>}
        </div>
      )}

      {configured && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white">Negociantes ({merchants.length})</p>
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 transition hover:bg-white/10 disabled:opacity-50"
            >
              <IconRefresh className="h-3.5 w-3.5" /> {loading ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>

          {listError && (
            <p className="mt-2 text-xs font-semibold text-red-400">
              <IconKey className="mr-1 inline h-3.5 w-3.5" /> {listError}
            </p>
          )}

          {!listError && merchants.length === 0 && !loading && (
            <div className="mt-3 rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
              <p className="text-sm text-gray-400">
                {getAdminSecret() ? 'Aún no se ha registrado ningún negociante.' : 'Ingresa la clave de administrador arriba para ver la lista.'}
              </p>
            </div>
          )}

          {merchants.length > 0 && (
            <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[760px] text-left text-[13px]">
                <thead className="bg-white/5 text-[11px] tracking-wide text-gray-400 uppercase">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Tienda</th>
                    <th className="px-3 py-2 font-semibold">Correo</th>
                    <th className="px-3 py-2 font-semibold">WhatsApp</th>
                    <th className="px-3 py-2 font-semibold">Plan</th>
                    <th className="px-3 py-2 font-semibold">Estado</th>
                    <th className="px-3 py-2 font-semibold">Desde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {merchants.map((m) => (
                    <tr key={m.id} className="text-gray-200">
                      <td className="px-3 py-2">{m.businessName}</td>
                      <td className="px-3 py-2 text-xs text-gray-400">{m.email}</td>
                      <td className="px-3 py-2 font-mono text-xs">{m.whatsappNumber}</td>
                      <td className="px-3 py-2">
                        <select
                          value={m.planId || ''}
                          disabled={busyId === m.id}
                          onChange={(e) => handlePlanChange(m, e.target.value)}
                          className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white focus:border-amber-400/70 focus:outline-none"
                        >
                          <option value="" className="bg-gray-900">Sin plan</option>
                          {plans.map((p) => (
                            <option key={p.id} value={p.id} className="bg-gray-900">{p.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(m)}
                          disabled={busyId === m.id}
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition disabled:opacity-50 ${
                            m.active ? 'bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/25' : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                          }`}
                        >
                          {m.active ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-400">{fmtDate(m.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
