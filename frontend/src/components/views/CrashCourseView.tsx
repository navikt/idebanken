'use client'

import React, { type JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Box, Button, HStack, Link, ProgressBar, VStack } from '@navikt/ds-react'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'
import { CrashCourseStructure } from '~/components/queries/crash-course'
import NextLink from 'next/link'
import { getAsset, getUrl, MetaData } from '@enonic/nextjs-adapter'
import Image from 'next/image'
import { ExpandIcon, ShrinkIcon } from '@navikt/aksel-icons'

type Direction = 'right' | 'left'

const targetWidth = 1440 / 1.5
const targetHeight = 907 / 1.5

export default function CrashCourseView({
    slideDeckElements,
    structure,
    meta,
}: {
    slideDeckElements: JSX.Element[]
    structure?: CrashCourseStructure
    meta: MetaData
}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState<Direction>('right')
    const slideStartRef = useRef<number>(Date.now())
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return

            const container = containerRef.current
            const availableWidth = container.clientWidth
            const availableHeight = container.clientHeight

            const padding = 48 // Add some padding around the slide
            const scaleX = (availableWidth - padding) / targetWidth
            const scaleY = (availableHeight - padding) / targetHeight

            setScale(Math.min(scaleX, scaleY))
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement))
        }
        document.addEventListener('fullscreenchange', onFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
    }, [])

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            void document.documentElement.requestFullscreen().catch(() => {
                // noop if denied
            })
        } else {
            void document.exitFullscreen().catch(() => {
                // noop if failed
            })
        }
    }, [])

    const setCurrentSlide = useCallback(
        (index: number) => {
            if (index >= 0 && index < slideDeckElements.length) {
                setDirection(index > currentIndex ? 'right' : 'left')
                setCurrentIndex(index)
                window.location.hash = `#${index}` // Update URL hash
                return true
            }
            return false
        },
        [slideDeckElements, currentIndex, setDirection, setCurrentIndex]
    )

    const trackNavigation = useCallback(
        (navigation: 'knapp' | 'tastatur' | 'nettleser', fromIndex: number, toIndex: number) => {
            const secondsOnSlide = Math.max(
                0,
                Math.round((Date.now() - slideStartRef.current) / 1000)
            )
            void umami(AnalyticsEvents.CRASH_COURSE_NAVIGATION, {
                navigering: navigation,
                fraSlideNummer: fromIndex + 1,
                tilSlideNummer: toIndex + 1,
                lynkurs: decodeURIComponent(window.location.pathname.split('/').pop() ?? 'unknown'),
                sekunderPaaSlide: secondsOnSlide,
            })
        },
        []
    )

    const goToNextSlide = useCallback(
        (navigation: 'knapp' | 'tastatur' | 'nettleser') => {
            const nextIndex = currentIndex + 1
            const changedSlide = setCurrentSlide(nextIndex)
            if (!changedSlide) return
            trackNavigation(navigation, currentIndex, nextIndex)
        },
        [currentIndex, setCurrentSlide, trackNavigation]
    )

    const goToPrevSlide = useCallback(
        (navigation: 'knapp' | 'tastatur' | 'nettleser') => {
            const prevIndex = currentIndex - 1
            const changedSlide = setCurrentSlide(prevIndex)
            if (!changedSlide) return
            trackNavigation(navigation, currentIndex, prevIndex)
        },
        [currentIndex, setCurrentSlide, trackNavigation]
    )

    const shortcuts: Record<string, () => void> = useMemo(
        () => ({
            arrowright: () => goToNextSlide('tastatur'),
            arrowleft: () => goToPrevSlide('tastatur'),
        }),
        [goToNextSlide, goToPrevSlide]
    )

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const modifiers = []
            if (event.ctrlKey) modifiers.push('Ctrl')
            if (event.metaKey) modifiers.push('Cmd')
            const key = [...modifiers, event.key].join('+').toLowerCase()

            if (shortcuts[key]) {
                event.preventDefault()
                shortcuts[key]()
            }
        },
        [shortcuts]
    )

    useEffect(() => {
        const index = Number(window.location.hash?.replace('#', ''))
        if (
            !isNaN(index) &&
            index >= 0 &&
            index !== currentIndex &&
            index < slideDeckElements.length
        ) {
            setCurrentSlide(index)
        }

        const handleHashChange = () => {
            const newIndex = Number(window.location.hash?.replace('#', ''))
            if (
                newIndex !== undefined &&
                !isNaN(newIndex) &&
                newIndex >= 0 &&
                newIndex < slideDeckElements.length &&
                newIndex !== currentIndex
            ) {
                // Track time spent on current slide before navigating via browser buttons
                trackNavigation('nettleser', currentIndex, newIndex)
                setCurrentSlide(newIndex)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('hashchange', handleHashChange)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [currentIndex, handleKeyDown, setCurrentSlide, slideDeckElements, trackNavigation])

    // Reset/start timer whenever the slide changes
    useEffect(() => {
        slideStartRef.current = Date.now()
    }, [currentIndex])

    const variants: Variants = {
        enter: (direction: Direction) => ({
            x: direction === 'right' ? '100%' : '-100%',
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: Direction) => ({
            x: direction === 'left' ? '100%' : '-100%',
            opacity: 0,
        }),
    }

    return (
        <Box
            ref={containerRef}
            data-color={'ib-brand-pink'}
            className="h-screen w-screen flex items-center justify-center overflow-hidden bg-(--ax-bg-softA)">
            <VStack
                className={'justify-between'}
                style={{
                    width: targetWidth,
                    height: targetHeight,
                    scale,
                    transformOrigin: 'center center',
                    flexShrink: 0,
                }}>
                <VStack gap={'space-48'}>
                    <HStack className={'justify-between'} gap={'space-2'}>
                        <Link
                            as={NextLink}
                            aria-label={'Til forsiden'}
                            href={getUrl('/', meta)}
                            className={'content-center h-12 max-w-48'}>
                            <Image
                                className={'block dark:hidden'}
                                src={getAsset('/images/logo-light.svg', meta)}
                                alt={'title'}
                                width={200}
                                height={100}
                                priority
                            />
                            <Image
                                className={'hidden dark:block'}
                                src={getAsset('/images/logo-dark.svg', meta)}
                                alt={'title'}
                                width={200}
                                height={100}
                                priority
                            />
                        </Link>
                        <HStack gap={'space-6'}>
                            {structure?.parts?.map((part) => (
                                <Button
                                    key={part.name + part.index}
                                    variant={
                                        part.index === currentIndex ||
                                        part.pages.find((page) => page.index === currentIndex)
                                            ? 'primary'
                                            : 'tertiary'
                                    }
                                    size="small"
                                    onClick={() => {
                                        const changedSlide = setCurrentSlide(part.index)
                                        if (!changedSlide) return
                                        trackNavigation('knapp', currentIndex, part.index)
                                    }}
                                    aria-label={`Gå til slide ${part.index + 1}: ${part.name}`}>
                                    {part.name}
                                </Button>
                            ))}
                        </HStack>
                    </HStack>
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            id={'main-content'}
                            className={'flex flex-col w-full'}
                            transition={{ type: 'tween', duration: 0.5 }}>
                            {slideDeckElements[currentIndex]}
                        </motion.div>
                    </AnimatePresence>
                </VStack>

                <HStack className={'items-center justify-center w-full relative'} gap={'space-48'}>
                    <Button
                        className="rounded-full"
                        onClick={() => goToPrevSlide('knapp')}
                        disabled={currentIndex === 0}
                        aria-label="Forrige slide">
                        Forrige
                    </Button>
                    <ProgressBar
                        value={currentIndex}
                        aria-label={`Slide ${currentIndex + 1} av ${slideDeckElements.length}`}
                        valueMax={slideDeckElements.length - 1}
                        className={'w-80'}
                    />
                    <Button
                        className="rounded-full"
                        onClick={() => goToNextSlide('knapp')}
                        disabled={currentIndex === slideDeckElements.length - 1}
                        aria-label="Neste slide">
                        Neste
                    </Button>

                    <Box
                        className="absolute h-full"
                        style={{
                            right: 0,
                        }}>
                        <Button
                            variant="secondary"
                            className="rounded-full"
                            onClick={toggleFullscreen}
                            aria-label={isFullscreen ? 'Avslutt fullskjerm' : 'Vis i fullskjerm'}>
                            {isFullscreen ? <ShrinkIcon aria-hidden /> : <ExpandIcon aria-hidden />}
                        </Button>
                    </Box>
                </HStack>
            </VStack>
        </Box>
    )
}
