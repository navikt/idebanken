'use client'

import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from '@navikt/ds-react/Accordion'
import type { Part_Idebanken_Accordion } from '~/types/generated.d.ts'
import { validatedAccordionConfig } from '~/utils/runtimeValidation'
import { PartData } from '~/types/graphql-types'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'

export const AccordionView = ({ part, meta }: PartData<Part_Idebanken_Accordion>) => {
    const config = validatedAccordionConfig(part.config)

    if (!config) return null

    const { accordionItems } = config

    return (
        <Accordion data-color="neutral" className="flex flex-col gap-3">
            {accordionItems.map((item, idx) => (
                <AccordionItem
                    key={idx}
                    onOpenChange={(open) =>
                        void umami(
                            open ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE,
                            {
                                tittel: item.header,
                            }
                        )
                    }
                    className="
                        rounded-[10px]
                    ">
                    <AccordionHeader>{item.header}</AccordionHeader>
                    <AccordionContent>
                        <RichTextView
                            // @ts-expect-error data.processedHtml is not required
                            data={item.simpleTextEditor ?? {}}
                            meta={meta}
                            customReplacer={htmlRichTextReplacer}
                        />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
