import { htmlRichTextReplacer } from 'utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { Part_Idebanken_Text_Editor } from '~/types/generated'
import { PartData } from '~/types/graphql-types'
import BleedingBackgroundPageBlock, {
    legacyBgToBrandColorMap,
} from '../layouts/BleedingBackgroundPageBlock'
import { Box } from '@navikt/ds-react'
import classNames from 'classnames'

export const TextEditorView = (props: PartData<Part_Idebanken_Text_Editor>) => {
    const { part, meta } = props
    const { simpleTextEditor, boxColor, halfWidth } = part.config ?? {}

    const dataColor = legacyBgToBrandColorMap(boxColor)

    const content = (
        <Box className={classNames('w-full', halfWidth ? 'md:w-1/2' : '')}>
            <RichTextView
                // @ts-expect-error data is not required
                data={simpleTextEditor ?? { processedHtml: '[Tomt innhold]' }}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
        </Box>
    )

    if (!dataColor) {
        return content
    }

    return (
        <BleedingBackgroundPageBlock
            bgColor={dataColor}
            marginInline={{ md: 'space-48' }}
            bleedClassName={classNames(
                boxColor ? 'rounded-xl py-11' : '',
                dataColor === 'ib-brand-gray' ? 'border border-(--ax-border-subtleA)' : ''
            )}>
            {content}
        </BleedingBackgroundPageBlock>
    )
}
