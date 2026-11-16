'use client'

import React, { useMemo } from 'react'
import { Box, Stack } from '@navikt/ds-react'
import { useCookieBanner } from '~/components/common/cookies/CookieBannerContext'
import { ButtonView } from '~/components/parts/Button'
import { MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { HeadlessCms } from '~/types/generated'
import { dispatchCookieConsentEvent } from '~/components/common/cookies/cookieUtils'

export function CookieBanner({ meta, common }: { meta: MetaData; common?: HeadlessCms }) {
    const { closeCookieBanner, showCookieBanner, setShowCookieBanner } = useCookieBanner()

    // Detect bots on the client
    const isBot = useMemo(() => {
        if (typeof navigator === 'undefined') return false
        const ua = navigator.userAgent || ''
        return [/crawler|spider|bot/i].some((p) => p.test(ua))
    }, [])

    if (!showCookieBanner || meta.renderMode !== RENDER_MODE.NEXT || isBot) {
        return null
    }

    const handleNecessaryOnlyClick = () => {
        closeCookieBanner()
        setShowCookieBanner(false)
        dispatchCookieConsentEvent({ analytics: false, surveys: false, videoAnalytics: false })
    }

    const handleAcceptAllClick = () => {
        closeCookieBanner()
        setShowCookieBanner(false)
        dispatchCookieConsentEvent({ analytics: true, surveys: true, videoAnalytics: true })
    }
    const buttonClassName =
        'max-sm:w-full min-h-12 rounded-lg! whitespace-normal! ' +
        'bg-white! text-(--ax-text-accent-subtle)! font-semibold! ' +
        'border-0! shadow-none! ' +
        'hover:bg-(--ax-bg-accent-moderate-hover)! ' +
        'hover:text-(--ax-text-accent)! ' +
        'focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4'

    return (
        <Box
            as="section"
            aria-label="Informasjonskapsler"
            data-testid="cookie-banner"
            background="accent-strong"
            className="light relative z-10 w-full text-white">
            <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-8 md:py-6">
                <RichTextView
                    data={{ processedHtml: common?.siteConfiguration?.cookieInfoText ?? '' }}
                    meta={meta}
                    customReplacer={htmlRichTextReplacer}
                    className={
                        '*:mb-3 mb-4 [&_*]:text-white! ' +
                        '[&_h1]:text-2xl! [&_h2]:text-2xl! [&_h3]:text-2xl! ' +
                        '[&_h1]:leading-snug! [&_h2]:leading-snug! [&_h3]:leading-snug! ' +
                        '[&_a]:underline [&_a]:hover:no-underline ' +
                        '[&_a]:focus-visible:outline-2 ' +
                        '[&_a]:focus-visible:outline-white ' +
                        '[&_a]:focus-visible:outline-offset-4'
                    }
                />

                <Stack
                    id="cookie-banner-buttons"
                    gap="space-12"
                    direction={{ xs: 'column', sm: 'row' }}
                    role="group"
                    aria-label="Godta eller avvis informasjonskapsler">
                    <ButtonView
                        type="submit"
                        className={buttonClassName}
                        config={{ variant: 'secondary', size: 'medium' }}
                        onClick={handleAcceptAllClick}
                        meta={meta}>
                        Godta alle informasjonskapsler
                    </ButtonView>
                    <ButtonView
                        type="submit"
                        className={buttonClassName}
                        config={{ variant: 'secondary', size: 'medium' }}
                        onClick={handleNecessaryOnlyClick}
                        meta={meta}>
                        Kun nødvendige
                    </ButtonView>
                </Stack>
            </div>
        </Box>
    )
}
