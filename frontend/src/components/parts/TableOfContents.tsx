import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Table_Of_Contents } from '~/types/generated'
import { BodyShort, List, VStack } from '@navikt/ds-react'
import { ListItem } from '@navikt/ds-react/List'
import NextLink from 'next/link'
import { HeadingView } from '~/components/parts/Heading'
import { headingIdOfString } from '~/utils/utils'

export function TableOfContents({ part }: PartData<Part_Idebanken_Table_Of_Contents>) {
    const { sections, title } = part?.config ?? {}

    return (
        <VStack className={'p-9 bg-(--ax-bg-accent-soft) rounded-xl'}>
            <HeadingView
                id={'table-of-contents-heading'}
                level={'2'}
                size={'small'}
                fontClass={'font-normal'}>
                {title}
            </HeadingView>
            <List
                as={'ol'}
                className="list-disc list-inside"
                size={'large'}
                aria-labelledby={'table-of-contents-heading'}>
                {sections?.length ? (
                    sections.map((section, index) => (
                        <ListItem key={index}>
                            <NextLink
                                href={`#${headingIdOfString(section ?? '')}`}
                                className="text-(--ax-text-decoration) underline hover:no-underline text-lg">
                                {section}
                            </NextLink>
                        </ListItem>
                    ))
                ) : (
                    <BodyShort>[Opprett layouts av typen &#34;Kort&#34;]</BodyShort>
                )}
            </List>
        </VStack>
    )
}
