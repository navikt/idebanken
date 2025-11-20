'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import {
    getConsentValues,
    getCreatedAtValue,
    setCookie,
} from '~/components/common/cookies/cookieUtils'
import { SkyraConfig, skyraOrg } from '~/components/common/cookies/skyra/skyraRuntime'

interface Props {
    analyticsConsent: boolean
    surveysConsent: boolean
    nonce?: string
    isProduction: boolean
}

export function ConsentScripts({ nonce, isProduction }: Props) {
    useEffect(() => {
        const handleConsent = (e: CustomEvent) => {
            const createdAt = getCreatedAtValue()

            const { analytics, surveys } = e.detail
            const consentData = {
                consent: { analytics, surveys },
                userActionTaken: true,
                meta: {
                    createdAt: createdAt,
                    updatedAt: new Date().toISOString(),
                    version: 1,
                },
            }

            setCookie(consentData)
        }

        window.addEventListener('cookie-consent-given', handleConsent as EventListener)
        return () =>
            window.removeEventListener('cookie-consent-given', handleConsent as EventListener)
    }, [])

    if (typeof document === 'undefined') {
        return null
    }

    const cookieStr = typeof document !== 'undefined' ? document.cookie : undefined
    const { analyticsConsent, surveysConsent } = getConsentValues(cookieStr)
    const skyraConfig: SkyraConfig = {
        org: skyraOrg,
        cookieConsent: surveysConsent,
    }

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
