'use client'

import React, { type JSX, useEffect, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import styles from './CrashCourse.module.css'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'

type Direction = 'right' | 'left'

export default function CrashCourseView({
    slideDeckElements,
}: {
    slideDeckElements: JSX.Element[]
}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState<Direction>('right')

    const handleKeyDown = (event: KeyboardEvent) => {
        const modifiers = []
        if (event.ctrlKey) modifiers.push('Ctrl')
        if (event.metaKey) modifiers.push('Cmd')
        const key = [...modifiers, event.key].join('+').toLowerCase()

        if (shortcuts[key]) {
            event.preventDefault()
            shortcuts[key]()
        }
    }

    useEffect(() => {
        const index = Number(window.location.hash?.replace('#', ''))
        if (index && index !== currentIndex && !isNaN(index) && index < slideDeckElements.length) {
            setCurrentSlide(index)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    const shortcuts: Record<string, () => void> = {
        arrowright: () => goToNextSlide(),
        arrowleft: () => goToPrevSlide(),
    }
    const setCurrentSlide = (index: number) => {
        if (index >= 0 && index < slideDeckElements.length) {
            setDirection(index > currentIndex ? 'right' : 'left')
            setCurrentIndex(index)
            window.location.hash = `#${index}` // Update URL hash
        }
    }

    const goToNextSlide = () => {
        setCurrentSlide(currentIndex + 1)
    }

    const goToPrevSlide = () => {
        setCurrentSlide(currentIndex - 1)
    }

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
        <BleedingBackgroundPageBlock as={'div'} className={styles.slideContainer}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'tween', duration: 0.5 }}>
                    {slideDeckElements[currentIndex]}
                </motion.div>
            </AnimatePresence>

            <div className={styles.controls}>
                <button onClick={goToPrevSlide} disabled={currentIndex === 0}>
                    Previous
                </button>
                <span>
                    {currentIndex + 1} / {slideDeckElements.length}
                </span>
                <button
                    onClick={goToNextSlide}
                    disabled={currentIndex === slideDeckElements.length - 1}>
                    Next
                </button>
            </div>
        </BleedingBackgroundPageBlock>
    )
}
