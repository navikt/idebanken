'use client'

import style from './QbrickVideo.module.css'
import React, { useEffect, useState } from 'react'
import { BodyShort, Box, Button, HStack, VStack } from '@navikt/ds-react'
import Script from 'next/script'
import classNames from 'classnames'
import { buildQbrickVideoProps } from '~/components/common/qbrick-video/videoProps'
import { CookieConsentChangeEvent, getConsentValues } from '~/components/common/cookies/cookieUtils'
import { PartData } from '~/types/graphql-types'
import { Idebanken_Video, Part_Idebanken_Video_Reel } from '~/types/generated'
import { VideoData } from '~/components/contentType/VideoPreview'
import { MissingComponent } from '@enonic/nextjs-adapter/views/BaseComponent'
import { forceArray } from '~/utils/utils'
import Image from 'next/image'
import { formatImageUrl } from '~/utils/image'
import { getTimestampFromDuration } from '~/components/common/qbrick-video/videoHelpers'
import { CaretRightIcon } from '@navikt/aksel-icons'
import { HeadingView } from '~/components/parts/Heading'
import { VideoReelModal } from '~/components/common/qbrick-video/VideoReelModal'

export const QbrickVideoReel = ({ part, meta }: PartData<Part_Idebanken_Video_Reel>) => {
    const [videoAnalytics, setVideoAnalytics] = useState(false)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const { videoAnalyticsConsent } = getConsentValues()
        setVideoAnalytics(videoAnalyticsConsent)

        const handleConsentChange = (e: Event) => {
            const customEvent = e as CookieConsentChangeEvent
            if (customEvent.detail.videoAnalytics !== undefined) {
                setVideoAnalytics(customEvent.detail.videoAnalytics)
            }
        }

        window.addEventListener('cookie-consent-changed', handleConsentChange)
        return () => window.removeEventListener('cookie-consent-changed', handleConsentChange)
    }, [])

    const videosConfig = forceArray(part.config?.videos)
    if (!videosConfig?.length) {
        return <MissingComponent type={'video-reel'} descriptor={'idebanken:video-reel'} />
    }

    // Build plain config objects — no hooks here
    const videos = videosConfig
        .map((video) => {
            const { targetContent, language } = video ?? {}
            if (!targetContent) return null
            return buildQbrickVideoProps(
                (targetContent as Idebanken_Video).data as unknown as VideoData,
                meta,
                language
            )
        })
        .filter((video) => video !== null)

    return (
        <>
            <Script
                src={'https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js'}
                async={true}
                onError={(error) => {
                    console.error(`Failed to load QBrick player script - ${error}`)
                }}
            />
            <HStack
                gap={'space-32'}
                className={'flex justify-center *:dark:text-(--ax-text-default)'}>
                {videos.map((config, i) => {
                    const { title, duration, poster } = config
                    const minutes = Math.floor(duration / 60).toString()
                    const seconds = Math.round(duration % 60).toString()
                    return (
                        <Button
                            key={title + i}
                            aria-label={`Se video: ${title}${duration > 0 ? `. Varighet er ${getTimestampFromDuration(duration)} min` : ''}`}
                            className={classNames('aspect-9/16 relative h-[450px] group')}
                            onClick={() => {
                                setCurrentVideoIndex(i)
                                setModalOpen(true)
                            }}>
                            <Image
                                unoptimized={true}
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
            <VideoReelModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                }}
                videos={videos}
                currentIndex={currentVideoIndex}
                setCurrentIndex={setCurrentVideoIndex}
                videoAnalytics={videoAnalytics}
                innholdstype={meta.type}
                meta={meta}
            />
        </>
    )
}
