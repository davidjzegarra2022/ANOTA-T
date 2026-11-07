// Recordatorios del panel del negociante ("no se me olvide mandar los 15
// paquetes a Arequipa"). Es una agenda simple, sin backend: se guarda en
// localStorage por tienda, así que cada dispositivo ve los suyos.
//
// El formato de cada recordatorio es plano a propósito (nada de objetos
// anidados ni fechas Date) para que se pueda guardar tal cual en JSON y,
// más adelante, mover a una tabla de Supabase sin reescribir la pantalla.
const STORAGE_PREFIX = 'anotate-reminders-v1'

export const REMINDER_CATEGORIES = [
  { id: 'envios', label: 'Envíos', color: '#2563eb' },
  { id: 'clientes', label: 'Clientes', color: '#e11d48' },
  { id: 'pagos', label: 'Pagos', color: '#f59e0b' },
  { id: 'agencia', label: 'Agencias', color: '#0d9488' },
  { id: 'general', label: 'General', color: '#7c3aed' },
]

export function categoryOf(id) {
  return REMINDER_CATEGORIES.find((c) => c.id === id) || REMINDER_CATEGORIES[REMINDER_CATEGORIES.length - 1]
}

/** Día de hoy (o de `date`) como 'AAAA-MM-DD' en hora local, no en UTC. */
export function dayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Suma días a una clave 'AAAA-MM-DD' sin cruzar husos horarios. */
export function addDaysKey(key, days) {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + days)
  return dayKey(date)
}

/** Fecha legible: "Hoy", "Mañana", "lun 3 nov" o "3 nov 2026". */
export function dueLabel(dueDate, today = dayKey()) {
  if (!dueDate) return 'Sin fecha'
  if (dueDate === today) return 'Hoy'
  if (dueDate === addDaysKey(today, 1)) return 'Mañana'
  if (dueDate === addDaysKey(today, -1)) return 'Ayer'
  const [y, m, d] = dueDate.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const sameYear = y === Number(today.slice(0, 4))
  return date.toLocaleDateString('es-PE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    ...(sameYear ? {} : { year: 'numeric' }),
  })
}

