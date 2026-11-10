import { useEffect, useMemo, useState } from 'react'
import { exportOlvaMassive, isOlvaOrder, OLVA_ARTICLE_TYPES, OLVA_SIZES } from '../../utils/olvaExport'
import { IconDownload, IconX } from '../icons'

function readPref(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function savePref(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // sin almacenamiento (modo privado): solo no se recuerda
  }
}

/**
 * Descarga del formato oficial de Olva Courier ("Envíos Masivos Pago en
 * Destino"). Se eligen la medida y el tipo de artículo por defecto; la
 * agencia y el destino salen de cada pedido. La plantilla exige valores de
 * sus listas oficiales, así que los pedidos que no coinciden se avisan.
 */
export default function OlvaExportDialog({ merchant, periodOrders, periodLabel, onClose }) {
  const prefKey = `anotat-olva-${merchant?.id || 'x'}`
  const [size, setSize] = useState(() => {
    const saved = readPref(`${prefKey}-size`, 'Paquete S')
    return OLVA_SIZES.includes(saved) ? saved : 'Paquete S'
  })
  const [article, setArticle] = useState(() => readPref(`${prefKey}-article`, 'ROPA Y ACCESORIOS'))
  const [declaredValue, setDeclaredValue] = useState(() => readPref(`${prefKey}-value`, '100'))
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const count = useMemo(() => periodOrders.filter(isOlvaOrder).length, [periodOrders])
  const isSobre = size === 'Sobre'

  async function handleDownload() {
    setBusy(true)
    setError(null)
    setResult(null)
    savePref(`${prefKey}-size`, size)
    savePref(`${prefKey}-article`, article)
    savePref(`${prefKey}-value`, declaredValue)
    try {
      const res = await exportOlvaMassive(periodOrders, {
        size,
        article: isSobre ? OLVA_ARTICLE_TYPES[0] : article,
        declaredValue: Number(declaredValue),
        filename: `olva-carga-masiva-${new Date().toISOString().slice(0, 10)}.xlsm`,
      })
      setResult(res)
    } catch (err) {
      setError(err?.message || 'No se pudo generar el archivo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-6">
      <button type="button" aria-label="Cerrar" onClick={onClose} className="absolute inset-0" />
      <div role="dialog" aria-modal="true" aria-labelledby="olva-title" className="relative w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6">
        <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute top-3 right-3 rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy">
          <IconX className="h-5 w-5" />
        </button>

        <p className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-bold text-violet-700">● Olva Courier</p>
        <h2 id="olva-title" className="mt-2 text-lg font-bold text-navy">Envíos Masivos Pago en Destino</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Se rellena la plantilla oficial de Olva (versión 31/10/2026) con los pedidos de <b>retiro en agencia Olva</b> (sin los cancelados):
          documento, celular, destino, tienda/agente y medidas. Conserva sus listas y macros.
        </p>

        <p className="mt-4 rounded-xl bg-surface px-3 py-2.5 text-sm font-semibold text-ink">
          {periodLabel}: <b>{count}</b> pedido{count === 1 ? '' : 's'} Olva
        </p>

        <label className="mt-4 block text-[11px] font-bold tracking-wide text-muted uppercase">
          Medida del paquete
          <select value={size} onChange={(e) => setSize(e.target.value)} className="input-field mt-1.5 text-sm font-normal tracking-normal normal-case">
            {OLVA_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-1 text-[11px] text-muted">
          {isSobre ? 'Sobre usa medidas 0 × 0 × 0 y 0.2 kg; el artículo debe ser DOCUMENTOS.' : 'Las medidas se escriben como medidas personalizadas para que Olva las acepte en cualquier destino.'}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="block text-[11px] font-bold tracking-wide text-muted uppercase">
            Tipo de artículo
            <select
              value={isSobre ? OLVA_ARTICLE_TYPES[0] : article}
              onChange={(e) => setArticle(e.target.value)}
              disabled={isSobre}
              className="input-field mt-1.5 text-sm font-normal tracking-normal normal-case disabled:opacity-60"
            >
              {(isSobre ? ['DOCUMENTOS'] : OLVA_ARTICLE_TYPES).map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[11px] font-bold tracking-wide text-muted uppercase">
            Valor declarado (S/)
            <input
              type="number"
              min="0.02"
              max="1500"
              step="0.01"
              value={declaredValue}
              onChange={(e) => setDeclaredValue(e.target.value)}
              className="input-field mt-1.5 text-sm font-normal tracking-normal"
            />
          </label>
        </div>

        {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
        {result && (
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            <p className="font-bold">
              ✓ {result.count} pedido{result.count === 1 ? '' : 's'} en el formato.
            </p>
            {result.truncated && <p className="mt-1">La plantilla admite hasta 100 filas: se incluyeron los primeros 100.</p>}
            {result.warnings.length > 0 && (
              <div className="mt-1.5 text-amber-800">
                <p className="font-bold">Revisa estos pedidos antes de subir el archivo:</p>
                <ul className="mt-0.5 list-disc pl-4">
                  {result.warnings.slice(0, 6).map((w) => (
                    <li key={`${w.orderNumber}-${w.customerName}`}>
                      #{w.orderNumber ?? '?'} {w.customerName}: {w.issues.join('; ')}.
                    </li>
                  ))}
                  {result.warnings.length > 6 && <li>y {result.warnings.length - 6} más…</li>}
                </ul>
                <p className="mt-1">La lista oficial de Olva (31/10/2026) no cubre esos destinos/agencias; la plataforma podría rechazarlos.</p>
              </div>
            )}
          </div>
        )}

        <button type="button" onClick={handleDownload} disabled={busy || !count} className="btn btn-primary mt-4 w-full">
          <IconDownload className="h-4 w-4" />
          {busy ? 'Generando…' : count ? `Descargar formato Olva (${count})` : 'No hay pedidos Olva'}
        </button>
      </div>
    </div>
  )
}
