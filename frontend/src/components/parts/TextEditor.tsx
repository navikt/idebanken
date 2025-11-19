import { htmlRichTextReplacer } from 'utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { Part_Idebanken_Text_Editor } from '~/types/generated'
import { PartData } from '~/types/graphql-types'
import BleedingBackgroundPageBlock from '../layouts/BleedingBackgroundPageBlock'

export const TextEditorView = (props: PartData<Part_Idebanken_Text_Editor>) => {
    const { part, meta } = props

    const richTextData = part.config?.simpleTextEditor ?? { processedHtml: '[Tomt innhold]' }
    const bleed = Boolean(part.config?.boxColor)
    const box = bleed ? `${part.config.boxColor} rounded-xl py-11` : ''
    const halfWidth = part.config?.halfWidth ? 'md:w-1/2' : ''

    const content = (
        <div className={`w-full ${halfWidth}`}>
            <RichTextView
                // @ts-expect-error data.processedHtml is not required
                data={richTextData ?? {}}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
        </div>
    )

    if (!bleed) {
        return content
    }

    return (
        <BleedingBackgroundPageBlock marginInline="11" bleedClassName={box}>
            {content}
        </BleedingBackgroundPageBlock>
    )
}
