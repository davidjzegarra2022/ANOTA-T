import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { installSourceGuard } from './utils/sourceGuard'

// Solo en producción: en desarrollo hacen falta las herramientas del navegador.
if (import.meta.env.PROD) installSourceGuard()

// App instalable + notificaciones del sistema (ver public/sw.js).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ThemeToggle />
  </StrictMode>,
)
