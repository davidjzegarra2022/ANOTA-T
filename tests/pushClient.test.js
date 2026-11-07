// @vitest-environment jsdom
import { beforeEach, expect, test, vi } from 'vitest'

const rpc = vi.fn(async () => ({ error: null }))
vi.mock('../src/utils/supabaseClient', () => ({ getSupabaseClient: async () => ({ rpc }) }))

beforeEach(() => {
  rpc.mockClear()
  const subscription = { endpoint: 'https://fcm.googleapis.com/fcm/send/xyz', toJSON: () => ({ endpoint: 'https://fcm.googleapis.com/fcm/send/xyz', keys: { p256dh: 'P', auth: 'A' } }), unsubscribe: vi.fn(async () => true) }
  const pushManager = { getSubscription: vi.fn(async () => null), subscribe: vi.fn(async () => subscription) }
  const reg = { pushManager }
  Object.defineProperty(window, 'PushManager', { value: function PushManager() {}, configurable: true })
  Object.defineProperty(window, 'Notification', { value: { permission: 'default', requestPermission: vi.fn(async () => 'granted') }, configurable: true })
  Object.defineProperty(navigator, 'serviceWorker', { value: { getRegistration: vi.fn(async () => reg), register: vi.fn(async () => reg), ready: Promise.resolve(reg) }, configurable: true })
  Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla/5.0 (Linux; Android 14)', configurable: true })
  globalThis.__pm = pushManager
})

test('activar push: pide permiso, se suscribe con la clave VAPID y registra el dispositivo en Supabase', async () => {
  const { enablePush, VAPID_PUBLIC_KEY } = await import('../src/utils/push.js')
  const res = await enablePush()
  expect(res).toEqual({ ok: true })
  const opts = globalThis.__pm.subscribe.mock.calls[0][0]
  expect(opts.userVisibleOnly).toBe(true)
  expect(opts.applicationServerKey.length).toBe(65) // clave P-256 sin comprimir
  expect(VAPID_PUBLIC_KEY.length).toBeGreaterThan(80)
  expect(rpc).toHaveBeenCalledWith('register_push_subscription', expect.objectContaining({ p_endpoint: 'https://fcm.googleapis.com/fcm/send/xyz', p_p256dh: 'P', p_auth: 'A' }))
})

test('si falta el SQL en Supabase lo dice claro', async () => {
  rpc.mockResolvedValueOnce({ error: { code: 'PGRST202', message: 'Could not find the function public.register_push_subscription' } })
  const { enablePush } = await import('../src/utils/push.js')
  const res = await enablePush()
  expect(res.ok).toBe(false)
  expect(res.error).toMatch(/SQL de notificaciones push/)
})
