import { test, expect } from 'vitest'
import { logoVersion } from '../src/utils/logoImage.js'

test('logoVersion cambia cuando cambia el logo (refresca la vista previa de WhatsApp)', () => {
  const a = logoVersion('https://x.supabase.co/storage/v1/object/public/logos/u/logo-1792369717682.jpg')
  const b = logoVersion('https://x.supabase.co/storage/v1/object/public/logos/u/logo-1792370000000.jpg')
  expect(a).toBe('717682')
  expect(a).not.toBe(b)
  expect(logoVersion(null)).toBe('')
})
