'use client'

import React, { useMemo } from 'react'
import { Box, Stack } from '@navikt/ds-react'
import { useCookieBanner } from '~/components/common/cookies/CookieBannerContext'
import classNames from 'classnames'
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
        dispatchCookieConsentEvent({ analytics: false, surveys: false })
    }

    const handleAcceptAllClick = () => {
        closeCookieBanner()
        setShowCookieBanner(false)
        dispatchCookieConsentEvent({ analytics: true, surveys: true })
    }

    return (
        <Box
            data-color="ib-brand-dark-blue"
            as="section"
            role="dialog"
            aria-modal="true"
            aria-label="Informasjonskapsler"
            padding={{ xs: 'space-36', md: 'space-64' }}
            margin={{ xs: 'space-0', lg: 'space-44' }}
            className={classNames(
                'fixed bottom-0 inset-x-0 mx-auto w-[min(704px,100%)] z-[1000]',
                'bg-(--ib-bg-dark-blue-soft) shadow-2xl lg:rounded-lg max-lg:bg-none!',
                'max-h-screen overflow-y-auto'
            )}>
            <RichTextView
                data={{ processedHtml: common?.siteConfiguration?.cookieInfoText ?? '' }}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
                className={'[&>*]:mb-(--ax-space-24) mb-(--ax-space-24)'}
            />

            <Stack
                id={'cookie-banner-buttons'}
                gap={{ xs: 'space-12', lg: 'space-32' }}
                direction={{ xs: 'column', sm: 'row' }}
                role="group"
                aria-label={'Godta eller avvis informasjonskapsler'}>
                <ButtonView
                    type="submit"
                    className={'max-sm:w-full'}
                    config={{ variant: 'secondary', size: 'medium' }}
                    onClick={handleNecessaryOnlyClick}
                    meta={meta}>
                    Kun nødvendige
                </ButtonView>
                <ButtonView
                    type="submit"
                    className={'max-sm:w-full'}
                    config={{ variant: 'secondary', size: 'medium' }}
                    onClick={handleAcceptAllClick}
                    meta={meta}>
                    Godta alle informasjonskapsler
                </ButtonView>
            </Stack>
        </Box>
    )
}
