import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { Content } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { ResolvedMedia, resolveImage } from '/lib/utils/media'
import { ResolvedTag, resolveThemeTags, resolveTypeTags } from '../tag'
import { getTags } from '/lib/utils/helpers'
import { queryWithFilters } from '/lib/repos/query'

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

type HasValueFilter = {
    hasValue: {
        field: string
        values: string[]
    }
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

function buildMustFilters(typeTagIds: string[]): HasValueFilter[] {
    const must: HasValueFilter[] = [{ hasValue: { field: 'type', values: ['idebanken:artikkel'] } }]
    if (typeTagIds.length) {
        must.push({
            hasValue: {
                field: 'x.idebanken.aktuelt-tags.typeTags',
                values: typeTagIds,
            },
        })
    }
    return must
}

function parseTypeTagIds(typeTagCsv?: string): string[] {
    if (!typeTagCsv) return []
    return typeTagCsv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
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
            list: (env: DataFetchingEnvironment) => {
                const offset: number = env.args?.offset ?? 0
                const count: number = env.args?.count ?? 10
                const typeTagIds = parseTypeTagIds(env.args?.typeTagIds)

                const must = buildMustFilters(typeTagIds)

                const hits = queryWithFilters({
                    start: offset,
                    count,
                    sort: [
                        { field: 'data.publicationDate', direction: 'DESC' },
                        { field: 'modifiedTime', direction: 'DESC' },
                    ],
                    filters: { boolean: { must } },
                }).hits

                return map(hits)
            },
            total: (_env: DataFetchingEnvironment) => {
                const typeTagIds = parseTypeTagIds(_env.args?.typeTagIds)

                const must = buildMustFilters(typeTagIds)

                const res = queryWithFilters({
                    count: -1,
                    filters: { boolean: { must } },
                })

                return res.total
            },
            availableTypeTags: () => {
                const tags = queryWithFilters({
                    count: -1,
                    sort: 'displayName ASC',
                    filters: {
                        hasValue: {
                            field: 'type',
                            values: ['idebanken:aktuelt-type-tag'],
                        },
                    },
                }).hits

                return tags.map((c) => ({ id: c._id, name: c.displayName, color: c.data?.color }))
            },
        },
    },
    creationCallbacks: {
        Part_idebanken_article_card_list: (params) => {
            params.addFields({
                total: { type: nonNull(GraphQLInt), args: { typeTagIds: GraphQLString } },
                list: {
                    type: nonNull(list(nonNull(reference('Article_card')))),
                    args: { offset: GraphQLInt, count: GraphQLInt, typeTagIds: GraphQLString },
                },
                availableTypeTags: { type: nonNull(list(nonNull(reference('Tag')))) },
            })
            params.modifyFields({
                pageSize: {
                    type: GraphQLInt,
                },
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
