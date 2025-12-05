import { getSite } from '/lib/xp/content'
import { SiteConfig } from '@xp-types/site'
import { forceArray } from '/lib/utils/array-utils'
import { CONTENT_ROOT_PROJECT_ID } from '/lib/constants'

export const getSiteConfig = () => {
    const data = getSite<SiteConfig>({ key: `/${CONTENT_ROOT_PROJECT_ID}` })?.data
    return forceArray(data?.siteConfig)?.find((config) => config.applicationKey === app.name)
        ?.config
}
