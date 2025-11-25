import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { Extensions, DataFetchingEnvironment } from '@enonic-types/guillotine/extensions'
import { query, Content } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { resolveImage, ResolvedMedia } from '/lib/utils/media'
import { resolveCategories, ResolvedCategory } from '../category'

type ArticleCard = {
    url: string
    external: boolean
    title: string
    description?: string
    image?: ResolvedMedia
    categories: Array<ResolvedCategory>
}

function map(contents: Content[]): ArticleCard[] {
    return contents.map((c) => {
        const ibxData = c.x.idebanken
        const data = c.data as Record<string, string | undefined>
        return {
            url: enonicSitePathToHref(c._path),
            external: false,
            title: data?.shortTitle || data?.title || c.displayName || '[Mangler tittel]',
            description: data?.description,
            image: resolveImage(c, 'width(500)'),
            categories: resolveCategories(ibxData?.category),
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
                const hits = query({
                    start: offset,
                    count,
                    sort: '_modifiedTime DESC',
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
                        },
                    },
                }).hits
                return map(hits)
            },
            total: () => {
                const res = query({
                    count: 0,
                    filters: {
                        boolean: {
                            must: [
                                {
                                    hasValue: { field: 'type', values: ['idebanken:artikkel'] },
                                },
                            ],
                        },
                    },
                })
                return res.total
            },
        },
    },
    creationCallbacks: {
        Part_idebanken_article_card_list: (params) => {
            params.addFields({
                total: { type: nonNull(GraphQLInt) },
                list: {
                    type: nonNull(list(nonNull(reference('Article_card')))),
                    args: {
                        offset: GraphQLInt,
                        count: GraphQLInt,
                    },
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
                categories: { type: list(reference('Category')) },
            },
            interfaces: [],
        },
    },
})
