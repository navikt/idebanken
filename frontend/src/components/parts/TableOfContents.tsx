import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Table_Of_Contents } from '~/types/generated'
import { BodyShort, Link, VStack } from '@navikt/ds-react'
import NextLink from 'next/link'
import { HeadingView } from '~/components/parts/Heading'
import { headingIdOfString } from '~/utils/utils'
import TrackFirstLink from '~/components/common/analytics/TrackFirstLink'
import { AnalyticsEvents } from '~/utils/analytics/umami'

export function TableOfContents({ part }: PartData<Part_Idebanken_Table_Of_Contents>) {
    const { sections, title } = part?.config ?? {}

    return (
        <VStack className={'p-9 bg-(--ax-bg-accent-soft) rounded-3xl'}>
            <HeadingView
                id={'table-of-contents-heading'}
                level={'2'}
                size={'medium'}
                fontClass={'font-ib-regular'}>
                {title}
            </HeadingView>
            <ul className="pl-6 md:pl-8" aria-labelledby={'table-of-contents-heading'}>
                {sections?.length ? (
                    sections.map((section, index) => (
                        <li key={index} className="py-3">
                            <TrackFirstLink
                                key={index}
                                analyticsEventName={AnalyticsEvents.ANCHOR_LINK_CLICKED}
                                eventData={{ komponentId: 'innholdsfortegnelse' }}>
                                <Link
                                    as={NextLink}
                                    href={`#${headingIdOfString(section ?? '')}`}
                                    data-umami-ignore={true}
                                    className="text-xl font-[400]">
                                    {section}
                                </Link>
                            </TrackFirstLink>
                        </li>
                    ))
                ) : (
                    <BodyShort>[Opprett layouts av typen &#34;Kort&#34;]</BodyShort>
                )}
            </ul>
        </VStack>
    )
}
