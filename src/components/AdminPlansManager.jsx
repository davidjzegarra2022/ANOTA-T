import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../utils/supabaseClient'
import { adminDeletePlan, adminListPlans, adminUpsertPlan } from '../utils/adminMerchants'
import { getAdminSecret } from '../utils/adminSecret'
import { IconCheck, IconPencil, IconRefresh, IconSparkles, IconTrash } from './icons'

const emptyForm = { id: null, name: '', trialDays: '', pricePerDay: 0, monthlyOrderLimit: '', description: '', features: '', active: true }

function toForm(plan) {
  return {
    id: plan.id,
    name: plan.name,
    trialDays: plan.trialDays ?? '',
    pricePerDay: plan.pricePerDay,
    monthlyOrderLimit: plan.monthlyOrderLimit ?? '',
    description: plan.description || '',
    features: (plan.features || []).join('\n'),
    active: plan.active,
  }
}

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
    const res = await adminUpsertPlan({
      ...form,
      trialDays: form.trialDays || null,
      monthlyOrderLimit: form.monthlyOrderLimit || null,
      features: form.features.split('\n'),
    })
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
        <h2 className="flex items-center gap-2 text-base font-bold text-navy">
          <IconSparkles className="h-5 w-5 text-brand-dark" />
          Planes
        </h2>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">
          Define los planes disponibles (días de prueba gratis y/o precio por día). Asígnalos a cada negociante
          desde la pestaña "Negociantes".
        </p>
      </div>

      {!configured && (
        <div className="card border-amber-300 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800">
          Supabase no está configurado.
        </div>
      )}

      {configured && (
        <form onSubmit={handleSubmit} className="card p-4">
          <p className="text-sm font-semibold text-navy">{form.id ? 'Editar plan' : 'Nuevo plan'}</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">Nombre</span>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Pro"
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">Días de prueba gratis (opcional)</span>
              <input
                type="number"
                min={0}
                value={form.trialDays}
                onChange={(e) => setForm((f) => ({ ...f, trialDays: e.target.value }))}
                placeholder="Ej. 7"
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">Precio por día (S/)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.pricePerDay}
                onChange={(e) => setForm((f) => ({ ...f, pricePerDay: Number(e.target.value) || 0 }))}
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">Límite pedidos/mes (opcional)</span>
              <input
                type="number"
                min={0}
                value={form.monthlyOrderLimit}
                onChange={(e) => setForm((f) => ({ ...f, monthlyOrderLimit: e.target.value }))}
                placeholder="Sin límite"
                className="input-field"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-semibold text-muted">Descripción corta</span>
              <input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="input-field"
              />
            </label>
            <label className="block sm:col-span-2 lg:col-span-4">
              <span className="mb-1 block text-xs font-semibold text-muted">Características (una por línea)</span>
              <textarea
                value={form.features}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                rows={3}
                placeholder={'Link con tu marca\nPanel de control de estados de envío'}
                className="input-field"
              />
            </label>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <button type="submit" disabled={saving} className="btn btn-primary">
              <IconCheck className="h-4 w-4" /> {form.id ? 'Guardar cambios' : 'Crear plan'}
            </button>
            {form.id && (
              <button type="button" onClick={() => setForm(emptyForm)} className="text-xs font-semibold text-muted hover:text-navy">
                Cancelar edición
              </button>
            )}
            {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
          </div>
        </form>
      )}

      {configured && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-navy">Planes ({plans.length})</p>
            <button type="button" onClick={refresh} disabled={loading} className="btn btn-outline btn-small inline-flex items-center gap-1.5 !px-3 !py-1.5 text-xs">
              <IconRefresh className="h-3.5 w-3.5" /> {loading ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>

          {plans.length === 0 ? (
            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm text-muted">
                {getAdminSecret() ? 'Aún no hay planes creados.' : 'Ingresa la clave de administrador (pestaña Negociantes) para ver la lista.'}
              </p>
            </div>
          ) : (
            <div className="card mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13px]">
                <thead className="bg-surface text-[11px] tracking-wide text-muted uppercase">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Nombre</th>
                    <th className="px-3 py-2 font-semibold">Prueba</th>
                    <th className="px-3 py-2 font-semibold">Precio/día</th>
                    <th className="px-3 py-2 font-semibold">Límite/mes</th>
                    <th className="px-3 py-2 font-semibold">Estado</th>
                    <th className="px-3 py-2 font-semibold" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {plans.map((p) => (
                    <tr key={p.id} className="text-ink">
                      <td className="px-3 py-2">{p.name}</td>
                      <td className="px-3 py-2">{p.trialDays ? `${p.trialDays} días` : '—'}</td>
                      <td className="px-3 py-2">S/ {p.pricePerDay.toFixed(2)}</td>
                      <td className="px-3 py-2">{p.monthlyOrderLimit ?? 'Sin límite'}</td>
                      <td className="px-3 py-2">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${p.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                          {p.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button type="button" onClick={() => setForm(toForm(p))} aria-label="Editar plan" className="rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy">
                          <IconPencil className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => handleDelete(p)} aria-label="Eliminar plan" className="rounded-lg p-1.5 text-muted transition hover:bg-red-50 hover:text-red-600">
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
