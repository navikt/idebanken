import { getContentApiUrl, getLocaleMapping } from '@enonic/nextjs-adapter'
import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import type { Media_Document, Query } from '~/types/generated'
import { toFilename } from '~/utils/documentFilename'

const documentsQuery = `
query($offset: Int!) {
    guillotine {
        query(
            contentTypes: ["media:document"]
            first: 100
            offset: $offset,
            sort: "_path ASC"
        ) {
            _name
            _path
            ... on media_Document {
                mediaUrl(type: absolute)
            }
        }
    }
}
`

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params

    if (!/^[a-z0-9][a-z0-9.-]*$/.test(filename)) {
        return new Response('Ugyldig filnavn', { status: 400 })
    }

    try {
        const context = { contentPath: process.env.ENONIC_API ?? '' }
        const mapping = getLocaleMapping(context)

        // Offentlige dokumentadresser skal aldri hente fra draft.
        const apiUrl = getContentApiUrl(context).replace(/\/draft$/, '/master')
        const folder = `${mapping.site}/ressurser/documents/`
        const matches: Media_Document[] = []

        for (let offset = 0; ; offset += 100) {
            const result = await fetchGuillotine(apiUrl, mapping, {
                method: 'POST',
                next: { revalidate: 300 },
                body: {
                    query: documentsQuery,
                    variables: { offset },
                },
            })

            if (result.error) {
                throw new Error('Document lookup failed')
            }

            const documents = (result as Query).guillotine?.query

            if (!documents) {
                throw new Error('Missing document response')
            }

            for (const document of documents) {
                if (
                    document &&
                    document._path.startsWith(folder) &&
                    toFilename(document._name) === filename
                ) {
                    matches.push(document as Media_Document)
                }
            }

            if (documents.length < 100) break
        }

        if (matches.length === 0) {
            return new Response('Dokumentet finnes ikke', { status: 404 })
        }

        if (matches.length > 1) {
            return new Response('Flere dokumenter har samme adresse', {
                status: 409,
            })
        }

        const mediaUrl = matches[0].mediaUrl
        if (!mediaUrl) {
            throw new Error('Missing attachment URL')
        }

        const upstreamUrl = new URL(mediaUrl)
        const enonicOrigin = new URL(apiUrl).origin

        if (
            upstreamUrl.origin !== enonicOrigin ||
            !upstreamUrl.pathname.includes('/_/attachment/') ||
            !upstreamUrl.pathname.includes('/master/')
        ) {
            throw new Error('Unexpected attachment URL')
        }

        const headers = new Headers()
        for (const name of ['range', 'if-range']) {
            const value = request.headers.get(name)
            if (value) headers.set(name, value)
        }

        const upstream = await fetch(upstreamUrl, {
            headers,
            cache: 'no-store',
            redirect: 'error',
            signal: AbortSignal.timeout(15_000),
        })

        if (!upstream.ok && upstream.status !== 416) {
            return new Response('Kunne ikke hente dokumentet', {
                status: upstream.status === 404 ? 404 : 502,
            })
        }

        const responseHeaders = new Headers({
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
        })

        for (const name of [
            'content-type',
            'content-length',
            'content-range',
            'accept-ranges',
            'etag',
            'last-modified',
        ]) {
            const value = upstream.headers.get(name)
            if (value) responseHeaders.set(name, value)
        }

        const disposition =
            upstream.headers.get('content-type')?.split(';')[0] === 'application/pdf'
                ? 'inline'
                : 'attachment'

        responseHeaders.set('Content-Disposition', `${disposition}; filename="${filename}"`)

        return new Response(upstream.body, {
            status: upstream.status,
            headers: responseHeaders,
        })
    } catch (error) {
        console.error('Document request failed', error)
        return new Response('Kunne ikke hente dokumentet fra Enonic', {
            status: 502,
        })
    }
}
