import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { Category as XDataCategory } from '@xp-types/site/x-data'
import { forceArray } from '/lib/utils/array-utils'
import { query } from '/lib/xp/content'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'

type Source<T> = {
    __contentId: string
} & T

export function extensions({ list, GraphQLString }: GraphQL): Extensions {
    return {
        resolvers: {
            XData_idebanken_category_DataConfig: {
                categories: (
                    env: DataFetchingEnvironment<object, LocalContextRecord, Source<XDataCategory>>
                ): Array<string> => {
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
                                            values: forceArray(env.source.categories),
                                        },
                                    },
                                ],
                            },
                        },
                    })?.hits

                    return categoryContents
                        .map((hit) => hit.data?.title as string)
                        .filter((it) => it)
                },
            },
        },
        creationCallbacks: {
            XData_idebanken_category_DataConfig: (params): void => {
                params.modifyFields({
                    categories: {
                        type: list(GraphQLString),
                    },
                })
            },
        },
    }
}
