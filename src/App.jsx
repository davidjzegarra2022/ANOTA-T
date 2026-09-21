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
import { clearAdminAccess, getStoredAdminRole, setAdminUnlocked } from './utils/serial'
import { getCurrentSession, onAuthStateChange, signOutMerchant } from './utils/supabaseAuth'

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
      <Header businessName={merchant.businessName} subtitle="Formulario de Envío" minimal={Boolean(submittedForm)} />
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
  const [role, setRole] = useState(() => (getStoredAdminRole() === 'admin' ? 'admin' : null))
  const [adminView, setAdminView] = useState('dashboard') // 'dashboard' | 'form'
  const [submittedForm, setSubmittedForm] = useState(null)

  function handleUnlock() {
    setAdminUnlocked()
    setRole('admin')
  }

  function handleLogout() {
    clearAdminAccess()
    setRole(null)
    setAdminView('dashboard')
    setSubmittedForm(null)
  }

  function handleBackToPanel() {
    setSubmittedForm(null)
    setAdminView('dashboard')
  }

  if (!role) return <AccessGate onUnlock={handleUnlock} />

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

function MerchantSaasRoute({ path }) {
  const [session, setSession] = useState(undefined)
  const [showResetScreen, setShowResetScreen] = useState(false)

  useEffect(() => {
    let unsubscribe = () => {}
    getCurrentSession().then(setSession)
    onAuthStateChange((newSession) => {
      setSession(newSession)
    }).then((unsub) => {
      unsubscribe = unsub
    })
    // Supabase entrega este hash cuando el usuario viene del link de "recuperar contraseña".
    if (window.location.hash.includes('type=recovery')) setShowResetScreen(true)
    return () => unsubscribe()
  }, [])

  async function handleLogout() {
    await signOutMerchant()
    setSession(null)
  }

  if (session === undefined) return <LoadingScreen />

  // Con sesión activa, siempre al panel — sin importar si llegó a /login por error.
  if (session && !showResetScreen) {
    return <DashboardLayout email={session.user.email} onLogout={handleLogout} />
  }

  const authScreen = authScreenForPath(path)
  if (!authScreen && !showResetScreen) return <LandingPage />

  return (
    <AuthGate
      initialScreen={showResetScreen ? 'reset' : authScreen}
      onLoggedIn={() => {
        setShowResetScreen(false)
        window.location.hash = ''
        window.history.replaceState(null, '', '/')
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
