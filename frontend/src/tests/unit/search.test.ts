import { describe, expect, it } from 'vitest'
import { isSearchResult } from '~/utils/search'

// isSearchResult is a pure type-guard — no fetch, no DOM
describe('isSearchResult', () => {
    const validResult = {
        total: 3,
        hits: [{ href: '/a', displayName: 'A', highlight: '', score: 1, typeTags: [] }],
        word: 'tips',
    }

    it('returns true for a valid search result shape', () => {
        expect(isSearchResult(validResult)).toBe(true)
    })

    it('returns false when "total" is missing', () => {
        const { total: _t, ...rest } = validResult
        expect(isSearchResult(rest)).toBe(false)
    })

    it('returns false when "hits" is not an array', () => {
        expect(isSearchResult({ ...validResult, hits: 'nope' })).toBe(false)
    })

    it('returns false when "word" is missing', () => {
        const { word: _w, ...rest } = validResult
        expect(isSearchResult(rest)).toBe(false)
    })

    it('returns falsy for null', () => {
        expect(isSearchResult(null)).toBeFalsy()
    })

    it('returns false for a plain string', () => {
        expect(isSearchResult('foo')).toBe(false)
    })
})
