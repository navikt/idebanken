import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Link_Card_List } from '~/types/generated'
import { LinkHeading } from '~/components/parts/LinkHeading'
import { HGrid } from '@navikt/ds-react'
import { LinkCardView } from '~/components/parts/LinkCard'
import { XP_LinkCardList } from '@xp-types/site/parts'

export function LinkCardList({
    part,
    meta,
}: PartData<
    Pick<Part_Idebanken_Link_Card_List, 'list' | 'heading'> & Omit<XP_LinkCardList, 'list'>
>) {
    const { list, displayType, hideArrow, heading, brand, showDescription } = part.config
    const isThree = list.length === 3

    // 3-up if withImage; otherwise 2-up, except 3 items become 3-up at lg
    const spanClass =
        displayType === 'withImage' || displayType === 'withImageAndIcon'
            ? 'md:col-span-4'
            : isThree
              ? 'md:col-span-6 lg:col-span-4'
              : 'md:col-span-6'

    return (
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
                className="items-stretch">
                {list.map((linkCard) => (
                    <div key={linkCard.url} className={`col-span-1 ${spanClass} [&>*]:h-full`}>
                        {LinkCardView({
                            ...linkCard,
                            brand,
                            showDescription,
                            displayType,
                            hideArrow,
                            meta,
                        })}
                    </div>
                ))}
            </HGrid>
        </section>
    )
}
