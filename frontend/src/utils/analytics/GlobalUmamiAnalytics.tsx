'use client'

import { PropsWithChildren, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'

export default function GlobalUmamiAnalytics({ children }: PropsWithChildren) {
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
                void umami(AnalyticsEvents.SCROLL_PERCENT, {
                    scrollProsent: maxScroll.current,
                    url_path: pathname || '/',
                })
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
