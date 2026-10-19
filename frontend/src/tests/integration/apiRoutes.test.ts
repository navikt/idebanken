import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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

describe('POST /api/consentping', () => {
    const consentObject = {
        consent: {
            analytics: true,
            surveys: false,
            videoAnalytics: true,
        },
        userActionTaken: true,
        meta: {
            createdAt: '2026-10-19T10:00:00.000Z',
            updatedAt: '2026-10-19T10:01:00.000Z',
            version: 1,
        },
    }

    beforeEach(() => {
        process.env.UMAMI_PROXY_HOST = 'https://fake-reops-proxy.nav.no'
        process.env.UMAMI_WEBSITE_ID = 'fake-website-id'

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                status: 200,
            })
        )
    })

    afterEach(() => {
        vi.restoreAllMocks()
        vi.unstubAllGlobals()
    })

    function createRequest(body: unknown) {
        return new Request('http://localhost/api/consentping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
    }

    it('forwards valid consent using the expected Umami event format', async () => {
        const { POST } = await import('~/app/api/consentping/route')

        const response = await POST(createRequest({ consentObject }))

        expect(response.status).toBe(200)
        expect(fetch).toHaveBeenCalledOnce()

        const [url, options] = vi.mocked(fetch).mock.calls[0]
        const event = JSON.parse(options?.body as string)

        expect(url).toBe('https://fake-reops-proxy.nav.no/api/send')
        expect(event).toEqual({
            type: 'event',
            payload: {
                name: 'cookiebanner',
                hostname: 'idebanken.no',
                url: '/',
                referrer: 'https://idebanken.no',
                website: 'fake-website-id',
                data: {
                    consentObject,
                },
            },
        })
    })

    it('rejects a request without consentObject', async () => {
        const { POST } = await import('~/app/api/consentping/route')

        const response = await POST(createRequest({}))

        expect(response.status).toBe(400)
        expect(fetch).not.toHaveBeenCalled()
    })

    it('returns successfully when ReOps rejects the event', async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            status: 503,
        } as Response)
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
        const { POST } = await import('~/app/api/consentping/route')

        const response = await POST(createRequest({ consentObject }))

        expect(response.status).toBe(200)
        expect(consoleError).toHaveBeenCalledWith('consentping: ReOps returned HTTP 503')
    })
})

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
