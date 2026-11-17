#!/usr/bin/env node
/**
 * Consulta el rastreo público de Shalom (https://shalom.com.pe/rastrea) con un
 * navegador real y devuelve el estado del envío en JSON.
 *
 * Uso:  node rastrear-shalom.js <numero-de-orden> <codigo> [--con-destinatario] [--con-ventana]
 *
 * Solo lectura. No inicia sesión ni usa credenciales: bastan el número de orden
 * y el código de 4 caracteres impresos en el ticket.
 *
 * Códigos de salida: 0 encontrado · 2 uso incorrecto · 3 orden no encontrada ·
 * 4 la página cambió o no respondió.
 */
const { chromium } = require('playwright');

const ETAPAS = ['En origen', 'En tránsito', 'En destino', 'Entregado'];
const URL_RASTREO = 'https://shalom.com.pe/rastrea';

let navegador = null;

async function salir(codigo, datos) {
  if (navegador) await navegador.close().catch(() => {});
  process.stdout.write(`${JSON.stringify(datos, null, 2)}\n`);
  process.exit(codigo);
}

(async () => {
  const args = process.argv.slice(2);
  const banderas = new Set(args.filter((a) => a.startsWith('--')));
  const [orden, codigo] = args.filter((a) => !a.startsWith('--'));

  if (!/^\d{8,12}$/.test(orden || '') || !/^[A-Za-z0-9]{4}$/.test(codigo || '')) {
    await salir(2, {
      ok: false,
      error: 'uso',
      mensaje: 'Uso: rastrear-shalom.js <orden de 8 a 12 dígitos> <código de 4 caracteres>',
    });
  }

  const base = { transportista: 'shalom', orden, consultado_en: new Date().toISOString() };

  try {
    navegador = await chromium.launch({ headless: !banderas.has('--con-ventana') });
    const pagina = await navegador.newPage();
    await pagina.goto(URL_RASTREO, { waitUntil: 'networkidle', timeout: 45000 });
    await pagina.getByRole('textbox', { name: 'N° de Orden' }).fill(orden);
    await pagina.getByRole('textbox', { name: 'Código de Orden' }).fill(codigo.toUpperCase());
    await pagina.getByRole('button', { name: 'Buscar' }).click();

    const encontrada = pagina.getByText(/N° DE ORDEN:/).first();
    const noEncontrada = pagina.getByText(/No se encontró la orden/i).first();
    await Promise.race([
      encontrada.waitFor({ timeout: 30000 }),
      noEncontrada.waitFor({ timeout: 30000 }),
    ]);

    if (!(await encontrada.count())) {
      await salir(3, {
        ...base,
        ok: false,
        error: 'no_encontrada',
        mensaje: 'Shalom no encontró la orden: revisar el número y el código del ticket.',
      });
    }

    const leido = await encontrada.evaluate((nodo) => {
      let tarjeta = nodo;
      for (let i = 0; i < 4 && tarjeta.parentElement; i += 1) tarjeta = tarjeta.parentElement;
      const texto = (el) => (el ? el.innerText.replace(/\s+/g, ' ').trim() : null);
      return {
        titulo: texto(tarjeta.querySelector('.text-4xl')),
        detalle: texto(tarjeta.querySelector('p.text-silver-title')),
        desde: texto(nodo.nextElementSibling),
        tramos_completos: tarjeta.querySelectorAll('.bg-red-600').length,
        tramos_totales: tarjeta.querySelectorAll('.relative .absolute > div').length,
      };
    });

    const etapaPorBarra = leido.tramos_totales === 3 ? ETAPAS[leido.tramos_completos] : null;
    const estado = leido.titulo || etapaPorBarra;
    if (!estado) {
      await salir(4, {
        ...base,
        ok: false,
        error: 'pagina_cambio',
        mensaje: 'No se pudo leer el estado: la página de Shalom cambió.',
      });
    }

    const fecha = (t) => (t && t.match(/(\d{2}\/\d{2}\/\d{2}) a las (\d{2}:\d{2})/)) || null;
    const registrado = fecha(leido.desde);
    const entrega = estado === 'Entregado' ? fecha(leido.detalle) : null;

    await salir(0, {
      ...base,
      ok: true,
      estado,
      etapa: etapaPorBarra || estado,
      etapas: ETAPAS,
      registrado_el: registrado ? `${registrado[1]} ${registrado[2]}` : null,
      entregado_el: entrega ? `${entrega[1]} ${entrega[2]}` : null,
      // El detalle de Shalom nombra a quien recogió y su DNI: solo bajo pedido explícito.
      ...(banderas.has('--con-destinatario') ? { detalle: leido.detalle } : {}),
    });
  } catch (error) {
    await salir(4, {
      ...base,
      ok: false,
      error: 'sin_respuesta',
      mensaje: String(error.message || error).split('\n')[0],
    });
  }
})();
