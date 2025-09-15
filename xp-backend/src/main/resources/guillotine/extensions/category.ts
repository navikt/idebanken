import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { EmptyRecord, Source } from '../common-guillotine-types'
import { Category, Category as XDataCategory } from '@xp-types/site/x-data'
import { query } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'

export const categoryExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions => ({
    resolvers: {
        XData_idebanken_category_DataConfig: {
            categories: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<XDataCategory>>
            ): Array<string> => {
                return resolveCategories(env.source)
            },
        },
    },
    creationCallbacks: {
        XData_idebanken_category_DataConfig: (params): void => {
            params.modifyFields({
                categories: {
                    type: nonNull(list(GraphQLString)),
                },
            })
        },
    },
})

export function resolveCategories(category?: Category): Array<string> {
    if (!category?.categories) {
        return []
    }

    const categoryContents = query({
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

    return forceArray(categoryContents)
        .map((hit) => hit.data?.title as string)
        .filter((it) => it)
}
