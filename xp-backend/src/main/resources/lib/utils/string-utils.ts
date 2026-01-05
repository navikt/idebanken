import { logger } from '/lib/utils/logging'

export function enonicSitePathToHref(path?: string) {
    if (!path) {
        logger.warning('sitePathToHref called with undefined or empty path')
        return '#'
    }
    return path.replace(/^(\/content)?\/idebanken/, '') || '/'
}

export function truncateUrl(link?: string, maxLength = 50): string | undefined {
    if (!link) return link

    const linkWithoutProtocolAndParams = link.replace(/(https?:\/\/)?([^?]*?)\/?(\?[^/]*)?$/, '$2')
    if (linkWithoutProtocolAndParams.length <= maxLength) return linkWithoutProtocolAndParams

    const truncatedUrl = linkWithoutProtocolAndParams.replace(
        /^([^/]+\/)(.+)?(\/[^/]+)$/,
        `$1...$3`
    )
    if (truncatedUrl.length > maxLength) {
        return truncatedUrl.substring(0, maxLength).concat('...')
    } else {
        return truncatedUrl
    }
}

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 */
export function hashCode(str: string): number {
    let hash = 0
    for (let i = 0, len = str.length; i < len; i++) {
        const chr = str.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0 // Convert to 32bit integer
    }
    return hash
}
