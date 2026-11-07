// Notificaciones push: avisos aunque ANOTA-T esté cerrado.
// El navegador se suscribe con la clave pública VAPID (es pública por
// diseño); la privada vive solo en Vercel. La suscripción se guarda en
// Supabase (push_subscriptions) y el envío lo hace /api/push-dispatch.
import { getSupabaseClient } from './supabaseClient'
import { devicePlatform, isInstalledApp } from './installApp'

export const VAPID_PUBLIC_KEY = 'BCGcmxyc8t2gFM7RBNftYuIYZE2cC4YZI7ZY6xvOMRzvlMP71UB4XCt-JNO6RV3nKY_rq_sRCo-a8QybgthkgEo'

function urlBase64ToUint8Array(base64) {
  const pad = '='.repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + pad).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
}

export function pushSupported() {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
}

/** En iPhone el push solo existe dentro de la app instalada (Agregar a inicio, iOS 16.4+). */
export function pushNeedsInstall() {
  return devicePlatform() === 'ios' && !isInstalledApp()
}

async function registration() {
  if (!pushSupported()) return null
  return (await navigator.serviceWorker.getRegistration()) || navigator.serviceWorker.register('/sw.js')
}

/** 'unsupported' | 'needs-install' | 'denied' | 'on' | 'off' */
export async function pushState() {
  if (pushNeedsInstall()) return 'needs-install'
  if (!pushSupported()) return 'unsupported'
  if (Notification.permission === 'denied') return 'denied'
  const reg = await navigator.serviceWorker.getRegistration()
  const sub = reg ? await reg.pushManager.getSubscription() : null
  return sub ? 'on' : 'off'
}

export async function enablePush() {
  if (pushNeedsInstall()) return { ok: false, error: 'En iPhone primero instala la app: Safari → Compartir → «Agregar a inicio».' }
  if (!pushSupported()) return { ok: false, error: 'Este navegador no permite avisos push.' }
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') return { ok: false, error: 'No diste permiso de notificaciones. Puedes activarlo en los ajustes del navegador.' }
  let sub
  try {
    const reg = await registration()
    await navigator.serviceWorker.ready
    sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) }))
  } catch {
    // Navegadores sin servicio push (algunos Chromium sin Google, modo
    // incógnito, ahorro de datos) rechazan la suscripción.
    return { ok: false, error: 'Este navegador no pudo activar los avisos push. Prueba con Chrome/Edge actualizado o con la app instalada.' }
  }
  const json = sub.toJSON()
  const supabase = await getSupabaseClient()
  if (!supabase) return { ok: false, error: 'Sin conexión con el servidor.' }
  const { error } = await supabase.rpc('register_push_subscription', {
    p_endpoint: json.endpoint,
    p_p256dh: json.keys?.p256dh,
    p_auth: json.keys?.auth,
    p_user_agent: navigator.userAgent.slice(0, 300),
  })
  if (error) {
    const missing = /register_push_subscription|PGRST202|does not exist/i.test(`${error.code} ${error.message}`)
    return { ok: false, error: missing ? 'Falta activar los avisos push en Supabase (SQL de notificaciones push).' : 'No se pudo guardar este dispositivo. Intenta de nuevo.' }
  }
  return { ok: true }
}

export async function disablePush() {
  const reg = await navigator.serviceWorker?.getRegistration()
  const sub = reg ? await reg.pushManager.getSubscription() : null
  if (!sub) return { ok: true }
  const supabase = await getSupabaseClient()
  if (supabase) await supabase.rpc('unregister_push_subscription', { p_endpoint: sub.endpoint })
  await sub.unsubscribe().catch(() => {})
  return { ok: true }
}

/** Se envía un aviso de prueba a todos tus dispositivos con push activo. */
export async function sendTestPush() {
  const supabase = await getSupabaseClient()
  const { data } = (await supabase?.auth.getSession()) || {}
  const token = data?.session?.access_token
  if (!token) return { ok: false, error: 'Vuelve a iniciar sesión.' }
  const res = await fetch('/api/push-test', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }).catch(() => null)
  if (!res) return { ok: false, error: 'Sin conexión.' }
  const body = await res.json().catch(() => ({}))
  if (res.status === 503) return { ok: false, error: 'Los avisos push aún no están configurados en el servidor (Vercel).' }
  if (!res.ok) return { ok: false, error: 'No se pudo enviar la prueba.' }
  return body.sent ? { ok: true } : { ok: false, error: 'No hay dispositivos con push activo.' }
}
