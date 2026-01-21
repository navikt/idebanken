import { Bleed, BleedProps, PageBlockProps } from '@navikt/ds-react'
import { PageBlock } from '@navikt/ds-react/Page'
import React, { type PropsWithChildren } from 'react'
import { PAGE_FULL_WIDTH, PAGE_TEXT_WIDTH } from '~/utils/constants'
import { AkselColor } from '@navikt/ds-react/types/theme'
import { MetaData } from '@enonic/nextjs-adapter'

interface BleedingBackgroundPageBlockProps extends PageBlockProps, PropsWithChildren {
    bgColor?: string | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements>
    bleedClassName?: string
    layoutPath?: string
    backgroundStyle?: React.CSSProperties
    marginInline?: BleedProps['marginInline']
    overrideWidth?: PageBlockProps['width']
    noGutters?: boolean
    meta?: MetaData
}

const resolveWidth = (
    width: PageBlockProps['width'],
    layoutPath: string
): PageBlockProps['width'] =>
    width ||
    (layoutPath?.startsWith(`/${PAGE_FULL_WIDTH}/`)
        ? '2xl'
        : layoutPath?.startsWith(`/${PAGE_TEXT_WIDTH}/`)
          ? 'text'
          : 'md')

function resolveGutterOverride(resolvedWidth: PageBlockProps['width'], noGutters?: boolean) {
    if (!noGutters) return ''
    switch (resolvedWidth) {
        case 'text':
            return 'md:px-0!'
        case 'md':
            return 'lg:px-0!'
        case 'lg':
            return 'xl:px-0!'
        case 'xl':
            return '2xl:px-0!'
        default:
            return ''
    }
}

export default function BleedingBackgroundPageBlock({
    bgColor,
    children,
    className,
    bleedClassName,
    backgroundStyle,
    layoutPath,
    width,
    marginInline = 'full',
    noGutters,
    meta,
    ...rest
}: Readonly<BleedingBackgroundPageBlockProps>) {
    const resolvedWidth = resolveWidth(width, layoutPath || '')
    const resolvedGutters = resolveGutterOverride(resolvedWidth, noGutters)

    if (meta?.type?.startsWith('idebanken:crash-course')) {
        return children
    }

    return (
        <Bleed
            className={`bg-(--ax-bg-softA) overflow-y-auto ${bleedClassName}`}
            data-color={legacyBgToBrandColorMap(bgColor)}
            marginInline={marginInline}
            style={backgroundStyle}>
            <PageBlock
                {...rest}
                gutters
                width={resolvedWidth}
                className={`${className} ${resolvedGutters}`}>
                {children}
            </PageBlock>
        </Bleed>
    )
}

export const legacyBgToBrandColorMap = (bgColorOrBrand?: string | null): AkselColor | undefined => {
    const bgToBrand = {
        'bg-white': 'neutral',
        'bg-brand-white': 'neutral',
        'bg-extra-light-pink': 'ib-brand-pink',
        'bg-light-pink': 'ib-brand-pink',
        'bg-pink': 'ib-brand-pink',
        'bg-dark-blue': 'ib-brand-pink',
    } as Record<string, AkselColor>

    if (bgColorOrBrand && bgToBrand[bgColorOrBrand]) {
        return bgToBrand[bgColorOrBrand]
    } else if (!bgColorOrBrand) {
        return
    }
    return bgColorOrBrand as AkselColor
}
