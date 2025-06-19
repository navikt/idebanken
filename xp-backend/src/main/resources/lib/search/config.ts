import { getSite } from '/lib/xp/content'
import { SiteConfig } from '@xp-types/site'
import { forceArray } from '/lib/utils/array-utils'
import { CONTENT_ROOT_PROJECT_ID } from '/lib/constants'

type Site = {
    data: {
        siteConfig: SiteConfig | Array<SiteConfig> | undefined
    }
}

export const getSearchConfig = () => {
    const data = getSite<Site>({ key: `/${CONTENT_ROOT_PROJECT_ID}` })?.data
    return (
        forceArray(data?.siteConfig)?.find((config) => config.applicationKey === app.name)
            ?.config as SiteConfig | undefined
    )?.searchConfig
}
