import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
} from '@navikt/ds-react/Accordion'
import type { Part_Idebanken_Accordion } from '~/types/generated.d.ts'
import { validatedAccordionConfig } from '~/utils/runtimeValidation'
import { PartData } from '~/types/graphql-types'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'

export interface AccordionData {
    part: { descriptor: string; config: Part_Idebanken_Accordion }
}

export const AccordionView = ({ part, meta }: PartData<Part_Idebanken_Accordion>) => {
    const config = validatedAccordionConfig(part.config)

    if (!config) return null

    const { accordionItems } = config

    return (
        <Accordion className="flex flex-col gap-3">
            {accordionItems.map((item, idx) => (
                <AccordionItem
                    key={idx}
                    className="
                        rounded-[10px]
                        shadow-accordion-item
                    ">
                    <AccordionHeader
                        className="flex-row-reverse justify-between px-6 py-5"
                        style={
                            {
                                '--a-font-size-heading-small': '1.25rem',
                                '--a-font-line-height-heading-small': '2rem',
                                '--a-font-weight-bold': '400',
                                '--ac-accordion-header-bg-hover': 'none',
                            } as React.CSSProperties
                        }>
                        {item.header}
                    </AccordionHeader>
                    <AccordionContent
                        className="px-6"
                        style={
                            {
                                '--a-font-size-large': '1.125rem',
                            } as React.CSSProperties
                        }>
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
