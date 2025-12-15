import { VideoData } from '~/components/contentType/VideoPreview'
import { getUrl, MetaData } from '@enonic/nextjs-adapter'
import { forceArray } from '~/utils/utils'

export type QbrickVideoProps = {
    accountId: string
    mediaId: string
    title: string
    duration: number
    poster?: string
    language?: string
    displayType?: 'small' | 'large' | string | null
}

export const buildQbrickVideoProps = (
    videoData: VideoData,
    meta: MetaData,
    overrideLanguage?: string | null,
    displayType?: 'small' | 'large' | string | null
): QbrickVideoProps => {
    const { accountId, mediaId, poster, duration, title, subtitles } = videoData

    return {
        accountId,
        mediaId,
        title,
        duration,
        displayType,
        poster: poster?.imageUrl ? getUrl(poster?.imageUrl, meta) : undefined,
        language: getSubtitlesLanguage(overrideLanguage || meta.locale, subtitles),
    }
}

const getSubtitlesLanguage = (language: string, subtitles: VideoData['subtitles']) => {
    if (!subtitles) {
        return undefined
    }

    const selectedLanguage = transformLanguage(language)

    return forceArray(subtitles).find(
        (language) => transformLanguage(language) === selectedLanguage
    )
}

// Ensure 'nb' (norsk bokmål) and 'no' (norsk) are treated as equal;
const transformLanguage = (language: string) => (language === 'no' ? 'nb' : language)
