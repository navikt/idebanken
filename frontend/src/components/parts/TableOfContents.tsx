import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Table_Of_Contents } from '~/types/generated'
import { List, VStack } from '@navikt/ds-react'
import { ListItem } from '@navikt/ds-react/List'
import NextLink from 'next/link'
import { ArrowDownRightIcon } from '@navikt/aksel-icons'
import { HeadingView } from '~/components/parts/Heading'
import { headingIdOfString } from '~/utils/utils'

export function TableOfContents({ part }: PartData<Part_Idebanken_Table_Of_Contents>) {
    const { sections, title } = part?.config
    return (
        <VStack className={'bg-[#FFE8E2] border-t-6 border-(--bg-pink) p-6'}>
            <HeadingView level={'2'} size={'small'} className="mb-0">
                {title}
            </HeadingView>
            <List className="list-disc list-inside">
                {sections?.map((section, index) => (
                    <ListItem key={index} icon={<ArrowDownRightIcon />}>
                        <NextLink
                            href={`#${headingIdOfString(section?.title ?? '')}`}
                            className="hover:underline">
                            {section?.title}
                        </NextLink>
                    </ListItem>
                ))}
            </List>
        </VStack>
    )
}
