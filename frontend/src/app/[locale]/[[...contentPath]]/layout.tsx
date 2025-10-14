import { getAsset, I18n, MetaData, RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter'
import { LocaleContextProvider } from '@enonic/nextjs-adapter/client'
import { fetchContent } from '@enonic/nextjs-adapter/server'
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent'
import { ReactNode } from 'react'
import { Page } from '@navikt/ds-react'
import Footer from '~/components/views/Footer'
import Header from '~/components/views/Header'
import { PageBlock } from '@navikt/ds-react/Page'

import '~/styles/globals.css'
import { HeadlessCms } from '~/types/generated'

type LayoutParams = { locale: string; contentPath?: string[] }
type LayoutProps = { params: Promise<LayoutParams>; children: ReactNode }

export default async function PageLayout({ params, children }: LayoutProps) {
    const resolvedParams = await params
    const ctx = { locale: resolvedParams.locale, contentPath: resolvedParams.contentPath ?? '' }
    const { meta, common } = await fetchContent(ctx)

    if (meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
        const content: ReactNode =
            meta.renderMode === RENDER_MODE.NEXT ? (
                children
            ) : (
                <details data-single-component-output="true">{children}</details>
            )

        return (
            <EnonicWrapper resolvedParams={resolvedParams} meta={meta}>
                {content}
            </EnonicWrapper>
        )
    }

    const isCrashCourse = common?.get?.type === 'idebanken:crash-course'
    if (isCrashCourse) {
        return (
            <EnonicWrapper resolvedParams={resolvedParams} meta={meta}>
                <Page contentBlockPadding="none">{children}</Page>
            </EnonicWrapper>
        )
    }

    return (
        <EnonicWrapper resolvedParams={resolvedParams} meta={meta}>
            <Page
                footer={<Footer footerProps={common?.footer ?? undefined} />}
                contentBlockPadding="none">
                <Header
                    meta={meta}
                    common={common as HeadlessCms}
                    title={I18n.localize('idebanken')}
                    logoUrl={getAsset('/images/logo.svg', meta)}
                />
                <PageBlock id="main-content" as="main" width="2xl">
                    {children}
                </PageBlock>
            </Page>
        </EnonicWrapper>
    )
}

const EnonicWrapper = ({
    resolvedParams,
    meta,
    children,
}: {
    resolvedParams: LayoutParams
    meta: MetaData
    children: ReactNode
}) => {
    const isEdit = meta?.renderMode === RENDER_MODE.EDIT
    return (
        <LocaleContextProvider locale={resolvedParams.locale}>
            <StaticContent condition={isEdit}>{children}</StaticContent>
        </LocaleContextProvider>
    )
}
