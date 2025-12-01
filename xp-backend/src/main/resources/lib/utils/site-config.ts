import { get, getSite, QueryDsl } from '/lib/xp/content'
import { SiteConfig } from '@xp-types/site'
import { forceArray } from '/lib/utils/array-utils'
import { CONTENT_ROOT_PROJECT_ID } from '/lib/constants'
import { Filter } from '@enonic-types/core'

export const getSiteConfig = () => {
    const data = getSite<SiteConfig>({ key: `/${CONTENT_ROOT_PROJECT_ID}` })?.data
    return forceArray(data?.siteConfig)?.find((config) => config.applicationKey === app.name)
        ?.config
}

export function getExcludeFilterAndQuery(): {
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
