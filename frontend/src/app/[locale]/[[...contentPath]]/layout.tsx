import { getAsset, I18n, RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter'
import { LocaleContextProvider } from '@enonic/nextjs-adapter/client'
import { fetchContent } from '@enonic/nextjs-adapter/server'
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent'
import { ReactNode } from 'react'

import Header from '~/components/views/Header'
import { PageBlock } from '@navikt/ds-react/Page'

import '~/styles/globals.css'

import { PageProps } from './page'

type LayoutProps = {
    params: Promise<PageProps>
    children: ReactNode
}

export default async function PageLayout({ params, children }: LayoutProps) {
    const resolvedParams = await params
    const { meta, common } = await fetchContent(resolvedParams)

    const isEdit = meta?.renderMode === RENDER_MODE.EDIT

    // Component rendering - for component updates in Content Studio without reloading page
    if (meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
        // don't wrap it in direct next access because we want to show 1 component on the page
        const content: ReactNode =
            meta.renderMode === RENDER_MODE.NEXT ? (
                children
            ) : (
                <details data-single-component-output="true">{children}</details>
            )

        return (
            <LocaleContextProvider locale={resolvedParams.locale}>
                <StaticContent condition={isEdit}>{content}</StaticContent>
            </LocaleContextProvider>
        )
    }

    return (
        <LocaleContextProvider locale={resolvedParams.locale}>
            <StaticContent condition={isEdit}>
                <Header
                    meta={meta}
                    menu={common?.menu}
                    title={I18n.localize('idebanken')}
                    logoUrl={getAsset('/images/logo.svg', meta)}
                />

                <PageBlock id="main-content" as="main" width="2xl">
                    {children}
                </PageBlock>
            </StaticContent>
        </LocaleContextProvider>
    )
}
