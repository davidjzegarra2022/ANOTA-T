import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
const previewAppShell = () => ({
  name: 'preview-app-shell',
  // En producción el rewrite de vercel.json manda las rutas de la app a
  // app.html. `vite preview` no aplica vercel.json, así que se hace aquí para
  // poder probar /login, /rastreo/... etc. con el build real.
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url || '/'
      const isRoot = url === '/' || url.startsWith('/?')
      const isFile = /\.[a-z0-9]+(\?|$)/i.test(url)
      if ((req.method === 'GET' || req.method === 'HEAD') && !isRoot && !isFile && !url.startsWith('/api/')) {
        req.url = '/app.html'
      }
      next()
    })
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), previewAppShell()],
  build: {
    // Sin mapas de código: el navegador no puede reconstruir el fuente original.
    sourcemap: false,
    // Minificado y ofuscado agresivo: nombres acortados, sin comentarios ni
    // mensajes de consola (no revelan detalles internos).
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true, passes: 2 },
      mangle: { toplevel: true },
      format: { comments: false },
    },
  },
})
