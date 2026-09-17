import { useEffect, useState } from 'react'
import { fetchMyMerchant } from '../../utils/merchantProfile'
import {
  IconBox,
  IconCard,
  IconGrid,
  IconLogout,
  IconRefresh,
  IconSettings,
  IconSparkles,
  IconUsers,
} from '../icons'
import ClientesPage from './ClientesPage'
import ConfiguracionPage from './ConfiguracionPage'
import EnviosPage from './EnviosPage'
import PanelProPage from './PanelProPage'
import PlanesPage from './PlanesPage'
import SuscripcionPage from './SuscripcionPage'

const NAV_ITEMS = [
  { id: 'envios', label: 'Envíos', icon: IconBox },
  { id: 'clientes', label: 'Clientes', icon: IconUsers },
  { id: 'panel', label: 'Panel Pro', icon: IconGrid },
  { id: 'configuracion', label: 'Configuración', icon: IconSettings },
  { id: 'planes', label: 'Planes', icon: IconSparkles },
  { id: 'suscripcion', label: 'Suscripción', icon: IconCard },
]

export default function DashboardLayout({ email, onLogout }) {
  const [tab, setTab] = useState('envios')
  const [merchant, setMerchant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  async function refreshMerchant() {
    setLoading(true)
    setMerchant(await fetchMyMerchant())
    setLoading(false)
  }

  useEffect(() => {
    refreshMerchant()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 text-gray-400">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  if (merchant && !merchant.active) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-lg font-bold text-white">Tu cuenta está desactivada</p>
        <p className="max-w-sm text-sm text-gray-400">Contacta al administrador de la plataforma para reactivarla.</p>
        <button type="button" onClick={onLogout} className="mt-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-white/10">
          Salir
        </button>
      </div>
    )
  }

  return (
    <div className="relative z-10 flex min-h-screen">
      <aside
        className={`flex shrink-0 flex-col border-r border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <div className="flex items-center gap-2.5 px-4 py-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 ring-1 ring-amber-400/30">
            <IconBox className="h-4.5 w-4.5" />
          </span>
          {!collapsed && <p className="truncate text-base font-bold text-white">ANOTA-T</p>}
        </div>

        <nav className="flex-1 space-y-1 px-2.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              title={item.label}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                tab === item.id ? 'bg-amber-400/15 text-amber-300' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        {!collapsed && merchant && (
          <div className="mx-2.5 mb-3 rounded-lg bg-amber-400/10 px-3 py-1.5 text-center text-xs font-bold text-amber-300">
            {merchant.planId ? 'Plan activo' : 'Sin plan'}
          </div>
        )}

        <div className="space-y-1 border-t border-white/10 px-2.5 py-3">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-400 transition hover:bg-white/5 hover:text-gray-200"
          >
            {collapsed ? '»' : '« Minimizar'}
          </button>
          {!collapsed && <p className="truncate px-3 text-[11px] text-gray-500">{email}</p>}
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
          >
            <IconLogout className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && 'Salir'}
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        {!merchant ? (
          <p className="text-sm text-red-400">No se pudo cargar tu perfil. Recarga la página.</p>
        ) : (
          <>
            {tab === 'envios' && <EnviosPage merchant={merchant} />}
            {tab === 'clientes' && <ClientesPage merchant={merchant} />}
            {tab === 'panel' && <PanelProPage merchant={merchant} />}
            {tab === 'configuracion' && <ConfiguracionPage merchant={merchant} onSaved={refreshMerchant} />}
            {tab === 'planes' && <PlanesPage merchant={merchant} />}
            {tab === 'suscripcion' && <SuscripcionPage merchant={merchant} />}
          </>
        )}
      </main>
    </div>
  )
}
