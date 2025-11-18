import React from 'react'
import { buildQbrickVideoProps } from '~/components/common/qbrick-video/videoProps'
import { QbrickVideo } from '~/components/common/qbrick-video/QbrickVideo'
import { Macro } from '~/components/macros/HighlightedBox'
import { MetaData } from '@enonic/nextjs-adapter'
import {
    Idebanken_Video,
    Macro_Idebanken_Video_DataConfig,
    Part_Idebanken_Video,
} from '~/types/generated'
import { VideoData } from '~/components/contentType/VideoPreview'
import { PartData } from '~/types/graphql-types'

type VideoMacro = Macro<Macro_Idebanken_Video_DataConfig>
type VideoPart = PartData<Part_Idebanken_Video>

const buildVideoProps = (
    macroConfig: Macro_Idebanken_Video_DataConfig | Part_Idebanken_Video | undefined,
    meta: MetaData
) => {
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

export const VideoPartOrMacro = (props: VideoMacro | VideoPart) => {
    const { meta } = props
    const config =
        'part' in props ? props.part?.config : 'config' in props ? props.config : undefined
    const videoProps = buildVideoProps(config, meta)

    if (!videoProps) {
        return null
    }

    return <QbrickVideo config={videoProps} meta={meta} />
}
