'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MainView from '@enonic/nextjs-adapter/views/MainView'
import styles from './CrashCourse.module.css'

export default function CrashCourseView({ slideContents }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

    const goToNextSlide = () => {
        if (currentIndex < slideContents.length - 1) {
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

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    }

    return (
        <div className={styles.slideContainer}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'tween', duration: 0.5 }}>
                    <MainView {...slideContents[currentIndex]} />
                </motion.div>
            </AnimatePresence>

            <div className={styles.controls}>
                <button onClick={goToPrevSlide} disabled={currentIndex === 0}>
                    Previous
                </button>
                <span>
                    {currentIndex + 1} / {slideContents.length}
                </span>
                <button
                    onClick={goToNextSlide}
                    disabled={currentIndex === slideContents.length - 1}>
                    Next
                </button>
            </div>
        </div>
    )
}
