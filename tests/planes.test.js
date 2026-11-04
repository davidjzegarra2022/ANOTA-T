import { expect, test } from 'vitest'
import { recommendedUpgrade } from '../src/components/dashboard/PlanesPage.jsx'

const plans = [
  { id: 'free', name: 'Prueba Free', trialDays: 15, pricePerDay: 0 },
  { id: 'emp', name: 'Emprendedor', trialDays: null, pricePerDay: 1 },
  { id: 'pro', name: 'Emprendedor Pro', trialDays: null, pricePerDay: 1.5 },
]

test('recommendedUpgrade: recomienda el Pro a quien no lo tiene y nada a quien ya lo tiene', () => {
  expect(recommendedUpgrade(plans, plans[0]).id).toBe('pro')
  expect(recommendedUpgrade(plans, plans[1]).id).toBe('pro')
  expect(recommendedUpgrade(plans, null).id).toBe('pro')
  expect(recommendedUpgrade(plans, plans[2])).toBe(null)
  // Sin plan Pro: el siguiente más caro.
  expect(recommendedUpgrade(plans.slice(0, 2), plans[0]).id).toBe('emp')
  expect(recommendedUpgrade(plans.slice(0, 2), plans[1])).toBe(null)
})
