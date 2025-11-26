import '~/styles/globals.css'

import { I18n, MetaData, PageComponent, RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter'
import { LocaleContextProvider } from '@enonic/nextjs-adapter/client'
import { fetchContent } from '@enonic/nextjs-adapter/server'
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent'
import { type JSX, PropsWithChildren, ReactNode } from 'react'
import { Page } from '@navikt/ds-react'
import Footer from '~/components/views/Footer'
import { Header } from '~/components/views/Header'
import { PageBlock } from '@navikt/ds-react/Page'
import { HeadlessCms } from '~/types/generated'
import BubblesOverlayTop from '~/components/parts/BubblesOverlayTop'
import GlobalSkyraForms from '~/components/common/analytics/GlobalSkyraForms'
import { draftMode } from 'next/headers'
import { CookieBanner } from '~/components/common/cookies/CookieBanner'
import { ContentEditorMessage } from '~/components/common/ContentEditorMessage'

type LayoutParams = { locale: string; contentPath?: string[] }
type LayoutProps = PropsWithChildren<{ params: Promise<LayoutParams> }>

export default async function PageLayout({ params, children }: LayoutProps) {
    const resolvedParams = await params
    const { isEnabled } = await draftMode()

    const ctx = { locale: resolvedParams.locale, contentPath: resolvedParams.contentPath ?? '' }
    const contentResult = await fetchContent(ctx)
    const { meta, common, page } = contentResult
    const editorMessage = editorHasUsedTextComponentWarningMessage(meta, isEnabled, page)

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
                <Page contentBlockPadding="none">
                    <CookieBanner meta={meta} common={common as HeadlessCms} />
                    {children}
                    <GlobalSkyraForms skyra={common?.get?.skyraSlugs} isDraftMode={isEnabled} />
                    {editorMessage}
                </Page>
            </EnonicWrapper>
        )
    }

    return (
        <EnonicWrapper resolvedParams={resolvedParams} meta={meta}>
            <Page
                footer={<Footer footerProps={common?.footer ?? undefined} meta={meta} />}
                contentBlockPadding="none">
                <Header
                    meta={meta}
                    common={common as HeadlessCms}
                    title={I18n.localize('idebanken')}
                />
                <PageBlock id="main-content" as="main" width="2xl">
                    {children}
                    <GlobalSkyraForms skyra={common?.get?.skyraSlugs} isDraftMode={isEnabled} />
                    {editorMessage}
                </PageBlock>
            </Page>
            <BubblesOverlayTop meta={meta} />
        </EnonicWrapper>
    )
}

const EnonicWrapper = ({
    resolvedParams,
    meta,
    children,
}: PropsWithChildren<{
    resolvedParams: LayoutParams
    meta: MetaData
}>) => {
    const isEdit = meta?.renderMode === RENDER_MODE.EDIT
    return (
        <LocaleContextProvider locale={resolvedParams.locale}>
            <StaticContent condition={isEdit}>{children}</StaticContent>
        </LocaleContextProvider>
    )
}

function editorHasUsedTextComponentWarningMessage(
    meta: MetaData,
    isEnabled: boolean,
    page: PageComponent | null
): JSX.Element | undefined {
    if (
        meta.renderMode !== RENDER_MODE.NEXT &&
        isEnabled &&
        page &&
        JSON.stringify(page).match(/"components":\[[^]+"type":"text"/g)
    ) {
        return (
            <ContentEditorMessage
                title={'Feil bruk av tekst! Bruk alltid part'}
                status={'error'}
                content={"Ikke bruk komponenten 'tekst' bruk heller parten 'tekst'"}
            />
        )
    }
    return
}
