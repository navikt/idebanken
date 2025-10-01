import { MetadataRoute } from 'next'
import { getContentApiUrl } from '@enonic/nextjs-adapter'
import { Sitemap } from '~/types/generated'
import { forceArray } from '~/utils/utils'
import { fetchGuillotine } from '@enonic/nextjs-adapter/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    if (process.env.SKIP_SSG === 'true') return []

    const res = await fetchGuillotine(
        getContentApiUrl({ contentPath: process.env.ENONIC_API ?? '' }),
        {
            site: '/idebanken',
            default: true,
            locale: 'no',
            project: 'idebanken',
        },
        {
            method: 'POST',
            body: {
                query: `{
                    guillotine {
                        sitemap {
                            baseUrl
                            urlset {
                                lastmod
                                changefreq
                                lastmod
                                path
                                priority
                            }
                        }
                    }
                }`,
            },
        }
    )

    const sitemap = res.guillotine.sitemap
    if (!sitemap) {
        console.warn('Sitemap not found or empty')
        return []
    }

    const { baseUrl, urlset } = sitemap as Sitemap
    return forceArray(urlset).map((set) => ({
        url: `${baseUrl ?? ''}${set?.path}`,
        lastModified: new Date(set?.lastmod),
        changeFrequency: (set?.changefreq ??
            'monthly') as MetadataRoute.Sitemap[0]['changeFrequency'],
        priority: set?.priority ? Number(set?.priority) : 0.5,
    }))
}
