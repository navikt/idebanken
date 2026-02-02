'use client'

import React, { type JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Box, Button, HStack, Link, ProgressBar, ToggleGroup, VStack } from '@navikt/ds-react'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'
import { CrashCourseStructure } from '~/components/queries/crash-course'
import NextLink from 'next/link'
import { getAsset, getUrl, MetaData } from '@enonic/nextjs-adapter'
import Image from 'next/image'
import { ExpandIcon, ShrinkIcon } from '@navikt/aksel-icons'
import { usePathname, useRouter } from 'next/navigation'
import classNames from 'classnames'
import LoadingCircles from '~/components/common/LoadingCircles'
import { ToggleGroupItem } from '@navikt/ds-react/ToggleGroup'

type Direction = 'right' | 'left'

const scale = 1.5
const targetWidth = 1440 / scale
const targetHeight = 907 / scale

export default function CrashCourseView({
    slideDeckElements,
    structure,
    meta,
}: {
    slideDeckElements: JSX.Element[]
    structure?: CrashCourseStructure
    meta: MetaData
}) {
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentSlideGroupIndex, setCurrentSlideGroupIndex] = useState('0')
    const [direction, setDirection] = useState<Direction>('right')
    const router = useRouter()
    const pathname = usePathname()
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
                router.push(`${pathname}#${index}`)
                return true
            }
            return false
        },
        [slideDeckElements, currentIndex, setDirection, setCurrentIndex, router, pathname]
    )

    const trackNavigation = useCallback(
        (
            navigation: 'knapp' | 'tastatur' | 'nettleser' | 'meny',
            fromIndex: number,
            toIndex: number
        ) => {
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

    const handleHashChange = useCallback(
        (callback: (indexFromHash: number) => void) => {
            const indexFromHash = Number(window.location.hash?.replace('#', ''))
            if (
                !isNaN(indexFromHash) &&
                indexFromHash >= 0 &&
                indexFromHash < slideDeckElements.length &&
                indexFromHash !== currentIndex
            ) {
                callback(indexFromHash)
            }
        },
        [currentIndex, slideDeckElements.length]
    )

    useEffect(() => {
        const hashChangeListener = () =>
            handleHashChange((indexFromHash) => {
                // Track time spent on current slide before navigating via browser buttons
                trackNavigation('nettleser', currentIndex, indexFromHash)
                setDirection(indexFromHash > currentIndex ? 'right' : 'left')
                setCurrentIndex(indexFromHash)
            })

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('hashchange', hashChangeListener)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('hashchange', hashChangeListener)
        }
    }, [currentIndex, handleHashChange, handleKeyDown, trackNavigation])

    // Initial sync
    useEffect(() => {
        handleHashChange((indexFromHash) => setCurrentIndex(indexFromHash))
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Reset/start timer and update current selected slide group
    useEffect(() => {
        slideStartRef.current = Date.now()
        setCurrentSlideGroupIndex(
            structure?.parts
                ?.find(
                    (part) =>
                        part.index === currentIndex ||
                        part.pages.find((page) => page.index === currentIndex)
                )
                ?.index?.toString() ?? '0'
        )
    }, [currentIndex, structure?.parts])

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
                <HStack
                    className={classNames(
                        'justify-between shrink-0 pb-(--ax-space-48) items-center',
                        loading ? 'hidden' : ''
                    )}
                    gap={'space-2'}>
                    <Link
                        as={NextLink}
                        aria-label={'Til forsiden'}
                        href={getUrl('/', meta)}
                        className={'content-center h-10 max-w-48'}>
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
                    <nav>
                        <ToggleGroup
                            className={classNames(
                                '*:bg-(--ax-bg-softA)',
                                '*:rounded-full',
                                '[&>div>button]:rounded-none',
                                '[&>div>button:first-child]:rounded-l-full',
                                '[&>div>button:last-child]:rounded-r-full'
                            )}
                            size={'small'}
                            onChange={(value) => {
                                const changedSlide = setCurrentSlide(Number(value))
                                if (!changedSlide) return
                                trackNavigation('meny', currentIndex, Number(value))
                            }}
                            value={currentSlideGroupIndex}>
                            {structure?.parts?.map((part, i) => (
                                <ToggleGroupItem
                                    className={classNames(
                                        i === 0 ? 'pl-(--ax-space-24)' : '',
                                        i === structure?.parts?.length - 1
                                            ? 'pr-(--ax-space-24)'
                                            : ''
                                    )}
                                    key={part.name}
                                    value={part.index.toString()}
                                    label={part.name}
                                />
                            ))}
                        </ToggleGroup>
                    </nav>
                </HStack>

                <Box className={'grow overflow-y-auto overflow-x-clip w-full'}>
                    {loading ? (
                        <VStack className={'h-full justify-center items-center'}>
                            <LoadingCircles ariaLabel={'Laster lynkurs'} />
                        </VStack>
                    ) : (
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
                    )}
                </Box>

                <HStack
                    as={'nav'}
                    className={classNames(
                        'items-center justify-center w-full relative shrink-0 pt-(--ax-space-24)',
                        loading ? 'hidden' : ''
                    )}
                    gap={'space-48'}>
                    {/* Background bleed element */}
                    <Box
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-2500 h-1250 bg-(--ax-bg-softA) -z-10"
                        aria-hidden
                    />
                    <Button
                        className="rounded-full px-(--ax-space-16)"
                        size={'xsmall'}
                        onClick={() => goToPrevSlide('knapp')}
                        disabled={currentIndex === 0}
                        aria-label="Forrige slide">
                        Forrige
                    </Button>
                    <ProgressBar
                        size={'small'}
                        value={currentIndex}
                        aria-label={`Slide ${currentIndex + 1} av ${slideDeckElements.length}`}
                        valueMax={slideDeckElements.length - 1}
                        className={'w-80'}
                    />
                    <Button
                        className="rounded-full px-(--ax-space-16)"
                        size={'xsmall'}
                        onClick={() => goToNextSlide('knapp')}
                        disabled={currentIndex === slideDeckElements.length - 1}
                        aria-label="Neste slide">
                        Neste
                    </Button>

                    <Button
                        className="rounded-full absolute flex self-center right-0 px-(--ax-space-24)"
                        size={'xsmall'}
                        variant="secondary"
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? 'Avslutt fullskjerm' : 'Vis i fullskjerm'}>
                        {isFullscreen ? <ShrinkIcon aria-hidden /> : <ExpandIcon aria-hidden />}
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}
