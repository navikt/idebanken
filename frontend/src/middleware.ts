import { getRequestLocaleInfo } from '@enonic/nextjs-adapter'
import { NextRequest, NextResponse } from 'next/server'

const enonicDomain = process.env.ENONIC_DOMAIN
const isLocalhost = process.env.IS_LOCALHOST === 'true'

export function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname
	const { locale, locales } = getRequestLocaleInfo({
		contentPath: pathname,
		headers: req.headers,
	})
	const pathPart = pathname.split('/')[1] // pathname always starts with a slash, followed by locale

	const pathHasLocale = locales.indexOf(pathPart) >= 0
	const cspHeader = getCspHeaderAndAppendToRequestHeaders(req)
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
		return new NextResponse(null, {
			status: 404,
		})
	}

	req.nextUrl.pathname = `/${locale}${pathname}`
	console.debug(`Middleware redirecting '${pathname}' to '${req.nextUrl.pathname}'`)
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
		'/((?!robots.txt|sitemap.xml|manifest.json|api/|images/|fonts/|_next/webpack-hmr|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
	],
	missing: [
		{ type: 'header', key: 'next-router-prefetch' },
		{ type: 'header', key: 'purpose', value: 'prefetch' },
	],
}

function getCspHeaderAndAppendToRequestHeaders(req: NextRequest) {
	const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
	const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isLocalhost ? "'unsafe-eval'" : ''};
    connect-src 'self' umami.nav.no;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${enonicDomain};
    font-src 'self' cdn.nav.no;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
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
