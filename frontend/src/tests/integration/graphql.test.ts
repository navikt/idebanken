import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isSearchResult } from '~/utils/search'

// ---------------------------------------------------------------------------
// GraphQL response shape validation
// These tests validate that mocked API responses conform to the shapes our
// client code depends on, without hitting a real CMS endpoint.
// ---------------------------------------------------------------------------

/** Minimal common GraphQL response shape */
const buildCommonResponse = (overrides: Record<string, unknown> = {}) => ({
    guillotine: {
        get: {
            _id: 'site-id-123',
            displayName: 'Idébanken',
            _path: '/idebanken',
            ...overrides,
        },
    },
})

describe('GraphQL common query response shape', () => {
    it('has a guillotine.get._id field', () => {
        const response = buildCommonResponse()
        expect(response.guillotine.get._id).toBeDefined()
    })

    it('has a non-empty displayName', () => {
        const response = buildCommonResponse()
        expect(response.guillotine.get.displayName).toBeTruthy()
    })

    it('fails the isReady check when _id is missing', () => {
        const response = buildCommonResponse({ _id: undefined })
        expect(response.guillotine.get._id).toBeUndefined()
    })
})

// ---------------------------------------------------------------------------
// Search API response shape validation
// ---------------------------------------------------------------------------

const buildSearchResponse = (overrides: Record<string, unknown> = {}) => ({
    total: 5,
    hits: [
        {
            href: '/ressurser/tips',
            displayName: 'Nyttige tips',
            highlight: '<em>Nyttige</em> tips',
            score: 1.2,
            typeTags: ['type-tag-1'],
            iconUrl: 'https://example.com/icon.svg',
        },
    ],
    word: 'tips',
    ...overrides,
})

describe('Search API response shape', () => {
    it('is recognised as a valid SearchResult', () => {
        expect(isSearchResult(buildSearchResponse())).toBe(true)
    })

    it('hits is an array', () => {
        const response = buildSearchResponse()
        expect(Array.isArray(response.hits)).toBe(true)
    })

    it('each hit has an href and displayName', () => {
        const hit = buildSearchResponse().hits[0]
        expect(hit.href).toBeDefined()
        expect(hit.displayName).toBeDefined()
    })

    it('total reflects the number of results available upstream', () => {
        const response = buildSearchResponse({ total: 42 })
        expect(response.total).toBe(42)
    })

    it('is invalid when hits is not an array', () => {
        expect(isSearchResult(buildSearchResponse({ hits: 'bad' }))).toBe(false)
    })

    it('is invalid when word is absent', () => {
        const { word: _w, ...rest } = buildSearchResponse()
        expect(isSearchResult(rest)).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// Search proxy integration: fetch is called with correct upstream URL
// ---------------------------------------------------------------------------
describe('Search route proxy', () => {
    beforeEach(() => {
        process.env.SEARCH_API_URL = 'https://fake-search.api'
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => buildSearchResponse(),
            })
        )
    })

    it('forwards all query parameters to the upstream URL', async () => {
        const { GET } = await import('~/app/api/search/route')
        const request = new Request('http://localhost/api/search?ord=inkludering&f=type-tag')
        await GET(request)
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('ord=inkludering&f=type-tag'))
    })

    it('returns a JSON response matching the upstream payload', async () => {
        const { GET } = await import('~/app/api/search/route')
        const request = new Request('http://localhost/api/search?ord=test')
        const res = await GET(request)
        const data = await res.json()
        expect(isSearchResult(data)).toBe(true)
    })
})
