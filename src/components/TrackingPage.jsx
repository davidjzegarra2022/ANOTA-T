import { useCallback, useEffect, useState } from 'react'
import logoIcon from '../assets/logo-icon.webp'
import { trackOrderByCode } from '../utils/orders'
import { cleanTrackingCode } from '../utils/tracking'
import { ThemeButton } from './ThemeToggle'
import TrackingResult from './TrackingResult'
import { IconRefresh, IconSearch } from './icons'

const REFRESH_MS = 60 * 1000

/**
 * Buscador de rastreo + resultado. Si recibe un código (link de WhatsApp)
 * consulta solo; mientras el pedido no esté terminado se vuelve a consultar
 * cada minuto, así el cliente ve el cambio de estado sin recargar.
 */
export function TrackingSearch({ initialCode = '', onDark = false, syncUrl = false }) {
  const [code, setCode] = useState(initialCode)
  const [result, setResult] = useState(null)
  const [checking, setChecking] = useState(false)
  const [checkedAt, setCheckedAt] = useState(null)

  const consult = useCallback(
    async (value, { quiet = false } = {}) => {
      const clean = cleanTrackingCode(value)
      if (!clean) return
      if (!quiet) setChecking(true)
      const res = await trackOrderByCode(clean)
      if (!quiet) setChecking(false)
      // Una consulta automática que falla (sin señal) no borra lo que ya se ve.
      if (quiet && !res.ok) return
      setResult(res)
      setCheckedAt(new Date())
      if (syncUrl && res.ok) window.history.replaceState(null, '', `/rastreo/${clean}`)
    },
    [syncUrl],
  )

  useEffect(() => {
    if (initialCode) consult(initialCode)
  }, [initialCode, consult])

  const finished = result?.ok && (result.order.status === 'cancelled' || result.order.status === 'shipped')
  useEffect(() => {
    if (!result?.ok || finished) return undefined
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') consult(result.order.trackingCode, { quiet: true })
    }, REFRESH_MS)
    return () => clearInterval(id)
  }, [result, finished, consult])

  function handleSubmit(e) {
    e.preventDefault()
    consult(code)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <label htmlFor="trackingCode" className={`mb-2 block text-sm ${onDark ? 'text-slate-300' : 'font-semibold text-ink'}`}>
          Código de tu pedido
        </label>
        <div className="flex gap-2.5">
          <input
            id="trackingCode"
            value={code}
            onChange={(e) => setCode(cleanTrackingCode(e.target.value))}
            maxLength={14}
            placeholder="Ej. ANOTA-4F8K2X"
            autoComplete="off"
            enterKeyHint="search"
            className="input-field min-w-0 flex-1 font-mono tracking-wide"
          />
          <button type="submit" disabled={checking || !code} className="btn btn-primary shrink-0">
            <IconSearch className="h-4 w-4" />
            {checking ? 'Buscando…' : 'Consultar'}
          </button>
        </div>
        <p className={`mt-2 text-xs ${onDark ? 'text-slate-400' : 'text-muted'}`}>Lo encuentras en el resumen que enviaste por WhatsApp (empieza con ANOTA-).</p>
      </form>

      {result && !result.ok && (
        <p role="alert" className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${onDark ? 'bg-red-500/15 text-red-200' : 'bg-red-50 text-red-700'}`}>
          {result.error} Revisa que esté bien escrito.
        </p>
      )}

      {result?.ok && (
        <div className="mt-5">
          <TrackingResult order={result.order} />
          <div className={`mt-3 flex flex-wrap items-center justify-between gap-2 text-xs ${onDark ? 'text-slate-400' : 'text-muted'}`}>
            <span>
              {finished ? 'Consultado' : 'Se actualiza solo · consultado'} a las{' '}
              {checkedAt?.toLocaleTimeString('es-PE', { hour: 'numeric', minute: '2-digit' })}
            </span>
            <button
              type="button"
              onClick={() => consult(result.order.trackingCode)}
              className={`inline-flex items-center gap-1 font-bold ${onDark ? 'text-brand' : 'text-brand-dark'} hover:underline`}
            >
              <IconRefresh className={`h-3.5 w-3.5 ${checking ? 'animate-spin' : ''}`} /> Actualizar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/** Página pública /rastreo/<CÓDIGO>: la que abre el link del WhatsApp. */
export default function TrackingPage({ initialCode = '' }) {
  // El botón de tema va en el encabezado: el flotante tapaba la línea de tiempo.
  useEffect(() => {
    document.documentElement.classList.add('inline-theme')
    return () => document.documentElement.classList.remove('inline-theme')
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="bg-navy text-white">
        <div className="mx-auto flex w-full max-w-xl items-center gap-2.5 px-4 py-4">
          <a href="/" className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-white to-[#e6eef7] shadow">
              <img src={logoIcon} alt="" className="h-6 w-auto" />
            </span>
            <span>
              ANOTA<span className="text-brand">-T</span>
            </span>
          </a>
          <span className="ml-auto text-xs font-semibold text-slate-300">Rastreo de pedido</span>
          <ThemeButton className="!h-9 !w-9 border-white/20 !bg-white/10 !text-white" />
        </div>
      </header>
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">
          ¿Cómo va tu <span className="text-brand-dark">pedido?</span>
        </h1>
        <p className="mt-1 mb-5 text-sm text-muted">Mira en qué paso está tu envío y qué sigue.</p>
        <TrackingSearch initialCode={initialCode} syncUrl />
      </main>
      <p className="px-4 pb-6 text-center text-[11px] text-muted">ANOTA-T es una herramienta de formularios: el envío lo realiza la tienda con su courier.</p>
    </div>
  )
}
