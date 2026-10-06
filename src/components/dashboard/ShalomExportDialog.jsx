import { useEffect, useMemo, useState } from 'react'
import { exportShalomMassive, fetchShalomAgencyNames, isShalomOrder, MERCADERIA_OPTIONS } from '../../utils/shalomExport'
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
 * Descarga del "Formato Pro Masivo" de Shalom: elige qué pedidos (el periodo
 * del reporte o todo el historial), la agencia de ORIGEN desde donde envía
 * la tienda y la MERCADERIA por defecto. Origen y mercadería se recuerdan
 * en este navegador para la próxima vez.
 */
export default function ShalomExportDialog({ merchant, periodOrders, periodLabel, allOrders, onClose }) {
  const prefKey = `anotat-shalom-${merchant?.id || 'x'}`
  // Si el periodo del reporte no tiene pedidos Shalom, arranca en todo el historial.
  // Sin `allOrders` (Envíos) solo se exportan los pedidos recibidos.
  const [scope, setScope] = useState(() => (!allOrders || periodOrders.some(isShalomOrder) ? 'period' : 'all'))
  const [origen, setOrigen] = useState(() => readPref(`${prefKey}-origen`, ''))
  const [mercaderia, setMercaderia] = useState(() => readPref(`${prefKey}-mercaderia`, 'PAQUETE S'))
  const [agencies, setAgencies] = useState([])
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchShalomAgencyNames()
      .then(setAgencies)
      .catch(() => setAgencies([]))
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const periodCount = useMemo(() => periodOrders.filter(isShalomOrder).length, [periodOrders])
  const allCount = useMemo(() => (allOrders || []).filter(isShalomOrder).length, [allOrders])
  const selectedCount = scope === 'period' ? periodCount : allCount
  const origenValid = !origen || agencies.length === 0 || agencies.some((a) => a.toLowerCase() === origen.trim().toLowerCase())

  async function handleDownload() {
    setBusy(true)
    setError(null)
    setResult(null)
    savePref(`${prefKey}-origen`, origen.trim())
    savePref(`${prefKey}-mercaderia`, mercaderia)
    try {
      const res = await exportShalomMassive(scope === 'period' ? periodOrders : allOrders, {
        origen: origen.trim(),
        mercaderia,
        filename: `shalom-carga-masiva-${scope === 'period' ? 'periodo' : 'historial'}-${new Date().toISOString().slice(0, 10)}.xlsx`,
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
      <div role="dialog" aria-modal="true" aria-labelledby="shalom-title" className="relative w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6">
        <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute top-3 right-3 rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy">
          <IconX className="h-5 w-5" />
        </button>

        <p className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-bold text-red-700">● Shalom</p>
        <h2 id="shalom-title" className="mt-2 text-lg font-bold text-navy">Formato Pro Masivo</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Se rellena la plantilla oficial de Shalom con los pedidos de <b>retiro en agencia Shalom</b> (sin los cancelados): DNI, celular,
          origen, destino y mercadería. Las medidas las calcula la propia plantilla.
        </p>

        {allOrders && <p className="mt-4 text-[11px] font-bold tracking-wide text-muted uppercase">Pedidos a incluir</p>}
        {!allOrders && (
          <p className="mt-4 rounded-xl bg-surface px-3 py-2.5 text-sm font-semibold text-ink">
            {periodLabel}: <b>{periodCount}</b> pedido{periodCount === 1 ? '' : 's'} Shalom
          </p>
        )}
        <div className={`mt-2 grid grid-cols-1 gap-2 ${allOrders ? '' : 'hidden'}`}>
          {[
            ['period', `Este periodo · ${periodLabel}`, periodCount],
            ['all', 'Todo el historial', allCount],
          ].map(([value, label, count]) => (
            <label
              key={value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-sm transition ${
                scope === value ? 'border-brand bg-amber-50 text-navy' : 'border-slate-200 text-ink hover:border-slate-300'
              }`}
            >
              <input type="radio" name="shalom-scope" value={value} checked={scope === value} onChange={() => setScope(value)} className="accent-[#a16207]" />
              <span className="min-w-0 flex-1 font-semibold">{label}</span>
              <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-xs font-bold text-ink">{count}</span>
            </label>
          ))}
        </div>

        <label className="mt-4 block text-[11px] font-bold tracking-wide text-muted uppercase">
          Agencia de origen (desde donde envías)
          <input
            list="shalom-agencies"
            value={origen}
            onChange={(e) => setOrigen(e.target.value.slice(0, 80))}
            placeholder={agencies.length ? 'Escribe y elige tu agencia Shalom…' : 'Cargando agencias…'}
            className={`input-field mt-1.5 text-sm font-normal tracking-normal normal-case ${origenValid ? '' : 'has-error'}`}
          />
          <datalist id="shalom-agencies">
            {agencies.map((a) => (
              <option key={a} value={a} />
            ))}
          </datalist>
        </label>
        {!origen && <p className="mt-1 text-[11px] text-muted">Opcional: si lo dejas vacío lo eliges luego en el Excel.</p>}
        {!origenValid && <p className="mt-1 text-[11px] font-semibold text-red-600">No está en la lista de Shalom; elige una opción sugerida.</p>}

        <label className="mt-3 block text-[11px] font-bold tracking-wide text-muted uppercase">
          Mercadería
          <select value={mercaderia} onChange={(e) => setMercaderia(e.target.value)} className="input-field mt-1.5 text-sm font-normal tracking-normal normal-case">
            {MERCADERIA_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
        {result && (
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            <p className="font-bold">
              ✓ {result.count} pedido{result.count === 1 ? '' : 's'} en el formato.
            </p>
            {result.truncated && <p className="mt-1">La plantilla admite hasta 499 filas: se incluyeron los primeros 499.</p>}
            {result.unmatched.length > 0 && (
              <p className="mt-1 text-amber-800">
                Revisa el destino de: {result.unmatched.map((o) => `#${o.orderNumber ?? '?'} ${o.customerName}`).join(', ')} (no coincidió con la lista de Shalom).
              </p>
            )}
          </div>
        )}

        <button type="button" onClick={handleDownload} disabled={busy || !selectedCount || !origenValid} className="btn btn-primary mt-4 w-full">
          <IconDownload className="h-4 w-4" />
          {busy ? 'Generando…' : selectedCount ? `Descargar formato Shalom (${selectedCount})` : 'No hay pedidos Shalom'}
        </button>
      </div>
    </div>
  )
}
