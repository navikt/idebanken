'use client'

import { HTMLProps, PropsWithChildren, useRef } from 'react'
import { AnalyticsEvents, EventData, umami } from '~/utils/analytics/umami'
import { MetaData } from '@enonic/nextjs-adapter'
import { AccordionItem } from '@navikt/ds-react/Accordion'

export function AccordionItemTracked({
    eventData,
    meta,
    children,
    ...rest
}: PropsWithChildren<
    HTMLProps<HTMLDivElement> & {
        eventData?: EventData
        className?: string
        meta?: MetaData
    }
>) {
    const accordionItemRef = useRef<HTMLDivElement | null>(null)

    return (
        <AccordionItem
            ref={accordionItemRef}
            {...rest}
            onOpenChange={(open) => {
                const button = accordionItemRef.current?.querySelector(
                    'button'
                ) as HTMLButtonElement | null
                if (!button) return

                const anchorText = button.textContent
                if (!anchorText) return {}
                void umami(open ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
                    ...(eventData || {}),
                    ...(meta?.type ? { innholdstype: meta.type } : {}),
                    tittel: anchorText,
                })
            }}>
            {children}
        </AccordionItem>
    )
}

export default AccordionItemTracked
