import { I18n, PORTAL_COMPONENT_ATTRIBUTE } from '@enonic/nextjs-adapter'
import { ReactNode } from 'react'
import localFont from 'next/font/local'
import { PageProps } from './[[...contentPath]]/page'
import { Metadata } from 'next'
import { Page } from '@navikt/ds-react'
import Footer from '~/components/views/Footer'

import '~/styles/globals.css'

type LayoutProps = {
    params: Promise<PageProps>
    children: ReactNode
}

const mundial = localFont({
    variable: '--font-mundial',
    src: [
        {
            path: '../fonts/3-mundial-light-tty.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../fonts/3-mundial-light-italic-tty.woff2',
            weight: '300',
            style: 'italic',
        },
        {
            path: '../fonts/4-mundial-regular-tty.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/4-mundial-regular-italic-tty.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../fonts/5-mundial-demibold-tty.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../fonts/5-mundial-demibold-italic-tty.woff2',
            weight: '500',
            style: 'italic',
        },
    ],
})

export default async function LocaleLayout({ params, children }: LayoutProps) {
    const resolvedParams = await params

    await I18n.setLocale(resolvedParams.locale)

    const bodyAttrs: { [key: string]: string } = {
        className: 'edit',
        [PORTAL_COMPONENT_ATTRIBUTE]: 'page',
        ['data-theme']: 'idebanken',
    }

    return (
        <html lang={resolvedParams.locale ?? 'no'} className={mundial.variable}>
            <Page as="body" footer={<Footer />} {...bodyAttrs}>
                {children}
            </Page>
        </html>
    )
}

export const metadata: Metadata = {
    title: I18n.localize('idebanken'),
    description:
        'Idébanken er en informasjonstjeneste om inkluderende arbeidsliv. Vi deler ideer og kunnskap om sykefravær, arbeidsmiljø, seniorpolitikk og inkludering.',
}
