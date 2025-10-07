import { imageUrl, ImageUrlParams } from '/lib/xp/portal'
import { Content, get } from '/lib/xp/content'
import { MediaImageContent } from '@enonic-types/guillotine'

export type ResolvedMedia = {
    url?: string
    caption?: string
    altText?: string
}

export function resolveMedia(media?: Omit<ImageUrlParams, 'id'> & { id?: string }): ResolvedMedia {
    if (!media?.id) return {}
    const mediaData = getOrNull<MediaImageContent>(media.id)?.data

    return {
        url: imageUrl({ id: media.id, type: 'absolute', scale: 'full' }),
        caption: mediaData?.caption,
        altText: mediaData?.altText ?? mediaData?.caption,
    }
}

export function getOrNull<T extends Content>(key?: string): T | null {
    return key ? get<T>({ key }) : null
}
