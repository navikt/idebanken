'use client'

import React from 'react'
import { Box, HGrid, Stack } from '@navikt/ds-react'
import { useCookieBanner } from '~/components/common/cookies/CookieBannerContext'
import classNames from 'classnames'
import { ButtonView } from '~/components/parts/Button'
import { MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { BubblesBackgroundSvgStyle } from '~/utils/BubblesBackgroundSvgStyle'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { HeadlessCms } from '~/types/generated'
import { dispatchCookieConsentEvent } from '~/components/common/cookies/cookieUtils'

export function CookieBanner({ meta, common }: { meta: MetaData; common?: HeadlessCms }) {
    const { closeCookieBanner, showCookieBanner, setShowCookieBanner } = useCookieBanner()

    if (!showCookieBanner || meta.renderMode !== RENDER_MODE.NEXT) {
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
            as="section"
            padding={{ xs: 'space-36', md: 'space-64' }}
            margin={{ xs: 'space-0', lg: 'space-44' }}
            className={classNames(
                'fixed bottom-0 inset-x-0 mx-auto w-[min(1024px,100%)] z-[1000]',
                'bg-(--ib-bg-dark-blue-moderate) shadow-2xl lg:rounded-lg max-lg:bg-none!',
                'max-h-screen overflow-y-auto'
            )}
            style={BubblesBackgroundSvgStyle(
                [
                    { radius: 90, left: 50, down: 50, fill: 'hsla(43, 98%, 79%, .5)' },
                    {
                        radius: 90,
                        left: 150,
                        down: 150,
                        fill: 'hsla(335, 100%, 87%, .5)',
                    },
                ],
                '0 0 100% 100%',
                '100%'
            )}>
            <HGrid columns={3} gap={{ xs: 'space-0', md: 'space-64' }}>
                <div className={'col-span-3 lg:col-span-2'}>
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
                </div>
            </HGrid>
        </Box>
    )
}
