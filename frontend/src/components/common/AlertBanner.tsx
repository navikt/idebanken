import { HeadlessCms } from '~/types/generated'
import {
    GlobalAlert,
    GlobalAlertHeader,
    GlobalAlertProps,
    GlobalAlertTitle,
} from '@navikt/ds-react/GlobalAlert'
import classNames from 'classnames'

export function AlertBanner({ common }: { common: HeadlessCms }) {
    const alertBanner = common?.siteConfiguration?.alertBanner
    if (!alertBanner) return null

    const status = alertBanner.status as GlobalAlertProps['status']
    return (
        <GlobalAlert status={status} size={'small'} className={'outline-0 relative z-10'}>
            <GlobalAlertHeader
                className={classNames(
                    'justify-center md:px-[10%]',
                    status === 'announcement'
                        ? 'bg-(--ax-bg-info-moderate) text-(--ax-text-info) [&>div:first-child]:mt-(--ax-space-2)'
                        : ''
                )}>
                <GlobalAlertTitle as={'div'} className={'text-[18px] font-light'}>
                    {alertBanner.text}
                </GlobalAlertTitle>
            </GlobalAlertHeader>
        </GlobalAlert>
    )
}
