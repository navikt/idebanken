import { Accordion, AccordionContent, AccordionHeader } from '@navikt/ds-react/Accordion'
import type { Part_Idebanken_Accordion } from '~/types/generated.d.ts'
import { validatedAccordionConfig } from '~/utils/runtimeValidation'
import { PartData } from '~/types/graphql-types'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { AccordionItemTracked } from '~/components/common/analytics/AccordionItemTracked'

export const AccordionView = ({ part, meta }: PartData<Part_Idebanken_Accordion>) => {
    const config = validatedAccordionConfig(part.config)

    if (!config) return null

    const { accordionItems } = config

    return (
        <Accordion className="flex flex-col">
            {accordionItems.map((item, idx) => (
                <AccordionItemTracked key={idx}>
                    <AccordionHeader>{item.header}</AccordionHeader>
                    <AccordionContent>
                        <RichTextView
                            // @ts-expect-error data.processedHtml is not required
                            data={item.simpleTextEditor ?? {}}
                            meta={meta}
                            customReplacer={htmlRichTextReplacer}
                        />
                    </AccordionContent>
                </AccordionItemTracked>
            ))}
        </Accordion>
    )
}
