import { readFile, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

/**
 * Genera dist/landing.html con la landing ya pintada.
 *
 * Sin esto, al abrir "/" el navegador recibe un <div id="root"> vacío y tiene
 * que descargar y ejecutar todo el JS antes de mostrar el primer texto (lo que
 * Google/Lighthouse ve como "página vacía"). La landing se renderiza aquí en
 * tiempo de build y Vercel sirve ese HTML en "/"; React la reemplaza al
 * hidratar, sin cambiar la experiencia.
 *
 * Se usa el build SSR de Vite para resolver los imports de imágenes con los
 * mismos nombres con hash que el build del cliente.
 */
const root = process.cwd()
const ssrDir = resolve(root, 'dist-ssr')

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

const shell = await readFile(resolve(root, 'dist/index.html'), 'utf8')
const html = shell.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
if (html === shell) throw new Error('No se encontró <div id="root"></div> en dist/index.html')

await writeFile(resolve(root, 'dist/landing.html'), html, 'utf8')
await rm(ssrDir, { recursive: true, force: true })

console.log(`landing.html generado (${(html.length / 1024).toFixed(1)} kB)`)
