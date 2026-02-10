'use client'

import { useEffect, useState } from 'react'
import { ButtonView } from '~/components/parts/Button'
import { PartData } from '~/types/graphql-types'
import { XP_CookieConsentOpen } from '@xp-types/site/parts'
import { HStack } from '@navikt/ds-react'
import { useCookieBanner } from '~/components/common/cookies/CookieBannerContext'
import { CookieConsentChangeEvent, getConsentValues } from '~/components/common/cookies/cookieUtils'
import { HeadingView } from '~/components/parts/Heading'

export const CookieBannerOpenButton = ({ meta }: PartData<XP_CookieConsentOpen>) => {
    const { openCookieBanner } = useCookieBanner()
    const [consentText, setConsentText] = useState(
        'Du har godtatt bare nødvendige informasjonskapsler'
    )

    useEffect(() => {
        const updateConsentText = (
            analytics: boolean,
            surveys: boolean,
            videoAnalytics: boolean
        ) => {
            if (!analytics && !surveys && !videoAnalytics) {
                setConsentText('Du har godtatt bare nødvendige informasjonskapsler')
            } else if (analytics && surveys && videoAnalytics) {
                setConsentText('Du har godtatt alle valgfrie informasjonskapsler')
            } else {
                setConsentText('Du har tilpasset samtykket ditt for informasjonskapsler')
            }
        }

        // Initial check
        const { analyticsConsent, surveysConsent, videoAnalyticsConsent } = getConsentValues()
        updateConsentText(analyticsConsent, surveysConsent, videoAnalyticsConsent)

        // Listen for changes
        const handleConsentChange = (e: Event) => {
            const customEvent = e as CookieConsentChangeEvent
            updateConsentText(
                customEvent.detail.analytics,
                customEvent.detail.surveys,
                customEvent.detail.videoAnalytics
            )
        }

        window.addEventListener('cookie-consent-changed', handleConsentChange)

        return () => {
            window.removeEventListener('cookie-consent-changed', handleConsentChange)
        }
    }, [])

    return (
        <HStack
            padding={'space-24'}
            gap={{ xs: 'space-16', md: 'space-40' }}
            className={
                'bg-(--ib-bg-orange-softA) sm:flex-nowrap justify-between items-center rounded-lg'
            }>
            <HeadingView autoId={false} level={'2'} size={'small'} className={'mb-0'}>
                {consentText}
            </HeadingView>
            <ButtonView
                type="submit"
                className={'max-sm:w-full self-center! py-(--ax-space-16) px-(--ax-space-24)'}
                config={{ variant: 'primary', size: 'medium' }}
                onClick={(e) => openCookieBanner(e.target as HTMLButtonElement)}
                meta={meta}>
                Endre samtykket ditt
            </ButtonView>
        </HStack>
    )
}
