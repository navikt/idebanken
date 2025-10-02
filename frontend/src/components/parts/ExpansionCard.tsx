import type { Part_Idebanken_Expansion_Card } from '~/types/generated.d'
import {
    ExpansionCard,
    ExpansionCardDescription,
    ExpansionCardHeader,
    ExpansionCardTitle,
    ExpansionCardContent,
} from '@navikt/ds-react/ExpansionCard'
import { PartData } from '~/types/graphql-types'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'

export const ExpansionCardView = ({ part, meta }: PartData<Part_Idebanken_Expansion_Card>) => {
    const config = part.config
    return (
        <ExpansionCard
            data-color={config.brand || 'neutral'}
            aria-label="Expansion card"
            className="rounded-3xl">
            <ExpansionCardHeader>
                <ExpansionCardTitle as="h2" size="medium">
                    {config.header}
                </ExpansionCardTitle>
                <ExpansionCardDescription>{config.description}</ExpansionCardDescription>
            </ExpansionCardHeader>
            <ExpansionCardContent>
                <RichTextView
                    // @ts-expect-error data.processedHtml is not required
                    data={config.simpleTextEditor ?? {}}
                    meta={meta}
                    customReplacer={htmlRichTextReplacer}
                />
            </ExpansionCardContent>
        </ExpansionCard>
    )
}
