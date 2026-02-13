'use client'

import style from './QbrickVideo.module.css'

import Image from 'next/image'
import React, { useEffect, useId, useState } from 'react'
import { Box, Button, Detail, InlineMessage, Label, Loader } from '@navikt/ds-react'
import Script from 'next/script'
import classNames from 'classnames'
import { useQbrickPlayerState } from '~/components/common/qbrick-video/useQbrickPlayerState'
import { getTimestampFromDuration } from '~/components/common/qbrick-video/videoHelpers'
import { MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { QbrickVideoProps } from '~/components/common/qbrick-video/videoProps'
import { CookieConsentChangeEvent, getConsentValues } from '~/components/common/cookies/cookieUtils'

export const QbrickVideo = ({ config, meta }: { config: QbrickVideoProps; meta: MetaData }) => {
    const { title, duration, poster, displayType } = config ?? {}

    const [videoAnalytics, setVideoAnalytics] = useState(false)

    const videoContainerId = useId()
    const { createAndStartPlayer, resetPlayer, playerState, setPlayerState } = useQbrickPlayerState(
        {
            videoProps: config,
            videoContainerId,
            innholdstype: meta.type,
        }
    )

    useEffect(() => {
        // Event listener for changes in cookie consent while the component is mounted
        const { videoAnalyticsConsent } = getConsentValues()
        setVideoAnalytics(videoAnalyticsConsent)

        const handleConsentChange = (e: Event) => {
            const customEvent = e as CookieConsentChangeEvent
            if (customEvent.detail.videoAnalytics !== undefined) {
                setVideoAnalytics(customEvent.detail.videoAnalytics)
            }
        }

        window.addEventListener('cookie-consent-changed', handleConsentChange)

        return () => {
            window.removeEventListener('cookie-consent-changed', handleConsentChange)
        }
    }, [])

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
                            createAndStartPlayer(videoAnalytics)
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
                            'group-hover:bg-(--ax-bg-strong-hover)!'
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
                    className={classNames(
                        style.button,
                        'group',
                        playerState === 'ready' && style.hidden
                    )}
                    variant={'tertiary'}
                    onClick={() => {
                        if (meta.renderMode === RENDER_MODE.NEXT) {
                            createAndStartPlayer(videoAnalytics)
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
                            <div
                                className={classNames(
                                    style.playBadge,
                                    'group-hover:bg-(--ax-bg-strong-hover)!'
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
                    '**:rounded-(--ax-border-radius-medium)!'
                )}
                id={videoContainerId}
                title={title}
                data-qplayer-analytics={videoAnalytics ? 'on' : 'off'}
                onClickCapture={handleVideoFullscreenWhileAlreadyInFullscreen(
                    meta,
                    videoContainerId
                )}
            />
        </Box>
    )
}

function handleVideoFullscreenWhileAlreadyInFullscreen(meta: MetaData, videoContainerId: string) {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement

        if (!meta.type.startsWith('idebanken:crash-course') || !document.fullscreenElement) {
            return
        } else if (
            document.fullscreenElement &&
            document.fullscreenElement.id === videoContainerId
        ) {
            const fullscreenOrExitButton = target.closest(
                'div[data-internal-gobrain-translation-key]'
            )
            if (
                fullscreenOrExitButton?.getAttribute('data-internal-gobrain-translation-key') ===
                'fullscreenExit'
            ) {
                const fullscreenExitButton = fullscreenOrExitButton
                const fullscreenButton = document.fullscreenElement.querySelector(
                    `div[data-internal-gobrain-translation-key="fullscreen"]`
                )
                fullscreenExitButton?.setAttribute('style', 'display: none;')
                fullscreenButton?.setAttribute('style', 'display: flex;')
            }
            return
        }

        // Currently in fullscreen crash course and video is not fullscreen - check if the click was on the fullscreen button

        const button = target.closest('div')
        const label = button?.getAttribute('aria-label')?.toLowerCase()
        const translationKey = button
            ?.getAttribute('data-internal-gobrain-translation-key')
            ?.toLowerCase()

        if (
            button &&
            (label?.includes('fullskjerm') ||
                label?.includes('fullscreen') ||
                translationKey?.includes('fullskjerm') ||
                translationKey?.includes('fullscreen'))
        ) {
            // Click was on the fullscreen button - attempt to enter fullscreen on the video container
            e.stopPropagation()
            e.preventDefault()

            const container = e.currentTarget
            const video = container.closest(`#${videoContainerId}`)
            const fullscreenExitButton = container.querySelector(
                `div[data-internal-gobrain-translation-key="fullscreenExit"]`
            )
            const fullscreenButton = container.querySelector(
                `div[data-internal-gobrain-translation-key="fullscreen"]`
            )
            if (video) {
                void video
                    .requestFullscreen()
                    .then(() => {
                        fullscreenExitButton?.setAttribute('style', 'display: flex;')
                        fullscreenButton?.setAttribute('style', 'display: none;')
                    })
                    .catch(() => {
                        void container.requestFullscreen()
                    })
            } else {
                void container.requestFullscreen().then(() => {
                    fullscreenExitButton?.setAttribute('style', 'display: flex;')
                    fullscreenButton?.setAttribute('style', 'display: none;')
                })
            }
        }
    }
}
