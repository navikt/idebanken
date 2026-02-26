'use client'

import React, { type JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import {
    Box,
    Button,
    HStack,
    Link,
    Popover,
    ProgressBar,
    TextField,
    ToggleGroup,
    VStack,
} from '@navikt/ds-react'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'
import { CrashCourseStructure } from '~/components/queries/crash-course'
import NextLink from 'next/link'
import { getAsset, getUrl, MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import Image from 'next/image'
import { ArrowLeftIcon, ArrowRightIcon, WrenchIcon } from '@navikt/aksel-icons'
import { usePathname, useRouter } from 'next/navigation'
import classNames from 'classnames'
import LoadingCircles from '~/components/common/LoadingCircles'
import { ToggleGroupItem } from '@navikt/ds-react/ToggleGroup'
import FullscreenButton from '~/components/common/FullscreenButton'

type Direction = 'right' | 'left'

// Moved to state for tuning
// const scale = 1.5
// const targetWidth = 1440 / scale
// const targetHeight = 907 / scale

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
    const [currentSlideGroupIndex, setCurrentSlideGroupIndex] = useState(0)
    const [direction, setDirection] = useState<Direction>('right')
    const router = useRouter()
    const pathname = usePathname()
    const slideStartRef = useRef<number>(Date.now())
    const containerRef = useRef<HTMLDivElement>(null)
    const navRef = useRef<HTMLElement>(null)
    const [scale, setScale] = useState(1)

    // Temporary tuning state
    const [temporaryAnchorEl, setTemporaryAnchorEl] = useState<HTMLElement | null>(null)
    const [temporaryOpenState, setTemporaryOpenState] = useState(false)
    const [temporaryScaleParam, setTemporaryScaleParam] = useState(1.5)
    const [temporaryWidthParam, setTemporaryWidthParam] = useState(1440)
    const [temporaryHeightParam, setTemporaryHeightParam] = useState(907)
    const [temporaryPaddingXParam, setTemporaryPaddingXParam] = useState(48)
    const [temporaryPaddingYParam, setTemporaryPaddingYParam] = useState(48)
    const [temporaryPaddingXYParam, setTemporaryPaddingXYParam] = useState(48)

    const temporaryTargetWidth = temporaryWidthParam / temporaryScaleParam
    const temporaryTargetHeight = temporaryHeightParam / temporaryScaleParam

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return

            const container = containerRef.current
            const availableWidth = container.clientWidth
            const availableHeight = container.clientHeight

            const scaleX =
                (availableWidth -
                    (temporaryPaddingXYParam ? temporaryPaddingXYParam : temporaryPaddingXParam)) /
                temporaryTargetWidth
            const scaleY =
                (availableHeight -
                    (temporaryPaddingXYParam ? temporaryPaddingXYParam : temporaryPaddingYParam)) /
                temporaryTargetHeight

            setScale(Math.min(scaleX, scaleY))
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [
        temporaryTargetWidth,
        temporaryTargetHeight,
        temporaryPaddingXParam,
        temporaryPaddingYParam,
        temporaryPaddingXYParam,
    ])

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
            if (navRef.current?.contains(document.activeElement)) {
                return
            }

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
            structure?.parts?.find(
                (part) =>
                    part.index === currentIndex ||
                    part.pages.find((page) => page.index === currentIndex)
            )?.index ?? 0
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
            className="h-screen w-screen flex items-center justify-center overflow-hidden bg-(--ax-bg-moderate)/10">
            <VStack
                className={'justify-between'}
                style={{
                    width: temporaryTargetWidth,
                    height: temporaryTargetHeight,
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
                    <nav ref={navRef} onMouseDown={(e) => e.preventDefault()}>
                        <ToggleGroup
                            className={classNames(
                                '*:bg-(--ax-bg-moderate)',
                                '*:rounded-full',
                                '[&>div]:shadow-none',
                                '[&>div>button:first-child]:rounded-l-full',
                                '[&>div>button:last-child]:rounded-r-full',
                                '[&_.aksel-toggle-group__button:before]:h-full',
                                '[&_.aksel-toggle-group__button[data-selected="true"]]:bg-(--ax-bg-strong)'
                            )}
                            size={'small'}
                            onChange={(value) => {
                                const changedSlide = setCurrentSlide(Number(value))
                                if (!changedSlide) return
                                trackNavigation('meny', currentIndex, Number(value))
                            }}
                            value={currentSlideGroupIndex?.toString()}>
                            {structure?.parts?.map((part, i) => (
                                <ToggleGroupItem
                                    className={classNames(
                                        part.index === currentSlideGroupIndex ? 'underline' : '',
                                        i === 0 ? 'pl-(--ax-space-24)' : '',
                                        i === structure?.parts?.length - 1
                                            ? 'pr-(--ax-space-24)'
                                            : '',
                                        'rounded-none'
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
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-2500 h-1250 bg-(--ax-bg-moderate) -z-10"
                        aria-hidden
                    />
                    {meta.renderMode !== RENDER_MODE.NEXT && (
                        <>
                            <Button
                                ref={setTemporaryAnchorEl}
                                onClick={() => setTemporaryOpenState(!temporaryOpenState)}
                                aria-expanded={temporaryOpenState}
                                aria-controls={
                                    temporaryOpenState ? 'temporary-tuning-popover' : undefined
                                }
                                size="xsmall"
                                className={classNames(
                                    'rounded-full px-(--ax-space-16) absolute left-0'
                                )}
                                variant="tertiary"
                                icon={<WrenchIcon aria-hidden />}
                                aria-label="Innstillinger"
                            />
                            <Popover
                                open={temporaryOpenState}
                                onClose={() => setTemporaryOpenState(false)}
                                anchorEl={temporaryAnchorEl}
                                id="temporary-tuning-popover">
                                <Popover.Content>
                                    <VStack gap="space-8">
                                        <TextField
                                            label="Skalering"
                                            type="number"
                                            size="small"
                                            value={temporaryScaleParam}
                                            onChange={(e) =>
                                                setTemporaryScaleParam(Number(e.target.value))
                                            }
                                            step="0.01"
                                        />
                                        <TextField
                                            label="Padding X + Y"
                                            type="number"
                                            size="small"
                                            value={temporaryPaddingXYParam}
                                            onChange={(e) => {
                                                setTemporaryPaddingXYParam(Number(e.target.value))
                                                setTemporaryPaddingYParam(Number(e.target.value))
                                                setTemporaryPaddingXParam(Number(e.target.value))
                                            }}
                                            step="1"
                                        />
                                        <TextField
                                            label="Padding X"
                                            type="number"
                                            size="small"
                                            value={temporaryPaddingXParam}
                                            onChange={(e) => {
                                                setTemporaryPaddingXYParam(0)
                                                setTemporaryPaddingXParam(Number(e.target.value))
                                            }}
                                            step="1"
                                        />
                                        <TextField
                                            label="Padding Y"
                                            type="number"
                                            size="small"
                                            value={temporaryPaddingYParam}
                                            onChange={(e) => {
                                                setTemporaryPaddingXYParam(0)
                                                setTemporaryPaddingYParam(Number(e.target.value))
                                            }}
                                            step="1"
                                        />
                                        <TextField
                                            label="Original bredde"
                                            type="number"
                                            size="small"
                                            value={temporaryWidthParam}
                                            onChange={(e) =>
                                                setTemporaryWidthParam(Number(e.target.value))
                                            }
                                        />
                                        <TextField
                                            label="Original høyde"
                                            type="number"
                                            size="small"
                                            value={temporaryHeightParam}
                                            onChange={(e) =>
                                                setTemporaryHeightParam(Number(e.target.value))
                                            }
                                        />
                                    </VStack>
                                </Popover.Content>
                            </Popover>
                        </>
                    )}

                    <Button
                        className="rounded-full px-(--ax-space-16)"
                        size={'xsmall'}
                        onClick={() => goToPrevSlide('knapp')}
                        disabled={currentIndex === 0}
                        icon={<ArrowLeftIcon />}
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
                        icon={<ArrowRightIcon />}
                        iconPosition={'right'}
                        aria-label="Neste slide">
                        {currentIndex === 0 ? 'Start' : 'Neste'}
                    </Button>

                    <FullscreenButton
                        className="absolute flex self-center right-0"
                        source={'footer'}
                    />
                </HStack>
            </VStack>
        </Box>
    )
}
