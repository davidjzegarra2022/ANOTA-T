import { useEffect, useState } from 'react'

const KEY = 'anotate-theme'

function readTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function IconMoon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

function IconSun({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

const THEME_EVENT = 'anotat-theme'

function applyTheme(theme) {
  const root = document.documentElement
  root.classList.add('theme-anim')
  root.classList.toggle('dark', theme === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a1826' : '#071d2d')
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // sin almacenamiento: el tema dura esta visita
  }
  setTimeout(() => root.classList.remove('theme-anim'), 300)
  window.dispatchEvent(new Event(THEME_EVENT))
}

/** Tema actual, sincronizado entre el botón flotante y el del panel. */
function useTheme() {
  const [theme, setTheme] = useState(readTheme)
  useEffect(() => {
    const sync = () => setTheme(readTheme())
    window.addEventListener(THEME_EVENT, sync)
    return () => window.removeEventListener(THEME_EVENT, sync)
  }, [])
  return [theme, () => applyTheme(theme === 'dark' ? 'light' : 'dark')]
}

/** Botón de tema para el encabezado del panel (mismo estado que el flotante). */
export function ThemeButton({ className = '' }) {
  const [theme, toggle] = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-navy transition hover:bg-surface ${className}`}
    >
      {dark ? <IconSun className="h-5 w-5 text-brand" /> : <IconMoon className="h-5 w-5" />}
    </button>
  )
}

/**
 * Botón flotante de modo oscuro, presente en todas las páginas (se monta en
 * main.jsx) salvo dentro del panel, donde el botón va en el encabezado. La
 * preferencia se guarda en este dispositivo; el script de index.html la
 * aplica antes de pintar, para que no haya destello blanco.
 */
export default function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
      className="theme-fab fixed right-4 bottom-24 z-[60] flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition hover:scale-105 active:scale-95 print:hidden sm:bottom-6"
      style={{
        background: dark ? '#ffc400' : '#071d2d',
        color: dark ? '#071d2d' : '#ffc400',
        borderColor: dark ? 'rgba(7,29,45,.25)' : 'rgba(255,196,0,.35)',
      }}
    >
      {dark ? <IconSun className="h-5.5 w-5.5" /> : <IconMoon className="h-5.5 w-5.5" />}
    </button>
  )
}
