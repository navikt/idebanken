import { htmlRichTextReplacer } from 'utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { Part_Idebanken_Text_Editor } from '~/types/generated'
import { PartData } from '~/types/graphql-types'

export const TextEditorView = (props: PartData<Part_Idebanken_Text_Editor>) => {
    const { part } = props
    const richTextData = part.config?.simpleTextEditor ?? { processedHtml: '[Tomt innhold]' }
    const box = part.config?.boxColor ? `${part.config.boxColor} rounded-3xl p-6` : ''
    return (
        <RichTextView
            // @ts-expect-error data.processedHtml is not required
            data={richTextData}
            meta={props.meta}
            className={`${box}`}
            customReplacer={htmlRichTextReplacer}
        />
    )
}
