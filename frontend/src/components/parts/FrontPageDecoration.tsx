'use client'

import { usePathname } from 'next/navigation'

export default function FrontPageDecoration() {
    const pathname = usePathname()
    const frontPaths = ['/']

    if (!frontPaths.includes(pathname)) return null

    return (
        <div
            aria-hidden
            className="
                pointer-events-none absolute top-0 right-0 z-10
                hidden md:block
                md:h-[50vh] lg:h-[70vh]
                md:w-[800px] lg:w-[1200px]
                bg-[url('/images/two-circles.svg')] bg-no-repeat bg-right-top
                md:bg-[length:auto_50vh] lg:bg-[length:auto_70vh]
            "
        />
    )
}
