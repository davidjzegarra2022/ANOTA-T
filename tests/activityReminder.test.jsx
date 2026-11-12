// @vitest-environment jsdom
import { afterEach, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ActivityReminderDialog from '../src/components/dashboard/ActivityReminderDialog.jsx'

afterEach(cleanup)

test('crea un recordatorio de actividad con día, hora y prioridad', () => {
  const onCreate = vi.fn()
  const onClose = vi.fn()
  render(<ActivityReminderDialog onCreate={onCreate} onClose={onClose} />)

  fireEvent.change(screen.getByLabelText(/Actividad a recordar/), { target: { value: 'Llamar a la agencia por el lote' } })
  fireEvent.change(screen.getByLabelText(/Día/), { target: { value: '2099-05-20' } })
  fireEvent.change(screen.getByLabelText(/Hora/), { target: { value: '09:30' } })
  fireEvent.click(screen.getByRole('button', { name: /Importante/ }))
  fireEvent.click(screen.getByRole('button', { name: /Guardar recordatorio/ }))

  expect(onCreate).toHaveBeenCalledTimes(1)
  expect(onCreate.mock.calls[0][0]).toMatchObject({
    text: 'Llamar a la agencia por el lote',
    dueDate: '2099-05-20',
    dueTime: '09:30',
    category: 'general',
    important: true,
    done: false,
  })
  expect(onClose).toHaveBeenCalled()
})

test('pide la actividad antes de guardar', () => {
  const onCreate = vi.fn()
  render(<ActivityReminderDialog onCreate={onCreate} onClose={() => {}} />)

  fireEvent.click(screen.getByRole('button', { name: /Guardar recordatorio/ }))

  expect(screen.getByRole('alert').textContent).toMatch(/Escribe qué actividad/)
  expect(onCreate).not.toHaveBeenCalled()
})
