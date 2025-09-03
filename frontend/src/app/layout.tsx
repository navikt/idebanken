import { ReactNode } from 'react'
import { draftMode, headers } from 'next/headers'
import Script from 'next/script'
import FrontPageDecoration from '~/components/parts/FrontPageDecoration'

import '~/styles/globals.css'

type LayoutProps = {
    children: ReactNode
}

/* RootLayout is required by Next.js */
export default async function RootLayout({ children }: LayoutProps) {
    const { isEnabled } = await draftMode()
    const shouldTrackWithUmami = !isEnabled && process.env.MODE === 'production'
    const nonce = (await headers()).get('x-nonce') ?? undefined

    return (
        <>
            <head>
                {shouldTrackWithUmami ? (
                    <Script
                        defer
                        strategy="afterInteractive"
                        src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                        data-host-url="https://umami.nav.no"
                        data-website-id="28f7fa0e-20b0-4d8e-b401-9d732ac14b4b"
                        nonce={nonce}
                    />
                ) : (
                    <></>
                )}
            </head>
            <div className="relative">{children}</div>
            <FrontPageDecoration />
        </>
    )
}
