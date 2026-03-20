import { describe, expect, it } from 'vitest'
import { buildLocaleMapping } from '~/utils/buildLocaleMapping'

const baseMeta = { locale: 'nb', defaultLocale: 'nb' }
const baseSite = { _path: '/idebanken', displayName: 'Idébanken' }

describe('buildLocaleMapping', () => {
    it('returns the locale from meta', () => {
        const result = buildLocaleMapping(baseMeta, baseSite)
        expect(result.locale).toBe('nb')
    })

    it('marks as default when locale equals defaultLocale', () => {
        const result = buildLocaleMapping(baseMeta, baseSite)
        expect(result.default).toBe(true)
    })

    it('does not mark as default for a non-default locale', () => {
        const result = buildLocaleMapping({ locale: 'en', defaultLocale: 'nb' }, baseSite)
        expect(result.default).toBe(false)
    })

    it('uses site displayName as project name', () => {
        const result = buildLocaleMapping(baseMeta, baseSite)
        expect(result.project).toBe('Idébanken')
    })

    it('falls back to the provided fallback project name when displayName is missing', () => {
        const site = { _path: '/idebanken' }
        const result = buildLocaleMapping(baseMeta, site, 'my-fallback')
        expect(result.project).toBe('my-fallback')
    })

    it('uses the default fallback "idebanken" when no fallback is given and displayName is missing', () => {
        const site = { _path: '/idebanken' }
        const result = buildLocaleMapping(baseMeta, site)
        expect(result.project).toBe('idebanken')
    })

    it('includes the site path', () => {
        const result = buildLocaleMapping(baseMeta, baseSite)
        expect(result.site).toBe('/idebanken')
    })
})
