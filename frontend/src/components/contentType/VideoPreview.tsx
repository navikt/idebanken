import React from 'react'
import { QbrickVideo } from '~/components/common/qbrick-video/QbrickVideo'
import { buildQbrickVideoProps } from '~/components/common/qbrick-video/videoProps'
import { ContentTypeData } from '~/types/graphql-types'

export type VideoData = {
    accountId: string
    title: string
    duration: number
    mediaId: string
    poster?: {
        imageUrl?: string
    }
    subtitles?: string[] | string
}

export type VideoPageProps = ContentTypeData<VideoData, 'idebanken:video'>

export const VideoPreview = ({ data, meta }: VideoPageProps) => {
    const content = data.get.data
    const videoProps = buildQbrickVideoProps(content, meta)

    return (
        <section className={'block max-w-[37.5rem] mx-auto p-(--ax-space-40)'}>
            <QbrickVideo config={videoProps} meta={meta} />
        </section>
    )
}
