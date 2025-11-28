import { imageUrl, ImageUrlParams } from '/lib/xp/portal'
import { Content } from '/lib/xp/content'
import { MediaImageContent } from '@enonic-types/guillotine'
import { getOrNull, getTags } from '/lib/utils/helpers'
import { forceArray } from '/lib/utils/array-utils'
import { logger } from '/lib/utils/logging'
import { get as getContext } from '/lib/xp/context'
import { URLS } from '/lib/constants'

export type ResolvedMedia = {
    url?: string
    caption?: string
    altText?: string
    iconColor?: string
}
type IdOrContent = Content | string | undefined

const isMedia = (content: Content): content is MediaImageContent =>
    content.type === 'media:image' || content.type === 'media:vector'

export function resolveImage(
    idOrContent?: IdOrContent | null,
    scale: ImageUrlParams['scale'] = 'full'
): ResolvedMedia {
    const content = idOrContentToContent(idOrContent)
    if (!content?._id) return {}

    const heroImage = content?.data?.heroImage as string | undefined

    const seoImage = content.x?.['com-enonic-app-metafields']?.['meta-data']?.seoImage as
        | string
        | undefined

    const overrideImage = content.data?.overrideImage as string | undefined

    if (overrideImage) {
        return resolveMedia(overrideImage, scale)
    } else if (heroImage) {
        return resolveMedia(heroImage, scale)
    } else if (isMedia(content)) {
        const mediaData = content?.data
        return {
            url: imageUrl({ id: content._id, scale, type: 'absolute' }),
            caption: mediaData?.caption,
            altText: mediaData?.altText ?? mediaData?.caption,
        }
    } else if (seoImage) {
        return resolveMedia(seoImage, scale)
    } else {
        return {}
    }
}

export function resolveIcon(
    idOrContent?: IdOrContent | null,
    defaultToThemeTagIcon = true,
    iconColor?: string
): ResolvedMedia {
    const content = idOrContentToContent(idOrContent)
    if (!content?._id) return {}

    const ibX = content?.x?.idebanken
    const metaIcon = ibX?.meta?.icon
    const tags = getTags(ibX)
    const fistThemeTagIcon = forceArray(tags?.themeTags)[0]

    if (isMedia(content)) {
        return {
            url: imageUrl({ id: content._id, scale: 'full', type: 'absolute' }),
            caption: content?.data?.caption,
            altText: content?.data?.altText ?? content?.data?.caption,
            iconColor,
        }
    } else if (metaIcon) {
        return resolveMedia(metaIcon, 'full', iconColor || ibX?.meta?.iconColor)
    } else if (defaultToThemeTagIcon && fistThemeTagIcon) {
        return resolveMedia(fistThemeTagIcon, 'full', iconColor)
    } else {
        return {}
    }
}

function resolveMedia(
    idOrContent?: IdOrContent | null,
    scale: ImageUrlParams['scale'] = 'full',
    iconColor?: string
): ResolvedMedia {
    const content = idOrContentToContent(idOrContent)
    if (!content?._id) return {}

    if (content.type === 'idebanken:theme-tag') {
        const meta = content?.x?.idebanken?.meta
        return resolveMedia(meta?.icon, scale, iconColor || meta?.iconColor)
    }

    const data = content?.data as MediaImageContent['data']

    let url: string
    try {
        url = imageUrl({ id: content._id, scale, type: 'absolute' })
    } catch (e) {
        // For some reason, imageUrl fails when building search documents.
        if (!data.media?.attachment) return {}
        const context = getContext()
        url = `${URLS.XP_ORIGIN}/site/${context.repository?.split('.')?.pop()}/${context.branch}/_/image/${content._id}/full/${data.media.attachment}`
        logger.debug(
            `Could not generate imageUrl from name: ${content.displayName}, with params: ${JSON.stringify({ id: content._id, scale, type: 'absolute' }, null, 2)}. Error: ${JSON.stringify(e)}`
        )
    }
    return {
        url: url,
        caption: data.caption,
        altText: data?.altText || data?.caption,
        iconColor,
    }
}

const idOrContentToContent = <T extends Content>(idOrContent?: string | T | null): T | null => {
    if (typeof idOrContent === 'string') {
        return getOrNull<T>(idOrContent)
    }
    return idOrContent || null
}
