import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { Extensions, DataFetchingEnvironment } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { query, Content } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { resolveImage, resolveIcon, ResolvedMedia } from '/lib/utils/media'
import { resolveCategories, ResolvedCategory } from '../category'

type ArticleCard = {
    url: string
    external: boolean
    title: string
    description?: string
    image?: ResolvedMedia
    icon?: ResolvedMedia
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
            icon: resolveIcon(c),
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
}: GraphQL): Extensions => ({
    resolvers: {
        Part_idebanken_article_card_list: {
            list: (_env: DataFetchingEnvironment) => {
                const hits = query({
                    count: -1,
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
        },
    },
    creationCallbacks: {
        Part_idebanken_article_card_list: (params) => {
            params.addFields({
                list: { type: nonNull(list(nonNull(reference('Article_card')))) },
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
                icon: { type: reference('ResolvedMedia') },
                categories: { type: list(reference('Category')) },
            },
            interfaces: [],
        },
    },
})
