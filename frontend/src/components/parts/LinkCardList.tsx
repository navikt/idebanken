import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Link_Card_List } from '~/types/generated'
import { LinkHeading } from '~/components/parts/LinkHeading'
import { HGrid } from '@navikt/ds-react'
import { LinkCardView } from '~/components/parts/LinkCard'

export function LinkCardList({ part, meta }: PartData<Part_Idebanken_Link_Card_List>) {
    const { list, displayType, heading, brand, showDescription } = part.config
    const spanClass = displayType === 'withImage' ? 'md:col-span-4' : 'md:col-span-6'

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
                className="items-start">
                {list.map((linkCard) => (
                    <div key={linkCard.url} className={`col-span-1 ${spanClass}`}>
                        {LinkCardView({ ...linkCard, brand, showDescription, displayType, meta })}
                    </div>
                ))}
            </HGrid>
        </section>
    )
}
