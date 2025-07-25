'use client'

import React, { type JSX, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import styles from './CrashCourse.module.css'

export default function CrashCourseView({
    slideDeckElements,
}: {
    slideDeckElements: JSX.Element[]
}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

    const goToNextSlide = () => {
        if (currentIndex < slideDeckElements.length - 1) {
            setDirection(1)
            setCurrentIndex(currentIndex + 1)
        }
    }

    const goToPrevSlide = () => {
        if (currentIndex > 0) {
            setDirection(-1)
            setCurrentIndex(currentIndex - 1)
        }
    }

    const variants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    }

    return (
        <div className={styles.slideContainer}>
            <AnimatePresence initial={false} custom={direction} mode="sync">
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
