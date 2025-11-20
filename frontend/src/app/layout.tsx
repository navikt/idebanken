import '~/styles/globals.css'

import { PropsWithChildren } from 'react'
import { cookies, draftMode, headers } from 'next/headers'
import GlobalUmamiAnalytics from '~/utils/analytics/GlobalUmamiAnalytics'
import { CookieBannerProvider } from '~/components/common/cookies/CookieBannerContext'
import { getConsentValues, getUserActionTakenValue } from '~/components/common/cookies/cookieUtils'
import { CookieConsentScripts } from '~/components/common/cookies/CookieConsentScripts'

export default async function RootLayout({ children }: PropsWithChildren) {
    const { isEnabled } = await draftMode()
    const nonce = (await headers()).get('x-nonce') ?? undefined

    const isDraftOrLocalhost = isEnabled // || process.env.ENV === 'local'

    const cookiesString = (await cookies()).toString()
    const cookieUserActionTaken = getUserActionTakenValue(cookiesString)
    const { analyticsConsent, surveysConsent } = getConsentValues(cookiesString)

    return (
        <GlobalUmamiAnalytics>
            <CookieBannerProvider initialState={!cookieUserActionTaken && !isEnabled}>
                <head>
                    <link
                        rel="icon"
                        type="image/png"
                        href="/favicon/favicon-96x96.png"
                        sizes="96x96"
                    />
                    <link rel="icon" type="image/svg+xml" href="/favicon/light-favicon.svg" />
                    <link rel="shortcut icon" href="/favicon/favicon.ico" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/favicon/apple-touch-icon.png"
                    />
                    <meta name="apple-mobile-web-app-title" content="Idébanken" />
                    <link rel="manifest" href="/favicon/site.webmanifest" />
                    {!isDraftOrLocalhost && (
                        <CookieConsentScripts
                            analyticsConsent={analyticsConsent}
                            surveysConsent={surveysConsent}
                            nonce={nonce}
                            isProduction={process.env.ENV === 'production'}
                        />
                    )}
                </head>
                {children}
            </CookieBannerProvider>
        </GlobalUmamiAnalytics>
    )
}
