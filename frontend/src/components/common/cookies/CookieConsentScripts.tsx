'use client'

import Script from 'next/script'
import { useCallback, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
    ConsentCookie,
    getCreatedAtValue,
    setCookie,
} from '~/components/common/cookies/cookieUtils'
import {
    SkyraConfig,
    skyraOrg,
    updateSkyraConsent,
} from '~/components/common/cookies/skyra/skyraRuntime'

interface Props {
    analyticsConsent: boolean
    surveysConsent: boolean
    nonce?: string
    isProduction: boolean
}

export function CookieConsentScripts({
    analyticsConsent,
    surveysConsent,
    nonce,
    isProduction,
}: Props) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const skyraConfig: SkyraConfig = {
        org: skyraOrg,
        cookieConsent: surveysConsent,
    }

    const loadUmamiScript = useCallback(
        (consent: boolean) => {
            const umamiScript = document.querySelector(
                'script[src="https://cdn.nav.no/team-researchops/sporing/sporing.js"]'
            )

            if (consent && !umamiScript) {
                const script = document.createElement('script')
                script.src = 'https://cdn.nav.no/team-researchops/sporing/sporing.js'
                script.defer = true
                script.nonce = nonce
                script.setAttribute('data-host-url', 'https://umami.nav.no')
                script.setAttribute(
                    'data-website-id',
                    isProduction
                        ? 'f882b9de-b91a-4940-8e3f-e076101eaf61'
                        : 'aa9d6480-2365-4552-8e16-5c7b5c9f777d'
                )
                script.setAttribute('data-auto-track', 'false')

                // Track initial page view once script loads
                script.onload = (e) => {
                    e.preventDefault()
                    if (window.umami) void window.umami.track()
                }

                document.head.appendChild(script)
            } else if (!consent) {
                umamiScript?.remove()
            }
        },
        [isProduction, nonce]
    )

    useEffect(() => {
        if (analyticsConsent && window.umami) {
            // (hostname, url, referrer, title, screen, language, etc.)
            void window.umami.track()
        }
    }, [pathname, searchParams, analyticsConsent])

    useEffect(() => {
        loadUmamiScript(analyticsConsent)

        const handleConsent = (e: CustomEvent) => {
            const createdAt = getCreatedAtValue()

            const { analytics, surveys } = e.detail

            const consentData: ConsentCookie = {
                consent: { analytics, surveys },
                userActionTaken: true,
                meta: {
                    createdAt: createdAt,
                    updatedAt: new Date().toISOString(),
                    version: 1,
                },
            }

            setCookie(consentData)
            updateSkyraConsent(surveys)
            loadUmamiScript(analytics)
        }

        window.addEventListener('cookie-consent-changed', handleConsent as EventListener)
        return () =>
            window.removeEventListener('cookie-consent-changed', handleConsent as EventListener)
    }, [analyticsConsent, loadUmamiScript])

    return (
        <>
            <Script id={'skyra-config'} nonce={nonce}>
                {`window.SKYRA_CONFIG = ${JSON.stringify(skyraConfig)};`}
            </Script>
            <Script
                defer
                strategy="afterInteractive"
                src="https://survey.skyra.no/skyra-survey.js"
                nonce={nonce}
            />
        </>
    )
}
