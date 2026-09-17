import { useState } from 'react'
import CrmIllustration from '../CrmIllustration'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import LoginScreen from './LoginScreen'
import ResetPasswordScreen from './ResetPasswordScreen'
import SignupScreen from './SignupScreen'

/**
 * Pantalla de acceso del negociante: login / registro / recuperar
 * contraseña con Supabase Auth (email + contraseña real). Reemplaza el
 * antiguo login por serial fijo.
 */
export default function AuthGate({ initialScreen = 'login', onLoggedIn }) {
  const [screen, setScreen] = useState(initialScreen)

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-6 px-5 py-10 sm:px-8 md:flex-row md:justify-between md:gap-6 md:px-10 lg:px-16 xl:px-24">
      <div className="tilt-3d-wrap hidden w-full max-w-md md:flex md:flex-1 md:items-center md:justify-center lg:max-w-lg">
        <CrmIllustration className="tilt-3d w-full" />
      </div>

      {screen === 'signup' ? (
        <SignupScreen onGoToLogin={() => setScreen('login')} />
      ) : screen === 'forgot' ? (
        <ForgotPasswordScreen onGoToLogin={() => setScreen('login')} />
      ) : screen === 'reset' ? (
        <ResetPasswordScreen onDone={onLoggedIn} />
      ) : (
        <LoginScreen
          onLoggedIn={onLoggedIn}
          onGoToSignup={() => setScreen('signup')}
          onGoToForgotPassword={() => setScreen('forgot')}
        />
      )}
    </div>
  )
}
