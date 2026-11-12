import { readFile, writeFile, rename, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

/**
 * Genera dist/index.html con la landing ya pintada y mueve el shell de la app
 * a dist/app.html.
 *
 * Sin esto, al abrir "/" el navegador recibía un <div id="root"> vacío y tenía
 * que descargar y ejecutar todo el JS antes de mostrar el primer texto (lo que
 * Google/Lighthouse ve como "página vacía"). La landing se renderiza aquí en
 * tiempo de build y Vercel la sirve directamente en "/"; las demás rutas
 * usan app.html mediante el rewrite de vercel.json.
 *
 * Se usa el build SSR de Vite para resolver los imports de imágenes con los
 * mismos nombres con hash que el build del cliente.
 */
const root = process.cwd()
const ssrDir = resolve(root, 'dist-ssr')
const indexHtmlPath = resolve(root, 'dist', 'index.html')
const appHtmlPath = resolve(root, 'dist', 'app.html')

await build({
  root,
  logLevel: 'warn',
  build: {
    ssr: 'scripts/prerender-entry.jsx',
    outDir: ssrDir,
    emptyOutDir: true,
    minify: false,
    target: 'node20',
    rollupOptions: { output: { entryFileNames: 'entry.mjs' } },
  },
})

const mod = await import(`${pathToFileURL(resolve(ssrDir, 'entry.mjs')).href}?t=${Date.now()}`)
let markup = mod.render()

// Las secciones .reveal nacen en opacity:0 y el JS las muestra al hacer scroll.
// En el HTML prerenderizado se dejan visibles para que se lean sin JS (SEO).
markup = markup.replace(/class="([^"]*\breveal\b[^"]*)"/g, (match, classes) =>
  classes.includes('is-visible') ? match : `class="${classes} is-visible"`,
)

// El shell de la app (root vacío) pasa a app.html; index.html será la landing.
const shell = await readFile(indexHtmlPath, 'utf8')
await rename(indexHtmlPath, appHtmlPath)
const html = shell.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
if (html === shell) throw new Error('No se encontró <div id="root"></div> en el index.html generado')

await writeFile(indexHtmlPath, html, 'utf8')
await rm(ssrDir, { recursive: true, force: true })

console.log(`index.html (landing) generado (${(html.length / 1024).toFixed(1)} kB) y app.html listo`)
