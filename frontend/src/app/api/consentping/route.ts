import { NextResponse } from 'next/server'

import type { ConsentCookie } from '~/components/common/cookies/cookieUtils'

type ConsentChoices = ConsentCookie['consent']
type ConsentMeta = ConsentCookie['meta']
type ConsentPing = Pick<ConsentCookie, 'consent' | 'userActionTaken' | 'meta'>

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidISOString(value: string) {
    const date = new Date(value)
    return !Number.isNaN(date.getTime()) && date.toISOString() === value
}

function parseConsentChoices(value: unknown): ConsentChoices | null {
    if (!isRecord(value)) {
        return null
    }

    const { analytics, surveys, videoAnalytics } = value

    if (typeof analytics !== 'boolean') return null
    if (typeof surveys !== 'boolean') return null
    if (typeof videoAnalytics !== 'boolean') return null

    return { analytics, surveys, videoAnalytics }
}

function parseConsentMeta(value: unknown): ConsentMeta | null {
    if (!isRecord(value)) {
        return null
    }

    const { createdAt, updatedAt, version } = value

    if (typeof createdAt !== 'string' || !isValidISOString(createdAt)) return null
    if (typeof updatedAt !== 'string' || !isValidISOString(updatedAt)) return null
    if (version !== 1) return null

    return { createdAt, updatedAt, version }
}

function parseConsentObject(value: unknown): ConsentPing | null {
    if (!isRecord(value)) {
        return null
    }

    const consent = parseConsentChoices(value.consent)
    if (consent === null) {
        return null
    }

    const meta = parseConsentMeta(value.meta)
    if (meta === null) {
        return null
    }

    if (typeof value.userActionTaken !== 'boolean') {
        return null
    }

    return {
        consent,
        userActionTaken: value.userActionTaken,
        meta,
    }
}

export async function POST(request: Request) {
    let body: unknown

    try {
        body = await request.json()
    } catch {
        return NextResponse.json(
            {
                result: 'error',
                message: 'Invalid request body',
            },
            { status: 400 }
        )
    }

    const consentObject = isRecord(body) ? parseConsentObject(body.consentObject) : null

    if (!consentObject) {
        return NextResponse.json(
            {
                result: 'error',
                message: 'Missing or invalid consentObject in request body',
            },
            { status: 400 }
        )
    }

    const umamiProxyHost = process.env.UMAMI_PROXY_HOST
    const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID

    if (!umamiProxyHost || !umamiWebsiteId) {
        console.error('consentping: Missing Umami configuration')
        return NextResponse.json({}, { status: 500 })
    }

    const umamiEvent = {
        type: 'event',
        payload: {
            name: 'cookiebanner',
            hostname: 'idebanken.no',
            url: '/',
            referrer: 'https://idebanken.no',
            website: umamiWebsiteId,
            data: {
                consentObject,
            },
        },
    }

    try {
        const umamiResponse = await fetch(`${umamiProxyHost}/api/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent':
                    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
                    '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            },
            body: JSON.stringify(umamiEvent),
            signal: AbortSignal.timeout(3000),
        })

        if (!umamiResponse.ok) {
            console.error(`consentping: ReOps returned HTTP ${umamiResponse.status}`)
        }
    } catch {
        console.error('consentping: Failed to send consentping')
    }

    return NextResponse.json({})
}
