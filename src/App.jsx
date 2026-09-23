import { useEffect, useMemo, useState } from 'react'
import AccessGate from './components/AccessGate'
import AdminDashboard from './components/AdminDashboard'
import AuthGate from './components/auth/AuthGate'
import DashboardLayout from './components/dashboard/DashboardLayout'
import Footer from './components/Footer'
import Header from './components/Header'
import { IconRefresh } from './components/icons'
import LandingPage from './components/LandingPage'
import ShippingForm from './components/ShippingForm'
import SuccessScreen from './components/SuccessScreen'
import { fetchMerchantBySlug } from './utils/merchantProfile'
import { createOrder } from './utils/orders'
import { getCurrentSession, isPlatformAdmin, onAuthStateChange, signOutMerchant } from './utils/supabaseAuth'

// Merchant de muestra SOLO para que el administrador pueda previsualizar el
// formulario ("Ver formulario" en su panel) — no está atado a ninguna
// cuenta real (el admin no es un negociante con su propio slug).
const ADMIN_PREVIEW_MERCHANT = {
  businessName: 'ANOTA-T (vista previa)',
  subtitle: 'Formulario de Envío',
  whatsappNumber: '51900000000',
  couriersActive: [],
  dispatchDays: [1, 2, 3, 4, 5, 6],
  cutoffHour: 18,
  leadTimeHours: 0,
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-2 text-muted">
      <IconRefresh className="h-4 w-4 animate-spin" />
      <span className="text-sm">Cargando…</span>
    </div>
  )
}

function PublicShippingRoute({ slug }) {
  const [merchant, setMerchant] = useState(undefined)
  const [submittedForm, setSubmittedForm] = useState(null)

  useEffect(() => {
    fetchMerchantBySlug(slug).then(setMerchant)
  }, [slug])

  async function handleSubmit(form) {
    await createOrder(merchant.id, form)
    setSubmittedForm(form)
  }

  if (merchant === undefined) return <LoadingScreen />

  if (!merchant || !merchant.active) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-sm text-muted">Este link no existe o ya no está disponible.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header
        businessName={merchant.businessName}
        subtitle="Formulario de Envío"
        minimal={Boolean(submittedForm)}
        logoUrl={merchant.logoUrl}
      />
      <main className="mx-auto w-full max-w-xl flex-1 px-5 py-6 sm:px-6">
        {submittedForm ? (
          <SuccessScreen form={submittedForm} merchant={merchant} onNewOrder={() => setSubmittedForm(null)} />
        ) : (
          <ShippingForm merchant={merchant} onSubmit={handleSubmit} />
        )}
      </main>
      <Footer />
    </div>
  )
}

