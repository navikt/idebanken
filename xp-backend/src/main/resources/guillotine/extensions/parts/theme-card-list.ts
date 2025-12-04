import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { Content, get as getContent, query } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { ResolvedMedia, resolveImage } from '/lib/utils/media'
import { ResolvedTag, resolveThemeTags, resolveTypeTags } from '../tag'
import { getTags } from '/lib/utils/helpers'
import { getExcludeFilterAndQuery } from '/lib/utils/site-config'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { Source } from '../../common-guillotine-types'
import { ThemeCardList } from '@xp-types/site/parts'
import { logger } from '/lib/utils/logging'
import { forceArray } from '/lib/utils/array-utils'

type ThemeContentCard = {
    url: string
    external: boolean
    title: string
    description?: string
    image?: ResolvedMedia
    themeTags: Array<ResolvedTag>
    typeTags: Array<ResolvedTag>
    publicationDate?: string
}

function mapThemeContent(contents: Content[]): ThemeContentCard[] {
    return contents.map((c) => {
        const ibxData = c.x.idebanken
        const data = c.data as Record<string, string | undefined>
        const tags = getTags(ibxData)

        return {
            url: enonicSitePathToHref(c._path),
            external: false,
            title: data?.shortTitle || data?.title || c.displayName || '[Mangler tittel]',
            description: data?.description,
            image: resolveImage(c, 'width(500)'),
            themeTags: resolveThemeTags(tags),
            typeTags: resolveTypeTags(tags),
            publicationDate: data?.publicationDate || undefined,
        }
    })
}

export const themeCardListExtensions = ({
    list,
    nonNull,
    reference,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
}: GraphQL): Extensions => ({
    resolvers: {
        Part_idebanken_theme_card_list: {
            data: (
                env: DataFetchingEnvironment<
                    { offset?: number; count?: number; path?: string },
                    LocalContextRecord,
                    Source<ThemeCardList>
                >
            ) => {
                const offset: number = env.args?.offset ?? 0
                const count: number = env.args?.count ?? 10
                const highlightedContentIds = forceArray(env.source?.highlightedContent)
                let highlightedContent: Content[] = []

                const path = env.args.path?.replace(/^\$\{site}/, '/idebanken')
                if (!path) {
                    logger.warning(`Part_idebanken_theme_card_list is missing path arg`)
                    return {
                        total: 0,
                        list: [],
                    }
                }
                const contentId = getContent({ key: path })?._id
                if (!contentId) {
                    logger.warning(
                        `Part_idebanken_theme_card_list could not find content at path: ${path}`
                    )
                    return {
                        total: 0,
                        list: [],
                    }
                }

                const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery()

                if (highlightedContentIds.length) {
                    const orderMap = new Map(highlightedContentIds.map((id, index) => [id, index]))
                    highlightedContent = query({
                        count: -1,
                        query: { boolean: { mustNot: queryDslExclusion } },
                        filters: {
                            boolean: {
                                must: {
                                    hasValue: {
                                        field: '_id',
                                        values: highlightedContentIds,
                                    },
                                },
                                mustNot: filterExclusion,
                            },
                        },
                    }).hits.sort((a, b) => {
                        const indexA = orderMap.get(a._id) ?? Number.MAX_SAFE_INTEGER
                        const indexB = orderMap.get(b._id) ?? Number.MAX_SAFE_INTEGER
                        return indexA - indexB
                    })
                }

                const contentsResult = query({
                    start: offset,
                    count,
                    sort: [
                        {
                            field: 'type',
                            direction: 'DESC',
                        },
                        {
                            field: 'data.publicationDate',
                            direction: 'DESC',
                        },
                    ],
                    query: {
                        boolean: {
                            mustNot: queryDslExclusion,
                        },
                    },
                    filters: {
                        boolean: {
                            must: [
                                {
                                    hasValue: {
                                        field: 'type',
                                        values: ['idebanken:artikkel', 'idebanken:kjerneartikkel'],
                                    },
                                },
                            ],
                            should: [
                                {
                                    hasValue: {
                                        field: 'x.idebanken.tags.themeTags',
                                        values: [contentId],
                                    },
                                },
                                {
                                    hasValue: {
                                        field: 'x.idebanken.aktuelt-tags.themeTags',
                                        values: [contentId],
                                    },
                                },
                            ],
                            mustNot: [
                                ...filterExclusion,
                                {
                                    hasValue: {
                                        field: '_id',
                                        values: highlightedContent.map((c) => c._id),
                                    },
                                },
                            ],
                        },
                    },
                })

                return {
                    total: contentsResult.total,
                    list: mapThemeContent(highlightedContent.concat(contentsResult.hits)),
                }
            },
        },
    },
    creationCallbacks: {
        Part_idebanken_theme_card_list: (params) => {
            params.addFields({
                data: {
                    type: nonNull(reference('Theme_card_list_data')),
                    args: { offset: GraphQLInt, count: GraphQLInt, path: nonNull(GraphQLID) },
                },
            })
            params.modifyFields({
                pageSize: {
                    type: GraphQLInt,
                },
            })
        },
    },
    types: {
        Theme_card_list_data: {
            description: 'Theme card list data',
            fields: {
                total: { type: nonNull(GraphQLInt) },
                list: {
                    type: nonNull(list(nonNull(reference('Theme_card')))),
                },
            },
            interfaces: [],
        },
        Theme_card: {
            description: 'Theme card',
            fields: {
                url: { type: GraphQLString },
                external: { type: GraphQLBoolean },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                image: { type: reference('ResolvedMedia') },
                themeTags: { type: list(reference('Tag')) },
                typeTags: { type: list(reference('Tag')) },
                publicationDate: { type: GraphQLString },
            },
            interfaces: [],
        },
    },
})
