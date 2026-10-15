import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
