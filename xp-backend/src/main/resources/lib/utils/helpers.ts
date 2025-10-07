import { imageUrl, ImageUrlParams, XOR } from '/lib/xp/portal'
import { Content, get } from '/lib/xp/content'
import { MediaImageContent } from '@enonic-types/guillotine'

export type ResolvedMedia = {
    url?: string
    caption?: string
    altText?: string
}

export function resolveMedia(
    media?: Omit<ImageUrlParams, 'id' | 'path'> & XOR<{ id?: string }, { path?: string }>
): ResolvedMedia {
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
