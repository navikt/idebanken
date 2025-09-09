import { Bleed, PageBlockProps } from '@navikt/ds-react'
import { PageBlock } from '@navikt/ds-react/Page'
import React from 'react'
import { PAGE_FULL_WIDTH } from '~/utils/constants'

interface BleedingBackgroundPageBlockProps extends PageBlockProps {
    bgColor?: string | null
    children: React.ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements>
    customClassNames?: string
    layoutPath?: string
    backgroundStyle?: React.CSSProperties
}

export default function BleedingBackgroundPageBlock({
    bgColor,
    children,
    customClassNames,
    backgroundStyle,
    layoutPath,
    ...rest
}: Readonly<BleedingBackgroundPageBlockProps>) {
    return (
        <Bleed
            className={`${bgColor ?? 'bg-extra-light-pink'} overflow-y-auto ${customClassNames}`}
            marginInline={'full'}
            style={backgroundStyle}>
            <PageBlock
                width={layoutPath?.startsWith(`/${PAGE_FULL_WIDTH}/`) ? '2xl' : 'md'}
                gutters
                {...rest}>
                {children}
            </PageBlock>
        </Bleed>
    )
}
