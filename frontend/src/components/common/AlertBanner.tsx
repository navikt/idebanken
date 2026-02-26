'use client'

import { HeadlessCms } from '~/types/generated'
import {
    GlobalAlert,
    GlobalAlertCloseButton,
    GlobalAlertHeader,
    GlobalAlertProps,
} from '@navikt/ds-react/GlobalAlert'
import classNames from 'classnames'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { MetaData } from '@enonic/nextjs-adapter'
import { useEffect, useState } from 'react'
import { BodyShort } from '@navikt/ds-react'
import {
    getAlertBannerClosedHash,
    setAlertBannerClosed,
} from '~/components/common/cookies/cookieUtils'

export function AlertBanner({ common, meta }: { common: HeadlessCms; meta: MetaData }) {
    const alertBanner = common?.siteConfiguration?.alertBanner
    const [isClosed, setIsClosed] = useState(true)

    useEffect(() => {
        if (alertBanner && alertBanner.hash !== undefined) {
            const closedHash = getAlertBannerClosedHash()
            if (closedHash !== alertBanner.hash) {
                setIsClosed(false)
            }
        }
    }, [alertBanner])

    if (!alertBanner || isClosed) return null

    const status = alertBanner.status as GlobalAlertProps['status']

    const handleClose = () => {
        if (alertBanner.closeable && alertBanner.hash) {
            setAlertBannerClosed(alertBanner.hash)
        }
        setIsClosed(true)
    }

    return (
        <GlobalAlert
            status={status}
            size={'small'}
            aria-label="Varsel"
            className={'outline-0 relative z-10'}>
            <GlobalAlertHeader
                className={classNames(
                    'justify-center items-center py-(--ax-space-8) md:px-[10%] [&>div:first-child]:mt-0 [&>div:first-child]:mb-(--ax-space-4)',
                    status === 'announcement'
                        ? 'bg-(--ax-bg-info-moderate) text-(--ax-text-info)'
                        : '[&>div>section>p>a]:text-(--ax-text-contrast)',
                    alertBanner.closeable ? 'pr-12' : ''
                )}>
                <BodyShort as={'div'} size="medium" className={'text-[18px] font-light'}>
                    <RichTextView
                        data={{ processedHtml: alertBanner.text ?? '[Tomt innhold]' }}
                        meta={meta}
                        customReplacer={htmlRichTextReplacer}
                    />
                </BodyShort>
                {alertBanner.closeable ? (
                    <GlobalAlertCloseButton
                        className={'m-0 text-(--ax-text-info) focus-visible:outline-(--ax-border)'}
                        onClick={handleClose}
                    />
                ) : (
                    <></>
                )}
            </GlobalAlertHeader>
        </GlobalAlert>
    )
}
