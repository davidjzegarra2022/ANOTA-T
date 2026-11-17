// Rastreo público de Shalom, bajo demanda (un pedido a la vez).
// Misma lógica que la skill .claude/skills/rastrear-envio (Finangher, MIT):
// abre https://shalom.com.pe/rastrea con un navegador sin ventana, escribe el
// N° de orden y el código del ticket y lee el estado. Solo lectura: no inicia
// sesión ni usa credenciales. Si la página cambia o no responde, lo dice; no
// inventa un estado.
export const ETAPAS = ['En origen', 'En tránsito', 'En destino', 'Entregado']
const URL_RASTREO = 'https://shalom.com.pe/rastrea'

export function validTicket(orden, codigo) {
  return /^\d{8,12}$/.test(String(orden || '')) && /^[A-Za-z0-9]{4}$/.test(String(codigo || ''))
}

/** Navegador: en Vercel el Chromium de @sparticuz; en otro lado, el de Playwright. */
export async function launchBrowser() {
  const { chromium } = await import('playwright-core')
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const sparticuz = (await import('@sparticuz/chromium')).default
    return chromium.launch({ args: sparticuz.args, executablePath: await sparticuz.executablePath(), headless: true })
  }
  return chromium.launch({ headless: true })
}

/**
 * Devuelve { ok, codigo, estado, etapa, registrado_el, entregado_el, error, mensaje }.
 * codigo: 0 encontrado · 2 datos mal formados · 3 no encontrada · 4 la página cambió/no respondió.
 */
export async function trackShalom(orden, codigo, { launch = launchBrowser } = {}) {
  if (!validTicket(orden, codigo)) return { ok: false, codigo: 2, error: 'uso', mensaje: 'El N° de orden debe tener 8 a 12 dígitos y el código 4 caracteres.' }
  let browser = null
  try {
    browser = await launch()
    const page = await browser.newPage()
    await page.goto(URL_RASTREO, { waitUntil: 'networkidle', timeout: 30000 })
    await page.getByRole('textbox', { name: 'N° de Orden' }).fill(String(orden))
    await page.getByRole('textbox', { name: 'Código de Orden' }).fill(String(codigo).toUpperCase())
    await page.getByRole('button', { name: 'Buscar' }).click()

    const encontrada = page.getByText(/N° DE ORDEN:/).first()
    const noEncontrada = page.getByText(/No se encontró la orden/i).first()
    await Promise.race([encontrada.waitFor({ timeout: 20000 }), noEncontrada.waitFor({ timeout: 20000 })])
    if (!(await encontrada.count())) {
      return { ok: false, codigo: 3, error: 'no_encontrada', mensaje: 'Shalom no encontró la orden: revisa el número y el código del ticket.' }
    }

    const leido = await encontrada.evaluate((nodo) => {
      let tarjeta = nodo
      for (let i = 0; i < 4 && tarjeta.parentElement; i += 1) tarjeta = tarjeta.parentElement
      const texto = (el) => (el ? el.innerText.replace(/\s+/g, ' ').trim() : null)
      return {
        titulo: texto(tarjeta.querySelector('.text-4xl')),
        detalle: texto(tarjeta.querySelector('p.text-silver-title')),
        desde: texto(nodo.nextElementSibling),
        tramos_completos: tarjeta.querySelectorAll('.bg-red-600').length,
        tramos_totales: tarjeta.querySelectorAll('.relative .absolute > div').length,
      }
    })
    return interpretar(leido)
  } catch (err) {
    return { ok: false, codigo: 4, error: 'sin_respuesta', mensaje: 'No se pudo consultar Shalom en este momento. Intenta en unos minutos.', detalle: String(err?.message || err).split('\n')[0] }
  } finally {
    if (browser) await browser.close().catch(() => {})
  }
}

/** Convierte lo leído de la tarjeta de Shalom en el estado (separado para poder probarlo). */
export function interpretar(leido) {
  const etapaPorBarra = leido.tramos_totales === 3 ? ETAPAS[leido.tramos_completos] : null
  const titulo = ETAPAS.find((e) => e.toLowerCase() === String(leido.titulo || '').toLowerCase()) || null
  const estado = titulo || etapaPorBarra
  if (!estado) return { ok: false, codigo: 4, error: 'pagina_cambio', mensaje: 'No se pudo leer el estado: la página de Shalom cambió.' }
  const fecha = (t) => (t && t.match(/(\d{2}\/\d{2}\/\d{2}) a las (\d{2}:\d{2})/)) || null
  const registrado = fecha(leido.desde)
  const entrega = estado === 'Entregado' ? fecha(leido.detalle) : null
  // El detalle de Shalom nombra a quien recogió y su DNI: no se guarda.
  return {
    ok: true,
    codigo: 0,
    estado,
    etapa: etapaPorBarra || estado,
    registrado_el: registrado ? `${registrado[1]} ${registrado[2]}` : null,
    entregado_el: entrega ? `${entrega[1]} ${entrega[2]}` : null,
  }
}
