import { QueryNodeParams, RepoConnection, SortDsl } from '/lib/xp/node'
import { render } from '/lib/thymeleaf'
import { Filter, Request, Response } from '@enonic-types/core'
import { getNodesFromQueryHits, getRepoConnection } from '/lib/repos/repo-utils'
import { CONTENT_ROOT_REPO_ID } from '/lib/constants'
import { getExcludeFilterAndQuery } from '/lib/repos/query'
import { Content, QueryDsl } from '/lib/xp/content'
import { LocalDateTime } from '/lib/time'

const view = resolve('content-status.html')

type BaseQueryParams = {
    count?: number
    mustFilter?: Filter[]
    mustNotQuery?: QueryDsl[]
    sort?: SortDsl[]
}

const outdatedContentTypesMustFilter = {
    hasValue: {
        field: 'type',
        values: [
            'idebanken:section-page',
            'idebanken:kjerneartikkel',
            'idebanken:special-page',
            'idebanken:crash-course',
        ],
    },
}

const allContentTypesMustFilter = {
    hasValue: {
        field: 'type',
        values: [
            'portal:site',
            'idebanken:section-page',
            'idebanken:kjerneartikkel',
            'idebanken:artikkel',
            'idebanken:special-page',
            'idebanken:crash-course',
            'idebanken:singleton-aktuelt-page',
            'idebanken:singleton-theme',
            'idebanken:theme-tag',
        ],
    },
}

export function get(req: Request): Response {
    const connection = getRepoConnection({
        repoId: CONTENT_ROOT_REPO_ID,
        branch: 'master',
        asAdmin: true,
    })
    const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery(connection)
    const baseQuery = ({
        count = 1,
        mustFilter = [],
        mustNotQuery = [],
        sort = [],
    }: BaseQueryParams) => ({
        count,
        query: {
            boolean: {
                mustNot: [...queryDslExclusion, ...mustNotQuery],
            },
        },
        filters: {
            boolean: {
                must: mustFilter,
                mustNot: [
                    {
                        hasValue: {
                            field: 'x.com-enonic-app-metafields.meta-data.blockRobots',
                            values: [true],
                        },
                    },
                    // remove x.idebanken.meta.hideFromListViews filter from exclusion
                    ...filterExclusion.slice(0, -1),
                ],
            },
        },
        sort: sort,
    })

    const percentNynorsk = getPercentNynorsk(connection, baseQuery)
    const outdatedContent = getOutdatedContent(connection, baseQuery)

    return {
        status: 200,
        body: render<{ percentNynorsk: string; outdatedContent: OutdatedContent }>(view, {
            percentNynorsk,
            outdatedContent,
        }),
        contentType: 'text/html',
    }
}

function getPercentNynorsk(
    conn: RepoConnection,
    baseQuery: (params: BaseQueryParams) => QueryNodeParams
): string {
    const nynorskRes = conn.query(
        baseQuery({
            mustFilter: [
                allContentTypesMustFilter,
                {
                    hasValue: {
                        field: 'language',
                        values: ['nn'],
                    },
                },
            ],
        })
    ).total

    const norwegianRes = conn.query(
        baseQuery({
            mustFilter: [
                allContentTypesMustFilter,
                {
                    hasValue: {
                        field: 'language',
                        values: ['no'],
                    },
                },
            ],
        })
    ).total

    const nynorskContentPercentage = (nynorskRes / norwegianRes) * 100
    return `Innhold på nynorsk: ${nynorskContentPercentage.toFixed(1)}% ${nynorskContentPercentage >= 25 ? '✅' : '❌'}`
}

type OutdatedContent = Array<{ name: string; path: string | undefined; href: string }>

function getOutdatedContent(
    connection: RepoConnection,
    baseQuery: (params: BaseQueryParams) => QueryNodeParams
): OutdatedContent {
    const threeMonthsAgo = LocalDateTime.now().minusMonths(1).toString()
    const outdatedContentRes = connection.query(
        baseQuery({
            count: -1,
            mustFilter: [outdatedContentTypesMustFilter],
            mustNotQuery: [
                {
                    range: {
                        field: 'modifiedTime',
                        type: 'dateTime',
                        gt: threeMonthsAgo,
                    },
                },
            ],
            sort: [{ field: 'modifiedTime', direction: 'DESC' }],
        })
    )

    return getNodesFromQueryHits<Content<unknown>>(outdatedContentRes.hits, connection).map(
        (content) => ({
            name: content.displayName,
            path: content._path?.replace('/content/idebanken', ''),
            href: `/admin/tool/com.enonic.app.contentstudio/main/idebanken/edit/${content._id}`,
        })
    )
}
