import { QbrickVideoProps } from './videoProps'
import { QbrickMeta } from '~/components/common/qbrick-video/qbrickMeta'

const findImageUrlFromVideoMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources
    if (!resources) {
        return undefined
    }

    const images = resources.filter((resource) => resource.type === 'image')

    const qBrickPickedThumbnail = qbrickMediaData.thumbnails?.[0]?.id

    // If the specified thumbnail is not found, pick the first image
    const selectedImage =
        (qBrickPickedThumbnail &&
            images.find((resource) => resource.id === qBrickPickedThumbnail)) ||
        images[0]

    if (!selectedImage) {
        return undefined
    }

    const imageHref = selectedImage.renditions[0]?.links[0]?.href

    return imageHref || undefined
}

const findVideoDurationFromMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources
    if (!resources) {
        return 0
    }

    const firstFoundResource = resources.find((resource) => resource.type === 'video')
    const firstFoundVideo = firstFoundResource?.renditions?.[0]?.videos
    const duration = firstFoundVideo?.[0]?.duration

    return duration || 0
}

export const getTimestampFromDuration = (duration: number) => {
    const halfMinute = 30
    const roundedSeconds = Math.round(duration / halfMinute) * halfMinute
    const minutes = Math.floor(roundedSeconds / 60)
    if (roundedSeconds % 60 === 0) {
        return minutes
    } else {
        const decimalMinutes = (roundedSeconds % 60) / 60
        return (minutes + decimalMinutes).toFixed(1).replace('.', ',')
    }
}

export const fetchQbrickMissingProps = async (
    videoProps: QbrickVideoProps
): Promise<QbrickVideoProps | null> => {
    const { accountId, mediaId } = videoProps

    const metaUrl = `https://video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`

    const result = await fetchJson(metaUrl)
    if (!result) {
        return null
    }

    const poster = findImageUrlFromVideoMeta(result)
    const duration = findVideoDurationFromMeta(result)

    return { ...videoProps, poster, duration }
}

const TIMEOUT_DEFAULT = 15000

export const fetchWithTimeout = <ResponseType = any>(
    url: string,
    timeoutMs = TIMEOUT_DEFAULT,
    config?: Record<string, any>
): Promise<ResponseType> =>
    Promise.race<any>([
        fetch(url, config),
        new Promise((res) =>
            setTimeout(
                () =>
                    res({
                        ok: false,
                        status: 408,
                        statusText: 'Request Timeout',
                    }),
                timeoutMs
            )
        ),
    ])

export const fetchJson = <ResponseType = any>(
    url: string,
    timeout = TIMEOUT_DEFAULT,
    config?: Record<string, any>,
    retries = 0
): Promise<ResponseType | null> =>
    fetchWithTimeout(url, timeout, config)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }

            throw new Error(`${res.status} - ${res.statusText}`)
        })
        .catch((e) => {
            if (retries > 0) {
                console.info(`Failed to fetch from ${url}, retrying`)
                return fetchJson(url, timeout, config, retries - 1)
            }

            console.error(`Failed to fetch json from ${url} - ${e}`)
            return null
        })
