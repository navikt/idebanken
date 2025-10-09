import { logger } from '/lib/utils/logging'

export function enonicSitePathToHref(path?: string) {
    if (!path) {
        logger.warning('sitePathToHref called with undefined or empty path')
        return '#'
    }
    return path.replace(/^(\/content)?\/idebanken/, '') || '/'
}
