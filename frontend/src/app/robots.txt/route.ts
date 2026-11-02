import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import { getContentApiUrl } from '@enonic/nextjs-adapter'

const CONTENT_SIGNAL = 'Content-Signal: ai-train=no, search=yes, ai-input=no'

const fetchOptions = {
    method: 'POST',
    body: {
        query: `
            query {
                guillotine {
                    robotstxt {
                        text
                        rules {
                            userAgent
                            allow
                            disallow
                        }
                        sitemap
                        cachecontrol
                    }
                }
            }`,
    },
}

type Rule = {
    userAgent?: string | string[]
    allow?: string | string[]
    disallow?: string | string[]
}

const toArray = (value?: string | string[]) =>
    [value].flat().filter((v): v is string => Boolean(v))

export async function GET() {
    const res = await fetchGuillotine(
        getContentApiUrl({ contentPath: process.env.ENONIC_API ?? '' }),
        {
            site: '/idebanken',
            default: true,
            locale: 'no',
            project: 'idebanken',
        },
        fetchOptions
    )

    const { rules, sitemap } = res.guillotine?.robotstxt ?? { rules: [] }
    const lines: string[] = []

    for (const rule of (rules ?? []) as Rule[]) {
        toArray(rule.userAgent).forEach((ua) => lines.push(`User-agent: ${ua}`))
        toArray(rule.allow).forEach((a) => lines.push(`Allow: ${a}`))
        toArray(rule.disallow).forEach((d) => lines.push(`Disallow: ${d}`))
        lines.push(CONTENT_SIGNAL, '')
    }

    if (sitemap) lines.push(`Sitemap: ${sitemap}`)

    return new Response(lines.join('\n') + '\n', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
}
