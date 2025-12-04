import * as nodeLib from '/lib/xp/node'
import { Aggregations, ConnectParams, Node, RepoConnection } from '/lib/xp/node'
import { ADMIN_PRINCIPAL, CONTENT_REPO_PREFIX, SUPER_USER } from '../constants'
import { create as createRepo, type CreateRepositoryParams, get as getRepo } from '/lib/xp/repo'
import { runAsAdmin } from '/lib/project-initializer'
import { forceArray } from '/lib/utils/array-utils'
import { runInContext } from '/lib/repos/run-in-context'
import { getExcludeFilterAndQuery } from '/lib/utils/site-config'
import { Content, ContentsResult, query, QueryContentParams, QueryDsl } from '/lib/xp/content'
import {
    AggregationsToAggregationResults,
    BooleanDslExpression,
    BooleanFilter,
} from '@enonic-types/core'

export function getNodesFromQueryHits<T>(
    hits: Array<{ id: string }>,
    conn: RepoConnection
): ReadonlyArray<Node<T>> {
    return forceArray<Node<T>>(conn.get(hits.map((it) => it.id)))
}

export function queryWithFilters<
    Hit extends Content<unknown> = Content,
    AggregationInput extends Aggregations = never,
>(
    params: Omit<QueryContentParams<AggregationInput>, 'query'> & {
        query?: { boolean: QueryDsl['boolean'] }
    }
): ContentsResult<Hit, AggregationsToAggregationResults<AggregationInput>> {
    return runInContext({ asAdmin: true }, () => {
        const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery()

        return query({
            ...params,
            query: {
                boolean: {
                    ...(params.query?.boolean || {}),
                    mustNot: [
                        ...forceArray(params.query?.boolean?.mustNot),
                        ...forceArray(queryDslExclusion),
                    ],
                },
            },
            filters: {
                boolean: {
                    ...(params.filters ? { must: params.filters } : {}),
                    mustNot: filterExclusion,
                },
            },
        })
    })
}

const asAdminParams: Pick<ConnectParams, 'user' | 'principals'> = {
    user: {
        login: SUPER_USER,
    },
    principals: [ADMIN_PRINCIPAL],
}

type Params = Omit<ConnectParams, 'user' | 'principals'> & { asAdmin?: boolean }

export const getRepoConnection = ({ repoId, branch, asAdmin }: Params) =>
    nodeLib.connect({
        repoId,
        branch,
        ...(asAdmin && asAdminParams),
    })

export const getContentProjectIdFromRepoId = (repoId: string) =>
    repoId.replace(`${CONTENT_REPO_PREFIX}.`, '')

export const isDraftAndMasterSameVersion = (contentId: string, repoId: string) => {
    const draftContent = getRepoConnection({ branch: 'draft', repoId }).get(contentId)
    const masterContent = getRepoConnection({ branch: 'master', repoId }).get(contentId)

    return draftContent?._versionKey === masterContent?._versionKey
}

export function createRepoIfNotExists(
    id: string,
    params?: Omit<CreateRepositoryParams, 'id'>
): void {
    runAsAdmin((): void => {
        if (!getRepo(id)) {
            log.info('Creating repository %s', id)
            createRepo({
                ...params,
                id,
            })
        }
    })
}

export function getNodesFromQueryHits<T>(
    hits: Array<{ id: string }>,
    conn: RepoConnection
): ReadonlyArray<Node<T>> {
    return forceArray<Node<T>>(conn.get(hits.map((it) => it.id)))
}

function queryWithFilters<
    Hit extends Content<unknown> = Content,
    AggregationInput extends Aggregations = never,
>(
    params: Omit<QueryContentParams<AggregationInput>, 'query'> & {
        query?: { boolean: BooleanDslExpression }
        filters?: { boolean: BooleanFilter['boolean'] }
    }
): ContentsResult<Hit, AggregationsToAggregationResults<AggregationInput>> {
    return runInContext({ asAdmin: true }, () => {
        const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery()
        const mustNotQuery = forceArray(params.query?.boolean?.mustNot)

        const booleanFilter = forceArray(params.filters)?.find((it) =>
            it?.hasOwnProperty('boolean')
        )
        delete params.query?.boolean?.mustNot
        return query({
            ...params,
            query: {
                boolean: {
                    ...(params.query?.boolean || {}),
                    mustNot: [...mustNotQuery, ...queryDslExclusion],
                },
            },
            filters: {
                ...(params.filters ?? {}),
                boolean: {
                    ...(params.filters?.boolean ?? {}),
                    mustNot: [params.filters?.boolean?.mustNot, ...filterExclusion],
                },
            },
        })
    })
}
