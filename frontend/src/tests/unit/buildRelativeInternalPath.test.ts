import { describe, expect, it } from 'vitest'
import { buildRelativeInternalPath } from '~/utils/buildRelativeInternalPath'

describe('buildRelativeInternalPath', () => {
    it('returns undefined for undefined input', () => {
        expect(buildRelativeInternalPath(undefined)).toBeUndefined()
    })

    it('returns undefined for null input', () => {
        expect(buildRelativeInternalPath(null)).toBeUndefined()
    })

    it('returns undefined for empty string', () => {
        expect(buildRelativeInternalPath('')).toBeUndefined()
    })

    it('converts the site root path to "/"', () => {
        expect(buildRelativeInternalPath('/idebanken')).toBe('/')
    })

    it('strips the /idebanken prefix from a sub-path', () => {
        expect(buildRelativeInternalPath('/idebanken/ressurser/tips')).toBe('/ressurser/tips')
    })

    it('strips /site/idebanken/master/ branch prefix', () => {
        expect(buildRelativeInternalPath('/site/idebanken/master/om-oss')).toBe('/om-oss')
    })

    it('strips /site/idebanken/draft/ branch prefix', () => {
        expect(buildRelativeInternalPath('/site/idebanken/draft/om-oss')).toBe('/om-oss')
    })

    it('strips a bare /master/ prefix then the site root, leaving the content path', () => {
        // /master/idebanken/artikkel → strip /master → /idebanken/artikkel → strip /idebanken → /artikkel
        expect(buildRelativeInternalPath('/master/idebanken/artikkel')).toBe('/artikkel')
    })

    it('strips a bare /draft/ prefix then the site root, leaving the content path', () => {
        expect(buildRelativeInternalPath('/draft/idebanken/artikkel')).toBe('/artikkel')
    })

    it('ensures the result starts with "/"', () => {
        const result = buildRelativeInternalPath('/idebanken/noe')
        expect(result).toMatch(/^\//)
    })

    it('handles deeply nested paths', () => {
        expect(buildRelativeInternalPath('/idebanken/a/b/c/d')).toBe('/a/b/c/d')
    })
})
