import { useMemo, useState } from 'react'
import AdminMerchantsManager from './AdminMerchantsManager'
import AdminPlansManager from './AdminPlansManager'
import AgencyManager from './AgencyManager'
import { clearLog, getEndpoint, getLog, setEndpoint } from '../utils/telemetry'
import { IconBox, IconChart, IconDownload, IconLogout, IconRefresh, IconSparkles, IconStore, IconTrash } from './icons'

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'medium' })
  } catch {
    return iso
  }
}

function StatTile({ label, value, accent }) {
  return (
    <div className="card p-3.5">
      <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  )
}

function ipLocation(e) {
  const parts = [e.city, e.region, e.country].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}

function toCsv(events) {
  const cols = [
    'ts', 'type', 'serial', 'deviceId', 'browser', 'os', 'deviceType',
    'language', 'tz', 'ip', 'city', 'region', 'country', 'isp',
    'ipLat', 'ipLng', 'gpsLat', 'gpsLng', 'gpsAccuracy', 'screen', 'ua',
  ]
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = events.map((e) => cols.map((c) => esc(e[c])).join(','))
  return [cols.join(','), ...rows].join('\n')
}

export default function AdminDashboard({ onLogout, onOpenForm }) {
  const [tab, setTab] = useState('activaciones')
  const [log, setLog] = useState(() => getLog())
  const [endpoint, setEndpointState] = useState(() => getEndpoint())
  const [savedMsg, setSavedMsg] = useState(false)

  const events = useMemo(() => [...log].reverse(), [log]) // más recientes primero

  const stats = useMemo(() => {
    const devices = new Set(log.map((e) => e.deviceId))
    const accounts = new Set(log.filter((e) => e.type === 'merchant' && e.serial).map((e) => e.serial))
    // eslint-disable-next-line react/purity -- "últimas 24 h" depende de la hora actual real
    const since = Date.now() - 24 * 60 * 60 * 1000
    const last24 = log.filter((e) => new Date(e.ts).getTime() >= since).length
    return { total: log.length, devices: devices.size, accounts: accounts.size, last24 }
  }, [log])

  function refresh() {
    setLog(getLog())
  }

  function handleSaveEndpoint() {
    setEndpoint(endpoint)
    setEndpointState(getEndpoint())
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2000)
  }

  function handleExport() {
    const csv = toCsv(log)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `anotate-activaciones-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function handleClear() {
    if (!window.confirm('¿Borrar el historial de activaciones de ESTE dispositivo? (no afecta lo ya enviado a tu backend)')) return
    clearLog()
    setLog([])
  }

  return (
    <div className="animate-fade-in-up space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-lg font-bold text-navy">
            <IconChart className="h-5 w-5 text-brand-dark" />
            Panel de administrador
          </h1>
          <p className="mt-0.5 text-xs text-muted">Activaciones, dispositivos y base de datos de agencias</p>
        </div>
        <div className="flex items-center gap-2">
          {tab === 'activaciones' && (
            <button
              type="button"
              onClick={refresh}
              className="btn btn-outline !px-3 !py-2 text-xs"
            >
              <IconRefresh className="h-4 w-4" /> Actualizar
            </button>
          )}
          <button
            type="button"
            onClick={onOpenForm}
            className="btn btn-outline !px-3 !py-2 text-xs"
          >
            <IconStore className="h-4 w-4" /> Ver formulario
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
          >
            <IconLogout className="h-4 w-4" /> Salir
          </button>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setTab('activaciones')}
          className={`-mb-px inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-semibold transition ${
            tab === 'activaciones'
              ? 'border-brand-dark text-navy'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <IconChart className="h-4 w-4" /> Activaciones
        </button>
        <button
          type="button"
          onClick={() => setTab('datos')}
          className={`-mb-px inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-semibold transition ${
            tab === 'datos'
              ? 'border-brand-dark text-navy'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <IconBox className="h-4 w-4" /> Base de datos
        </button>
        <button
          type="button"
          onClick={() => setTab('negociantes')}
          className={`-mb-px inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-semibold transition ${
            tab === 'negociantes'
              ? 'border-brand-dark text-navy'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <IconStore className="h-4 w-4" /> Negociantes
        </button>
        <button
          type="button"
          onClick={() => setTab('planes')}
          className={`-mb-px inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-semibold transition ${
            tab === 'planes'
              ? 'border-brand-dark text-navy'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <IconSparkles className="h-4 w-4" /> Planes
        </button>
      </div>

      {tab === 'datos' && <AgencyManager />}
      {tab === 'negociantes' && <AdminMerchantsManager />}
      {tab === 'planes' && <AdminPlansManager />}

      {tab === 'activaciones' && (
      <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Activaciones" value={stats.total} accent="text-navy" />
        <StatTile label="Dispositivos" value={stats.devices} accent="text-cyan-700" />
        <StatTile label="Cuentas usadas" value={stats.accounts} accent="text-brand-dark" />
        <StatTile label="Últimas 24 h" value={stats.last24} accent="text-emerald-700" />
      </div>

      {/* Config del backend */}
      <div className="card p-4">
        <p className="text-sm font-semibold text-navy">Endpoint de telemetría (backend)</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Sin un endpoint, este panel solo muestra las activaciones de <b>este</b> dispositivo. Pega la URL
          de tu backend (Google Apps Script, Firebase, etc.) para recolectar TODAS las activaciones de tus
          clientes de forma centralizada. Instrucciones en el README.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={endpoint}
            onChange={(e) => setEndpointState(e.target.value)}
            placeholder="https://script.google.com/macros/s/…/exec"
            spellCheck={false}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm text-navy placeholder:text-muted focus:border-brand-dark focus:ring-2 focus:ring-brand/25 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSaveEndpoint}
            className="btn btn-primary shrink-0"
          >
            Guardar
          </button>
        </div>
        <p className="mt-1.5 text-xs">
          {savedMsg ? (
            <span className="font-semibold text-emerald-600">Guardado.</span>
          ) : getEndpoint() ? (
            <span className="text-emerald-600">● Backend configurado — las activaciones se envían.</span>
          ) : (
            <span className="text-brand-dark">● Sin backend — registro solo local en este dispositivo.</span>
          )}
        </p>
      </div>

      {/* Acciones del log */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-navy">Registro de activaciones ({log.length})</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            disabled={!log.length}
            className="btn btn-outline !px-3 !py-1.5 text-xs disabled:opacity-40"
          >
            <IconDownload className="h-4 w-4" /> Exportar CSV
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!log.length}
            className="btn btn-outline !px-3 !py-1.5 text-xs disabled:opacity-40"
          >
            <IconTrash className="h-4 w-4" /> Vaciar
          </button>
        </div>
      </div>

      {log.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-muted">Aún no hay activaciones registradas en este dispositivo.</p>
          <p className="mt-1 text-xs text-muted">
            Cada vez que alguien ingrese con un serial (o como admin) aparecerá aquí: dispositivo, hora y
            ubicación.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[860px] text-left text-[13px]">
            <thead className="bg-surface text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-semibold">Fecha / hora</th>
                <th className="px-3 py-2 font-semibold">Tipo</th>
                <th className="px-3 py-2 font-semibold">Cuenta</th>
                <th className="px-3 py-2 font-semibold">Dispositivo</th>
                <th className="px-3 py-2 font-semibold">IP</th>
                <th className="px-3 py-2 font-semibold">Ubicación (IP)</th>
                <th className="px-3 py-2 font-semibold">GPS</th>
                <th className="px-3 py-2 font-semibold">Zona horaria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((e) => (
                <tr key={e.id} className="text-ink">
                  <td className="px-3 py-2 whitespace-nowrap">{fmtDate(e.ts)}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        e.type === 'admin'
                          ? 'bg-amber-100 text-brand-dark'
                          : 'bg-cyan-100 text-cyan-700'
                      }`}
                    >
                      {e.type === 'admin' ? 'Admin' : 'Negociante'}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">{e.serial || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {[e.browser, e.os, e.deviceType].filter(Boolean).join(' · ') || '—'}
                    <span className="block font-mono text-[10px] text-muted">{e.deviceId}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap font-mono text-xs">{e.ip || '—'}</td>
                  <td className="px-3 py-2">{ipLocation(e)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {e.gpsLat != null ? (
                      <a
                        href={`https://www.google.com/maps?q=${e.gpsLat},${e.gpsLng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-700 underline"
                      >
                        {e.gpsLat.toFixed(4)}, {e.gpsLng.toFixed(4)}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-muted">{e.tz || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-[11px] leading-relaxed text-muted">
        Nota: la ubicación por IP es aproximada (ciudad/país). El GPS exacto solo se registra si el usuario
        acepta el permiso del navegador. Esta telemetría es de activación de licencias (anti-piratería); al
        ser una app estática, la vista centralizada real requiere el endpoint configurado arriba.
      </p>
      </>
      )}
    </div>
  )
}
