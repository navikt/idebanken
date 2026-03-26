import { Accordion, AccordionContent, AccordionHeader } from '@navikt/ds-react/Accordion'
import type { Part_Idebanken_Accordion } from '~/types/generated.d.ts'
import { PartData } from '~/types/graphql-types'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { AccordionItemTracked } from '~/components/common/analytics/AccordionItemTracked'
import { forceArray } from '~/utils/utils'
import { PlaceholderComponent } from '@enonic/nextjs-adapter/views/BaseComponent'

export const AccordionView = ({ part, meta }: PartData<Part_Idebanken_Accordion>) => {
    const accordionItems = forceArray(part.config?.accordionItems).filter((it) => it !== null)

    if (!accordionItems) {
        return <PlaceholderComponent type={'Accordion'} descriptor={'idebanken:accordion'} />
    }

    return (
        <div data-color="accent-aksel">
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
        </div>
    )
}
