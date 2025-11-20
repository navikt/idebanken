'use client'

import Script from 'next/script'
import { useCallback, useEffect } from 'react'
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
    const skyraConfig: SkyraConfig = {
        org: skyraOrg,
        cookieConsent: surveysConsent,
    }

    const loadUmamiScript = useCallback(
        (consent: boolean) => {
            const umamiScript = document.querySelector(
                'script[src="https://cdn.nav.no/team-researchops/sporing/sporing.js"]'
            )

            if (consent) {
                if (umamiScript) return // Script already loaded

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
                document.head.appendChild(script)
            } else {
                umamiScript?.remove()
            }
        },
        [isProduction, nonce]
    )

    useEffect(() => {
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
    }, [loadUmamiScript])

    return (
        <>
            {analyticsConsent && (
                <Script
                    defer
                    strategy="afterInteractive"
                    src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                    data-host-url="https://umami.nav.no"
                    data-website-id={
                        isProduction
                            ? 'f882b9de-b91a-4940-8e3f-e076101eaf61'
                            : 'aa9d6480-2365-4552-8e16-5c7b5c9f777d'
                    }
                    nonce={nonce}
                />
            )}
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
