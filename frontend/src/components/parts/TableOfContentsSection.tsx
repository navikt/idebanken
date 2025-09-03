import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Table_Of_Contents_Section } from '~/types/generated'
import { HStack, VStack } from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'

export function TableOfContentsSection({
    part,
}: PartData<Part_Idebanken_Table_Of_Contents_Section>) {
    const { title, sectionNumber } = part?.config
    return (
        <VStack gap={'8'} className={'my-6'}>
            <div className="w-10 h-1 bg-dark-blue"></div>

            <HStack className="flex items-center gap-4 text-[#404040] uppercase tracking-wide m-0">
                <HeadingView
                    level={'3'}
                    size={'xsmall'}
                    className="flex items-center gap-4 text-[#404040] uppercase tracking-wide m-0">
                    <span>STEG {sectionNumber}</span>
                    <div aria-label=": " className="w-2 h-2 bg-[#1F1F1F] rounded-full"></div>
                    <span>{title}</span>
                </HeadingView>
            </HStack>
        </VStack>
    )
}
