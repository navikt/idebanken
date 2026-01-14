import { getSite, Site } from '/lib/xp/content'
import { SiteConfig } from '@xp-types/site'
import { forceArray } from '/lib/utils/array-utils'
import { CONTENT_ROOT_PROJECT_ID } from '/lib/constants'
import { RepoConnection } from '/lib/xp/node'

export const getSiteConfig = (connection?: RepoConnection): SiteConfig | undefined => {
    const data = connection
        ? connection.get<Site<SiteConfig>>({ key: `/content/${CONTENT_ROOT_PROJECT_ID}` })?.data
        : getSite<SiteConfig>({ key: `/${CONTENT_ROOT_PROJECT_ID}` })?.data
    return forceArray(data?.siteConfig)?.find((config) => config.applicationKey === app.name)
        ?.config
}
