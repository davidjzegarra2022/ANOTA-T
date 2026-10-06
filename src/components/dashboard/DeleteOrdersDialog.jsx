import { useEffect, useState } from 'react'
import { deleteOrders } from '../../utils/orders'
import { IconTrash, IconX } from '../icons'

const norm = (t) => String(t || '').trim().replace(/\s+/g, ' ').toLowerCase()

/**
 * Borrado de pedidos con doble confirmación: primero el vendedor escribe el
 * nombre de su negocio y después confirma que desea borrar. No se puede
 * deshacer.
 */
export default function DeleteOrdersDialog({ orders, businessName, onClose, onDeleted }) {
  const [step, setStep] = useState('name')
  const [typed, setTyped] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const count = orders.length
  const nameOk = norm(typed) === norm(businessName) && norm(businessName) !== ''
  const what = count === 1 ? `el pedido #${orders[0].dailyNumber ?? orders[0].orderNumber ?? ''} de ${orders[0].customerName}` : `${count} pedidos`

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && !busy) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onClose])

  async function confirmDelete() {
    setBusy(true)
    setError(null)
    const res = await deleteOrders(orders.map((o) => o.id))
    setBusy(false)
    if (!res.ok) {
      setError(res.error || 'No se pudo borrar. Inténtalo de nuevo.')
      return
    }
    onDeleted(res.deleted)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-6">
      <button type="button" aria-label="Cerrar" onClick={() => !busy && onClose()} className="absolute inset-0" />
      <div role="alertdialog" aria-modal="true" aria-labelledby="del-title" className="relative w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6">
        <button type="button" onClick={onClose} disabled={busy} aria-label="Cerrar" className="absolute top-3 right-3 rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-navy">
          <IconX className="h-5 w-5" />
        </button>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <IconTrash className="h-5 w-5" />
        </span>
        <h2 id="del-title" className="mt-3 text-lg font-bold text-navy">
          Eliminar {count === 1 ? 'pedido' : `${count} pedidos`}
        </h2>

        {step === 'name' ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (nameOk) setStep('confirm')
            }}
          >
            <p className="mt-1 text-sm text-muted">
              Por seguridad, escribe el nombre de tu negocio <b className="text-ink">{businessName}</b> para continuar.
            </p>
            <input
              autoFocus
              value={typed}
              onChange={(e) => setTyped(e.target.value.slice(0, 120))}
              placeholder={businessName}
              aria-label="Nombre de tu negocio"
              autoComplete="off"
              className={`input-field mt-3 ${typed && !nameOk ? 'has-error' : ''}`}
            />
            {typed && !nameOk && <p className="mt-1 text-xs font-semibold text-red-600">El nombre no coincide.</p>}
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={onClose} className="btn btn-outline flex-1">
                Cancelar
              </button>
              <button type="submit" disabled={!nameOk} className="btn flex-1 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
                Continuar
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted">
              ¿Deseas borrar {what}? <b className="text-red-700">Esta acción no se puede deshacer</b> y el cliente ya no podrá consultarlo con su código.
            </p>
            {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={onClose} disabled={busy} className="btn btn-outline flex-1">
                No, conservar
              </button>
              <button type="button" onClick={confirmDelete} disabled={busy} className="btn flex-1 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
                <IconTrash className="h-4 w-4" /> {busy ? 'Borrando…' : 'Sí, borrar'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