function AdminRoute() {
  // `undefined` = todavía comprobando la sesión; `false` = no es admin.
  const [isAdmin, setIsAdmin] = useState(undefined)
  const [adminView, setAdminView] = useState('dashboard') // 'dashboard' | 'form'
  const [submittedForm, setSubmittedForm] = useState(null)

  // El rol de admin lo decide la base de datos (tabla `platform_admins`), no
  // el navegador: aunque alguien fuerce este estado en memoria, las RPC
  // `admin_*` siguen respondiendo `forbidden` sin la sesión correcta.
  useEffect(() => {
    let alive = true
    getCurrentSession().then(async (session) => {
      const admin = session ? await isPlatformAdmin() : false
      if (alive) setIsAdmin(admin)
    })
    return () => {
      alive = false
    }
  }, [])

  function handleUnlock() {
    setIsAdmin(true)
  }

  async function handleLogout() {
    await signOutMerchant()
    setIsAdmin(false)
    setAdminView('dashboard')
    setSubmittedForm(null)
  }

  function handleBackToPanel() {
    setSubmittedForm(null)
    setAdminView('dashboard')
  }

  if (isAdmin === undefined) return <LoadingScreen />
  if (!isAdmin) return <AccessGate onUnlock={handleUnlock} />

  const wide = adminView === 'dashboard'

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header businessName="ANOTA-T" subtitle="Panel de administrador" />
      <main className={`mx-auto w-full flex-1 px-5 py-6 sm:px-6 ${wide ? 'max-w-5xl' : 'max-w-xl'}`}>
        {adminView === 'dashboard' ? (
          <AdminDashboard onLogout={handleLogout} onOpenForm={() => setAdminView('form')} />
        ) : (
          <>
            <button
              type="button"
              onClick={handleBackToPanel}
              className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-muted transition hover:text-navy"
            >
              ← Volver al panel
            </button>
            {submittedForm ? (
              <SuccessScreen form={submittedForm} merchant={ADMIN_PREVIEW_MERCHANT} onNewOrder={() => setSubmittedForm(null)} onBackToPanel={handleBackToPanel} />
            ) : (
              <ShippingForm merchant={ADMIN_PREVIEW_MERCHANT} onSubmit={setSubmittedForm} />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

// 'login' | 'signup' | 'forgot-password' | null (landing)
function authScreenForPath(path) {
  if (path === '/login') return 'login'
  if (path === '/signup') return 'signup'
  if (path === '/forgot-password') return 'forgot'
  return null
}

/**
 * Supabase manda al usuario de vuelta con un hash según el tipo de link de
 * correo: `type=signup` (confirmación de cuenta) o `type=recovery`
 * (recuperar contraseña). Se lee una sola vez, antes del primer render.
 */
function readAuthHashType() {
  const hash = window.location.hash || ''
  if (hash.includes('type=recovery')) return 'recovery'
  if (hash.includes('type=signup') || hash.includes('type=email_change')) return 'signup'
  return null
}

function MerchantSaasRoute({ path }) {
  const [hashType] = useState(readAuthHashType)
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    let cancelled = false
    let unsubscribe = () => {}

    async function init() {
      // El link de confirmación SOLO debe confirmar la cuenta: Supabase abre
      // una sesión automáticamente al validarlo, así que la cerramos y
      // dejamos al usuario en el login para que entre con sus credenciales.
      if (hashType === 'signup') {
        window.history.replaceState(null, '', '/login')
        await signOutMerchant()
      }

      // La suscripción se monta SIEMPRE, también al llegar del link de
      // confirmación: sin ella nada volvía a tocar `session`, así que al
      // ingresar el formulario se quedaba pegado sin redirigir al panel.
      const unsub = await onAuthStateChange((newSession) => {
        if (!cancelled) setSession(newSession)
      })
      if (cancelled) {
        unsub()
        return
      }
      unsubscribe = unsub

      const current = hashType === 'signup' ? null : await getCurrentSession()
      if (!cancelled) setSession(current)
    }

    init()
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [hashType])

  async function handleLogout() {
    await signOutMerchant()
    setSession(null)
  }

  if (session === undefined) return <LoadingScreen />

  // Con sesión activa, siempre al panel — sin importar si llegó a /login por error.
  if (session && hashType !== 'recovery') {
    return <DashboardLayout email={session.user.email} onLogout={handleLogout} />
  }

  const authScreen = hashType === 'recovery' ? 'reset' : hashType === 'signup' ? 'login' : authScreenForPath(path)
  if (!authScreen) return <LandingPage />

  return (
    <AuthGate
      initialScreen={authScreen}
      notice={hashType === 'signup' ? 'Tu cuenta quedó confirmada. Ya puedes ingresar.' : null}
      onLoggedIn={async () => {
        // replaceState borra también el hash del link de correo. La sesión
        // se pide de frente (sin esperar al listener) para que el panel
        // aparezca apenas termina el login.
        window.history.replaceState(null, '', '/')
        setSession(await getCurrentSession())
      }}
    />
  )
}

export default function App() {
  const path = window.location.pathname
  const isAdminRoute = useMemo(() => /^\/admin(\/|$)/.test(path), [path])
  const publicFormSlug = useMemo(() => {
    const match = path.match(/^\/f\/([^/]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }, [path])

  if (isAdminRoute) return <AdminRoute />
  if (publicFormSlug) return <PublicShippingRoute slug={publicFormSlug} />
  return <MerchantSaasRoute path={path} />
}
