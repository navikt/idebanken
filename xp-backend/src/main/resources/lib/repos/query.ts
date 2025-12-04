import { Content, ContentsResult, get, query, QueryContentParams, QueryDsl } from '/lib/xp/content'
import { AggregationsToAggregationResults, BooleanDslExpression, Filter } from '@enonic-types/core'
import { getSiteConfig } from '/lib/utils/site-config'
import { forceArray } from '/lib/utils/array-utils'
import { Aggregations } from '/lib/xp/node'

const isBooleanQuery = (query: QueryDsl | undefined): query is { boolean: BooleanDslExpression } =>
    'boolean' in (query || {})

export function queryWithFilters<
    Hit extends Content<unknown> = Content,
    AggregationInput extends Aggregations = never,
>({
    query: queryParam,
    filters,
    ...rest
}: Omit<QueryContentParams<AggregationInput>, 'query'> & {
    query?: QueryDsl
}): ContentsResult<Hit, AggregationsToAggregationResults<AggregationInput>> {
    const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery()

    return query({
        ...rest,
        query: {
            boolean: {
                ...(isBooleanQuery(queryParam)
                    ? queryParam?.boolean
                    : { must: forceArray(queryParam) }),
                mustNot: [
                    ...(isBooleanQuery(queryParam) ? forceArray(queryParam?.boolean?.mustNot) : []),
                    ...queryDslExclusion,
                ],
            },
        },
        filters: [
            ...forceArray(filters),
            {
                boolean: {
                    mustNot: filterExclusion,
                },
            },
        ],
    })
}

function getExcludeFilterAndQuery(): {
    queryDslExclusion: Array<QueryDsl>
    filterExclusion: Array<Filter>
} {
    const searchConfig = getSiteConfig()?.searchConfig
    const queryDslExclusion = forceArray(searchConfig?.excludeContentAndChildren).map((id) => {
        const path = get({ key: id })?._path
        return {
            like: {
                field: '_path',
                value: `/content${path}/*`,
            },
        }
    })
    const filterExclusion = forceArray(searchConfig?.excludeContent)
        .reduce((acc, id) => {
            acc.push({
                ids: {
                    values: [id],
                },
            })
            return acc
        }, [] as Array<Filter>)
        .concat({
            hasValue: {
                field: 'x.idebanken.meta.hideFromListViews',
                values: ['true'],
            },
        })
    return { queryDslExclusion, filterExclusion }
}
