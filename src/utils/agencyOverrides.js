// Cambios del administrador sobre las agencias OFICIALES (las que vienen
// dentro de la app, ver data/agenciesData.js). No se puede editar el
// código desde el panel, así que cada cambio se guarda en Supabase como un
// "parche" por clave (ej. 'shalom-12') y el formulario lo aplica encima.
// Las agencias cargadas en Supabase se editan directo en su tabla.
//
// Toda escritura exige sesión de admin Y la contraseña de edición, que se
// valida en la base de datos (solo se guarda su hash).
import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient'
import { invalidateSupabaseAgenciesCache } from './supabaseAgencies'

let cache = null
let cacheAt = 0
const TTL_MS = 60_000

function fromRow(r) {
  return {
    key: r.agency_key,
    courier: r.courier,
    department: r.department || '',
    province: r.province || '',
    district: r.district || '',
    zone: r.zone || '',
    address: r.address || '',
    reference: r.reference || '',
    lat: r.lat == null ? null : Number(r.lat),
    lng: r.lng == null ? null : Number(r.lng),
    hidden: Boolean(r.hidden),
  }
}

/** Parches vigentes como Map(clave → parche). Vacío si no hay conexión. */
export async function fetchAgencyOverrides({ force = false } = {}) {
  if (!isSupabaseConfigured()) return new Map()
  if (!force && cache && Date.now() - cacheAt < TTL_MS) return cache
  try {
    const supabase = await getSupabaseClient()
    if (!supabase) return new Map()
    const { data, error } = await supabase.from('agency_overrides').select('*')
    if (error) throw error
    cache = new Map((data || []).map((r) => [r.agency_key, fromRow(r)]))
    cacheAt = Date.now()
    return cache
  } catch (err) {
    console.warn('[supabase] No se pudo leer los cambios de agencias:', err?.message || err)
    return new Map()
  }
}

/** Aplica los parches a una lista de agencias oficiales: edita o quita las ocultas. */
export function applyAgencyOverrides(list, overrides) {
  if (!overrides?.size) return list
  const out = []
  for (const a of list) {
    const o = overrides.get(a.id)
    if (!o) {
      out.push(a)
      continue
    }
    if (o.hidden) continue
    const merged = {
      ...a,
      department: o.department,
      province: o.province,
      district: o.district,
      zone: o.zone,
      address: o.address,
      reference: o.reference,
      lat: o.lat ?? a.lat,
      lng: o.lng ?? a.lng,
      edited: true,
    }
    merged.label = [merged.department, merged.province, merged.district, merged.zone].filter(Boolean).join(' / ')
    out.push(merged)
  }
  return out
}

function pinError(error) {
  const msg = String(error?.message || error || '')
  if (/pin_invalido/i.test(msg)) return 'Contraseña de edición incorrecta.'
  if (/forbidden/i.test(msg)) return 'Tu cuenta no tiene permisos de administrador.'
  if (/no_encontrada/i.test(msg)) return 'La agencia ya no existe.'
  return msg || 'Error desconocido.'
}

async function call(fn, args) {
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Supabase no está configurado.' }
  const { data, error } = await supabase.rpc(fn, args)
  if (error) return { ok: false, error: pinError(error) }
  cache = null
  invalidateSupabaseAgenciesCache()
  return { ok: true, data }
}

export async function adminVerifyEditPin(pin) {
  const res = await call('admin_verify_edit_pin', { p_pin: pin })
  return res.ok ? { ok: res.data === true, error: res.data === true ? null : 'Contraseña de edición incorrecta.' } : res
}

function fields(a) {
  return {
    p_department: a.department || '',
    p_province: a.province || '',
    p_district: a.district || '',
    p_zone: a.zone || '',
    p_address: a.address || '',
    p_reference: a.reference || '',
    p_lat: Number.isFinite(a.lat) ? a.lat : null,
    p_lng: Number.isFinite(a.lng) ? a.lng : null,
  }
}

/** Guarda la edición (o el ocultamiento) de una agencia oficial. */
export function adminSaveOfficialAgency(pin, agency, { hidden = false } = {}) {
  return call('admin_save_agency_override', { p_pin: pin, p_key: agency.id, p_courier: agency.courier, ...fields(agency), p_hidden: hidden })
}

/** Deshace los cambios de una agencia oficial (vuelve a como viene en la app). */
export function adminResetOfficialAgency(pin, key) {
  return call('admin_reset_agency_override', { p_pin: pin, p_key: key })
}

/** id de la fila en Supabase a partir del id de la app ('sb-15' → 15). */
function supabaseId(agency) {
  return Number(String(agency.id).replace(/^sb-/, ''))
}

export function adminUpdateSupabaseAgency(pin, agency) {
  return call('admin_update_agency', { p_pin: pin, p_id: supabaseId(agency), ...fields(agency) })
}

export function adminDeleteSupabaseAgency(pin, agency) {
  return call('admin_delete_agency', { p_pin: pin, p_id: supabaseId(agency) })
}
