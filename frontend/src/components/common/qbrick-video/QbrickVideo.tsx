'use client'

import style from './QbrickVideo.module.css'

import Image from 'next/image'
import React, { useEffect, useId } from 'react'
import { Box, Button, Detail, InlineMessage, Label, Loader } from '@navikt/ds-react'
import Script from 'next/script'
import classNames from 'classnames'
import { useQbrickPlayerState } from '~/components/common/qbrick-video/useQbrickPlayerState'
import { getTimestampFromDuration } from '~/components/common/qbrick-video/videoHelpers'
import { MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { QbrickVideoProps } from '~/components/common/qbrick-video/videoProps'

export const QbrickVideo = ({ config, meta }: { config: QbrickVideoProps; meta: MetaData }) => {
    const { title, duration, poster, displayType } = config ?? {}

    const videoContainerId = useId()
    const { createAndStartPlayer, resetPlayer, playerState, setPlayerState } = useQbrickPlayerState(
        {
            videoProps: config,
            videoContainerId,
            innholdstype: meta.type,
        }
    )

    useEffect(() => {
        return resetPlayer
    }, [resetPlayer])

    const durationAsString = getTimestampFromDuration(duration)

    return (
        <Box className={'mb-(--ax-space-32)'}>
            <Script
                src={'https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js'}
                async={true}
                onError={(error) => {
                    console.error(`Failed to load QBrick player script - ${error}`)
                    setPlayerState('error')
                }}
            />
            {displayType === 'large' ? (
                <Button
                    aria-label={`Se video: ${title}${duration > 0 ? `. Varighet er ${durationAsString} min` : ''}`}
                    className={classNames(
                        'aspect-video relative w-full h-full group',
                        playerState === 'ready' && style.hidden
                    )}
                    onClick={() => {
                        if (meta.renderMode === RENDER_MODE.NEXT) {
                            createAndStartPlayer()
                        }
                    }}>
                    {poster && (
                        <Image
                            unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                            className={style.previewImage}
                            src={poster}
                            alt=""
                            fill
                        />
                    )}
                    <div
                        className={classNames(
                            style.playBadge,
                            'group-hover:bg-(--ib-bg-dark-blue-strong-hover)!'
                        )}>
                        {playerState === 'loading' ? (
                            <Loader className={style.playLoader} />
                        ) : (
                            <svg
                                className={style.playArrow}
                                focusable="false"
                                aria-hidden="true"
                                role="img"
                                viewBox={'0 0 22 26'}>
                                <path fill={'var(--ib-brand-white)'} d={'M22 13 0 26V0Z'} />
                            </svg>
                        )}
                    </div>
                </Button>
            ) : (
                <Button
                    className={classNames(style.button, playerState === 'ready' && style.hidden)}
                    variant={'tertiary'}
                    onClick={() => {
                        if (meta.renderMode === RENDER_MODE.NEXT) {
                            createAndStartPlayer()
                        }
                    }}
                    icon={
                        <div className={style.posterWrapper}>
                            {poster && (
                                <Image
                                    unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                                    className={style.previewImage}
                                    src={poster}
                                    alt=""
                                    width={124}
                                    height={74}
                                />
                            )}
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
                                        <path fill={'var(--ib-brand-white)'} d={'M22 13 0 26V0Z'} />
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
            )}
            {playerState === 'error' && (
                <InlineMessage status={'error'}>
                    Det oppsto en feil under lasting av video
                </InlineMessage>
            )}

            <div
                className={classNames(
                    style.macroVideo,
                    playerState !== 'ready' && style.hidden,
                    '[&_*]:rounded-[var(--ax-border-radius-medium)]!'
                )}
                id={videoContainerId}
                title={title}
                data-qplayer-analytics="off"
            />
        </Box>
    )
}
