export type QbrickVideoProps = {
    accountId: string
    mediaId: string
    title: string
    duration: number
    poster?: string
    language?: string
}

export const buildQbrickVideoProps = (videoData: VideoData, language: string): QbrickVideoProps => {
    const { accountId, mediaId, poster, duration, title, subtitles } = videoData

    return {
        accountId,
        mediaId,
        title,
        duration,
        poster: poster?.mediaUrl,
        language: getSubtitlesLanguage(language, subtitles),
    }
}
