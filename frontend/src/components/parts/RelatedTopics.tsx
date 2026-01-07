import { VStack } from '@navikt/ds-react'
import { PartData } from '~/types/graphql-types'
import type { Part_Idebanken_Related_Topics, Tag } from '~/types/generated'
import { ButtonView } from './Button'
import { HeadingView } from './Heading'

type IdebankenXData = {
    articleTags?: {
        themeTags?: Array<Tag | null> | null
    } | null
}

export default function RelatedTopics({
    part,
    common,
    meta,
}: PartData<Part_Idebanken_Related_Topics>) {
    const title = part.config?.title
    const idebankenX = (common.get?.x as { idebanken?: IdebankenXData | null })?.idebanken
    const tags = idebankenX?.articleTags?.themeTags?.filter((tag): tag is Tag => !!tag?.url) ?? []

    if (!tags.length) return null

    return (
        <VStack gap="space-16" className="rounded-xl bg-dark-blue-100 p-4">
            <HeadingView level="2" size="medium">
                {title || 'Tema du kan være interessert i'}
            </HeadingView>
            <div className="flex flex-wrap gap-6">
                {tags.map((tag) => (
                    <ButtonView
                        key={tag.id}
                        config={{
                            variant: 'secondary',
                            size: 'small',
                            url: tag.url || '#',
                            linkText: tag.name,
                            external: false,
                        }}
                        meta={meta}
                    />
                ))}
            </div>
        </VStack>
    )
}
