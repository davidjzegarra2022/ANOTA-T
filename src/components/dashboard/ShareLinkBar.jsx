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
    <div className="border-t border-slate-200 bg-white px-4 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center">
        <span className="min-w-0 flex-1 truncate text-center font-mono text-xs text-muted sm:text-left">{link}</span>
        <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-outline flex-1 shrink-0 !px-3 !py-1.5 text-xs sm:flex-none"
        >
          {copied ? <IconCheck className="h-3.5 w-3.5 text-emerald-600" /> : <IconCopy className="h-3.5 w-3.5" />}
          {copied ? 'Copiado' : 'Copiar link'}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-600 sm:flex-none"
        >
          <IconWhatsapp className="h-3.5 w-3.5" /> <span className="truncate">Reenviar por WhatsApp</span>
        </a>
        </div>
      </div>
    </div>
  )
}
