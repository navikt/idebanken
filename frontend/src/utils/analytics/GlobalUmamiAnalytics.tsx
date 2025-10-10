'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { umami } from '~/utils/analytics/umami'

export default function GlobalUmamiAnalytics({ children }: { children: React.ReactNode }) {
    const maxScroll = useRef(0)
    const pathname = usePathname()

    useEffect(() => {
        maxScroll.current = 0

        const updateMaxScroll = () => {
            const scrollY = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const percent = docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0
            if (percent > maxScroll.current) {
                maxScroll.current = percent
            }
        }

        const handleUnload = () => {
            if (maxScroll.current > 0) {
                umami('scroll prosent', { scrollProsent: maxScroll.current })
            }
        }

        window.addEventListener('scroll', updateMaxScroll)
        window.addEventListener('beforeunload', handleUnload)

        return () => {
            window.removeEventListener('scroll', updateMaxScroll)
            window.removeEventListener('beforeunload', handleUnload)
            handleUnload()
        }
    }, [pathname])

    return <>{children}</>
}
