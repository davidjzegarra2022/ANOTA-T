import { supportWhatsAppUrl } from '../utils/support'
import { IconWhatsapp } from './icons'

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-xl px-5 py-6 text-center sm:px-6">
      <p className="text-xs leading-relaxed text-muted">
        ¿Te gusta este sistema? Podemos hacer un sistema web para tu empresa. Contáctate con este correo:{' '}
        <a href="mailto:helpanotat@gmail.com" className="font-semibold text-brand-dark underline-offset-2 hover:underline">
          helpanotat@gmail.com
        </a>
      </p>
      {/* Abre WhatsApp (app o web) con la conversación y un mensaje ya escrito. */}
      <p className="mt-1.5 text-xs leading-relaxed text-muted">
        Contáctate con este número:{' '}
        <a
          href={supportWhatsAppUrl('webSystem')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-emerald-700 underline-offset-2 hover:underline"
        >
          <IconWhatsapp className="h-3.5 w-3.5" /> +51 970 804 662
        </a>
      </p>
    </footer>
  )
}
