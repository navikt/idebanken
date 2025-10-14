import { ContentPathItem, FetchContentResult, validateData } from '@enonic/nextjs-adapter'
import { fetchContent, fetchContentPathsForAllLocales } from '@enonic/nextjs-adapter/server'
import MainView from '@enonic/nextjs-adapter/views/MainView'
import { Metadata } from 'next'
import { MetaFields } from '~/types/generated'
import { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'

import '~/components/_mappings'

// NB. Using this option with default value bails out static generation !!!
// export const dynamic = 'auto'

// The revalidate option is only available when using the Node.js Runtime.
// This means using the revalidate option with runtime = 'edge' will not work.
export const revalidate = 3600

export type PageProps = {
    locale: string
    contentPath: string[]
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
    const resolvedParams = await params
    const data: FetchContentResult = await fetchContent(resolvedParams)

    validateData(data)

    return <MainView {...data} />
}

export async function generateMetadata({
    params,
}: {
    params: Promise<PageProps>
}): Promise<Metadata> {
    const { common } = await fetchContent(await params)

    const metaFields = common?.get?.metaFields as MetaFields
    const image = metaFields?.image ?? undefined
    const description = metaFields?.description?.replace(/\n/g, ' ')?.trim()

    return {
        metadataBase: metaFields?.baseUrl ? new URL(metaFields.baseUrl) : undefined,
        title: metaFields?.fullTitle,
        description: description,
        openGraph: {
            type: (metaFields?.openGraph?.type ?? 'article') as OpenGraphType,
            title: metaFields?.title,
            siteName: metaFields?.siteName ?? undefined,
            description: description ?? undefined,
            locale: metaFields?.locale ?? undefined,
            url: metaFields?.openGraph?.hideUrl
                ? undefined
                : (metaFields?.baseUrl ?? `https://www.idebanken.org`),
            images:
                image && !metaFields?.openGraph?.hideImages
                    ? {
                          url: image?.imageUrl ?? '',
                          alt: image?.data?.altText ?? undefined,
                          width: 1200,
                          height: 627,
                      }
                    : undefined,
        },
        robots: {
            index: metaFields?.robots?.index ?? true,
            follow: metaFields?.robots?.follow ?? true,
        },
        alternates: {
            canonical:
                metaFields?.canonical?.pageUrl?.split(/\/(draft|master)\/[^/]*/)?.at(-1) ??
                undefined,
        },
        twitter: {
            site: metaFields?.twitter?.site ?? undefined,
            title: metaFields?.title ?? undefined,
            description: description ?? undefined,
            images:
                image && !metaFields?.twitter?.hideImages
                    ? {
                          url: image?.imageUrl ?? '',
                          alt: image?.data?.altText ?? undefined,
                          width: 1200,
                          height: 627,
                      }
                    : undefined,
            card: 'summary_large_image',
        },
        verification: {
            google: metaFields?.verification?.google,
        },
    }
}

export async function generateStaticParams(_props?: {
    params: { locale: string; contentPath?: string[] }
}): Promise<ContentPathItem[]> {
    if (process.env.SKIP_SSG === 'true') return []
    return await fetchContentPathsForAllLocales('${site}/')
}
