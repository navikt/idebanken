import { beforeEach, describe, expect, it, vi } from 'vitest'

// ---------------------------------------------------------------------------
// isAlive – trivial health route
// ---------------------------------------------------------------------------
describe('GET /api/isAlive', () => {
    it('returns 200 OK', async () => {
        const { GET } = await import('~/app/api/isAlive/route')
        const response = await GET()
        expect(response.status).toBe(200)
        expect(await response.text()).toBe('OK')
    })
})

// ---------------------------------------------------------------------------
// search – proxies to an external SEARCH_API_URL
// ---------------------------------------------------------------------------
describe('GET /api/search', () => {
    const mockSearchResult = {
        total: 1,
        hits: [{ href: '/a', displayName: 'A', highlight: '', score: 1, typeTags: [] }],
        word: 'test',
    }

    beforeEach(() => {
        process.env.SEARCH_API_URL = 'https://fake-search.api'
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => mockSearchResult,
            })
        )
    })

    it('calls the upstream search API with forwarded query params', async () => {
        const { GET } = await import('~/app/api/search/route')
        const request = new Request('http://localhost/api/search?ord=test')
        await GET(request)

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('https://fake-search.api/content/search?ord=test')
        )
    })

    it('returns the upstream JSON response', async () => {
        const { GET } = await import('~/app/api/search/route')
        const request = new Request('http://localhost/api/search?ord=test')
        const response = await GET(request)
        const data = await response.json()

        expect(data).toEqual(mockSearchResult)
    })

    it('returns status 200 when the upstream call succeeds', async () => {
        const { GET } = await import('~/app/api/search/route')
        const request = new Request('http://localhost/api/search?ord=test')
        const response = await GET(request)

        expect(response.status).toBe(200)
    })
})
