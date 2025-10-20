import { NextResponse } from 'next/server'
import { DOMNode } from 'html-react-parser'

export function validateToken(token: string | null) {
    if (token !== process.env.ENONIC_API_TOKEN) {
        // XP hijacks 401 to show login page, so send 407 instead
        return NextResponse.json(
            { message: 'Invalid token' },
            {
                status: 407,
            }
        )
    }
    return null
}

export function validatePath(path: string | string[] | null) {
    // If the slug doesn't exist prevent preview mode from being enabled
    if (path === null || path === undefined) {
        return NextResponse.json(
            { message: 'Invalid path' },
            {
                status: 400,
            }
        )
    }
    return null
}

export function enonicSitePathToHref(path?: string) {
    if (!path) {
        console.warn('sitePathToHref called with undefined or empty path')
        return '/'
    }
    return path.replace(/^\/[^/]+\/?/, '/')
}

export function headingIdOfString(string?: string | null) {
    const MAX_HEADING_LENGTH = 50
    if (!string) {
        return ''
    }
    const normalizedString = string
        .trim()
        .replaceAll(/[æÆ]/g, 'ae')
        .replaceAll(/[øØ]/g, 'oe')
        .replaceAll(/[åÅ]/g, 'aa')
        .replaceAll(/\W+/g, '-')
        .replaceAll(/(^-|-$)/g, '')
        .toLowerCase()

    if (normalizedString.length <= MAX_HEADING_LENGTH) {
        return normalizedString
    }

    const truncated = normalizedString.substring(0, MAX_HEADING_LENGTH)
    const hyphenIndex = truncated.lastIndexOf('-')

    if (hyphenIndex > 0) {
        return truncated.substring(0, hyphenIndex)
    }

    return truncated
}

export function forceArray<A>(data: A | Array<A> | undefined): Array<A>
export function forceArray<A>(data: A | ReadonlyArray<A> | undefined): ReadonlyArray<A>
export function forceArray<A>(data: A | Array<A> | undefined): ReadonlyArray<A> {
    data = data ?? []
    return Array.isArray(data) ? data : [data]
}

export function truncateUrl(link?: string, maxLength = 50): string | undefined {
    if (!link) return link

    const linkWithoutProtocolAndParams = link.replace(/(https?:\/\/)?([^?]*?)\/?(\?[^\/]*)?$/, '$2')
    if (linkWithoutProtocolAndParams.length <= maxLength) return linkWithoutProtocolAndParams

    const truncatedUrl = linkWithoutProtocolAndParams.replace(
        /^([^\/]+\/)(.+)?(\/[^\/]+)$/,
        `$1...$3`
    )
    if (truncatedUrl.length > maxLength) {
        return truncatedUrl.substring(0, maxLength).concat('...')
    } else {
        return truncatedUrl
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractTextFromNodes(nodes: any): string {
    return forceArray(nodes)
        .map((node) => {
            if (typeof node === 'string') return node
            if (typeof node?.data === 'string') return node.data
            if (node.children) return extractTextFromNodes(forceArray<DOMNode[]>(node.children))
            if (node.props?.children) return extractTextFromNodes(forceArray(node.props.children))
            return ''
        })
        .join(' ')
}
