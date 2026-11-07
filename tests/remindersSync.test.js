// @vitest-environment jsdom
import { beforeEach, expect, test } from 'vitest'
import { loadReminders, newReminder, reminderSyncStatus, saveReminders, syncReminders } from '../src/utils/reminders.js'

// Supabase simulado: una tabla en memoria compartida por los "dispositivos".
function fakeCloud({ missing = false } = {}) {
  const rows = new Map()
  const client = {
    from() {
      return {
        select: async () => (missing ? { data: null, error: { code: 'PGRST205', message: 'Could not find the table public.merchant_reminders' } } : { data: [...rows.values()], error: null }),
        upsert: async (list) => {
          list.forEach((r) => rows.set(r.id, { ...rows.get(r.id), ...r }))
          return { error: null }
        },
        delete: () => ({ in: async (_col, ids) => (ids.forEach((id) => rows.delete(id)), { error: null }) }),
      }
    },
  }
  return { rows, getClient: async () => client }
}

// Cada "dispositivo" tiene su propio localStorage: se guarda y se restaura.
const devices = {}
function use(name) {
  const current = Object.keys(devices).find((k) => devices[k].active)
  if (current) {
    devices[current].store = { ...localStorage }
    devices[current].active = false
  }
  localStorage.clear()
  Object.entries(devices[name]?.store || {}).forEach(([k, v]) => localStorage.setItem(k, v))
  devices[name] = { store: devices[name]?.store || {}, active: true }
}

const M = 'm-1'
beforeEach(() => {
  localStorage.clear()
  for (const k of Object.keys(devices)) delete devices[k]
})

test('lo anotado en la computadora aparece en el celular, y lo borrado desaparece en ambos', async () => {
  const cloud = fakeCloud()
  use('pc')
  saveReminders(M, [newReminder({ text: 'Despachar #3', dueDate: '2026-11-07', dueTime: '15:00', sale: { orderId: 7, phone: '970804662', note: 'Cobrar S/ 20' } })])
  await syncReminders(M, { getClient: cloud.getClient })
  expect(cloud.rows.size).toBe(1)
  expect(reminderSyncStatus()).toBe('cloud')

  use('cel')
  await syncReminders(M, { getClient: cloud.getClient })
  const onPhone = loadReminders(M)
  expect(onPhone).toHaveLength(1)
  expect(onPhone[0]).toMatchObject({ text: 'Despachar #3', dueTime: '15:00', sale: { phone: '970804662', note: 'Cobrar S/ 20' } })

  // El celular lo marca como listo → la computadora lo ve listo.
  saveReminders(M, onPhone.map((r) => ({ ...r, done: true })))
  await syncReminders(M, { getClient: cloud.getClient })
  use('pc')
  await syncReminders(M, { getClient: cloud.getClient })
  expect(loadReminders(M)[0].done).toBe(true)

  // La computadora lo borra → queda marcado como borrado en la cuenta y
  // desaparece del celular (aunque era el último recordatorio).
  saveReminders(M, [])
  await syncReminders(M, { getClient: cloud.getClient })
  expect([...cloud.rows.values()].every((r) => r.deleted)).toBe(true)
  use('cel')
  await syncReminders(M, { getClient: cloud.getClient })
  expect(loadReminders(M)).toHaveLength(0)
})

test('si ambos cambian el mismo recordatorio, gana el cambio más reciente', async () => {
  const cloud = fakeCloud()
  use('pc')
  const r = newReminder({ text: 'Original' })
  saveReminders(M, [r])
  await syncReminders(M, { getClient: cloud.getClient })
  use('cel')
  await syncReminders(M, { getClient: cloud.getClient })

  use('pc')
  saveReminders(M, [{ ...loadReminders(M)[0], text: 'Cambio de la PC' }])
  await new Promise((res) => setTimeout(res, 5))
  use('cel')
  saveReminders(M, [{ ...loadReminders(M)[0], text: 'Cambio del celular (después)' }])
  await syncReminders(M, { getClient: cloud.getClient })
  use('pc')
  await syncReminders(M, { getClient: cloud.getClient })
  expect(loadReminders(M)[0].text).toBe('Cambio del celular (después)')
})

test('los recordatorios que ya existían en el navegador se suben la primera vez', async () => {
  const cloud = fakeCloud()
  use('pc')
  localStorage.setItem(`anotate-reminders-v1:${M}`, JSON.stringify([{ id: 'r_viejo', text: 'Recordatorio antiguo', dueDate: '', dueTime: '', category: 'general', important: false, done: false, createdAt: '2026-10-01T00:00:00Z' }]))
  await syncReminders(M, { getClient: cloud.getClient })
  expect(cloud.rows.get('r_viejo').text).toBe('Recordatorio antiguo')
})

test('sin la tabla en Supabase sigue funcionando solo en este dispositivo', async () => {
  const cloud = fakeCloud({ missing: true })
  use('pc')
  saveReminders(M, [newReminder({ text: 'Local' })])
  await syncReminders(M, { getClient: cloud.getClient })
  expect(reminderSyncStatus()).toBe('local')
  expect(loadReminders(M)).toHaveLength(1)
})

test('si la cuenta llega vacía (p. ej. sesión vencida) no se borran los recordatorios del dispositivo', async () => {
  const cloud = fakeCloud()
  use('pc')
  saveReminders(M, [newReminder({ text: 'No me borres' })])
  await syncReminders(M, { getClient: cloud.getClient })
  cloud.rows.clear() // la cuenta responde vacía
  await syncReminders(M, { getClient: cloud.getClient })
  expect(loadReminders(M)).toHaveLength(1)
  expect(cloud.rows.size).toBe(1) // se volvió a subir
})
