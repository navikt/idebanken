import React, { useEffect, useId } from 'react'
import { Alert, Button, Detail, Label, Loader } from '@navikt/ds-react'
import Script from 'next/script'
import classNames from 'classnames'
import Image from 'next/image'
import { QbrickVideoProps } from '~/components/common/qbrick-video/videoProps'
import { useQbrickPlayerState } from '~/components/common/qbrick-video/useQbrickPlayerState'
import { getTimestampFromDuration } from '~/components/common/qbrick-video/videoHelpers'
import { PartData } from '~/types/graphql-types'
import style from './QbrickVideo.module.scss'
import { getUrl } from '@enonic/nextjs-adapter'

export const QbrickVideo = ({ part, meta }: PartData<QbrickVideoProps>) => {
    const editorView = meta.renderMode !== 'next' ? 'edit' : undefined
    const { language, title, duration, poster } = part.config ?? {}
    const videoContainerId = useId()
    const { createAndStartPlayer, resetPlayer, playerState, setPlayerState } = useQbrickPlayerState(
        {
            videoProps: part.config,
            videoContainerId,
            context: 'TODO',
            innholdstype: 'artikkel', //innholdsTypeMap[contentProps.type],
        }
    )

    useEffect(() => {
        return resetPlayer
    }, [resetPlayer])

    const durationAsString = getTimestampFromDuration(duration)
    const imageUrl = poster?.startsWith('http') ? getUrl(poster, meta) : undefined

    return (
        <div className={style.wrapper}>
            <Script
                src={'https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js'}
                async={true}
                onError={(error) => {
                    console.error(`Failed to load QBrick player script - ${error}`)
                    setPlayerState('error')
                }}
            />
            <Button
                className={classNames(style.button, playerState === 'ready' && style.hidden)}
                variant={'tertiary'}
                onClick={() => {
                    if (editorView !== 'edit') {
                        createAndStartPlayer()
                    }
                }}
                icon={
                    <div className={style.posterWrapper}>
                        {imageUrl && <Image className={style.previewImage} src={imageUrl} alt="" />}
                        <div className={style.playBadge}>
                            {playerState === 'loading' ? (
                                <Loader className={style.playLoader} />
                            ) : (
                                <svg
                                    className={style.playArrow}
                                    focusable="false"
                                    aria-hidden="true"
                                    role="img"
                                    viewBox={'0 0 22 26'}>
                                    <path fill={'#fff'} d={'M22 13 0 26V0Z'} />
                                </svg>
                            )}
                        </div>
                    </div>
                }>
                <Label as={'p'} className={style.text}>
                    {`Se video: ${title}`}
                </Label>
                {duration > 0 && (
                    <Detail className={classNames(style.text, style.videoLength)}>
                        {`Varighet er ${durationAsString} min`}
                    </Detail>
                )}
            </Button>
            {playerState === 'error' && (
                <Alert variant={'error'}>Det oppsto en feil under lasting av video</Alert>
            )}
            <div
                className={classNames(style.macroVideo, playerState !== 'ready' && style.hidden)}
                id={videoContainerId}
                title={title}
                data-qplayer-analytics="off"
            />
        </div>
    )
}
