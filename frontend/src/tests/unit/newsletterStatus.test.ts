import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '~/app/api/newsletter-status/route'

const makeRequest = (body: unknown) =>
    new Request('http://localhost/api/newsletter-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

describe('POST /api/newsletter-status', () => {
    beforeEach(() => {
        process.env.MAKE_API = 'https://make.example.com'
        process.env.MAKE_API_USER = 'user'
        process.env.MAKE_API_KEY = 'key'
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
    })

    it('returnerer 400 ved ugyldig e-post', async () => {
        const res = await POST(makeRequest({ email: 'ikke-en-epost' }))
        expect(res.status).toBe(400)
    })

    it('returnerer subscribed=true når Make svarer 200', async () => {
        vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 200 }))
        const res = await POST(makeRequest({ email: 'ola@example.com' }))
        expect(await res.json()).toEqual({ subscribed: true })
    })

    it('returnerer subscribed=false når Make svarer 404', async () => {
        vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 404 }))
        const res = await POST(makeRequest({ email: 'ola@example.com' }))
        expect(await res.json()).toEqual({ subscribed: false })
    })

    it('fail-open: returnerer subscribed=false ved uventet status (f.eks. 401)', async () => {
        vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 401 }))
        const res = await POST(makeRequest({ email: 'ola@example.com' }))
        expect(await res.json()).toEqual({ subscribed: false })
    })

    it('fail-open: returnerer subscribed=false når Make er nede', async () => {
        vi.mocked(fetch).mockRejectedValue(new Error('network down'))
        const res = await POST(makeRequest({ email: 'ola@example.com' }))
        expect(await res.json()).toEqual({ subscribed: false })
    })

    it('fail-open: returnerer subscribed=false uten Make-konfig', async () => {
        delete process.env.MAKE_API_KEY
        const res = await POST(makeRequest({ email: 'ola@example.com' }))
        expect(await res.json()).toEqual({ subscribed: false })
        expect(fetch).not.toHaveBeenCalled()
    })
})
