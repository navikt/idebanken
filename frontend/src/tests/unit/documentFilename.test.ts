import { describe, expect, it } from 'vitest'
import { toFilename } from '~/utils/documentFilename'

describe('toFilename', () => {
    it('gjør om til små bokstaver og bytter mellomrom med bindestrek', () => {
        expect(toFilename('Samtaleguide med spørsmål dobbeltsidig A4.pdf')).toBe(
            'samtaleguide-med-sporsmal-dobbeltsidig-a4.pdf'
        )
    })

    it('bytter ut æ, ø og å', () => {
        expect(toFilename('Bærekraft på jobb.docx')).toBe('baerekraft-pa-jobb.docx')
    })

    it('fjerner aksenter', () => {
        expect(toFilename('Café-møte.pdf')).toBe('cafe-mote.pdf')
    })

    it('fjerner bindestrek før filendelsen', () => {
        expect(toFilename('Mal for onboarding .pdf')).toBe('mal-for-onboarding.pdf')
    })

    it('fjerner spesialtegn og bindestrek i starten', () => {
        expect(toFilename('  (Ny) plan – 2026!.pdf')).toBe('ny-plan-2026.pdf')
    })
})
