import { expect, test } from 'vitest'
import { MAX_SECONDS, VIBRATION, motifDuration } from '../src/utils/notifySound.js'

test('el sonido de aviso nunca pasa de 5 segundos y la vibración es corta', () => {
  expect(MAX_SECONDS).toBeLessThanOrEqual(5)
  expect(motifDuration('reminder')).toBeLessThanOrEqual(5)
  expect(motifDuration('order')).toBeLessThanOrEqual(5)
  expect(motifDuration('reminder')).toBeGreaterThan(1)
  for (const p of Object.values(VIBRATION)) expect(p.reduce((a, b) => a + b, 0)).toBeLessThan(1500)
})
