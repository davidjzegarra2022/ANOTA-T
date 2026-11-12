// Título y descripción por ruta. Google ya no depende de esto para
// renderizar la app, pero sí mejora cómo se ve cada pestaña y lo que se
// comparte al pegar un link.
export const DEFAULT_TITLE = 'ANOTA-T | Formulario de envío para tu negocio'
export const DEFAULT_DESCRIPTION =
  'Crea tu formulario de envío, compártelo con tus clientes y coordina entrega o retiro en agencia. Olva, Shalom y más de 30 agencias en un solo lugar.'

const ROUTES = {
  login: { title: 'Iniciar sesión | ANOTA-T', description: 'Entra a tu panel de ANOTA-T para gestionar envíos, clientes y recordatorios.' },
  signup: { title: 'Crear cuenta gratis | ANOTA-T', description: 'Crea tu cuenta gratis, arma tu formulario de envío y compártelo con tus clientes en minutos.' },
  forgot: { title: 'Recuperar contraseña | ANOTA-T', description: 'Recupera el acceso a tu cuenta de ANOTA-T.' },
  rastreo: { title: 'Rastrear pedido | ANOTA-T', description: 'Consulta en qué paso está tu envío con el código de seguimiento de ANOTA-T.' },
  admin: { title: 'Administración | ANOTA-T', description: 'Panel de administración de ANOTA-T.' },
  formulario: { title: 'Formulario de envío | ANOTA-T', description: 'Completa tus datos para coordinar la entrega o el retiro de tu pedido en agencia.' },
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [key, val] = attr
    el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Cambia título, descripción y Open Graph de la pestaña actual. */
export function setPageMeta({ title, description } = {}) {
  if (typeof document === 'undefined') return
  const t = title || DEFAULT_TITLE
  const d = description || DEFAULT_DESCRIPTION
  document.title = t
  setMeta('meta[name="description"]', ['name', 'description'], d)
  setMeta('meta[property="og:title"]', ['property', 'og:title'], t)
  setMeta('meta[property="og:description"]', ['property', 'og:description'], d)
  setMeta('meta[name="twitter:title"]', ['name', 'twitter:title'], t)
}

/** Metadatos que corresponden a una ruta (sin datos de la tienda). */
export function metaForPath(path) {
  if (!path) return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }
  if (path === '/login' || path === '/signup' || path === '/forgot-password') return ROUTES[path.slice(1).replace('-password', '')] || ROUTES.login
  if (path === '/admin' || path.startsWith('/admin/')) return ROUTES.admin
  if (path.startsWith('/rastreo')) return ROUTES.rastreo
  if (path.startsWith('/f/')) return ROUTES.formulario
  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }
}
