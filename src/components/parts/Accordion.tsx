'use client'
import React from 'react'
import { PartData } from '@enonic/nextjs-adapter';
import { ParsedHtml } from '../common/ParsedHtml';
import { InfoBox } from '../common/InfoBox';
import styles from './Accordion.module.css';
import { Accordion, Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import { Card } from '../common/Card';

export interface AccordionData {
    part: PartData;
}

export const AccordionView = (props: AccordionData) => {
    const {part} = props;
    const {
        accordionItem = [],
        bgColor = 'bg-extra-light-pink',
    } = part.config

    const accordianItems = Array.isArray(accordionItem) ? accordionItem : [accordionItem];
    
    if (!accordianItems) return;

    return (
        <Accordion 
            className={styles.accordion} 
            style={{ [`--ac-accordion-item-bg-open`]: `var(--${bgColor})` } as React.CSSProperties}
        >
            {
                accordianItems.map(item => 
                    <Accordion.Item key={crypto.randomUUID()} className={classNames(bgColor, styles.item)}>
                        <Accordion.Header className={styles.header}>{ item.header || 'Mangler header' }</Accordion.Header>
                        <Accordion.Content>
                            <ParsedHtml processedHtml={item.simpleTextEditor}></ParsedHtml>
                        </Accordion.Content>
                    </Accordion.Item>
                )
            }
        </Accordion>
    )
};