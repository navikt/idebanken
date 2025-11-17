import { VideoData } from '~/components/contentType/VideoPreview'
import { getUrl, MetaData } from '@enonic/nextjs-adapter'

export type QbrickVideoProps = {
    accountId: string
    mediaId: string
    title: string
    duration: number
    poster?: string
    language?: string
}

export const buildQbrickVideoProps = (videoData: VideoData, meta: MetaData): QbrickVideoProps => {
    const { accountId, mediaId, poster, duration, title, subtitles } = videoData

    return {
        accountId,
        mediaId,
        title,
        duration,
        poster: poster?.imageUrl ? getUrl(poster?.imageUrl, meta) : undefined,
        language: subtitles ? meta.locale : undefined,
    }
}
