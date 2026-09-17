import { useState } from 'react'
import { copyText } from '../../utils/clipboard'
import { buildWhatsAppUrl } from '../../utils/whatsapp'
import { IconCheck, IconCopy, IconWhatsapp } from '../icons'

/**
 * Barra fija con el link público del negociante (el que reparte entre sus
 * propios clientes), visible en cualquier pestaña del panel — copiar o
 * reenviar por WhatsApp sin tener que ir a Configuración a buscarlo.
 */
export default function ShareLinkBar({ slug }) {
  const [copied, setCopied] = useState(false)
  const link = `${window.location.origin}/f/${slug}`

  function handleCopy() {
    copyText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Sin número de destino: abre el selector de contactos/grupos de WhatsApp
  // para que el negociante elija a quién reenviárselo.
  const whatsappUrl = buildWhatsAppUrl('', `Llena tu pedido aquí: ${link}`)

  return (
    <div className="border-t border-white/10 bg-gray-950/90 px-4 py-2.5 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-2">
        <span className="min-w-0 flex-1 truncate font-mono text-xs text-gray-400">{link}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 transition hover:bg-white/10"
        >
          {copied ? <IconCheck className="h-3.5 w-3.5 text-emerald-400" /> : <IconCopy className="h-3.5 w-3.5" />}
          {copied ? 'Copiado' : 'Copiar link'}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-400"
        >
          <IconWhatsapp className="h-3.5 w-3.5" /> Reenviar por WhatsApp
        </a>
      </div>
    </div>
  )
}
