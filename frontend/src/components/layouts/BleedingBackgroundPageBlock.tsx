import { Bleed, BleedProps, PageBlockProps } from '@navikt/ds-react'
import { PageBlock } from '@navikt/ds-react/Page'
import React, { type PropsWithChildren } from 'react'
import { PAGE_FULL_WIDTH, PAGE_TEXT_WIDTH } from '~/utils/constants'

interface BleedingBackgroundPageBlockProps extends PageBlockProps, PropsWithChildren {
    bgColor?: string | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements>
    bleedClassName?: string
    layoutPath?: string
    backgroundStyle?: React.CSSProperties
    marginInline?: BleedProps['marginInline']
    overrideWidth?: PageBlockProps['width']
}

export default function BleedingBackgroundPageBlock({
    bgColor,
    children,
    bleedClassName,
    backgroundStyle,
    layoutPath,
    marginInline = 'full',
    ...rest
}: Readonly<BleedingBackgroundPageBlockProps>) {
    const resolvedWidth: PageBlockProps['width'] =
        rest.width ||
        (layoutPath?.startsWith(`/${PAGE_FULL_WIDTH}/`)
            ? '2xl'
            : layoutPath?.startsWith(`/${PAGE_TEXT_WIDTH}/`)
              ? 'text'
              : 'md')

    return (
        <Bleed
            className={`${bgColor} overflow-y-auto ${bleedClassName}`}
            marginInline={marginInline}
            style={backgroundStyle}>
            <PageBlock {...rest} gutters width={resolvedWidth}>
                {children}
            </PageBlock>
        </Bleed>
    )
}
