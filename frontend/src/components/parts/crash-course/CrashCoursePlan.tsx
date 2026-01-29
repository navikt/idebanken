import { Part_Idebanken_Crash_Course_Plan } from '~/types/generated'
import { PartData } from '~/types/graphql-types'
import { forceArray } from '~/utils/utils'
import { BodyShort, Box, HStack, List, VStack } from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'
import { ListItem } from '@navikt/ds-react/List'
import { getUrl, RENDER_MODE } from '@enonic/nextjs-adapter'
import Image from 'next/image'
import React from 'react'

export function CrashCoursePlan({ meta, part }: PartData<Part_Idebanken_Crash_Course_Plan>) {
    const crashCourseParts = forceArray(part?.config?.parts)
    return (
        <HStack
            wrap={false}
            gap={'0'}
            className={
                'divide-x divide-(--ax-border-subtle) *:px-(--ax-space-32) *:first:pl-0 *:last:pr-0'
            }>
            {crashCourseParts.map((crashCoursePart, index) => (
                <VStack key={index}>
                    <Box
                        className={
                            'bg-(--ax-bg-moderateA) w-fit p-(--ax-space-12) rounded-full mb-(--ax-space-12)'
                        }>
                        <BodyShort size={'small'}>{crashCoursePart?.label}</BodyShort>
                    </Box>
                    <HeadingView level={'2'} size={'medium'} className={'mb-(--ax-space-24)'}>
                        {crashCoursePart?.title}
                    </HeadingView>
                    <List>
                        {crashCoursePart?.slides?.map((slide) => {
                            const { text, icon } = slide ?? {}
                            return (
                                <ListItem
                                    key={text}
                                    className={'flex flex-nowrap items-center'}
                                    icon={
                                        icon ? (
                                            <Image
                                                unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                                                src={getUrl(
                                                    (icon as unknown as { url: string }).url,
                                                    meta
                                                )}
                                                alt=""
                                                width={24}
                                                height={24}
                                            />
                                        ) : undefined
                                    }>
                                    <BodyShort>{text}</BodyShort>
                                </ListItem>
                            )
                        })}
                    </List>
                </VStack>
            ))}
        </HStack>
    )
}
