import { getRequestLocaleInfo } from '@enonic/nextjs-adapter'
import { NextRequest, NextResponse } from 'next/server'

const enonicDomain = new URL(process.env.ENONIC_API ?? '').host
const isLocalhost = process.env.ENV === 'local'

export function middleware(req: NextRequest) {
    let pathname = req.nextUrl.pathname
    const { locale, locales } = getRequestLocaleInfo({
        contentPath: pathname,
        headers: req.headers,
    })
    const pathPart = pathname.split('/')[1] // pathname always starts with a slash, followed by locale

    const pathHasLocale = locales.indexOf(pathPart) >= 0
    const cspHeader = getCspHeaderAndAppendToRequestHeaders(req)

    if (pathname.includes('/_/')) {
        // 404 on paths that contain /_/, as they are used for internal Enonic XP purposes (e.g. images, static files, etc.)
        const ua = req.headers.get('user-agent')?.toLowerCase() ?? ''
        const safeStringRegex = /[^\w/()-æøå%]*?/
        console.warn(
            `Path '${pathname.replaceAll(safeStringRegex, '')}' contains '/_/'. Rewrite path to suppress bad fetch and land cleanly on our 404 page. Referrer: '${req.headers.get('referer')?.replaceAll(safeStringRegex, '')}'.${[/crawler|spider|bot/i].some((p) => p.test(ua)) ? ' Request was done by a bot' : ''}`
        )
        // Remove /_/ from the path to avoid issues with enonic fetching. This will result in a 404 and no error log.
        pathname = pathname.replaceAll('/_/', '/xp-underscore/')
    }

    if (pathHasLocale) {
        // locale is already in the path, no need to redirect
        return responseWithCspHeader(
            NextResponse.next({
                request: req,
            }),
            cspHeader
        )
    } else if (!locale) {
        // no locale found in path or headers, return 404
        console.debug(`Middleware returning 404 for '${pathname}': no locale found`)
        return responseWithCspHeader(
            new NextResponse(null, {
                status: 404,
            }),
            cspHeader
        )
    }

    req.nextUrl.pathname = `/${locale}${pathname}`
    return responseWithCspHeader(
        NextResponse.rewrite(req.nextUrl, {
            request: req,
        }),
        cspHeader
    )
}
export const config = {
    // NB: should contain all files and folders in the /public folder
    matcher: [
        '/((?!robots.txt|sitemap.xml|manifest.json|api/|images/|fonts/|_next/webpack-hmr|_next/static|_next/image|assets|favicon/|favicon.ico|sw.js).*)',
    ],
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
    ],
}

function getCspHeaderAndAppendToRequestHeaders(req: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const qbrickHosts = [
        'video.qbrick.com',
        'play2.qbrick.com',
        'analytics.qbrick.com',
        '*.dna.ip-only.net', // Depricated by 2026-01-31
        '*.dna.contentdelivery.net',
        'blob:',
    ].join(' ')

    const cspHeader = `
    base-uri 'self' ${qbrickHosts} ${enonicDomain};
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${qbrickHosts} ${isLocalhost ? "'unsafe-eval'" : ''};
    connect-src 'self' *.nav.no *.skyra.no ${qbrickHosts} ${enonicDomain};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: *.skyra.no ${qbrickHosts} ${enonicDomain};
    font-src 'self' data: *.nav.no *.skyra.no ${qbrickHosts};
    object-src 'self' ${qbrickHosts} ${enonicDomain};
    form-action 'self';
    frame-ancestors 'self' ${enonicDomain};
    frame-src 'self' ${enonicDomain};
    media-src 'self' ${qbrickHosts};
    ${!isLocalhost ? 'upgrade-insecure-requests;' : ''}
`
        // Replace newline characters and spaces
        .replace(/\s{2,}/g, ' ')
        .trim()

    req.headers.set('x-nonce', nonce)
    req.headers.set('Content-Security-Policy', cspHeader)
    return cspHeader
}

function responseWithCspHeader(nextResponse: NextResponse, cspHeaders: string) {
    nextResponse.headers.set('Content-Security-Policy', cspHeaders)
    return nextResponse
}
