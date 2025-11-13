import { PartData } from '~/types/graphql-types'
import { XP_ShowMore } from '@xp-types/site/parts'
import ShowMoreNonAksel from '~/components/common/ShowMoreNonAksel'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'

export default function ShowMorePart({ part, meta }: PartData<XP_ShowMore>) {
    const { title, simpleTextEditor } = part.config || {}

    return (
        <ShowMoreNonAksel
            name={title || 'Vis mer'}
            heading={title || '[Oppgi tittel]'}
            headingLevel={'2'}
            headingSize={'medium'}
            collapsedHeight={'7rem'}>
            <RichTextView
                // @ts-expect-error data.processedHtml is not required
                data={simpleTextEditor ?? {}}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
        </ShowMoreNonAksel>
    )
}
