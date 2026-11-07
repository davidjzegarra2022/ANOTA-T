// Sonido y vibración de los avisos de ANOTA-T.
//
// El sonido es propio: se sintetiza en el navegador (Web Audio), sin
// archivos ni música de terceros. Es una campanita suave de notas
// ascendentes (pentatónica de Mi mayor) con un brillo final; nunca dura más
// de 5 segundos (se corta en 4.8 s por seguridad).
//   * 'reminder' — tienes un pendiente: 3 notas + brillo (~2.2 s)
//   * 'order'    — entró un pedido: 2 notas rápidas (~1.3 s)
// En celulares con vibración (Android) además vibra un patrón corto.
// iOS no permite vibrar desde la web: ahí solo suena.

const KEY = 'anotat-sound'
export const MAX_SECONDS = 4.8

// Notas: [frecuencia Hz, inicio s, duración s, volumen 0-1]
const MOTIFS = {
  reminder: [
    [659.25, 0.0, 0.9, 0.55], // Mi5
    [830.61, 0.16, 0.9, 0.5], // Sol#5
    [987.77, 0.32, 1.1, 0.5], // Si5
    [1318.51, 0.62, 1.6, 0.32], // Mi6 (brillo)
  ],
  order: [
    [987.77, 0.0, 0.7, 0.5], // Si5
    [1318.51, 0.13, 1.1, 0.42], // Mi6
  ],
}

export const VIBRATION = { reminder: [160, 80, 160, 80, 300], order: [120, 60, 220] }

/** Notas del motivo (para probar la duración sin audio). */
export function motif(kind = 'reminder') {
  return MOTIFS[kind] || MOTIFS.reminder
}

/** Duración total del motivo en segundos (siempre ≤ MAX_SECONDS). */
export function motifDuration(kind = 'reminder') {
  return Math.min(MAX_SECONDS, Math.max(...motif(kind).map(([, start, dur]) => start + dur)))
}

export function soundEnabled() {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

export function setSoundEnabled(on) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    // sin almacenamiento
  }
}

let ctx = null
function audioContext() {
  const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)
  if (!AC) return null
  if (!ctx) ctx = new AC()
  return ctx
}

/**
 * Los navegadores no dejan sonar nada hasta que la persona toca la página.
 * Se "desbloquea" el audio en el primer toque/clic (una sola vez).
 */
export function unlockAudioOnFirstGesture() {
  if (typeof window === 'undefined') return
  const unlock = () => {
    const c = audioContext()
    if (c && c.state === 'suspended') c.resume().catch(() => {})
    window.removeEventListener('pointerdown', unlock)
    window.removeEventListener('keydown', unlock)
  }
  window.addEventListener('pointerdown', unlock, { once: true })
  window.addEventListener('keydown', unlock, { once: true })
}

/**
 * Programa el motivo en un contexto de audio (normal u offline). Cada nota es
 * una campana: tono puro + armónico suave, ataque rápido y caída exponencial.
 */
export function scheduleMotif(c, kind = 'reminder', when = c.currentTime) {
  const master = c.createGain()
  master.gain.value = 0.22
  master.connect(c.destination)
  const end = when + MAX_SECONDS
  for (const [freq, start, dur, vol] of motif(kind)) {
    const t0 = when + start
    const t1 = Math.min(t0 + dur, end)
    for (const [mult, amount, type] of [[1, 1, 'sine'], [2.01, 0.28, 'sine'], [3, 0.08, 'triangle']]) {
      const osc = c.createOscillator()
      const g = c.createGain()
      osc.type = type
      osc.frequency.value = freq * mult
      g.gain.setValueAtTime(0.0001, t0)
      g.gain.exponentialRampToValueAtTime(vol * amount, t0 + 0.012)
      g.gain.exponentialRampToValueAtTime(0.0001, t1)
      osc.connect(g)
      g.connect(master)
      osc.start(t0)
      osc.stop(t1 + 0.02)
    }
  }
  return end
}

/** Suena (si está activado) y vibra en celulares compatibles. */
export function playAlert(kind = 'reminder', { force = false } = {}) {
  if (!force && !soundEnabled()) return false
  try {
    const c = audioContext()
    if (c) {
      if (c.state === 'suspended') c.resume().catch(() => {})
      scheduleMotif(c, kind)
    }
  } catch {
    // sin audio: igual se muestra el aviso
  }
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') navigator.vibrate(VIBRATION[kind] || VIBRATION.reminder)
  } catch {
    // sin vibración
  }
  return true
}
