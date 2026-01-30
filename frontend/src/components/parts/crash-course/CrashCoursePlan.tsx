import { Part_Idebanken_Crash_Course_Plan } from '~/types/generated'
import { PartData } from '~/types/graphql-types'
import { forceArray } from '~/utils/utils'
import { BodyShort, Box, HGrid, List, VStack } from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'
import { ListItem } from '@navikt/ds-react/List'
import { getUrl, RENDER_MODE } from '@enonic/nextjs-adapter'
import Image from 'next/image'
import React from 'react'
import { PlaceholderComponent } from '@enonic/nextjs-adapter/views/BaseComponent'

export function CrashCoursePlan({ meta, part }: PartData<Part_Idebanken_Crash_Course_Plan>) {
    const crashCourseParts = forceArray(part?.config?.parts)

    if (!crashCourseParts.length) {
        return (
            <PlaceholderComponent type={'Lynkurs plan/oversikt'} descriptor={'crash-course-plan'} />
        )
    }

    return (
        <HGrid
            columns={crashCourseParts.length >= 3 ? 3 : crashCourseParts.length}
            gap={'0'}
            className={
                'divide-x divide-(--ax-border-default) *:px-(--ax-space-24) *:first:pl-0 *:last:pr-0'
            }>
            {crashCourseParts.map((crashCoursePart, index) => (
                <VStack key={index}>
                    {crashCoursePart?.label && (
                        <Box
                            className={
                                'bg-(--ax-bg-moderateA) w-fit p-(--ax-space-12) rounded-full mb-(--ax-space-12)'
                            }>
                            <BodyShort size={'small'}>{crashCoursePart.label}</BodyShort>
                        </Box>
                    )}
                    {crashCoursePart?.title && (
                        <HeadingView level={'2'} size={'medium'} className={'mb-(--ax-space-24)'}>
                            {crashCoursePart.title}
                        </HeadingView>
                    )}
                    {crashCoursePart?.slides && (
                        <List>
                            {crashCoursePart.slides.map((slide, i) => {
                                const { text, icon } = slide ?? { text: i.toString() }
                                return (
                                    <ListItem
                                        key={text}
                                        className={'flex flex-nowrap items-center'}
                                        icon={
                                            icon ? (
                                                <Image
                                                    unoptimized={
                                                        meta.renderMode !== RENDER_MODE.NEXT
                                                    }
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
                    )}
                </VStack>
            ))}
        </HGrid>
    )
}
