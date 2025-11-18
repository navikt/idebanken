'use client'

import React from 'react'
import { buildQbrickVideoProps } from '~/components/common/qbrick-video/videoProps'
import { QbrickVideo } from '~/components/common/qbrick-video/QbrickVideo'
import { Macro } from '~/components/macros/HighlightedBox'
import { MetaData } from '@enonic/nextjs-adapter'
import { Idebanken_Video, Macro_Idebanken_Video_DataConfig } from '~/types/generated'
import { VideoData } from '~/components/contentType/VideoPreview'

const buildVideoProps = (macroConfig: Macro_Idebanken_Video_DataConfig, meta: MetaData) => {
    const { targetContent, language } = macroConfig ?? {}

    if (!(targetContent as Idebanken_Video)?.data) {
        return null
    }

    return buildQbrickVideoProps(
        (targetContent as Idebanken_Video).data as unknown as VideoData,
        meta,
        language
    )
}

export const Video = ({ config, meta }: Macro<Macro_Idebanken_Video_DataConfig>) => {
    const videoProps = buildVideoProps(config, meta)
    // const [videoProps, setVideoProps] = useState<QbrickVideoProps | null>(
    //     buildVideoProps(config, meta.locale)
    // )

    // useEffect(() => {
    //     if (!videoProps || videoProps.poster) {
    //         return
    //     }
    //
    //     // Whether the video is in new content or legacy, attempt
    //     // to get the poster and duration if none is given in the content config.
    //     fetchQbrickMissingProps(videoProps).then((newProps) => {
    //         if (newProps) {
    //             setVideoProps(newProps)
    //         }
    //     })
    // }, [videoProps])

    if (!videoProps) {
        return null
    }

    return <QbrickVideo config={videoProps} meta={meta} />
}
