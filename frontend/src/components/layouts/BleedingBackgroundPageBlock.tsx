import { Bleed } from '@navikt/ds-react'
import { PageBlock } from '@navikt/ds-react/Page'
import React from 'react'

interface BleedingBackgroundPageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    bgColor?: string | null
    children: React.ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements>
    customClassNames?: string
}

export default function BleedingBackgroundPageBlock({
    bgColor,
    children,
    as,
    customClassNames,
    ...rest
}: Readonly<BleedingBackgroundPageBlockProps>) {
    return (
        <Bleed
            className={`${bgColor ?? 'bg-extra-light-pink'} ${customClassNames}`}
            marginInline={'full'}>
            <PageBlock {...rest} as={as ?? 'div'} width={'2xl'} gutters>
                {children}
            </PageBlock>
        </Bleed>
    )
}
