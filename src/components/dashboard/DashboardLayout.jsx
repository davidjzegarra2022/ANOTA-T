import { useEffect, useState } from 'react'
import logoIcon from '../../assets/logo-icon.webp'
import { ensureLightLogo, fetchAcceptingOrders, fetchMyMerchant, syncSellerDraft } from '../../utils/merchantProfile'
import { fetchActivePlans, isProPlan } from '../../utils/plans'
import { supportWhatsAppUrl } from '../../utils/support'
import ClaudeCodeLoader from '../ClaudeCodeLoader'
import { ThemeButton } from '../ThemeToggle'
import InstallAppButton from '../InstallAppButton'
import NotificationBell from './NotificationBell'
import { CountdownChip, ExpiryBanner, SubscriptionLock } from './SubscriptionCountdown'
import { subscriptionDeadline } from '../../utils/subscription'
import { syncReminders } from '../../utils/reminders'
import OnboardingChecklist from './OnboardingChecklist'
import ShareMenu from './ShareMenu'
import {
  IconBell,
  IconBox,
  IconGrid,
  IconLogout,
  IconSettings,
  IconSparkles,
  IconWhatsapp,
  IconUsers,
  IconX,
} from '../icons'
import ClientesPage from './ClientesPage'
import ConfiguracionPage from './ConfiguracionPage'
import EnviosPage from './EnviosPage'
import PanelProPage from './PanelProPage'
import PlanesPage from './PlanesPage'
import RecordatoriosPage from './RecordatoriosPage'
import ShareLinkBar from './ShareLinkBar'

