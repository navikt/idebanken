import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Table_Of_Contents } from '~/types/generated'
import { BodyShort, VStack } from '@navikt/ds-react'
import NextLink from 'next/link'
import { HeadingView } from '~/components/parts/Heading'
import { headingIdOfString } from '~/utils/utils'

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
                            <NextLink
                                href={`#${headingIdOfString(section ?? '')}`}
                                className="text-(--ax-text-decoration) underline hover:no-underline text-xl font-[400]">
                                {section}
                            </NextLink>
                        </li>
                    ))
                ) : (
                    <BodyShort>[Opprett layouts av typen &#34;Kort&#34;]</BodyShort>
                )}
            </ul>
        </VStack>
    )
}
