'use client'

import { usePathname } from 'next/navigation'
import { BubblesBackgroundSvgStyle } from '~/utils/BubblesBackgroundSvgStyle'

export default function FrontPageDecoration() {
    const pathname = usePathname()
    const frontPaths = ['/']

    if (!frontPaths.includes(pathname)) return null

    return (
        <div
            inert={true}
            className={'absolute left-0 top-0 w-full h-full pointer-events-none'}
            style={BubblesBackgroundSvgStyle([
                { radius: 80, down: 0, left: 40, fill: 'hsl(14 100% 51% / 0.8)' },
                { radius: 80, down: 100, left: 120, fill: 'hsl(335 100% 51% / 0.3)' },
            ])}
        />
    )
}
