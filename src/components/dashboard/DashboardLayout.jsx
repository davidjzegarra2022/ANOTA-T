import { useEffect, useState } from 'react'
import logoIcon from '../../assets/logo-icon.png'
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
  IconX,
} from '../icons'
import ClientesPage from './ClientesPage'
import ConfiguracionPage from './ConfiguracionPage'
import EnviosPage from './EnviosPage'
import PanelProPage from './PanelProPage'
import PlanesPage from './PlanesPage'
import ShareLinkBar from './ShareLinkBar'
import SuscripcionPage from './SuscripcionPage'

const NAV_ITEMS = [
  { id: 'envios', label: 'Envíos', icon: IconBox },
  { id: 'clientes', label: 'Clientes', icon: IconUsers },
  { id: 'panel', label: 'Panel Pro', icon: IconGrid },
  { id: 'configuracion', label: 'Configuración', icon: IconSettings },
  { id: 'planes', label: 'Planes', icon: IconSparkles },
  { id: 'suscripcion', label: 'Suscripción', icon: IconCard },
]

function IconMenu({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export default function DashboardLayout({ email, onLogout }) {
  const [tab, setTab] = useState('envios')
  const [merchant, setMerchant] = useState(null)
  const [loading, setLoading] = useState(true)
  // En escritorio el sidebar se minimiza; en móvil se abre como cajón sobre
  // el contenido (antes ocupaba 240px fijos y empujaba la página fuera de
  // la pantalla del teléfono).
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  async function refreshMerchant() {
    setLoading(true)
    setMerchant(await fetchMyMerchant())
    setLoading(false)
  }

  useEffect(() => {
    refreshMerchant()
  }, [])

  // Cerrar el cajón con Escape.
  useEffect(() => {
    if (!drawerOpen) return undefined
    function onKey(e) {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  function selectTab(id) {
    setTab(id)
    setDrawerOpen(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 text-muted">
        <IconRefresh className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando…</span>
      </div>
    )
  }

  if (merchant && !merchant.active) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
        <p className="text-lg font-bold text-navy">Tu cuenta está desactivada</p>
        <p className="max-w-sm text-sm text-muted">Contacta al administrador de la plataforma para reactivarla.</p>
        <button type="button" onClick={onLogout} className="btn btn-outline mt-2">
          Salir
        </button>
      </div>
    )
  }

  const currentLabel = NAV_ITEMS.find((i) => i.id === tab)?.label || 'ANOTA-T'

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Fondo oscuro del cajón (solo móvil) */}
      {drawerOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-30 bg-navy/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-navy text-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:transition-all ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-16' : 'lg:w-60'}`}
      >
        <div className="flex items-center gap-2.5 px-4 py-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white to-[#e6eef7] shadow-md">
            <img src={logoIcon} alt="" className="h-5 w-5" />
          </span>
          <p className={`truncate text-base font-bold text-white ${collapsed ? 'lg:hidden' : ''}`}>ANOTA-T</p>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Cerrar menú"
            className="ml-auto rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectTab(item.id)}
              title={item.label}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                tab === item.id ? 'bg-brand text-navy' : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
            </button>
          ))}
        </nav>

        {merchant && (
          <div
            className={`mx-2.5 mb-3 rounded-lg bg-white/10 px-3 py-1.5 text-center text-xs font-bold text-brand ${
              collapsed ? 'lg:hidden' : ''
            }`}
          >
            {merchant.planId ? 'Plan activo' : 'Sin plan'}
          </div>
        )}

        <div className="space-y-1 border-t border-white/10 px-2.5 py-3">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="hidden w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white lg:flex"
          >
            {collapsed ? '»' : '« Minimizar'}
          </button>
          <p className={`truncate px-3 text-[11px] text-slate-400 ${collapsed ? 'lg:hidden' : ''}`}>{email}</p>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/15"
          >
            <IconLogout className="h-4.5 w-4.5 shrink-0" />
            <span className={collapsed ? 'lg:hidden' : ''}>Salir</span>
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barra superior solo en móvil: abre el cajón y dice dónde estás */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
            className="rounded-lg border border-slate-200 p-2 text-navy transition hover:bg-surface"
          >
            <IconMenu className="h-5 w-5" />
          </button>
          <p className="min-w-0 flex-1 truncate text-base font-bold text-navy">{currentLabel}</p>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white to-[#e6eef7] shadow-md">
            <img src={logoIcon} alt="" className="h-5 w-5" />
          </span>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
          {!merchant ? (
            <p className="text-sm text-red-600">No se pudo cargar tu perfil. Recarga la página.</p>
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

        {merchant && <ShareLinkBar slug={merchant.slug} />}
      </div>
    </div>
  )
}
