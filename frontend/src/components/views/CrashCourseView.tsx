'use client'

import React, { type JSX, useEffect, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import styles from './CrashCourse.module.css'

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
        console.log(`Key pressed: ${event.key}, Ctrl: ${event.ctrlKey}, Meta: ${event.metaKey}`)
        if (event.ctrlKey) modifiers.push('Ctrl')
        if (event.metaKey) modifiers.push('Cmd')
        const key = [...modifiers, event.key].join('+').toLowerCase()

        if (shortcuts[key]) {
            event.preventDefault()
            shortcuts[key]()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    const shortcuts: Record<string, () => void> = {
        arrowright: () => goToNextSlide(),
        arrowleft: () => goToPrevSlide(),
    }
    const goToNextSlide = () => {
        if (currentIndex < slideDeckElements.length - 1) {
            setDirection('right')
            setCurrentIndex(currentIndex + 1)
        }
    }

    const goToPrevSlide = () => {
        if (currentIndex > 0) {
            setDirection('left')
            setCurrentIndex(currentIndex - 1)
        }
    }

    const variants: Variants = {
        enter: (direction: Direction) => ({
            x: direction === 'right' ? '100%' : '-100%',
            opacity: 1,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: Direction) => ({
            x: direction === 'left' ? '100%' : '-100%',
            opacity: 1,
        }),
    }

    return (
        <div className={styles.slideContainer}>
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
        </div>
    )
}
