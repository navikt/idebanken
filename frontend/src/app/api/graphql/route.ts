import { NextResponse } from 'next/server'
import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import {
    getContentApiUrl,
    getLocaleMapping,
    ContentApiBaseBodyVariables,
} from '@enonic/nextjs-adapter'

export async function POST(req: Request) {
    let json: { query?: unknown; variables?: unknown; revalidateSeconds?: unknown }
    try {
        json = await req.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { query, variables, revalidateSeconds } = json

    if (typeof query !== 'string' || !query.trim()) {
        return NextResponse.json({ error: 'Missing query' }, { status: 400 })
    }

    const vars: ContentApiBaseBodyVariables | undefined =
        variables && typeof variables === 'object' && variables !== null
            ? Object.entries(
                  variables as Record<string, unknown>
              ).reduce<ContentApiBaseBodyVariables>((acc, [k, v]) => {
                  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'undefined')
                      acc[k] = v as string | number | undefined
                  return acc
              }, {})
            : undefined

    try {
        const result = await fetchGuillotine(
            getContentApiUrl({ contentPath: process.env.ENONIC_API ?? '' }),
            getLocaleMapping({ contentPath: process.env.ENONIC_API ?? '' }),
            {
                method: 'POST',
                body: { query, variables: vars },
                next: { revalidate: typeof revalidateSeconds === 'number' ? revalidateSeconds : 0 },
            }
        )
        return NextResponse.json(result)
    } catch (e) {
        return NextResponse.json(
            { error: 'Fetch failed', message: e instanceof Error ? e.message : 'Unknown error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
