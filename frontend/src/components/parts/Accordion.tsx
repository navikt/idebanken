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

    const { accordionItems, brand } = config

    return (
        <Accordion data-color={brand ?? 'neutral'} className="flex flex-col gap-3">
            {accordionItems.map((item, idx) => (
                <AccordionItem
                    key={idx}
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
