'use client'

import { Switch, VStack } from '@navikt/ds-react'
import {
    CookieConsentChangeEvent,
    dispatchCookieConsentEvent,
    getConsentValues,
} from '~/components/common/cookies/cookieUtils'
import { useEffect, useState } from 'react'

export function CookieConsentToggle() {
    const [analyticsChecked, setAnalyticsChecked] = useState(false)
    const [surveysChecked, setSurveysChecked] = useState(false)
    const [videoAnalyticsChecked, setVideoAnalyticsChecked] = useState(false)

    useEffect(() => {
        const { analyticsConsent, surveysConsent, videoAnalyticsConsent } = getConsentValues()
        setAnalyticsChecked(analyticsConsent)
        setSurveysChecked(surveysConsent)
        setVideoAnalyticsChecked(videoAnalyticsConsent)

        const handleConsentChange = (e: Event) => {
            const customEvent = e as CookieConsentChangeEvent
            setAnalyticsChecked(customEvent.detail.analytics)
            setSurveysChecked(customEvent.detail.surveys)
            setVideoAnalyticsChecked(customEvent.detail.videoAnalytics)
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
                description="Hvis du samtykker kan vi vise popup-undersøkelser og lagre et par funksjonelle informasjonskapsler som husker om du har svart/lukket. Uten samtykke kan vi fortsatt vise enkelte undersøkelser uten informasjonskapsler, for eksempel korte spørsmål direkte på siden («Fant du det du lette etter?»)">
                Brukerundersøkelser (Skyra)
            </Switch>
            <Switch
                checked={videoAnalyticsChecked}
                onChange={(e) => {
                    const videoAnalytics = e.target.checked
                    dispatchCookieConsentEvent({ videoAnalytics })
                    setVideoAnalyticsChecked(videoAnalytics)
                }}
                description="Samler informasjon om hvordan videoer brukes (f.eks. hvor lenge du ser på en video). Dette hjelper oss å forbedre videoinnholdet vårt.">
                Videoanalyse (Qbrick)
            </Switch>
        </VStack>
    )
}
