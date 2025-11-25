'use client'

import React, { type JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { BodyShort, Button, HStack, ProgressBar, VStack } from '@navikt/ds-react'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'

type Direction = 'right' | 'left'

export default function CrashCourseView({
    slideDeckElements,
}: {
    slideDeckElements: JSX.Element[]
}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState<Direction>('right')
    const slideStartRef = useRef<number>(Date.now())

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
        <BleedingBackgroundPageBlock
            as={'div'}
            className={'h-screen flex flex-col justify-between px-0 pt-8'}
            width={'2xl'}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    id={'main-content'}
                    className={'overflow-y-auto overflow-x-clip'}
                    transition={{ type: 'tween', duration: 0.5 }}>
                    {slideDeckElements[currentIndex]}
                </motion.div>
            </AnimatePresence>

            <VStack gap={'4'} className={'p-4'}>
                <HStack className={'self-center items-center'} gap={'8'}>
                    <Button
                        onClick={() => goToPrevSlide('knapp')}
                        disabled={currentIndex === 0}
                        aria-label="Forrige slide">
                        Forrige
                    </Button>
                    <BodyShort
                        id={'slide-index-label'}
                        aria-label={`Slide ${currentIndex + 1} av ${slideDeckElements.length}`}>
                        {currentIndex + 1} / {slideDeckElements.length}
                    </BodyShort>
                    <Button
                        onClick={() => goToNextSlide('knapp')}
                        disabled={currentIndex === slideDeckElements.length - 1}
                        aria-label="Neste slide">
                        Neste
                    </Button>
                </HStack>
                <ProgressBar
                    value={currentIndex}
                    valueMax={slideDeckElements.length - 1}
                    className={'w-full'}
                    aria-labelledby={'slide-index-label'}
                />
            </VStack>
        </BleedingBackgroundPageBlock>
    )
}
