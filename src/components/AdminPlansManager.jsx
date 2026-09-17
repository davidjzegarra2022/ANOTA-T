import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../utils/supabaseClient'
import { adminDeletePlan, adminListPlans, adminUpsertPlan } from '../utils/adminMerchants'
import { getAdminSecret } from '../utils/adminSecret'
import { IconCheck, IconPencil, IconRefresh, IconSparkles, IconTrash } from './icons'

const emptyForm = { id: null, name: '', monthlyOrderLimit: 20, priceSoles: 0, description: '', active: true }

export default function AdminPlansManager() {
  const configured = isSupabaseConfigured()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function refresh() {
    if (!configured || !getAdminSecret()) return
    setLoading(true)
    const res = await adminListPlans()
    setLoading(false)
    if (res.ok) setPlans(res.plans)
    else setError(res.error)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo al montar
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError('El nombre del plan es obligatorio.')
    setSaving(true)
    const res = await adminUpsertPlan(form)
    setSaving(false)
    if (!res.ok) return setError(res.error)
    setForm(emptyForm)
    setError(null)
    refresh()
  }

  async function handleDelete(plan) {
    if (!window.confirm(`¿Eliminar el plan "${plan.name}"? Los negociantes que lo tengan asignado quedarán sin plan.`)) return
    const res = await adminDeletePlan(plan.id)
    if (res.ok) refresh()
    else setError(res.error)
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="flex items-center gap-2 text-base font-bold text-white">
          <IconSparkles className="h-5 w-5 text-amber-300" />
          Planes
        </h2>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
          Define los planes disponibles (límite de pedidos al mes y precio de referencia). Asígnalos a cada
          negociante desde la pestaña "Negociantes".
        </p>
      </div>

      {!configured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-xs leading-relaxed text-amber-200">
          Supabase no está configurado.
        </div>
      )}

      {configured && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">{form.id ? 'Editar plan' : 'Nuevo plan'}</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-300">Nombre</span>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Pro"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-300">Límite pedidos/mes</span>
              <input
                type="number"
                min={1}
                value={form.monthlyOrderLimit}
                onChange={(e) => setForm((f) => ({ ...f, monthlyOrderLimit: Number(e.target.value) || 0 }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-300">Precio (S/)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.priceSoles}
                onChange={(e) => setForm((f) => ({ ...f, priceSoles: Number(e.target.value) || 0 }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-300">Descripción (opcional)</span>
              <input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:outline-none"
              />
            </label>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:from-amber-400 hover:to-orange-500 disabled:opacity-60"
            >
              <IconCheck className="h-4 w-4" /> {form.id ? 'Guardar cambios' : 'Crear plan'}
            </button>
            {form.id && (
              <button type="button" onClick={() => setForm(emptyForm)} className="text-xs font-semibold text-gray-400 hover:text-gray-200">
                Cancelar edición
              </button>
            )}
            {error && <span className="text-xs font-semibold text-red-400">{error}</span>}
          </div>
        </form>
      )}

      {configured && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white">Planes ({plans.length})</p>
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 transition hover:bg-white/10 disabled:opacity-50"
            >
              <IconRefresh className="h-3.5 w-3.5" /> {loading ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>

          {plans.length === 0 ? (
            <div className="mt-3 rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
              <p className="text-sm text-gray-400">
                {getAdminSecret() ? 'Aún no hay planes creados.' : 'Ingresa la clave de administrador (pestaña Negociantes) para ver la lista.'}
              </p>
            </div>
          ) : (
            <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[560px] text-left text-[13px]">
                <thead className="bg-white/5 text-[11px] tracking-wide text-gray-400 uppercase">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Nombre</th>
                    <th className="px-3 py-2 font-semibold">Límite/mes</th>
                    <th className="px-3 py-2 font-semibold">Precio</th>
                    <th className="px-3 py-2 font-semibold">Estado</th>
                    <th className="px-3 py-2 font-semibold" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {plans.map((p) => (
                    <tr key={p.id} className="text-gray-200">
                      <td className="px-3 py-2">{p.name}</td>
                      <td className="px-3 py-2">{p.monthlyOrderLimit}</td>
                      <td className="px-3 py-2">S/ {p.priceSoles.toFixed(2)}</td>
                      <td className="px-3 py-2">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${p.active ? 'bg-emerald-400/15 text-emerald-300' : 'bg-gray-500/20 text-gray-400'}`}>
                          {p.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button type="button" onClick={() => setForm(p)} aria-label="Editar plan" className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white">
                          <IconPencil className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => handleDelete(p)} aria-label="Eliminar plan" className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-400/10 hover:text-red-300">
                          <IconTrash className="h-4 w-4" />
                        </button>
                      </td>
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
