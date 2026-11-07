// Instalar ANOTA-T en el celular.
//  * Android: APK propio (/descargas/anota-t.apk, ver android-twa/) o, si el
//    navegador lo ofrece, instalar la app web directamente.
//  * iPhone/iPad: Apple no permite instalar APK ni apps fuera de la App
//    Store; lo oficial es "Agregar a inicio" desde Safari (app web). Desde
//    iOS 16.4 esa app puede recibir notificaciones.
export const APK_URL = '/descargas/anota-t.apk'

let deferredPrompt = null
const listeners = new Set()

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    listeners.forEach((fn) => fn())
  })
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    listeners.forEach((fn) => fn())
  })
}

export function onInstallAvailabilityChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function canPromptInstall() {
  return Boolean(deferredPrompt)
}

export async function promptInstall() {
  if (!deferredPrompt) return false
  deferredPrompt.prompt()
  const choice = await deferredPrompt.userChoice.catch(() => null)
  deferredPrompt = null
  listeners.forEach((fn) => fn())
  return choice?.outcome === 'accepted'
}

/** 'ios' | 'android' | 'desktop' según el dispositivo. */
export function devicePlatform(ua = typeof navigator !== 'undefined' ? navigator.userAgent : '', touchPoints = typeof navigator !== 'undefined' ? navigator.maxTouchPoints : 0) {
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && touchPoints > 1)) return 'ios'
  if (/android/i.test(ua)) return 'android'
  return 'desktop'
}

/** ¿Ya se está usando como app instalada (o dentro del APK)? */
export function isInstalledApp() {
  if (typeof window === 'undefined') return false
  return Boolean(window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.startsWith('android-app://'))
}

/** Navegadores dentro de otras apps (WhatsApp, Instagram, Facebook): en iPhone no permiten instalar. */
export function isInAppBrowser(ua = typeof navigator !== 'undefined' ? navigator.userAgent : '') {
  return /FBAN|FBAV|Instagram|WhatsApp|Line\/|TikTok|Snapchat/i.test(ua)
}
