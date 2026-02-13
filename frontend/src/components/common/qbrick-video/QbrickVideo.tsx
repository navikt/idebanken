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

    // Keep track of whether we were in fullscreen before the video took over
    const [wasInCrashCourseFullscreen, setWasInCrashCourseFullscreen] = useState(false)

    useEffect(() => {
        const handleFullscreenChange = () => {
            // Check if we just exited fullscreen
            if (!document.fullscreenElement) {
                // If we were in "double fullscreen" (Crash course mode) and the video was the one that exited
                // We want to restore the crash course fullscreen
                if (wasInCrashCourseFullscreen) {
                    // Ideally we should verify if it was THIS video that caused the exit,
                    // but usually if wasInCrashCourseFullscreen is true, we want to go back.
                    // However, browser security (Escape key) drops all fullscreen.
                    // We try to request it back immediately for the parent container.

                    // Note: Browsers might block this re-request if not triggered by user interaction,
                    // but since the user pressed Escape (interaction), some browsers permit it,
                    // or we accept that we can't fully override the browser's Escape behavior
                    // and instead we reset our internal state.

                    // Actually, re-triggering fullscreen without a user gesture (like a click) inside a handler
                    // for Escape is often blocked. If this doesn't work, the UI will just be normal mode.

                    // But we must reset the flag so we don't get stuck in a loop or weird state.
                    setWasInCrashCourseFullscreen(false)

                    // Attempt to restore parent fullscreen if possible (often requires explicit user action)
                    const crashCourseContainer = document.getElementById('crash-course-container') // Assuming ID or finding parent
                    if (crashCourseContainer) {
                        void crashCourseContainer.requestFullscreen().catch((err) => {
                            console.warn('Could not restore parent fullscreen automatically:', err)
                        })
                    }
                }
            } else {
                // We entered fullscreen.
                // If the new fullscreen element is THIS video, and we are in the specific mode...
                // We need to know if we came FROM a crash course fullscreen context.
                // The click handler logic below sets the state before requesting video fullscreen.
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [wasInCrashCourseFullscreen])

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
                onClickCapture={(e) => {
                    const target = e.target as HTMLElement

                    console.log('Video container clicked', {
                        fullscreenElement: document.fullscreenElement,
                        videoContainerId,
                        fullscreenElementId: document.fullscreenElement?.id,
                        eventTarget: e.target,
                        currentTarget: e.currentTarget,
                        metaType: meta.type,
                    })

                    if (
                        !meta.type.startsWith('idebanken:crash-course') ||
                        !document.fullscreenElement
                    ) {
                        return
                    } else if (
                        document.fullscreenElement &&
                        document.fullscreenElement.id === videoContainerId
                    ) {
                        const closest = target.closest('div[data-internal-gobrain-translation-key]')
                        console.log('In fullscreen crash course - checking for exit button', {
                            closest,
                        })
                        if (
                            closest?.getAttribute('data-internal-gobrain-translation-key') ===
                            'fullscreenExit'
                        ) {
                            const fullscreenExitButton = closest
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
                    const buttonTitle = button
                        ?.getAttribute('data-internal-gobrain-translation-key')
                        ?.toLowerCase()
                    console.log('Checking for fullscreen button', {
                        button,
                        label,
                        buttonTitle,
                    })

                    if (
                        button &&
                        (label?.includes('fullskjerm') ||
                            label?.includes('fullscreen') ||
                            buttonTitle?.includes('fullskjerm') ||
                            buttonTitle?.includes('fullscreen'))
                    ) {
                        // Click was on the fullscreen button - attempt to enter fullscreen on the video container
                        e.stopPropagation()
                        e.preventDefault()

                        // Store that we are currently in a parent fullscreen context before switching
                        setWasInCrashCourseFullscreen(true)

                        const container = e.currentTarget
                        const video = container.closest(`#${videoContainerId}`)
                        const fullscreenExitButton = container.querySelector(
                            `div[data-internal-gobrain-translation-key="fullscreenExit"]`
                        )
                        const fullscreenButton = container.querySelector(
                            `div[data-internal-gobrain-translation-key="fullscreen"]`
                        )
                        console.log('Attempting to enter fullscreen', {
                            container,
                            video,
                            fullscreenExitButton,
                            fullscreenButton,
                        })
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
                }}
            />
        </Box>
    )
}
