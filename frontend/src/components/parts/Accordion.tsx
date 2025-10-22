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
import { TrackAccordion } from '~/components/common/analytics/TrackAccordion'

export const AccordionView = ({ part, meta }: PartData<Part_Idebanken_Accordion>) => {
    const config = validatedAccordionConfig(part.config)

    if (!config) return null

    const { accordionItems, brand } = config

    return (
        <Accordion data-color={brand ?? 'neutral'} className="flex flex-col gap-3">
            {accordionItems.map((item, idx) => (
                <TrackAccordion key={idx}>
                    <AccordionItem className="rounded-[10px]">
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
                </TrackAccordion>
            ))}
        </Accordion>
    )
}
