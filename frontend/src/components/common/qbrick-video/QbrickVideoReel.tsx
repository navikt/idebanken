'use client'

import style from './QbrickVideo.module.css'
import React, { useEffect, useId, useState } from 'react'
import { Box, Button, HStack, InlineMessage, Loader, VStack } from '@navikt/ds-react'
import Script from 'next/script'
import classNames from 'classnames'
import { useQbrickPlayerState } from '~/components/common/qbrick-video/useQbrickPlayerState'
import { buildQbrickVideoProps } from '~/components/common/qbrick-video/videoProps'
import { CookieConsentChangeEvent, getConsentValues } from '~/components/common/cookies/cookieUtils'
import { PartData } from '~/types/graphql-types'
import { Idebanken_Video, Part_Idebanken_Video_Reel } from '~/types/generated'
import { VideoData } from '~/components/contentType/VideoPreview'
import { MissingComponent } from '@enonic/nextjs-adapter/views/BaseComponent'
import { forceArray } from '~/utils/utils'
import { RENDER_MODE } from '@enonic/nextjs-adapter'
import Image from 'next/image'
import { formatImageUrl } from '~/utils/image'
import { getTimestampFromDuration } from '~/components/common/qbrick-video/videoHelpers'
import { Modal, ModalBody, ModalFooter } from '@navikt/ds-react/Modal'
import { ButtonView } from '~/components/parts/Button'

export const QbrickVideoReel = ({ part, meta }: PartData<Part_Idebanken_Video_Reel>) => {
    const [videoAnalytics, setVideoAnalytics] = useState(false)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)

    const videosConfig = forceArray(part.config?.videos)
    if (!videosConfig?.length) {
        return <MissingComponent type={'video-reel'} descriptor={'idebanken:video-reel'} />
    }

    const videos = videosConfig
        .map((video) => {
            const { targetContent, language } = video ?? {}
            if (!targetContent) return null
            const videoContainerId = useId()
            const config = buildQbrickVideoProps(
                (targetContent as Idebanken_Video).data as unknown as VideoData,
                meta,
                language
            )

            return {
                ...config,
                videoContainerId,
                ...useQbrickPlayerState({
                    videoProps: config,
                    videoContainerId,
                    innholdstype: meta.type,
                }),
            }
        })
        .filter((video) => video !== null)

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
        videos.forEach(({ resetPlayer }) => resetPlayer())
    }, [videos])

    return (
        <>
            <HStack gap={'space-32'} className={'flex justify-center'}>
                <Script
                    src={'https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js'}
                    async={true}
                    onError={(error) => {
                        console.error(`Failed to load QBrick player script - ${error}`)
                        videos[currentVideoIndex].setPlayerState('error')
                    }}
                />
                {videos.map(({ title, duration, playerState, createAndStartPlayer, poster }, i) => (
                    <Button
                        key={title + i}
                        aria-label={`Se video: ${title}${duration > 0 ? `. Varighet er ${getTimestampFromDuration(duration)} min` : ''}`}
                        className={classNames(
                            'aspect-9/16 relative h-[450px] group',
                            playerState === 'ready' && style.hidden
                        )}
                        onClick={() => {
                            setCurrentVideoIndex(i)
                            setModalOpen(true)
                            if (meta.renderMode === RENDER_MODE.NEXT) {
                                createAndStartPlayer(videoAnalytics)
                            }
                        }}>
                        {poster && (
                            <Image
                                unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                                className={style.previewImage}
                                src={formatImageUrl(meta, poster, 1280, 720)}
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
                ))}
            </HStack>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                className={classNames('aspect-9-16', '', 'w-[90vw] lg:w-[500px]')}
                header={{
                    heading: '',
                    size: 'small',
                }}>
                <ModalBody className={''}>
                    <VStack gap={'space-8'} className={''}>
                        {videos.map(({ videoContainerId, playerState, title, poster }, i) => (
                            <Box className={classNames(i !== currentVideoIndex && 'hidden', '')}>
                                {process.env.NEXT_PUBLIC_ENV !== 'local' ? (
                                    <>
                                        {playerState === 'error' && (
                                            <InlineMessage status={'error'}>
                                                Det oppsto en feil under lasting av video
                                            </InlineMessage>
                                        )}
                                        <Box
                                            className={classNames(
                                                style.macroVideo,
                                                playerState !== 'ready' && style.hidden,
                                                '**:rounded-(--border-radius-medium)!',
                                                'aspect-9/16!'
                                            )}
                                            id={videoContainerId}
                                            title={title}
                                            data-qplayer-analytics={videoAnalytics ? 'on' : 'off'}
                                        />
                                    </>
                                ) : (
                                    <img
                                        className={'object-cover aspect-9/16'}
                                        src={formatImageUrl(meta, poster, 1280, 720)}
                                        alt=""
                                    />
                                )}
                            </Box>
                        ))}
                    </VStack>
                </ModalBody>
                {videos.length > 1 && (
                    <ModalFooter>
                        <HStack className={'flex justify-between flex-nowrap w-full'}>
                            <ButtonView
                                meta={meta}
                                disabled={currentVideoIndex === 0}
                                config={{ variant: 'tertiary', size: 'medium' }}>
                                Forrige
                            </ButtonView>
                            <ButtonView
                                meta={meta}
                                disabled={currentVideoIndex === videos.length - 1}
                                config={{ variant: 'tertiary', size: 'medium' }}>
                                Neste
                            </ButtonView>
                        </HStack>
                    </ModalFooter>
                )}
            </Modal>
        </>
    )
}
