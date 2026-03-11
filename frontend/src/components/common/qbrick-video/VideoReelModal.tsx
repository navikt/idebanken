'use client'

import style from './QbrickVideo.module.css'
import React, { useEffect, useId, useRef, useState } from 'react'
import { Box, Button, HStack, InlineMessage, VStack } from '@navikt/ds-react'
import classNames from 'classnames'
import { useQbrickPlayerState } from '~/components/common/qbrick-video/useQbrickPlayerState'
import { QbrickVideoProps } from '~/components/common/qbrick-video/videoProps'
import { MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@navikt/aksel-icons'
import { HeadingView } from '~/components/parts/Heading'
import { ButtonView } from '~/components/parts/Button'
import { formatImageUrl } from '~/utils/image'
import { AnimatePresence, motion, Variants } from 'framer-motion'

// ---------------------------------------------------------------------------
// VideoReelPlayerItem
// Rendered only while the modal is open, so videoContainerId is in the DOM
// when useQbrickPlayerState first runs.
// ---------------------------------------------------------------------------

type VideoReelPlayerItemProps = {
    config: QbrickVideoProps
    videoAnalytics: boolean
    active: boolean
    innholdstype: string
    renderMode: string
    meta: MetaData
    onReady?: () => void
}

const VideoReelPlayerItem = ({
    config,
    videoAnalytics,
    active,
    innholdstype,
    renderMode,
    meta,
}: VideoReelPlayerItemProps) => {
    const videoContainerId = useId()
    const { playerState, createAndStartPlayer, resetPlayer } = useQbrickPlayerState({
        videoProps: config,
        videoContainerId,
        innholdstype,
    })

    // Start/reset player when this item becomes active
    useEffect(() => {
        if (active && renderMode === RENDER_MODE.NEXT && process.env.NEXT_PUBLIC_ENV !== 'local') {
            createAndStartPlayer(videoAnalytics)
        }
        if (!active) {
            resetPlayer()
        }
    }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

    // Reset player on unmount (modal closed)
    useEffect(() => {
        return () => {
            resetPlayer()
        }
    }, [resetPlayer])

    return (
        <Box className={classNames(!active && 'hidden', 'flex justify-center')}>
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
                            '**:focus:bg-(--ax-bg-strong) **:focus:outline-2! **:focus:outline-white! **:focus:outline-offset-2!',
                            '*:aspect-9/16! h-[min(70vh,700px)]'
                        )}
                        id={videoContainerId}
                        title={config.title}
                        data-qplayer-analytics={videoAnalytics ? 'on' : 'off'}
                    />
                </>
            ) : (
                <img
                    id={videoContainerId}
                    className={'object-cover aspect-9/16 h-[min(70vh,700px)]'}
                    src={formatImageUrl(meta, config.poster, 720, 1280)}
                    alt=""
                />
            )}
        </Box>
    )
}

// ---------------------------------------------------------------------------
// VideoReelModal
// ---------------------------------------------------------------------------

export type VideoReelModalProps = {
    open: boolean
    onClose: () => void
    videos: QbrickVideoProps[]
    currentIndex: number
    setCurrentIndex: (index: number) => void
    videoAnalytics: boolean
    innholdstype: string
    meta: MetaData
}

export const VideoReelModal = ({
    open,
    onClose,
    videos,
    currentIndex,
    setCurrentIndex,
    videoAnalytics,
    innholdstype,
    meta,
}: VideoReelModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [direction, setDirection] = useState<'left' | 'right'>('right')

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (open) {
            dialog.showModal()
            document.body.style.overflow = 'hidden'
        } else {
            dialog.close()
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    // Close on native cancel (Escape key)
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        const handleCancel = (e: Event) => {
            e.preventDefault()
            onClose()
        }
        dialog.addEventListener('cancel', handleCancel)
        return () => dialog.removeEventListener('cancel', handleCancel)
    }, [onClose])

    const goTo = (index: number) => {
        if (index >= 0 && index < videos.length) {
            setDirection(index > currentIndex ? 'right' : 'left')
            setCurrentIndex(index)
        }
    }

    const variants: Variants = {
        enter: (dir: 'left' | 'right') => ({
            x: dir === 'right' ? '100%' : '-100%',
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (dir: 'left' | 'right') => ({
            x: dir === 'right' ? '-100%' : '100%',
            opacity: 0,
        }),
    }

    if (!open) return null

    return (
        <dialog
            ref={dialogRef}
            className={classNames(
                'fixed inset-0 z-50 mx-auto border-0 rounded-(--border-radius-medium)',
                'bg-(--ax-bg-strong) text-(--ax-text-contrast)',
                'w-full max-w-100 max-h-[90vh] overflow-y-auto',
                'backdrop:bg-(--ax-bg-strong)/70'
            )}
            onClick={(e) => {
                if (e.target === dialogRef.current) onClose()
            }}>
            <VStack className={'max-w-100 mx-auto px-4'}>
                {/* Header */}
                <Box
                    className={classNames(
                        'flex justify-between items-center gap-4',
                        'w-full py-(--ax-space-16)'
                    )}>
                    <HeadingView
                        level={'2'}
                        size={'xsmall'}
                        className={'text-center text-nowrap overflow-hidden text-ellipsis'}>
                        {videos[currentIndex]?.title}
                    </HeadingView>
                    <Button
                        variant={'secondary'}
                        icon={<XMarkIcon />}
                        className={
                            'bg-(--ax-bg-strong) text-(--ax-text-contrast) w-11 h-11 outline-white'
                        }
                        onClick={onClose}
                        aria-label={'Lukk'}
                    />
                </Box>

                {/* Body */}
                <Box className={'py-(--ax-space-8) overflow-x-clip'}>
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: 'tween', duration: 0.3 }}
                            className={'flex justify-center'}>
                            <VideoReelPlayerItem
                                config={videos[currentIndex]}
                                videoAnalytics={videoAnalytics}
                                active={true}
                                innholdstype={innholdstype}
                                renderMode={meta.renderMode}
                                meta={meta}
                            />
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Footer navigation */}
                {videos.length > 1 && (
                    <Box
                        className={classNames('flex justify-between w-full', 'py-(--ax-space-16)')}>
                        <HStack className={'flex justify-between w-full'} gap={'space-32'}>
                            <ButtonView
                                meta={meta}
                                className={'outline-white'}
                                icon={<ChevronLeftIcon />}
                                disabled={currentIndex === 0}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goTo(currentIndex - 1)
                                }}
                                config={{ variant: 'primary', size: 'medium' }}>
                                Forrige
                            </ButtonView>
                            <ButtonView
                                meta={meta}
                                className={'outline-white'}
                                icon={<ChevronRightIcon />}
                                iconPosition={'right'}
                                disabled={currentIndex === videos.length - 1}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goTo(currentIndex + 1)
                                }}
                                config={{ variant: 'primary', size: 'medium' }}>
                                Neste
                            </ButtonView>
                        </HStack>
                    </Box>
                )}
            </VStack>
        </dialog>
    )
}
