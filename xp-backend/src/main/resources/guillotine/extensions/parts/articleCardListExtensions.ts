import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { Content, query } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { ResolvedMedia, resolveImage } from '/lib/utils/media'
import { ResolvedTag, resolveThemeTags, resolveTypeTags } from '../tag'
import { getTags } from '/lib/utils/helpers'
import { getExcludeFilterAndQuery } from '/lib/utils/site-config'

type ArticleCard = {
    url: string
    external: boolean
    title: string
    description?: string
    image?: ResolvedMedia
    themeTags: Array<ResolvedTag>
    typeTags: Array<ResolvedTag>
    publicationDate?: string
}

function map(contents: Content[]): ArticleCard[] {
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

export const articleCardListExtensions = ({
    list,
    nonNull,
    reference,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
}: GraphQL): Extensions => ({
    resolvers: {
        Part_idebanken_article_card_list: {
            list: (_env: DataFetchingEnvironment) => {
                const offset: number = _env.args?.offset ?? 0
                const count: number = _env.args?.count ?? 10

                const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery()
                const hits = query({
                    start: offset,
                    count,
                    sort: 'data.publicationDate DESC, modifiedTime DESC',
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
                                        values: ['idebanken:artikkel'],
                                    },
                                },
                            ],
                            mustNot: filterExclusion,
                        },
                    },
                }).hits
                return map(hits)
            },
            total: () => {
                const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery()
                const res = query({
                    count: 0,
                    query: {
                        boolean: {
                            mustNot: queryDslExclusion,
                        },
                    },
                    filters: {
                        boolean: {
                            must: [
                                {
                                    hasValue: { field: 'type', values: ['idebanken:artikkel'] },
                                },
                            ],
                            mustNot: filterExclusion,
                        },
                    },
                })
                return res.total
            },
            availableTypeTags: () => {
                const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery()
                const tags = query({
                    count: 20,
                    sort: 'displayName ASC',
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
                                        values: ['idebanken:aktuelt-type-tag'],
                                    },
                                },
                            ],
                            mustNot: filterExclusion,
                        },
                    },
                }).hits

                return tags.map((c) => ({ id: c._id, name: c.displayName }))
            },
        },
    },
    creationCallbacks: {
        Part_idebanken_article_card_list: (params) => {
            params.addFields({
                total: { type: nonNull(GraphQLInt) },
                list: {
                    type: nonNull(list(nonNull(reference('Article_card')))),
                    args: { offset: GraphQLInt, count: GraphQLInt },
                },
                availableTypeTags: { type: nonNull(list(nonNull(reference('Tag')))) },
            })
        },
    },
    types: {
        Article_card: {
            description: 'Article card',
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
