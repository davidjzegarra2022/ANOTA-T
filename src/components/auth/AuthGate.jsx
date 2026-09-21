import { useState } from 'react'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import LoginScreen from './LoginScreen'
import ResetPasswordScreen from './ResetPasswordScreen'
import SignupScreen from './SignupScreen'

/**
 * Pantalla de acceso del negociante: login / registro / recuperar
 * contraseña con Supabase Auth (email + contraseña real).
 */
export default function AuthGate({ initialScreen = 'login', onLoggedIn }) {
  const [screen, setScreen] = useState(initialScreen)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-surface px-5 py-10">
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
