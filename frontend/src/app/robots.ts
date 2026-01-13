import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import { getContentApiUrl } from '@enonic/nextjs-adapter'
import { MetadataRoute } from 'next'

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
export default async function robots(): Promise<MetadataRoute.Robots> {
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

    const { rules, sitemap } = res.guillotine.robotstxt ?? { rules: [] }
    return {
        rules,
        sitemap,
    }
}
