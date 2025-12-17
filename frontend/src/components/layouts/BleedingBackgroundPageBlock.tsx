import { Bleed, BleedProps, PageBlockProps } from '@navikt/ds-react'
import { PageBlock } from '@navikt/ds-react/Page'
import React, { type PropsWithChildren } from 'react'
import { PAGE_FULL_WIDTH, PAGE_TEXT_WIDTH } from '~/utils/constants'
import { AkselColor } from '@navikt/ds-react/types/theme'

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
            className={`bg-(--ax-bg-softA) overflow-y-auto ${bleedClassName}`}
            data-color={legacyBgToBrandColorMap(bgColor)}
            marginInline={marginInline}
            style={backgroundStyle}>
            <PageBlock {...rest} gutters width={resolvedWidth}>
                {children}
            </PageBlock>
        </Bleed>
    )
}

const legacyBgToBrandColorMap = (bgColorOrBrand?: string | null): AkselColor => {
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
    } else if (bgColorOrBrand) {
        return bgColorOrBrand as AkselColor
    }
    return 'neutral'
}
