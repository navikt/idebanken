'use client'
import React from 'react'
import { PartData } from '@enonic/nextjs-adapter'
import { parseHtml } from '~/utils/parseHtml'
import styles from './Accordion.module.css'
import { Accordion } from '@navikt/ds-react'
import classNames from 'classnames'

export interface AccordionData {
    part: PartData
}

export const AccordionView = (props: AccordionData) => {
    const { part } = props
    const { accordionItem = [], bgColor = 'bg-extra-light-pink' } = part.config

    const accordianItems = Array.isArray(accordionItem) ? accordionItem : [accordionItem]

    if (!accordianItems) return

    return (
        <Accordion
            className={styles.accordion}
            style={{ [`--ac-accordion-item-bg-open`]: `var(--${bgColor})` } as React.CSSProperties}>
            {accordianItems.map((item) => (
                <Accordion.Item
                    key={crypto.randomUUID()}
                    className={classNames(bgColor, styles.item)}>
                    <Accordion.Header className={styles.header}>
                        {item.header || 'Mangler header'}
                    </Accordion.Header>
                    <Accordion.Content>
                        <>{parseHtml(item.simpleTextEditor)}</>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
