'use client'
import React from 'react'
import { PartData } from '@enonic/nextjs-adapter';
import { LinkPanel } from "@navikt/ds-react";
import styles from './LinkPanel.module.css';
import { PersonIcon } from '@navikt/aksel-icons';


export interface LinkPanelData {
    part: PartData;
}

export const LinkPanelView = ({part}: LinkPanelData) => {
    console.log({part})
    const {
        url = '#',
        text = '',
    } = part?.config || {};

    return (
        <LinkPanel href={url} border={false} className={styles.linkPanel}>
            <LinkPanel.Title className={styles.title}>
            {/* TODO: Lag en løsning som støtter flere ikoner */}
                <PersonIcon fontSize="2.5rem" />
                {text || 'Mangler lenketekst'}</LinkPanel.Title>
        </LinkPanel>
    )
};