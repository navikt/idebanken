import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { EmptyRecord, Source } from '../common-guillotine-types'
import { Category as XDataCategory } from '@xp-types/site/x-data'
import { Content, query } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'
import { Category } from '@xp-types/site/content-types'
import { resolveIcon } from '/lib/utils/helpers'

export type ResolvedCategory = {
    id: string
    name: string
    iconUrl?: string
    iconColor?: string
    caption?: string
}

export const categoryExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions => ({
    types: {
        Category: {
            description: 'Resolved category',
            fields: {
                id: {
                    type: nonNull(GraphQLID),
                },
                name: {
                    type: nonNull(GraphQLString),
                },
                iconUrl: {
                    type: GraphQLString,
                },
                iconColor: {
                    type: GraphQLString,
                },
                caption: {
                    type: GraphQLString,
                },
            },
            interfaces: [],
        },
    },
    resolvers: {
        XData_idebanken_category_DataConfig: {
            categories: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<XDataCategory>>
            ): Array<ResolvedCategory> => {
                return resolveCategories(env.source)
            },
        },
    },
    creationCallbacks: {
        XData_idebanken_category_DataConfig: (params): void => {
            params.modifyFields({
                categories: {
                    type: nonNull(list(nonNull(reference('Category')))),
                },
            })
        },
    },
})

export function resolveCategories(category?: XDataCategory): Array<ResolvedCategory> {
    if (!category?.categories) {
        return []
    }

    const categoryContents = query<Content<Category>>({
        filters: {
            boolean: {
                must: [
                    {
                        hasValue: {
                            field: 'type',
                            values: ['idebanken:category'],
                        },
                    },
                    {
                        hasValue: {
                            field: '_id',
                            values: forceArray(category.categories),
                        },
                    },
                ],
            },
        },
    })?.hits

    return mapCategoryContentToResolved(categoryContents)
}

export function mapCategoryContentToResolved(
    categoryContents?: Array<Content<Category>>
): Array<ResolvedCategory> {
    return forceArray(categoryContents)
        .filter((it) => it?.data?.title && it._id)
        .map((hit) => {
            const icon = resolveIcon({
                id: hit.x?.idebanken?.meta?.icon,
                type: 'absolute',
                scale: 'full',
            })

            return {
                name: hit.data.title,
                id: hit._id,
                iconUrl: icon?.url,
                caption: icon?.caption,
                iconColor: hit.x?.idebanken?.meta?.iconColor,
            }
        })
}
