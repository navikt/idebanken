'use client'

import React, { type JSX, useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { BodyShort, Button, HStack, ProgressBar, VStack } from '@navikt/ds-react'

type Direction = 'right' | 'left'

export default function CrashCourseView({
    slideDeckElements,
}: {
    slideDeckElements: JSX.Element[]
}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState<Direction>('right')

    const setCurrentSlide = useCallback(
        (index: number) => {
            if (index >= 0 && index < slideDeckElements.length) {
                setDirection(index > currentIndex ? 'right' : 'left')
                setCurrentIndex(index)
                window.location.hash = `#${index}` // Update URL hash
            }
        },
        [slideDeckElements, currentIndex, setDirection, setCurrentIndex]
    )

    const goToNextSlide = useCallback(() => {
        setCurrentSlide(currentIndex + 1)
    }, [currentIndex, setCurrentSlide])

    const goToPrevSlide = useCallback(() => {
        setCurrentSlide(currentIndex - 1)
    }, [currentIndex, setCurrentSlide])

    const shortcuts: Record<string, () => void> = useMemo(
        () => ({
            arrowright: () => goToNextSlide(),
            arrowleft: () => goToPrevSlide(),
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
        if (index && index !== currentIndex && !isNaN(index) && index < slideDeckElements.length) {
            setCurrentSlide(index)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentIndex, handleKeyDown, setCurrentSlide, slideDeckElements])

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
                        onClick={goToPrevSlide}
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
                        onClick={goToNextSlide}
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
