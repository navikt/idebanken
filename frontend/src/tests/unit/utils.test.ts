import { describe, expect, it } from 'vitest'
import {
    enonicSitePathToHref,
    extractTextFromNodes,
    forceArray,
    headingIdOfString,
    joinArrayWithCommasAndAnd,
} from '~/utils/utils'

// ---------------------------------------------------------------------------
// enonicSitePathToHref
// ---------------------------------------------------------------------------
describe('enonicSitePathToHref', () => {
    it('strips the leading site segment and returns the rest', () => {
        expect(enonicSitePathToHref('/idebanken/ressurser/tips')).toBe('/ressurser/tips')
    })

    it('returns "/" when path is exactly the site root', () => {
        expect(enonicSitePathToHref('/idebanken')).toBe('/')
    })

    it('returns "/" for empty string', () => {
        expect(enonicSitePathToHref('')).toBe('/')
    })

    it('returns "/" when called with undefined', () => {
        expect(enonicSitePathToHref(undefined)).toBe('/')
    })

    it('handles a single-segment path after the site root', () => {
        expect(enonicSitePathToHref('/idebanken/om-oss')).toBe('/om-oss')
    })
})

// ---------------------------------------------------------------------------
// headingIdOfString
// ---------------------------------------------------------------------------
describe('headingIdOfString', () => {
    it('converts a Norwegian heading to a safe id', () => {
        expect(headingIdOfString('Æ ø å-test')).toBe('ae-oe-aa-test')
    })

    it('returns empty string for null', () => {
        expect(headingIdOfString(null)).toBe('')
    })

    it('returns empty string for undefined', () => {
        expect(headingIdOfString(undefined)).toBe('')
    })

    it('lowercases the result', () => {
        expect(headingIdOfString('Hello World')).toBe('hello-world')
    })

    it('strips leading and trailing hyphens', () => {
        expect(headingIdOfString('  !hello!  ')).toBe('hello')
    })

    it('truncates to 50 characters at a word boundary', () => {
        // 10 words × 5 chars + hyphens → more than 50 chars
        const long =
            'Dette er en veldig lang overskrift som går over grensen for hva som er tillatt'
        const result = headingIdOfString(long)
        expect(result.length).toBeLessThanOrEqual(50)
        expect(result).not.toMatch(/-$/)
    })

    it('handles a string of exactly 50 characters without truncating', () => {
        const s = 'a'.repeat(50)
        expect(headingIdOfString(s)).toBe(s)
    })
})

// ---------------------------------------------------------------------------
// forceArray
// ---------------------------------------------------------------------------
describe('forceArray', () => {
    it('wraps a single item in an array', () => {
        expect(forceArray('hello')).toEqual(['hello'])
    })

    it('passes an array through unchanged', () => {
        expect(forceArray([1, 2, 3])).toEqual([1, 2, 3])
    })

    it('returns an empty array for undefined', () => {
        expect(forceArray(undefined)).toEqual([])
    })

    it('returns an empty array for null-ish coercion', () => {
        // undefined coerces to []
        expect(forceArray(undefined)).toHaveLength(0)
    })

    it('wraps an object in an array', () => {
        expect(forceArray({ id: 1 })).toEqual([{ id: 1 }])
    })
})

// ---------------------------------------------------------------------------
// extractTextFromNodes
// ---------------------------------------------------------------------------
describe('extractTextFromNodes', () => {
    it('extracts text from plain strings', () => {
        expect(extractTextFromNodes(['hello', 'world']).trim()).toBe('hello world')
    })

    it('extracts data from node-like objects', () => {
        expect(extractTextFromNodes([{ data: 'node text' }]).trim()).toBe('node text')
    })

    it('recursively extracts from children', () => {
        const result = extractTextFromNodes([{ children: [{ data: 'deep' }] }])
        expect(result.trim()).toBe('deep')
    })

    it('returns empty string for empty array', () => {
        expect(extractTextFromNodes([]).trim()).toBe('')
    })
})

// ---------------------------------------------------------------------------
// joinArrayWithCommasAndAnd
// ---------------------------------------------------------------------------
describe('joinArrayWithCommasAndAnd', () => {
    it('returns empty string for empty array', () => {
        expect(joinArrayWithCommasAndAnd([])).toBe('')
    })

    it('returns the single item for a one-element array', () => {
        expect(joinArrayWithCommasAndAnd(['Alice'])).toBe('Alice')
    })

    it('joins two items with "og"', () => {
        expect(joinArrayWithCommasAndAnd(['Alice', 'Bob'])).toBe('Alice og Bob')
    })

    it('joins three items with comma and "og"', () => {
        expect(joinArrayWithCommasAndAnd(['Alice', 'Bob', 'Carol'])).toBe('Alice, Bob og Carol')
    })

    it('accepts a plain string and wraps it', () => {
        expect(joinArrayWithCommasAndAnd('Solo')).toBe('Solo')
    })
})
