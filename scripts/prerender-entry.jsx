import { renderToStaticMarkup } from 'react-dom/server'
import LandingPage from '../src/components/LandingPage'

/**
 * Entrada de build (SSR) para generar dist/landing.html en tiempo de compilación.
 * Solo se renderiza la landing: las demás rutas siguen saliendo de index.html.
 */
export function render() {
  return renderToStaticMarkup(<LandingPage />)
}
