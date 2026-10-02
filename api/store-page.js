// Vista previa de los links de tienda (/f/:slug) en WhatsApp, Facebook, etc.
//
// Los robots que arman la vista previa NO ejecutan JavaScript: leen el HTML
// tal cual. Esta función (Vercel) devuelve el mismo index.html de la app,
// pero con las etiquetas Open Graph de la tienda: su nombre y el logo que
// subió en Configuración. Para las personas no cambia nada: el navegador
// carga la app como siempre.
//
// Seguridad: el slug se valida, todo texto se escapa antes de entrar al
// HTML y el logo solo se usa si es una URL https.

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const SLUG_RE = /^[a-z0-9-]{1,60}$/
// Dominios desde donde se acepta descargar el index.html de respaldo (nunca
// el que diga una cabecera Host cualquiera).
const ALLOWED_HOST_RE = /^(anotat\.vercel\.app|[a-z0-9-]+\.vercel\.app|localhost(:\d+)?)$/i

let cachedHtml = null

/** El index.html de la app: el que viaja con la función (vercel.json → includeFiles) o, si no, el publicado. */
async function loadIndexHtml(origin, host, fetchImpl) {
  if (cachedHtml) return cachedHtml
  try {
    cachedHtml = await readFile(join(process.cwd(), 'dist', 'index.html'), 'utf8')
    return cachedHtml
  } catch {
    // sin archivo empaquetado: se descarga del sitio publicado
  }
  if (!ALLOWED_HOST_RE.test(host)) return null
  try {
    const page = await fetchImpl(`${origin}/index.html`, { signal: AbortSignal.timeout(2500) })
    return page.ok ? await page.text() : null
  } catch {
    return null
  }
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeHttpsUrl(value) {
  try {
    const url = new URL(String(value || ''))
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

/** Reemplaza el bloque <!--og:start-->…<!--og:end--> y el <title> del index.html. */
export function injectStoreMeta(html, { store, pageUrl, origin }) {
  const name = store?.business_name ? String(store.business_name).slice(0, 80) : null
  const title = name ? `${name} — Completa tus datos de envío` : 'ANOTA-T — Formulario de envío'
  const description = name
    ? 'Déjanos tus datos para coordinar la entrega de tu pedido. Es rápido y seguro.'
    : 'Formulario logístico de envío: coordina tu entrega o retiro en agencia en segundos.'
  const image = safeHttpsUrl(store?.logo_url) || `${origin}/logo-icon.png`
  const tags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(name || 'ANOTA-T')}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(name ? `Logo de ${name}` : 'ANOTA-T')}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ].join('\n    ')
  return html
    .replace(/<!--og:start-->[\s\S]*?<!--og:end-->/, `<!--og:start-->\n    ${tags}\n    <!--og:end-->`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(name ? `${name} · Formulario de envío` : 'Formulario de Envío')}</title>`)
}

async function fetchStore(slug, fetchImpl) {
  const base = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!base || !key) return null
  try {
    const res = await fetchImpl(`${base.replace(/\/$/, '')}/rest/v1/rpc/get_merchant_public`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_slug: slug }),
      signal: AbortSignal.timeout(2500),
    })
    if (!res.ok) return null
    const rows = await res.json()
    return Array.isArray(rows) && rows[0] ? rows[0] : null
  } catch {
    return null
  }
}

export default async function handler(req, res, fetchImpl = fetch) {
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || 'anotat.vercel.app').replace(/[^a-z0-9.:-]/gi, '')
  const origin = `https://${host}`
  const url = new URL(req.url || '/', origin)
  const slug = String(url.searchParams.get('slug') || '').toLowerCase()

  const html = await loadIndexHtml(origin, host, fetchImpl)
  if (!html || !html.includes('<!--og:start-->')) {
    // Si algo falla, que la persona igual llegue a la app.
    res.statusCode = 302
    res.setHeader('Location', '/')
    return res.end()
  }

  const store = SLUG_RE.test(slug) ? await fetchStore(slug, fetchImpl) : null
  const out = injectStoreMeta(html, { store, pageUrl: `${origin}/f/${SLUG_RE.test(slug) ? slug : ''}`, origin })
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400')
  res.end(out)
}
