import { HeadlessCms } from '~/types/generated'
import {
    GlobalAlert,
    GlobalAlertHeader,
    GlobalAlertProps,
    GlobalAlertTitle,
} from '@navikt/ds-react/GlobalAlert'
import classNames from 'classnames'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { MetaData } from '@enonic/nextjs-adapter'

export function AlertBanner({ common, meta }: { common: HeadlessCms; meta: MetaData }) {
    const alertBanner = common?.siteConfiguration?.alertBanner
    if (!alertBanner) return null

    const status = alertBanner.status as GlobalAlertProps['status']
    return (
        <GlobalAlert status={status} size={'small'} className={'outline-0 relative z-10'}>
            <GlobalAlertHeader
                className={classNames(
                    'justify-center md:px-[10%]',
                    status === 'announcement'
                        ? 'bg-(--ax-bg-info-moderate) text-(--ax-text-info)'
                        : ''
                )}>
                <GlobalAlertTitle as={'div'} className={'text-[18px] font-light'}>
                    <RichTextView
                        data={{ processedHtml: alertBanner.text ?? '[Tomt innhold]' }}
                        meta={meta}
                        customReplacer={htmlRichTextReplacer}
                    />
                </GlobalAlertTitle>
            </GlobalAlertHeader>
        </GlobalAlert>
    )
}
