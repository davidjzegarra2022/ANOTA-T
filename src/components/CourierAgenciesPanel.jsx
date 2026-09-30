import { useEffect, useMemo, useState } from 'react'
import { AGENCIES } from '../data/agencies'
import { geocodePlace } from '../data/peruGeo'
import {
  adminDeleteSupabaseAgency,
  adminResetOfficialAgency,
  adminSaveOfficialAgency,
  adminUpdateSupabaseAgency,
  adminVerifyEditPin,
  applyAgencyOverrides,
  fetchAgencyOverrides,
} from '../utils/agencyOverrides'
import { notifyAdminActivity } from './AdminActivityLog'
import { IconLock, IconPencil, IconSearch, IconTrash, IconX } from './icons'

const PAGE = 60
const FIELDS = [
  ['department', 'Departamento'],
  ['province', 'Provincia'],
  ['district', 'Distrito'],
  ['zone', 'Zona / nombre de la agencia'],
  ['address', 'Dirección'],
  ['reference', 'Referencia'],
]

function normalize(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function sameLocation(a, b) {
  return ['department', 'province', 'district'].every((k) => normalize(a[k]).trim() === normalize(b[k]).trim())
}

/**
 * Lista desplegable de las agencias de un courier en el panel de admin.
 * Ver es libre; editar, ocultar o eliminar exige la contraseña de edición
 * (se valida en la base de datos, ver utils/agencyOverrides.js).
 */
export default function CourierAgenciesPanel({ courier, sbRows, pin, onPin, onClose, onSupabaseChanged }) {
  const [overrides, setOverrides] = useState(null)
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(PAGE)
  const [editing, setEditing] = useState(null) // { agency, draft }
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)
  const [pinDraft, setPinDraft] = useState('')
  const [pinError, setPinError] = useState(null)

  async function loadOverrides() {
    setOverrides(await fetchAgencyOverrides({ force: true }))
  }

  useEffect(() => {
    loadOverrides()
  }, [])

  useEffect(() => {
    setQuery('')
    setLimit(PAGE)
    setEditing(null)
    setMsg(null)
  }, [courier.id])

  const rows = useMemo(() => {
    const map = overrides || new Map()
    const official = AGENCIES.filter((a) => a.courier === courier.id)
    const visible = new Map(applyAgencyOverrides(official, map).map((a) => [a.id, a]))
    const list = official.map((a) => {
      const o = map.get(a.id)
      if (o?.hidden) return { ...a, source: 'official', hidden: true }
      return { ...visible.get(a.id), source: 'official' }
    })
    const shared = sbRows.filter((a) => a.courier === courier.id).map((a) => ({ ...a, source: 'supabase' }))
    return [...list, ...shared]
  }, [overrides, sbRows, courier.id])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    if (q.length < 2) return rows
    return rows.filter((a) => normalize(`${a.label} ${a.address} ${a.reference}`).includes(q))
  }, [rows, query])

  async function handleUnlock(e) {
    e.preventDefault()
    if (!pinDraft.trim()) return
    setBusy(true)
    setPinError(null)
    const res = await adminVerifyEditPin(pinDraft.trim())
    setBusy(false)
    if (!res.ok) return setPinError(res.error)
    onPin(pinDraft.trim())
    setPinDraft('')
    notifyAdminActivity()
  }

  async function run(action, okText) {
    setBusy(true)
    setMsg(null)
    const res = await action()
    setBusy(false)
    if (!res.ok) {
      // Si la contraseña dejó de ser válida, se vuelve a bloquear.
      if (/contraseña/i.test(res.error)) onPin(null)
      return setMsg({ ok: false, text: res.error })
    }
    setEditing(null)
    setMsg({ ok: true, text: okText })
    await loadOverrides()
    await onSupabaseChanged?.()
    notifyAdminActivity()
  }

  function handleSave() {
    const { agency, draft } = editing
    const next = { ...agency, ...draft }
    if (!sameLocation(agency, draft)) {
      const g = geocodePlace(next)
      next.lat = g.lat
      next.lng = g.lng
    }
    return agency.source === 'supabase'
      ? run(() => adminUpdateSupabaseAgency(pin, next), 'Agencia actualizada.')
      : run(() => adminSaveOfficialAgency(pin, next), 'Agencia oficial actualizada.')
  }

  function handleHide(agency) {
    if (!window.confirm(`¿Ocultar "${agency.label}"? Los clientes dejarán de verla (podrás restaurarla).`)) return
    run(() => adminSaveOfficialAgency(pin, agency, { hidden: true }), 'Agencia oculta.')
  }

  function handleDelete(agency) {
    if (!window.confirm(`¿Eliminar "${agency.label}" de Supabase? No se puede deshacer.`)) return
    run(() => adminDeleteSupabaseAgency(pin, agency), 'Agencia eliminada.')
  }

  return (
    <div className="card animate-fade-in-up overflow-hidden">
      <div className="flex items-start gap-3 border-b border-slate-200 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-navy">Agencias de {courier.label}</p>
          <p className="text-xs text-muted">
            {rows.length} agencias · {rows.filter((r) => r.edited).length} editadas · {rows.filter((r) => r.hidden).length} ocultas
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Cerrar lista" className="rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy">
          <IconX className="h-5 w-5" />
        </button>
      </div>

      {/* Candado de edición */}
      <div className="border-b border-slate-200 bg-surface px-4 py-3">
        {pin ? (
          <div className="flex flex-wrap items-center gap-2">
            <p className="flex-1 text-xs font-semibold text-emerald-700">🔓 Edición desbloqueada: puedes editar, ocultar o eliminar agencias.</p>
            <button type="button" onClick={() => onPin(null)} className="btn btn-outline !px-3 !py-1.5 text-xs">
              <IconLock className="h-3.5 w-3.5" /> Bloquear
            </button>
          </div>
        ) : (
          <form onSubmit={handleUnlock} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-ink sm:flex-1">
              <IconLock className="h-4 w-4 text-brand-dark" /> Para modificar agencias ingresa la contraseña de edición.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={pinDraft}
                onChange={(e) => {
                  setPinDraft(e.target.value)
                  setPinError(null)
                }}
                placeholder="Contraseña"
                aria-label="Contraseña de edición"
                className={`input-field min-w-0 flex-1 !py-2 sm:w-44 ${pinError ? 'has-error' : ''}`}
              />
              <button type="submit" disabled={busy || !pinDraft.trim()} className="btn btn-primary shrink-0 !py-2 text-xs">
                Desbloquear
              </button>
            </div>
            {pinError && <p className="text-xs font-semibold text-red-600 sm:w-full">{pinError}</p>}
          </form>
        )}
      </div>

      <div className="px-4 pt-3">
        <div className="input-field flex items-center gap-2 !py-2">
          <IconSearch className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setLimit(PAGE)
            }}
            placeholder="Buscar por departamento, distrito, dirección…"
            className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
        {msg && <p className={`mt-2 text-xs font-semibold ${msg.ok ? 'text-emerald-700' : 'text-red-600'}`}>{msg.text}</p>}
      </div>

      <ul className="mt-2 max-h-[30rem] divide-y divide-slate-100 overflow-y-auto">
        {overrides === null && <li className="px-4 py-6 text-center text-sm text-muted">Cargando agencias…</li>}
        {overrides !== null && filtered.length === 0 && <li className="px-4 py-6 text-center text-sm text-muted">Sin resultados.</li>}
        {overrides !== null &&
          filtered.slice(0, limit).map((a) => {
            const isEditing = editing?.agency.id === a.id
            return (
              <li key={a.id} className={`px-4 py-2.5 ${a.hidden ? 'opacity-60' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className={`text-[13px] font-semibold text-ink ${a.hidden ? 'line-through' : ''}`}>{a.label}</p>
                    <p className="text-xs break-words text-muted">
                      {a.address}
                      {a.reference ? ` · Ref: ${a.reference}` : ''}
                    </p>
                    <p className="mt-1 flex flex-wrap gap-1">
                      <Badge tone={a.source === 'supabase' ? 'cyan' : 'slate'}>{a.source === 'supabase' ? 'Supabase' : 'Oficial'}</Badge>
                      {a.edited && <Badge tone="amber">Editada</Badge>}
                      {a.hidden && <Badge tone="red">Oculta</Badge>}
                    </p>
                  </div>
                  {pin && !isEditing && (
                    <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                      {!a.hidden && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => setEditing({ agency: a, draft: Object.fromEntries(FIELDS.map(([k]) => [k, a[k] || ''])) })}
                          className="btn btn-outline !px-2.5 !py-1 text-xs"
                        >
                          <IconPencil className="h-3.5 w-3.5" /> Editar
                        </button>
                      )}
                      {a.source === 'official' && (a.edited || a.hidden) && (
                        <button type="button" disabled={busy} onClick={() => run(() => adminResetOfficialAgency(pin, a.id), 'Agencia restaurada.')} className="btn btn-outline !px-2.5 !py-1 text-xs">
                          Restaurar
                        </button>
                      )}
                      {a.source === 'official' && !a.hidden && (
                        <button type="button" disabled={busy} onClick={() => handleHide(a)} className="btn btn-outline !px-2.5 !py-1 text-xs">
                          Ocultar
                        </button>
                      )}
                      {a.source === 'supabase' && (
                        <button type="button" disabled={busy} onClick={() => handleDelete(a)} aria-label="Eliminar agencia" className="btn btn-outline !px-2.5 !py-1 text-xs text-red-600">
                          <IconTrash className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-3 rounded-xl border border-brand/50 bg-amber-50/60 p-3">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {FIELDS.map(([key, lbl]) => (
                        <label key={key} className={`block text-[11px] font-semibold text-muted ${key === 'address' || key === 'reference' ? 'sm:col-span-2' : ''}`}>
                          {lbl}
                          <input
                            value={editing.draft[key]}
                            onChange={(e) => setEditing((ed) => ({ ...ed, draft: { ...ed.draft, [key]: e.target.value } }))}
                            className="input-field mt-1 !py-2 text-sm"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <button type="button" onClick={() => setEditing(null)} disabled={busy} className="btn btn-outline !py-2 text-xs">
                        Cancelar
                      </button>
                      <button type="button" onClick={handleSave} disabled={busy} className="btn btn-primary !py-2 text-xs">
                        {busy ? 'Guardando…' : 'Guardar cambios'}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        {overrides !== null && filtered.length > limit && (
          <li className="px-4 py-3 text-center">
            <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="btn btn-outline !py-1.5 text-xs">
              Mostrar más ({filtered.length - limit} restantes)
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

const TONES = {
  slate: 'bg-surface text-ink ring-1 ring-slate-200',
  cyan: 'bg-cyan-100 text-cyan-700',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-700',
}

function Badge({ tone, children }) {
  return <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold ${TONES[tone]}`}>{children}</span>
}
