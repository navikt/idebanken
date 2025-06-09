import {I18n, RENDER_MODE, XP_REQUEST_TYPE} from '@enonic/nextjs-adapter';
import {LocaleContextProvider} from '@enonic/nextjs-adapter/client';
import {fetchContent} from '@enonic/nextjs-adapter/server';
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent';
import {ReactNode} from 'react';

import Header from '../../../components/views/Header';
import Footer from '../../../components/views/Footer';
import {getAsset} from '@enonic/nextjs-adapter';
import { Button } from '@navikt/ds-react'
import { Heading } from '@navikt/ds-react';


import '../../../styles/globals.css';

import {PageProps} from './page';

type LayoutProps = {
    params: Promise<PageProps>
    children: ReactNode
}

export default async function PageLayout({params, children}: LayoutProps) {
    const resolvedParams = await params;
    const {meta} = await fetchContent(resolvedParams);

    const isEdit = meta?.renderMode === RENDER_MODE.EDIT;

    // Component rendering - for component updates in Content Studio without reloading page
    if (meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
        // don't wrap it in direct next access because we want to show 1 component on the page
        const content: ReactNode =
            meta.renderMode === RENDER_MODE.NEXT ?
            children :
            <details data-single-component-output="true">{children}</details>

        return (
            <LocaleContextProvider locale={resolvedParams.locale}>
                <StaticContent condition={isEdit}>{content}</StaticContent>
            </LocaleContextProvider>
        );
    }

    return (
        <LocaleContextProvider locale={resolvedParams.locale}>
            <StaticContent condition={isEdit}>
                <Header
                    meta={meta}
                    title={I18n.localize('idebanken')}
                    logoUrl={getAsset('/images/xp-shield.svg', meta)}
                />
                <Heading level="1" size="xlarge">Id bank xlarge</Heading>
                <Heading level="2" size="large">Id bank large</Heading>
                <Heading level="3" size="medium">Id bank medium</Heading>
                <Heading level="4" size="small">Id bank small</Heading>
                <Heading level="5" size="xsmall">Id bank xsmall</Heading>

                <Button variant="primary">En knapp</Button>
                <Button variant="secondary">En knapp</Button>
                <main>{children}</main>
                <Footer/>
            </StaticContent>
        </LocaleContextProvider>
    )
}
