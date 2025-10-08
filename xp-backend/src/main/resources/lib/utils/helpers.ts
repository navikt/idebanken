import { imageUrl, ImageUrlParams, XOR } from '/lib/xp/portal'
import { Content, get } from '/lib/xp/content'
import { MediaImageContent } from '@enonic-types/guillotine'

export type ResolvedMedia = {
    url?: string
    caption?: string
    altText?: string
}

const isMedia = (content: Content): content is MediaImageContent =>
    content.type === 'media:image' || content.type === 'media:vector'

type MediaUrlParams = Omit<ImageUrlParams, 'id' | 'path'> & XOR<{ id?: string }, { path?: string }>

export function resolveImage(mediaUrlParams?: MediaUrlParams): ResolvedMedia {
    if (!mediaUrlParams?.id && !mediaUrlParams?.path) return {}

    const content = getOrNull(mediaUrlParams.id || mediaUrlParams.path)
    if (!content) return {}

    const seoImage = content?.x?.['com-enonic-app-metafields']?.['meta-data']?.seoImage as
        | string
        | undefined

    if (isMedia(content)) {
        const mediaData = content?.data
        return {
            url: imageUrl(mediaUrlParams as ImageUrlParams),
            caption: mediaData?.caption,
            altText: mediaData?.altText ?? mediaData?.caption,
        }
    } else if (seoImage) {
        return resolveMedia({ ...mediaUrlParams, id: seoImage } as ImageUrlParams)
    } else {
        return {}
    }
}
export function resolveIcon(mediaUrlParams?: MediaUrlParams): ResolvedMedia {
    if (!mediaUrlParams?.id && !mediaUrlParams?.path) return {}

    const content = getOrNull(mediaUrlParams.id || mediaUrlParams.path)
    if (!content) return {}

    const ibX = content?.x?.idebanken
    const metaIcon = ibX?.meta?.icon
    const fistCategoryIcon = ibX?.category?.categories?.[0]

    if (isMedia(content)) {
        const mediaData = content?.data
        return {
            url: imageUrl(mediaUrlParams as ImageUrlParams),
            caption: mediaData?.caption,
            altText: mediaData?.altText ?? mediaData?.caption,
        }
    } else if (metaIcon) {
        return resolveMedia({ ...mediaUrlParams, id: metaIcon } as ImageUrlParams)
    } else if (fistCategoryIcon) {
        return resolveMedia({ ...mediaUrlParams, id: fistCategoryIcon } as ImageUrlParams)
    } else {
        return {}
    }
}

function resolveMedia(media?: MediaUrlParams): ResolvedMedia {
    if (!media?.id && !media?.path) return {}

    const mediaData = getOrNull<MediaImageContent>(media.id || media.path)?.data

    return {
        url: imageUrl(media as ImageUrlParams),
        caption: mediaData?.caption,
        altText: mediaData?.altText ?? mediaData?.caption,
    }
}

export function getOrNull<T extends Content>(key?: string): T | null {
    return key ? get<T>({ key }) : null
}
