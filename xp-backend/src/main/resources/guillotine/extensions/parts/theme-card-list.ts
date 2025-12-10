import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { Content, get as getContent } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { ResolvedMedia, resolveImage } from '/lib/utils/media'
import { ResolvedTag, resolveThemeTags, resolveTypeTags } from '../tag'
import { getTags } from '/lib/utils/helpers'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { Source } from '../../common-guillotine-types'
import { ThemeCardList } from '@xp-types/site/parts'
import { logger } from '/lib/utils/logging'
import { forceArray } from '/lib/utils/array-utils'
import { queryWithFilters } from '/lib/repos/query'

type ThemeContentCard = {
    url: string
    external: boolean
    title: string
    description?: string
    image?: ResolvedMedia
    themeTags: Array<ResolvedTag>
    typeTags: Array<ResolvedTag>
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
        }
    })
}

function getHighlightedContent(ids: string[]): Content[] {
    if (!ids.length) {
        return []
    }

    const orderMap = new Map(ids.map((id, index) => [id, index]))

    return queryWithFilters({
        count: -1,
        filters: {
            hasValue: {
                field: '_id',
                values: ids,
            },
        },
    }).hits.sort((a, b) => {
        const indexA = orderMap.get(a._id) ?? Number.MAX_SAFE_INTEGER
        const indexB = orderMap.get(b._id) ?? Number.MAX_SAFE_INTEGER
        return indexA - indexB
    })
}

function queryThemeContent({
    offset,
    count,
    themeContentId,
    excludedIds,
}: {
    offset: number
    count: number
    themeContentId: string
    excludedIds: string[]
}) {
    return queryWithFilters({
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
                            values: [themeContentId],
                        },
                    },
                    {
                        hasValue: {
                            field: 'x.idebanken.aktuelt-tags.themeTags',
                            values: [themeContentId],
                        },
                    },
                ],
                mustNot: [
                    {
                        ids: {
                            values: excludedIds,
                        },
                    },
                ],
            },
        },
    })
}

function resolveThemeCardListData(
    env: DataFetchingEnvironment<
        { offset?: number; count?: number; path?: string },
        LocalContextRecord,
        Source<ThemeCardList>
    >
) {
    const offset: number = env.args?.offset ?? 0
    const count: number = env.args?.count ?? 10
    const highlightedContentIds = forceArray(env.source?.highlightedContent)

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
        logger.warning(`Part_idebanken_theme_card_list could not find content at path: ${path}`)
        return {
            total: 0,
            list: [],
        }
    }

    const highlightedContent = getHighlightedContent(highlightedContentIds)

    const contentsResult = queryThemeContent({
        offset,
        count,
        themeContentId: contentId,
        excludedIds: highlightedContent.map((c) => c._id),
    })

    return {
        total: contentsResult.total,
        list: mapThemeContent(highlightedContent.concat(contentsResult.hits)),
    }
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
            data: resolveThemeCardListData,
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
                url: { type: nonNull(GraphQLString) },
                external: { type: nonNull(GraphQLBoolean) },
                title: { type: nonNull(GraphQLString) },
                description: { type: GraphQLString },
                image: { type: reference('ResolvedMedia') },
                themeTags: { type: nonNull(list(nonNull(reference('Tag')))) },
                typeTags: { type: nonNull(list(nonNull(reference('Tag')))) },
            },
            interfaces: [],
        },
    },
})
