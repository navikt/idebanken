import {I18n, PORTAL_COMPONENT_ATTRIBUTE} from '@enonic/nextjs-adapter';
import {Metadata} from 'next';
import {ReactNode} from 'react';
import localFont from 'next/font/local'

import '../../styles/globals.css';

import {PageProps} from './[[...contentPath]]/page';

type LayoutProps = {
    params: PageProps
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

export default async function LocaleLayout({params, children}: LayoutProps) {

    // we only have locale in the params on the [locale] level
    await I18n.setLocale(params.locale);

    const bodyAttrs: { [key: string]: string } = {
        className: "edit",
        [PORTAL_COMPONENT_ATTRIBUTE]: "page",
        ['data-theme']:"idebanken"
    }

    return (<html lang="en" className={mundial.variable}>
        <body {...bodyAttrs}>
        {children}
        </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: {
        default: I18n.localize('title'),
        template: '%s | Next.XP',
    },
    description: 'The React Framework for Enonic XP',
}
