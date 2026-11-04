import { expect, test } from 'vitest'
import { agencyHoursShort } from '../src/components/AgencySearch.jsx'

test('agencyHoursShort resume el horario de la agencia en una línea', () => {
  expect(agencyHoursShort(['LUNES A SÁBADOS', '08:00 AM A 08:00 PM', 'DOMINGOS', '08:00 AM A 05:00 PM'])).toBe('Lun–Sáb 08:00 AM–08:00 PM · Dom 08:00 AM–05:00 PM')
  expect(agencyHoursShort([])).toBe('')
  expect(agencyHoursShort(undefined)).toBe('')
})
