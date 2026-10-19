// Logo de la tienda listo para WhatsApp y redes.
//
// WhatsApp, Facebook, etc. arman la vista previa del link con la imagen
// `og:image`; si pesa mucho (≈ más de 300 KB) o viene en un formato raro,
// la ignoran y no se ve el logo. Por eso todo logo se guarda como JPG
// liviano de hasta 600 px.

const MAX_SIDE = 600
const TARGET_BYTES = 220 * 1024
// Por encima de esto un logo ya subido se considera "pesado" y se recomprime.
export const HEAVY_LOGO_BYTES = 280 * 1024

function loadImage(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('No se pudo leer la imagen.'))
    }
    img.src = url
  })
}

function toBlob(canvas, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
}

/**
 * Redimensiona (máx. 600 px) y convierte a JPG. Los logos con transparencia
 * quedan sobre fondo blanco (el JPG no tiene transparencia y así se ve bien
 * en cualquier vista previa). Baja la calidad hasta quedar liviano.
 */
export async function compressLogo(blob) {
  const img = await loadImage(blob)
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth || 1, img.naturalHeight || 1))
  const w = Math.max(1, Math.round((img.naturalWidth || MAX_SIDE) * scale))
  const h = Math.max(1, Math.round((img.naturalHeight || MAX_SIDE) * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0, w, h)
  let out = null
  for (const q of [0.88, 0.8, 0.7, 0.6]) {
    out = await toBlob(canvas, q)
    if (out && out.size <= TARGET_BYTES) break
  }
  if (!out) throw new Error('No se pudo procesar el logo.')
  return out
}

/**
 * Versión del logo para el link que se comparte (`/f/slug?v=...`). WhatsApp
 * guarda la vista previa por link: si el logo cambia, cambia el link y
 * WhatsApp vuelve a leer la vista previa con el logo nuevo.
 */
export function logoVersion(logoUrl) {
  if (!logoUrl) return ''
  const m = String(logoUrl).match(/logo-(\d+)/)
  if (m) return m[1].slice(-6)
  let h = 0
  for (const c of String(logoUrl)) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h.toString(36).slice(0, 6)
}

/** Link público de la tienda, con la versión del logo para refrescar la vista previa. */
export function storeShareLink(slug, logoUrl) {
  const v = logoVersion(logoUrl)
  return `${window.location.origin}/f/${slug}${v ? `?v=${v}` : ''}`
}
