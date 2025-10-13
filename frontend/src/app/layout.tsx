import { ReactNode } from 'react'
import { draftMode, headers } from 'next/headers'
import Script from 'next/script'
import FrontPageDecoration from '~/components/parts/FrontPageDecoration'

import '~/styles/globals.css'
import GlobalUmamiAnalytics from '~/utils/analytics/GlobalUmamiAnalytics'

type LayoutProps = {
    children: ReactNode
}

/* RootLayout is required by Next.js */
export default async function RootLayout({ children }: LayoutProps) {
    const { isEnabled } = await draftMode()
    const shouldTrackWithUmami = !isEnabled && process.env.ENV !== 'local'
    const nonce = (await headers()).get('x-nonce') ?? undefined

    return (
        <GlobalUmamiAnalytics>
            <head>
                {shouldTrackWithUmami ? (
                    <Script
                        defer
                        strategy="afterInteractive"
                        src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                        data-host-url="https://umami.nav.no"
                        data-website-id={
                            process.env.ENV === 'production'
                                ? 'f882b9de-b91a-4940-8e3f-e076101eaf61'
                                : 'aa9d6480-2365-4552-8e16-5c7b5c9f777d'
                        }
                        nonce={nonce}
                    />
                ) : (
                    <></>
                )}
            </head>
            <div className="relative">{children}</div>
            <FrontPageDecoration />
        </GlobalUmamiAnalytics>
    )
}
