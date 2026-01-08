'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SkyraHandler() {
    const pathname = usePathname()

    useEffect(() => {
        window?.skyra?.reload?.()
    }, [pathname])

    return null
}
