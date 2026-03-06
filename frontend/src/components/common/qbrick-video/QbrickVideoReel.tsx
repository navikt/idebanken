'use client'

import style from './QbrickVideo.module.css'
import React, { useEffect, useId, useState } from 'react'
import { BodyShort, Box, Button, HStack, InlineMessage, VStack } from '@navikt/ds-react'
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
import { ButtonView } from '~/components/parts/Button'
import { CaretRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons'
import { HeadingView } from '~/components/parts/Heading'
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogPopup,
} from '@navikt/ds-react/Dialog'

export const QbrickVideoReel = ({ part, meta }: PartData<Part_Idebanken_Video_Reel>) => {
    const [videoAnalytics, setVideoAnalytics] = useState(false)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)

    const videosConfig = forceArray(part.config?.videos)
    if (!videosConfig?.length) {
        return <MissingComponent type={'video-reel'} descriptor={'idebanken:video-reel'} />
    }

    const videoIds = videosConfig.map((_) => useId())

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
                {videos.map(({ title, duration, playerState, createAndStartPlayer, poster }, i) => {
                    const minutes = Math.floor(duration / 60).toString()
                    const seconds = Math.round(duration % 60).toString()
                    return (
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
                            <Image
                                unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                                className={style.previewImage}
                                src={
                                    formatImageUrl(meta, poster, 720, 1280) ||
                                    '/images/link-card-fallback.svg'
                                }
                                alt=""
                                fill
                            />
                            <VStack
                                gap={'space-12'}
                                className={classNames(
                                    'absolute w-full h-2/5 bottom-0 left-0 rounded-b-(--border-radius-medium)',
                                    'bg-(--ax-bg-overlay)',
                                    'px-(--ax-space-32) py-(--ax-space-16)',
                                    'text-left'
                                )}>
                                <HStack gap={'space-8'} className={'flex items-center'}>
                                    <Box
                                        className={
                                            'bg-(--ax-bg-accent-strong-pressed) group-hover:bg-(--ax-bg-accent-strong) w-(--ax-space-28) h-(--ax-space-28) rounded-full flex items-center justify-center'
                                        }>
                                        <CaretRightIcon width={24} height={24} />
                                    </Box>
                                    <BodyShort className={'underline'}>
                                        <time dateTime={`PT${minutes}M${seconds}S`}>
                                            {minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}
                                        </time>
                                    </BodyShort>
                                </HStack>
                                <HeadingView
                                    level={'2'}
                                    size={'xsmall'}
                                    className={'group-hover:underline'}>
                                    {title}
                                </HeadingView>
                            </VStack>
                        </Button>
                    )
                })}
            </HStack>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogPopup
                    width={'small'}
                    position={'fullscreen'}
                    className={'bg-(--ax-bg-overlay) text-(--ax-text-contrast)'}
                    data-color={'ib-brand-gray'}
                    onClick={(e) => {
                        console.log('e.target', e.target)
                        setModalOpen(false)
                    }}>
                    <DialogHeader
                        className={classNames(
                            'flex justify-between gap-4 flex-row-reverse max-w-100 mx-auto w-full min-h-25',
                            '[&>button]:bg-(--ax-bg-strong) [&>button]:text-(--ax-text-contrast)'
                        )}>
                        <HeadingView level={'1'} size={'medium'} className={'text-center'}>
                            {videos[currentVideoIndex].title}
                        </HeadingView>
                    </DialogHeader>
                    <DialogBody className={'bg-none'}>
                        <VStack gap={'space-8'}>
                            {videos.map(({ videoContainerId, playerState, title, poster }, i) => (
                                <Box
                                    className={classNames(
                                        i !== currentVideoIndex && 'hidden',
                                        'flex justify-center'
                                    )}
                                    key={videoContainerId}>
                                    {process.env.NEXT_PUBLIC_ENV !== 'local' ? (
                                        <>
                                            {/* Video cannot be rendered on localhost */}
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
                                                    'aspect-9/16! max-h-[70vh]'
                                                )}
                                                id={videoContainerId}
                                                title={title}
                                                data-qplayer-analytics={
                                                    videoAnalytics ? 'on' : 'off'
                                                }
                                            />
                                        </>
                                    ) : (
                                        <img
                                            className={
                                                'object-cover aspect-9/16 max-h-[70vh] rounded-(--border-radius-medium)'
                                            }
                                            src={formatImageUrl(meta, poster, 720, 1280)}
                                            alt=""
                                        />
                                    )}
                                </Box>
                            ))}
                        </VStack>
                    </DialogBody>
                    {videos.length > 1 && (
                        <DialogFooter className={'max-w-100 mx-auto w-full)'}>
                            <HStack className={'flex justify-between w-full'} gap={'space-32'}>
                                <ButtonView
                                    meta={meta}
                                    icon={<ChevronLeftIcon />}
                                    disabled={currentVideoIndex === 0}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        const newIndex = currentVideoIndex - 1
                                        setCurrentVideoIndex(newIndex)
                                        if (meta.renderMode === RENDER_MODE.NEXT) {
                                            videos[newIndex].createAndStartPlayer(videoAnalytics)
                                        }
                                    }}
                                    config={{ variant: 'primary', size: 'medium' }}>
                                    Forrige
                                </ButtonView>
                                <ButtonView
                                    meta={meta}
                                    icon={<ChevronRightIcon />}
                                    iconPosition={'right'}
                                    disabled={currentVideoIndex === videos.length - 1}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        const newIndex = currentVideoIndex + 1
                                        setCurrentVideoIndex(newIndex)
                                        if (meta.renderMode === RENDER_MODE.NEXT) {
                                            videos[newIndex].createAndStartPlayer(videoAnalytics)
                                        }
                                    }}
                                    config={{ variant: 'primary', size: 'medium' }}>
                                    Neste
                                </ButtonView>
                            </HStack>
                        </DialogFooter>
                    )}
                </DialogPopup>
            </Dialog>
        </>
    )
}
