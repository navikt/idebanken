import { NextResponse } from 'next/server'

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

export function headingIdOfString(string?: string) {
    const MAX_HEADING_LENGTH = 50
    if (!string) {
        return ''
    }
    const normalizedString = string
        .trim()
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
