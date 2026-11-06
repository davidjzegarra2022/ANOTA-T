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
        ...(cleanSale(r.sale) ? { sale: cleanSale(r.sale) } : {}),
      }))
  } catch {
    return []
  }
}

export function saveReminders(merchantId, list) {
  try {
    localStorage.setItem(storageKey(merchantId), JSON.stringify(list))
    // Avisa a la campanita del panel que la lista cambió.
    try {
      window.dispatchEvent(new Event('anotat-reminders'))
    } catch {
      // fuera del navegador
    }
    return true
  } catch {
    // Sin espacio o sin localStorage (modo privado): la pantalla sigue
    // funcionando en memoria mientras dure la sesión.
    return false
  }
}
