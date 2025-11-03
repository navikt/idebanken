import { PropsWithChildren } from 'react'
import { draftMode, headers } from 'next/headers'
import Script from 'next/script'

import '~/styles/globals.css'
import GlobalUmamiAnalytics from '~/utils/analytics/GlobalUmamiAnalytics'

/* RootLayout is required by Next.js */
export default async function RootLayout({ children }: PropsWithChildren) {
    const { isEnabled } = await draftMode()
    const shouldLoadScripts = !isEnabled && process.env.ENV !== 'local'
    const nonce = (await headers()).get('x-nonce') ?? undefined

    return (
        <GlobalUmamiAnalytics>
            <head>
                <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon/light-favicon.svg" />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Idébanken" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                {shouldLoadScripts ? (
                    <>
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
                        <Script id={'skyra-config'} nonce={nonce}>
                            {`window.SKYRA_CONFIG = { org: 'arbeids-og-velferdsetaten-nav' }`}
                        </Script>
                        <Script
                            defer
                            strategy="afterInteractive"
                            src="https://survey.skyra.no/skyra-survey.js"
                            nonce={nonce}
                        />
                    </>
                ) : (
                    <></>
                )}
            </head>
            {children}
        </GlobalUmamiAnalytics>
    )
}
