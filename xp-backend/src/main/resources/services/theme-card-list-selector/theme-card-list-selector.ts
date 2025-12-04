import { Request, Response } from '@enonic-types/core'
import { query } from '/lib/xp/content'
import {
    CustomSelectorServiceParams,
    CustomSelectorServiceResponseBody,
} from '@item-enonic-types/global/controller'
import { runInContext } from '/lib/repos/run-in-context'
import { getExcludeFilterAndQuery } from '/lib/utils/site-config'

export const get = (req: Request<{ params: CustomSelectorServiceParams }>): Response => {
    const themeContentId = req.path.replace(
        /^.*\/([\d\S-]{8}-[\d\S-]{4}-[\d\S-]{4}-[\d\S-]{4}-[\d\S-]{12})\/.*$/,
        '$1'
    )
    const contentWithThemeRes = runInContext({ asAdmin: true }, () => {
        const { queryDslExclusion, filterExclusion } = getExcludeFilterAndQuery()
        return query({
            count: Number(req.params.count) || 10,
            query: {
                boolean: {
                    mustNot: queryDslExclusion,
                    ...(req.params.query
                        ? {
                              must: {
                                  ngram: {
                                      fields: ['displayName', 'data.title', 'data.ingress'],
                                      query: req.params.query,
                                  },
                              },
                          }
                        : {}),
                },
            },
            filters: {
                boolean: {
                    should: [
                        {
                            hasValue: {
                                field: 'x.idebanken.tags.themeTags',
                                values: [themeContentId],
                            },
                        },
                        {
                            hasValue: {
                                field: 'x.idebanken.aktuelt-tags.themeTags',
                                values: [themeContentId],
                            },
                        },
                    ],
                    mustNot: filterExclusion,
                },
            },
            sort: [{ field: 'type', direction: 'DESC' }],
        })
    })

    const contentWithTheme = contentWithThemeRes.hits.map(({ _id, displayName, type, _path }) => ({
        id: _id,
        displayName,
        description: `${type.split(':')[1]} - ${_path?.replace(/^\/idebanken/, '')}`,
    }))

    const body: CustomSelectorServiceResponseBody = {
        total: contentWithThemeRes.total,
        count: contentWithThemeRes.count,
        hits: contentWithTheme ?? [],
    }
    return {
        body: JSON.stringify(body),
        contentType: 'application/json',
    }
}
