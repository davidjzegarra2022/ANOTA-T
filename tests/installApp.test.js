import { expect, test } from 'vitest'
import { devicePlatform, isInAppBrowser } from '../src/utils/installApp.js'

test('devicePlatform reconoce iPhone, iPad, Android y computadora', () => {
  expect(devicePlatform('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 5)).toBe('ios')
  expect(devicePlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 5)).toBe('ios') // iPad moderno
  expect(devicePlatform('Mozilla/5.0 (Linux; Android 14; SM-A546E)', 5)).toBe('android')
  expect(devicePlatform('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 0)).toBe('desktop')
  expect(devicePlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 0)).toBe('desktop')
})

test('isInAppBrowser detecta el navegador de WhatsApp/Instagram', () => {
  expect(isInAppBrowser('Mozilla/5.0 (iPhone) Instagram 300.0')).toBe(true)
  expect(isInAppBrowser('Mozilla/5.0 (iPhone) Safari/604.1')).toBe(false)
})
