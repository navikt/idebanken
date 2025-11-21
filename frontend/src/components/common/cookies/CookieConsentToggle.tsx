'use client'

import { Switch, VStack } from '@navikt/ds-react'
import {
    dispatchCookieConsentEvent,
    getConsentValues,
} from '~/components/common/cookies/cookieUtils'
import { useEffect, useState } from 'react'

export function CookieConsentToggle() {
    const [analyticsChecked, setAnalyticsChecked] = useState(false)
    const [surveysChecked, setSurveysChecked] = useState(false)

    useEffect(() => {
        const { analyticsConsent, surveysConsent } = getConsentValues()
        setAnalyticsChecked(analyticsConsent)
        setSurveysChecked(surveysConsent)

        const handleConsentChange = (e: Event) => {
            const customEvent = e as CustomEvent<{ analytics: boolean; surveys: boolean }>
            setAnalyticsChecked(customEvent.detail.analytics)
            setSurveysChecked(customEvent.detail.surveys)
        }

        window.addEventListener('cookie-consent-changed', handleConsentChange)

        return () => {
            window.removeEventListener('cookie-consent-changed', handleConsentChange)
        }
    }, [])

    return (
        <VStack>
            <Switch
                checked={analyticsChecked}
                onChange={(e) => {
                    const analytics = e.target.checked
                    dispatchCookieConsentEvent({ analytics })
                    setAnalyticsChecked(analytics)
                }}
                description="Samler anonymisert statistikk om hvordan idébanken brukes. Hjelper oss å forstå hvilke sider som besøkes og forbedre tjenesten. Dataene deles ikke med reklamenettverk.">
                Analyse og statistikk (Umami)
            </Switch>
            <Switch
                checked={surveysChecked}
                onChange={(e) => {
                    const surveys = e.target.checked
                    dispatchCookieConsentEvent({ surveys })
                    setSurveysChecked(surveys)
                }}
                description="Hvis du samtykker kan vi vise popup-undersøkelser og lagre et par funksjonelle informasjonskapsler som husker om du har svart/lukket. Uten samtykke kan vi fortsatt vise enkelte undersøkelser uten cookies (inline/“Fant du det du lette etter?”).">
                Brukerundersøkelser (Skyra)
            </Switch>
        </VStack>
    )
}
