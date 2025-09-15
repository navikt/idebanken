import { PartData } from '~/types/graphql-types'
import { Link_Card_List_Item, Maybe, Part_Idebanken_Link_Card_List } from '~/types/generated'
import { LinkHeading } from '~/components/parts/LinkHeading'
import { HGrid } from '@navikt/ds-react'
import { LinkCardView, LinkCardViewParams } from '~/components/parts/LinkCard'

function guideToLinkCardConfig(
    g: Link_Card_List_Item,
    cardType: string | undefined | null,
    bgColor: Maybe<string> | undefined
): LinkCardViewParams {
    return {
        url: g.url,
        external: false,
        title: g.title,
        description: g.description || '',
        iconName: cardType === 'withIcon' ? g.iconName || null : null,
        iconColor: cardType === 'withIcon' ? g.iconColor || null : null,
        bgColor: bgColor ?? '',
        categories: g.categories || [],
        imageUrl: cardType === 'withImage' ? g.imageUrl || null : null,
    }
}

export function LinkCardList({ part }: PartData<Part_Idebanken_Link_Card_List>) {
    const { list, displayType, heading, bgColor } = part.config
    const spanClass = displayType === 'withImage' ? 'md:col-span-4' : 'md:col-span-6'

    return (
        <>
            <section className="relative z-20">
                <LinkHeading
                    show={Boolean(heading)}
                    title={heading?.title}
                    href={heading?.href}
                    customClassName="mb-12"
                />
                <HGrid
                    columns={{ xs: 1, md: 12 }}
                    gap={{ xs: 'space-16', lg: 'space-20', xl: 'space-24' }}
                    className="items-start">
                    {list.map((g) => (
                        <div key={g.url} className={`col-span-1 ${spanClass}`}>
                            {LinkCardView(guideToLinkCardConfig(g, displayType, bgColor))}
                        </div>
                    ))}
                </HGrid>
            </section>
        </>
    )
}