const NAV_ITEMS = [
  { id: 'envios', label: 'Envíos', icon: IconBox },
  { id: 'clientes', label: 'Clientes', icon: IconUsers },
  // Recordatorios y Vendedores son del plan Emprendedor Pro: el plan lo
  // asigna solo la administración desde /admin → Negociantes.
  { id: 'recordatorios', label: 'Recordatorios', icon: IconBell, proOnly: true },
  { id: 'panel', label: 'Panel Pro', icon: IconGrid },
  { id: 'configuracion', label: 'Configuración', icon: IconSettings },
  // Planes y Suscripción ahora son una sola pantalla.
  { id: 'planes', label: 'Mi plan', icon: IconSparkles, highlight: true },
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
  const [acceptingOrders, setAcceptingOrders] = useState(true)
  // En escritorio el sidebar se minimiza; en móvil se abre como cajón sobre
  // el contenido (antes ocupaba 240px fijos y empujaba la página fuera de
  // la pantalla del teléfono).
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  // Plan actual del negociante: solo "Emprendedor Pro" habilita Recordatorios
  // y Vendedores. `proEnabled` es solo de lectura — el plan se asigna desde
  // el panel de administración.
  const [plan, setPlan] = useState(null)
  // ¿Ya se sabe qué plan tiene? La campanita espera a saberlo: antes de eso
  // no puede decidir si mostrar recordatorios (son del plan Pro).
  const [planReady, setPlanReady] = useState(false)

  const proEnabled = isProPlan(plan)

  async function refreshMerchant() {
    setLoading(true)
    const m = await syncSellerDraft(await fetchMyMerchant())
    setMerchant(m)
    if (m) setAcceptingOrders(await fetchAcceptingOrders(m.id))
    setLoading(false)
    // Logos subidos antes de la compresión: se aligeran solos (en segundo
    // plano) para que se vean en la vista previa de WhatsApp.
    if (m?.logoUrl) {
      ensureLightLogo(m).then((url) => {
        if (url) setMerchant((cur) => (cur ? { ...cur, logoUrl: url } : cur))
      })
    }
  }

  useEffect(() => {
    refreshMerchant()
  }, [])

  useEffect(() => {
    if (!merchant?.planId) {
      setPlan(null)
      if (merchant) setPlanReady(true)
      return
    }
    let alive = true
    fetchActivePlans().then((plans) => {
      if (alive) {
        setPlan(plans.find((p) => p.id === merchant.planId) || null)
        setPlanReady(true)
      }
    })
    return () => {
      alive = false
    }
  }, [merchant?.planId])

  // Cuenta regresiva del plan: al llegar a cero se bloquea el panel.
  const sub = subscriptionDeadline(merchant, plan)
  const deadlineMs = sub.deadline ? sub.deadline.getTime() : null
  const [expired, setExpired] = useState(false)
  useEffect(() => {
    if (deadlineMs == null) {
      setExpired(false)
      return undefined
    }
    const left = deadlineMs - Date.now()
    setExpired(left <= 0)
    if (left <= 0) return undefined
    // setTimeout no acepta más de ~24 días: se revisa de nuevo al cumplirse.
    const id = setTimeout(() => setExpired(Date.now() >= deadlineMs), Math.min(left + 500, 2 ** 31 - 1))
    return () => clearTimeout(id)
  }, [deadlineMs])
  const locked = planReady && Boolean(merchant) && (expired || acceptingOrders === false)

  // Una sola campanita a la vez (encabezado móvil o barra de escritorio):
  // si se montaran las dos, se revisaría y avisaría el doble.
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia?.('(min-width: 1024px)').matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia?.('(min-width: 1024px)')
    if (!mq) return undefined
    const on = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Recordatorios en la nube: se sincronizan al entrar y al volver a la pestaña.
  useEffect(() => {
    if (!merchant?.id || !proEnabled) return undefined
    syncReminders(merchant.id)
    const onVisible = () => document.visibilityState === 'visible' && syncReminders(merchant.id)
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [merchant?.id, proEnabled])

  // Dentro del panel el botón de tema va en el encabezado (ver index.css).
  useEffect(() => {
    document.documentElement.classList.add('inline-theme')
    return () => document.documentElement.classList.remove('inline-theme')
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

  // El cargador solo ocupa la pantalla la primera vez: al refrescar el perfil
  // (por ejemplo después de "Guardar cambios") el panel NO se desmonta, así
  // no se pierde lo que el usuario tenía escrito en el formulario.
  if (loading && !merchant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6">
        <ClaudeCodeLoader />
      </div>
    )
  }

  if (merchant && !merchant.active) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
        <p className="text-lg font-bold text-navy">Tu cuenta está desactivada</p>
        <p className="max-w-sm text-sm text-muted">Escríbenos por WhatsApp y te ayudamos a reactivarla.</p>
        <a
          href={supportWhatsAppUrl('reactivate', { email })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          <IconWhatsapp className="h-4 w-4" /> Pedir apoyo por WhatsApp
        </a>
        <button type="button" onClick={onLogout} className="btn btn-outline">
          Salir
        </button>
      </div>
    )
  }

  const currentLabel = NAV_ITEMS.find((i) => i.id === tab)?.label || 'ANOTA-T'

  return (
    <div className="flex min-h-screen">
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
        className={`glass-side fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-navy text-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:transition-all ${
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
              {item.highlight && !proEnabled && (
                <span
                  className={`ml-auto shrink-0 animate-pulse rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide text-navy ${collapsed ? 'lg:hidden' : ''}`}
                >
                  MEJORAR
                </span>
              )}
              {item.proOnly && !proEnabled && (
                <span
                  className={`ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide ${
                    tab === item.id ? 'bg-navy/15 text-navy' : 'bg-white/10 text-slate-400'
                  } ${collapsed ? 'lg:hidden' : ''}`}
                >
                  PRO
                </span>
              )}
            </button>
          ))}
          {merchant?.slug && (
            <ShareMenu slug={merchant.slug} businessName={merchant.businessName} logoUrl={merchant.logoUrl} collapsed={collapsed} onExpand={() => setCollapsed(false)} merchantId={merchant.id} />
          )}
        </nav>

        {/* Celular: descargar la app (no aparece en computadora ni si ya está instalada). */}
        <div className="mx-2.5 mb-2 lg:hidden">
          <InstallAppButton variant="dark" className="w-full" />
        </div>
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
        <header className="glass-bar sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
            className="rounded-lg border border-slate-200 p-2 text-navy transition hover:bg-surface"
          >
            <IconMenu className="h-5 w-5" />
          </button>
          <p className="min-w-0 flex-1 truncate text-base font-bold text-navy">{currentLabel}</p>
          {merchant && planReady && <CountdownChip deadline={sub.deadline} kind={sub.kind} compact onClick={() => selectTab('planes')} />}
          {merchant && planReady && !isDesktop && <NotificationBell merchant={merchant} remindersEnabled={proEnabled} currentTab={tab} onGoTo={selectTab} compact />}
          <ThemeButton />
        </header>

        {/* Escritorio: avisos y tema arriba a la derecha, siempre a mano. */}
        <div className="hidden items-center justify-end gap-2 px-10 pt-4 lg:flex">
          {merchant && planReady && <CountdownChip deadline={sub.deadline} kind={sub.kind} onClick={() => selectTab('planes')} />}
          {merchant && planReady && isDesktop && <NotificationBell merchant={merchant} remindersEnabled={proEnabled} currentTab={tab} onGoTo={selectTab} />}
          <ThemeButton className="h-11 w-11" />
        </div>
        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:pt-2 lg:pb-8">
          {!merchant ? (
            <p className="text-sm text-red-600">No se pudo cargar tu perfil. Recarga la página.</p>
          ) : (
            <>
              {locked && tab === 'planes' && (
                <div role="alert" className="mb-5 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  🔒 Tu panel está bloqueado hasta que renueves. Elige un plan y escríbenos por WhatsApp para reactivarlo.
                </div>
              )}
              {!locked && <ExpiryBanner deadline={sub.deadline} kind={sub.kind} merchant={merchant} onPlans={() => selectTab('planes')} />}
              {tab !== 'configuracion' && <OnboardingChecklist merchant={merchant} proEnabled={proEnabled} onGoTo={selectTab} />}
              {tab === 'envios' && <EnviosPage merchant={merchant} proEnabled={proEnabled} onUpgrade={() => selectTab('planes')} />}
              {tab === 'clientes' && <ClientesPage merchant={merchant} />}
              {tab === 'recordatorios' && (
                <RecordatoriosPage merchant={merchant} locked={!proEnabled} onUpgrade={() => setTab('planes')} />
              )}
              {tab === 'panel' && <PanelProPage merchant={merchant} />}
              {tab === 'configuracion' && (
                <ConfiguracionPage merchant={merchant} onSaved={refreshMerchant} locked={!proEnabled} onUpgrade={() => setTab('planes')} />
              )}
              {(tab === 'planes' || tab === 'suscripcion') && <PlanesPage merchant={merchant} />}
            </>
          )}
        </main>

        {locked && tab !== 'planes' && (
          <SubscriptionLock kind={sub.kind} planName={plan?.name} deadline={sub.deadline} merchant={merchant} onPlans={() => selectTab('planes')} onLogout={onLogout} />
        )}
        {merchant && <ShareLinkBar slug={merchant.slug} logoUrl={merchant.logoUrl} merchantId={merchant.id} />}
      </div>
    </div>
  )
}
