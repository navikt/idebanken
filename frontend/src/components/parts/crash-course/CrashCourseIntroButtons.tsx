'use client'

import { VStack } from '@navikt/ds-react'
import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Crash_Course_Intro_Buttons } from '~/types/generated'
import FullscreenButton from '~/components/common/FullscreenButton'
import { ThemeButton } from '~/app/[locale]/theming/theme-button'

export default function CrashCourseIntroButtons({
    part,
}: PartData<Part_Idebanken_Crash_Course_Intro_Buttons>) {
    const { showFullscreenButton, showThemeButton } = part?.config || {}

    return (
        <VStack gap={'space-12'}>
            {showFullscreenButton && <FullscreenButton className={'w-fit'} withText />}
            {showThemeButton && (
                <ThemeButton
                    className={'w-fit rounded-full px-(--ax-space-24) [&_.aksel-label]:pt-0.75'}
                    variant={'secondary'}
                    size={'xsmall'}
                />
            )}
        </VStack>
    )
}
