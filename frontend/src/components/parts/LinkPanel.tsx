'use client'
import React from 'react'
import { PartData } from '@enonic/nextjs-adapter';
import { LinkPanel } from "@navikt/ds-react";
import styles from './LinkPanel.module.css';
import { PersonIcon } from '@navikt/aksel-icons';
import cn from 'classnames';


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
        <LinkPanel 
            href={url} 
            border={false} 
            className='bg-pink-base rounded-[100px] py-12 px-12'>
            <LinkPanel.Title className={styles.title}>
            {/* TODO: Lag en løsning som støtter flere ikoner */}
                <PersonIcon fontSize="2.5rem" />
                {text || 'Mangler lenketekst'}</LinkPanel.Title>
        </LinkPanel>
    )
};