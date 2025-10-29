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
    const { list, displayType, hideArrow, nEachRow, heading, brand, showDescription } = part.config

    const spanClass = getSpanClass(nEachRow, list.length, displayType)

    return (
        <section className="relative z-20">
            <LinkHeading
                show={Boolean(heading)}
                title={heading?.title}
                href={heading?.href}
                customClassName="mb-12"
            />
            <HGrid
                columns={12}
                gap={{ xs: 'space-16', lg: 'space-20', xl: 'space-24' }}
                className="items-stretch">
                {list.map((linkCard) => (
                    <div key={linkCard.url} className={`col-span-12 ${spanClass} [&>*]:h-full`}>
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

function getSpanClass(
    nEachRow: XP_LinkCardList['nEachRow'],
    nItems: number,
    displayType: XP_LinkCardList['displayType']
): string {
    switch (nEachRow) {
        case '1':
            return 'md:col-span-12'
        case '2':
            return 'md:col-span-6'
        case '3':
            return 'md:col-span-4'
        case '4':
            return 'md:col-span-3'
        default: {
            if (displayType === 'withImage' || displayType === 'withImageAndIcon') {
                return 'sm:col-span-6 md:col-span-4'
            } else if (nItems % 3 === 0) {
                return 'md:col-span-6 lg:col-span-4'
            } else if (nItems % 2 === 0) {
                return 'md:col-span-6'
            } else {
                return 'md:col-span-6 xl:col-span-4'
            }
        }
    }
}
