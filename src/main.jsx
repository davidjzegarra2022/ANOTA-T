import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { installSourceGuard } from './utils/sourceGuard'

// Solo en producción: en desarrollo hacen falta las herramientas del navegador.
if (import.meta.env.PROD) installSourceGuard()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ThemeToggle />
  </StrictMode>,
)
