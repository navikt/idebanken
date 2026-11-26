import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { EmptyRecord } from '../common-guillotine-types'
import { forceArray } from '/lib/utils/array-utils'
import { getSiteConfig } from '/lib/utils/site-config'
import { runInContext } from '/lib/repos/run-in-context'
import { Content, get, getSite } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { processHtml } from '/lib/xp/portal'

type PageBannerSettings = {
    banner?: {
        _selected?: 'inherit' | 'custom' | 'disabled'
        custom?: {
            text?: string
            status?: 'announcement' | 'warning' | 'error' | 'success'
            inheritToChildren?: boolean
        }
    }
}

type ResolvedPageBanner = {
    text: string
    status: string
    closeable: boolean
}

function resolvePageBanner(content: Content): ResolvedPageBanner | null {
    const site = getSite({ key: content._path })
    if (!site) return null

    let current: Content | null = content

    while (current) {
        const appData = current.x?.idebanken as Record<string, unknown> | undefined
        const settings = appData?.['page-banner'] as PageBannerSettings | undefined
        const banner = settings?.banner

        if (banner?._selected === 'disabled') {
            return null
        }

        if (banner?._selected === 'custom') {
            const custom = banner.custom
            const isCurrentPage = current._id === content._id

            if (!isCurrentPage && !custom?.inheritToChildren) {
                return null
            }

            const text = custom?.text
            if (!text?.trim()) return null

            return {
                text: processHtml({ value: text }),
                status: custom?.status ?? 'announcement',
                closeable: false,
            }
        }

        if (current._path === site._path) {
            break
        }

        const parentPath: string = current._path.replace(/\/[^/]+$/, '')
        if (parentPath !== site._path && parentPath.indexOf(`${site._path}/`) !== 0) {
            break
        }

        current = get({ key: parentPath })
    }

    return null
}

export const contentExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions => ({
    resolvers: {
        Content: {
            pageBanner: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Content>
            ): ResolvedPageBanner | null => {
                return resolvePageBanner(env.source)
            },
            backlink: (env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Content>) => {
                const parent = env.source?._path?.replace(/\/[^/]+$/, '')
                if (!parent) return undefined
                const parentContent = get({ key: parent })
                if (!parentContent) return undefined

                const parentTitle =
                    parentContent._path === '/idebanken'
                        ? 'Forsiden'
                        : ((parentContent.data?.shortTitle ||
                              parentContent.data?.title ||
                              parentContent.displayName) as string)
                return {
                    text: parentTitle,
                    href: enonicSitePathToHref(parentContent._path),
                }
            },
            skyraSlugs: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): Array<string> => {
                return runInContext({ asAdmin: true }, () => {
                    return forceArray(getSiteConfig()?.skyra?.slugs).filter((slug) => slug?.length)
                })
            },
        },
    },
    types: {
        SimpleLink: {
            description: 'A simple link with text and href',
            fields: {
                text: {
                    type: GraphQLString,
                },
                href: {
                    type: nonNull(GraphQLString),
                },
            },
            interfaces: [],
        },
    },
    creationCallbacks: {
        Content: (params): void => {
            params.addFields({
                pageBanner: {
                    type: reference('AlertBanner'),
                },
                skyraSlugs: {
                    type: nonNull(list(nonNull(GraphQLString))),
                },
                backlink: {
                    type: reference('SimpleLink'),
                },
            })
        },
    },
})
