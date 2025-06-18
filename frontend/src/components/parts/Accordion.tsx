<<<<<<< HEAD
import { parseHtml } from '~/utils/parseHtml'
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from '@navikt/ds-react/Accordion'
import type { Part_Idebanken_Accordion } from '~/types/generated.d.ts'
import { validatedAccordionConfig } from '~/utils/runtimeValidation'

export interface AccordionData {
    part: { descriptor: string, config: Part_Idebanken_Accordion }
=======
'use client'
import React from 'react'
import { PartData } from '@enonic/nextjs-adapter'
import { parseHtml } from '~/utils/parseHtml'
import styles from './Accordion.module.css'
import { Accordion } from '@navikt/ds-react'
import classNames from 'classnames'

export interface AccordionData {
    part: PartData
>>>>>>> main
}

export const AccordionView = (props: AccordionData) => {
    const { part } = props
<<<<<<< HEAD
    const config = validatedAccordionConfig(part.config)
    
    if (!config) return null
    
    const { accordionItem } = config
        
    return (
        <Accordion className='flex flex-col gap-3'>
            {accordionItem.map((item, idx) => (
                <AccordionItem
                    key={idx}
                    className='
                        rounded-[10px] 
                        bg-brand-white 
                        shadow-accordion-item
                    '>
                    <AccordionHeader 
                        className='flex-row-reverse justify-between px-6 py-5'
                        style={{ 
                            '--a-font-size-heading-small': '1.25rem',
                            '--a-font-line-height-heading-small': '2rem',
                            '--a-font-weight-bold': '400',
                            '--ac-accordion-header-bg-hover': 'none',
                        } as React.CSSProperties}
                    >
                        {item.header}
                    </AccordionHeader>
                    <AccordionContent 
                        className='px-6' 
                        style={{ 
                        '--a-font-size-large': '1.125rem',
                        } as React.CSSProperties}
                    >
                        <>{parseHtml(item.simpleTextEditor)}</>
                    </AccordionContent>
                </AccordionItem>
=======
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
>>>>>>> main
            ))}
        </Accordion>
    )
}
