'use client'

import { useEffect, useState } from 'react'
import { ButtonView } from '~/components/parts/Button'
import { PartData } from '~/types/graphql-types'
import { XP_CookieConsentOpen } from '@xp-types/site/parts'
import { HStack } from '@navikt/ds-react'
import { useCookieBanner } from '~/components/common/cookies/CookieBannerContext'
import { getConsentValues } from '~/components/common/cookies/cookieUtils'
import { HeadingView } from '~/components/parts/Heading'

export const CookieBannerOpenButton = ({ meta }: PartData<XP_CookieConsentOpen>) => {
    const { openCookieBanner } = useCookieBanner()
    const [consentText, setConsentText] = useState(
        'Du har godtatt bare nødvendige informasjonskapsler'
    )

    useEffect(() => {
        const updateConsentText = (analytics: boolean, surveys: boolean) => {
            if (!analytics && !surveys) {
                setConsentText('Du har godtatt bare nødvendige informasjonskapsler')
            } else if (analytics && surveys) {
                setConsentText('Du har godtatt valgfrie informasjonskapsler')
            } else if (!analytics && surveys) {
                setConsentText(
                    'Du har godtatt brukerundersøkelser (Skyra), men ikke analyse og statistikk (Umami)'
                )
            } else if (analytics && !surveys) {
                setConsentText(
                    'Du har godtatt analyse og statistikk (Umami), men ikke brukerundersøkelser (Skyra)'
                )
            }
        }

        // Initial check
        const { analyticsConsent, surveysConsent } = getConsentValues()
        updateConsentText(analyticsConsent, surveysConsent)

        // Listen for changes
        const handleConsentChange = (e: Event) => {
            const customEvent = e as CustomEvent<{ analytics: boolean; surveys: boolean }>
            updateConsentText(customEvent.detail.analytics, customEvent.detail.surveys)
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