/** 'HH:mm' → '3:00 p.m.' (como se habla en Perú). */
export function timeLabel(time) {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return time
  const suffix = h < 12 ? 'a.m.' : 'p.m.'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function newReminder({ text, dueDate = '', dueTime = '', category = 'general', important = false, sale = null }) {
  const r = {
    id: `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    text: String(text || '').trim(),
    dueDate: dueDate || '',
    dueTime: dueTime || '',
    category: categoryOf(category).id,
    important: Boolean(important),
    done: false,
    createdAt: new Date().toISOString(),
  }
  const clean = cleanSale(sale)
  if (clean) r.sale = clean
  return r
}

/**
 * Datos de la venta ligados a un recordatorio inteligente (Envíos → campana):
 * pedido, cliente, teléfono, nota breve y resumen. Se guardan como texto plano.
 */
export function cleanSale(sale) {
  if (!sale || typeof sale !== 'object' || sale.orderId == null) return null
  // eslint-disable-next-line no-control-regex -- se quitan a propósito
  const txt = (v, max) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max)
  return {
    orderId: String(sale.orderId),
    trackingCode: txt(sale.trackingCode, 20),
    customerName: txt(sale.customerName, 120),
    phone: String(sale.phone ?? '').replace(/\D/g, '').slice(0, 12),
    note: txt(sale.note, 140),
    summary: txt(sale.summary, 600),
  }
}

/** Recordatorio pendiente de una venta (o null). */
export function reminderForOrder(list, orderId) {
  return (list || []).find((r) => !r.done && r.sale && r.sale.orderId === String(orderId)) || null
}

/** Pendientes primero, luego por fecha/hora; los hechos siempre al final. */
export function sortReminders(list) {
  const weight = (r) => (r.done ? 2 : r.dueDate ? 0 : 1)
  return [...list].sort((a, b) => {
    if (weight(a) !== weight(b)) return weight(a) - weight(b)
    if (a.dueDate !== b.dueDate) {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate < b.dueDate ? -1 : 1
    }
    if (a.dueTime !== b.dueTime) {
      if (!a.dueTime) return 1
      if (!b.dueTime) return -1
      return a.dueTime < b.dueTime ? -1 : 1
    }
    return String(a.createdAt).localeCompare(String(b.createdAt))
  })
}

export const REMINDER_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'hoy', label: 'Hoy' },
  { id: 'proximos', label: 'Próximos' },
  { id: 'importantes', label: 'Importantes' },
  { id: 'sinfecha', label: 'Sin fecha' },
  { id: 'listos', label: 'Listos' },
]

export function filterReminders(list, filter, today = dayKey()) {
  const pending = list.filter((r) => !r.done)
  switch (filter) {
    case 'hoy':
      return pending.filter((r) => r.dueDate === today)
    case 'proximos':
      return pending.filter((r) => r.dueDate && r.dueDate > today)
    case 'importantes':
      return list.filter((r) => r.important && !r.done)
    case 'sinfecha':
      return pending.filter((r) => !r.dueDate)
    case 'listos':
      return list.filter((r) => r.done)
    default:
      return list
  }
}

/** Agrupa en las secciones que se ven en pantalla, en este orden. */
export function groupReminders(list, today = dayKey()) {
  const groups = [
    { id: 'vencidos', label: 'Vencidos', items: [] },
    { id: 'hoy', label: 'Hoy', items: [] },
    { id: 'manana', label: 'Mañana', items: [] },
    { id: 'semana', label: 'Esta semana', items: [] },
    { id: 'despues', label: 'Más adelante', items: [] },
    { id: 'sinfecha', label: 'Sin fecha', items: [] },
    { id: 'listos', label: 'Listos', items: [] },
  ]
  const byId = Object.fromEntries(groups.map((g) => [g.id, g]))
  const weekEnd = addDaysKey(today, 7)
  for (const r of sortReminders(list)) {
    if (r.done) byId.listos.items.push(r)
    else if (!r.dueDate) byId.sinfecha.items.push(r)
    else if (r.dueDate < today) byId.vencidos.items.push(r)
    else if (r.dueDate === today) byId.hoy.items.push(r)
    else if (r.dueDate === addDaysKey(today, 1)) byId.manana.items.push(r)
    else if (r.dueDate <= weekEnd) byId.semana.items.push(r)
    else byId.despues.items.push(r)
  }
  return groups.filter((g) => g.items.length > 0)
}

export function countReminders(list, today = dayKey()) {
  const pending = list.filter((r) => !r.done)
  return {
    todos: list.length,
    hoy: pending.filter((r) => r.dueDate === today).length,
    proximos: pending.filter((r) => r.dueDate && r.dueDate > today).length,
    importantes: pending.filter((r) => r.important).length,
    sinfecha: pending.filter((r) => !r.dueDate).length,
    listos: list.filter((r) => r.done).length,
    pendientes: pending.length,
  }
}

// --- Persistencia ---------------------------------------------------------

function storageKey(merchantId) {
  return `${STORAGE_PREFIX}:${merchantId || 'anon'}`
}

export function loadReminders(merchantId) {
  try {
    const raw = localStorage.getItem(storageKey(merchantId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Se descarta lo que no tenga forma de recordatorio (datos viejos o
    // editados a mano en la consola) en vez de romper la pantalla.
    return parsed
      .filter((r) => r && typeof r.text === 'string' && r.text.trim())
      .map((r) => ({
        id: String(r.id || newReminder({ text: r.text }).id),
        text: r.text,
        dueDate: /^\d{4}-\d{2}-\d{2}$/.test(r.dueDate || '') ? r.dueDate : '',
        dueTime: /^\d{2}:\d{2}$/.test(r.dueTime || '') ? r.dueTime : '',
        category: categoryOf(r.category).id,
        important: Boolean(r.important),
        done: Boolean(r.done),
        createdAt: r.createdAt || new Date().toISOString(),
        updatedAt: r.updatedAt || r.createdAt || new Date(0).toISOString(),
        ...(cleanSale(r.sale) ? { sale: cleanSale(r.sale) } : {}),
      }))
  } catch {
    return []
  }
}

function emitChange() {
  try {
    window.dispatchEvent(new Event('anotat-reminders'))
  } catch {
    // fuera del navegador
  }
}

/** Contenido comparable de un recordatorio (sin marcas de tiempo). */
function contentOf(r) {
  const { updatedAt: _u, createdAt: _c, ...rest } = r
  return JSON.stringify(rest)
}

/**
 * Guarda la lista (en este dispositivo) y la sube a tu cuenta en segundo
 * plano. Marca la hora de cambio de lo que cambió y recuerda lo borrado,
 * para que la sincronización no lo resucite desde otro dispositivo.
 */
export function saveReminders(merchantId, list) {
  try {
    const before = new Map(loadReminders(merchantId).map((r) => [r.id, r]))
    const now = new Date().toISOString()
    const stamped = list.map((r) => {
      const prev = before.get(r.id)
      return !prev || contentOf(prev) !== contentOf(r) ? { ...r, updatedAt: now } : { ...r, updatedAt: prev.updatedAt }
    })
    const keep = new Set(stamped.map((r) => r.id))
    const removed = [...before.keys()].filter((id) => !keep.has(id))
    if (removed.length) addTombstones(merchantId, removed)
    localStorage.setItem(storageKey(merchantId), JSON.stringify(stamped))
    emitChange()
    scheduleSync(merchantId)
    return true
  } catch {
    // Sin espacio o sin localStorage (modo privado): la pantalla sigue
    // funcionando en memoria mientras dure la sesión.
    return false
  }
}

// --- Sincronización con Supabase (sql/2026-11-07-recordatorios-en-la-nube.sql)
// Si la tabla no existe todavía, todo sigue funcionando solo en el navegador.

const metaKey = (merchantId, kind) => `${STORAGE_PREFIX}-${kind}:${merchantId || 'anon'}`

function readTombs(merchantId) {
  try {
    const v = JSON.parse(localStorage.getItem(metaKey(merchantId, 'deleted')) || '{}')
    return v && !Array.isArray(v) ? v : {}
  } catch {
    return {}
  }
}

function writeTombs(merchantId, tombs) {
  try {
    localStorage.setItem(metaKey(merchantId, 'deleted'), JSON.stringify(tombs))
  } catch {
    // sin espacio
  }
}

function addTombstones(merchantId, ids) {
  const t = readTombs(merchantId)
  const now = new Date().toISOString()
  ids.forEach((id) => {
    t[id] = now
  })
  writeTombs(merchantId, t)
}

let syncStatus = 'idle' // idle | cloud | local | error
export function reminderSyncStatus() {
  return syncStatus
}

function setStatus(next) {
  if (syncStatus === next) return
  syncStatus = next
  try {
    window.dispatchEvent(new Event('anotat-reminders-sync'))
  } catch {
    // fuera del navegador
  }
}

function toRow(r) {
  return {
    id: r.id,
    text: String(r.text).slice(0, 300),
    due_date: r.dueDate || null,
    due_time: r.dueTime || null,
    category: r.category,
    important: Boolean(r.important),
    done: Boolean(r.done),
    sale: r.sale || null,
    deleted: false,
    created_at: r.createdAt,
    updated_at: r.updatedAt,
  }
}

function fromRow(row) {
  const r = {
    id: row.id,
    text: row.text,
    dueDate: row.due_date || '',
    dueTime: row.due_time || '',
    category: categoryOf(row.category).id,
    important: Boolean(row.important),
    done: Boolean(row.done),
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
    deleted: Boolean(row.deleted),
  }
  const sale = cleanSale(row.sale)
  if (sale) r.sale = sale
  return r
}

const timers = {}
function scheduleSync(merchantId) {
  if (!merchantId || typeof window === 'undefined') return
  clearTimeout(timers[merchantId])
  timers[merchantId] = setTimeout(() => syncReminders(merchantId), 500)
}

let running = Promise.resolve()

/**
 * Junta lo de este dispositivo con lo de tu cuenta:
 *  - lo nuevo de aquí se sube; lo nuevo de allá se baja;
 *  - si ambos cambiaron, gana el cambio más reciente;
 *  - lo borrado aquí se borra allá; lo que se borró en otro dispositivo
 *    (ya estaba sincronizado y desapareció de la cuenta) se quita aquí.
 */
export function syncReminders(merchantId, { getClient } = {}) {
  running = running.then(() => doSync(merchantId, getClient)).catch(() => {})
  return running
}

async function doSync(merchantId, getClient) {
  if (!merchantId) return syncStatus
  const supabase = getClient ? await getClient() : await (await import('./supabaseClient')).getSupabaseClient()
  if (!supabase) return setStatus('local'), syncStatus
  // Sin sesión válida la base responde «vacío» (no error) y eso parecería
  // que se borró todo: no se sincroniza hasta tener sesión.
  if (supabase.auth?.getSession) {
    const { data: sess } = await supabase.auth.getSession()
    if (!sess?.session) return syncStatus
  }
  const { data, error } = await supabase.from('merchant_reminders').select('*')
  if (error) {
    const missing = /merchant_reminders|does not exist|schema cache|PGRST205|42P01/i.test(`${error.code} ${error.message}`)
    setStatus(missing ? 'local' : 'error')
    return syncStatus
  }
  const remote = new Map((data || []).map((row) => [row.id, fromRow(row)]))
  const local = new Map(loadReminders(merchantId).map((r) => [r.id, r]))
  const tombs = readTombs(merchantId)
  const newer = (x, y) => Date.parse(x) > Date.parse(y)

  const merged = []
  const upload = []
  const markDeleted = []
  for (const id of new Set([...local.keys(), ...remote.keys(), ...Object.keys(tombs)])) {
    const l = local.get(id)
    const r = remote.get(id)
    if (tombs[id]) {
      // Borrado aquí: se marca borrado en la cuenta (si allí sigue vivo).
      if (r && !r.deleted) markDeleted.push({ id, at: tombs[id], base: r })
      continue
    }
    if (r?.deleted) {
      // Borrado en otro dispositivo, salvo que aquí se haya editado después.
      if (l && newer(l.updatedAt, r.updatedAt)) {
        merged.push(l)
        upload.push(l)
      }
      continue
    }
    if (l && r) {
      if (newer(l.updatedAt, r.updatedAt)) {
        merged.push(l)
        upload.push(l)
      } else merged.push(r)
    } else if (l) {
      // Falta en la cuenta: nunca se interpreta como borrado (podría ser la
      // sesión); se sube.
      merged.push(l)
      upload.push(l)
    } else if (r) merged.push(r)
  }

  const rows = [
    ...upload.map(toRow),
    ...markDeleted.map(({ base, at }) => ({ ...toRow(base), deleted: true, updated_at: at })),
  ]
  if (rows.length) {
    const { error: upErr } = await supabase.from('merchant_reminders').upsert(rows)
    if (upErr) return setStatus('error'), syncStatus
  }
  // Las marcas de borrado ya quedaron en la cuenta: se olvidan aquí.
  writeTombs(merchantId, {})
  for (const r of merged) delete r.deleted

  const before = JSON.stringify(sortReminders([...local.values()]))
  const after = JSON.stringify(sortReminders(merged))
  if (before !== after) {
    try {
      localStorage.setItem(storageKey(merchantId), JSON.stringify(merged))
    } catch {
      // sin espacio
    }
    emitChange()
  }
  setStatus('cloud')
  return syncStatus
}
