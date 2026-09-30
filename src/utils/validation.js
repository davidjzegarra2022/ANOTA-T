export function isValidPeruPhone(value) {
  return /^9\d{8}$/.test(value.trim())
}

export function isValidDni(value) {
  const v = value.trim().toUpperCase()
  return /^\d{8}$/.test(v) || /^[A-Z0-9]{9,12}$/.test(v)
}

export function isNonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 1
}

// Caracteres de control e invisibles (incluye los de dirección de texto
// RLO/LRO, usados para disfrazar texto): nunca son parte legítima de un
// nombre, dirección o nota.
// eslint-disable-next-line no-control-regex
const INVISIBLE = /[\u0000-\u001F\u007F-\u009F​-‏‪-‮⁠-⁩﻿]/g

/** Limpia un texto libre del formulario: sin invisibles, espacios normalizados y con tope de largo. */
export function cleanText(value, max = 300) {
  return String(value ?? '')
    .replace(INVISIBLE, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

/**
 * Solo dígitos, máximo 9. Acepta lo que la gente pega: "987 654 321",
 * "+51 987654321" o "51987654321" (quita el 51 del país).
 */
export function normalizePeruPhone(value) {
  let digits = String(value ?? '').replace(/\D/g, '')
  if (digits.length > 9 && digits.startsWith('51')) digits = digits.slice(2)
  return digits.slice(0, 9)
}
