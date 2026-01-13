'use client'

import { HeadlessCms } from '~/types/generated'
import {
    GlobalAlert,
    GlobalAlertCloseButton,
    GlobalAlertHeader,
    GlobalAlertProps,
    GlobalAlertTitle,
} from '@navikt/ds-react/GlobalAlert'
import classNames from 'classnames'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { MetaData } from '@enonic/nextjs-adapter'
import { useEffect, useState } from 'react'
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
        <GlobalAlert status={status} size={'small'} className={'outline-0 relative z-10'}>
            <GlobalAlertHeader
                className={classNames(
                    'justify-center md:px-[10%]',
                    status === 'announcement'
                        ? 'bg-(--ax-bg-info-moderate) text-(--ax-text-info)'
                        : '[&>div>section>p>a]:text-(--ax-text-contrast)',
                    alertBanner.closeable ? 'pr-12' : ''
                )}>
                <GlobalAlertTitle as={'div'} className={'text-[18px] font-light'}>
                    <RichTextView
                        data={{ processedHtml: alertBanner.text ?? '[Tomt innhold]' }}
                        meta={meta}
                        customReplacer={htmlRichTextReplacer}
                    />
                </GlobalAlertTitle>
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
