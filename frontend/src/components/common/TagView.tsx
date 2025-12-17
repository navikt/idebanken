import { Tag } from '@navikt/ds-react'
import { CircleFillIcon } from '@navikt/aksel-icons'
import { HTMLAttributes } from 'react'

export default function TagView({
    name,
    color,
    size = 'medium',
    ...rest
}: {
    name: string
    color?: string | null
    size: 'medium' | 'small' | 'xsmall'
} & Omit<HTMLAttributes<HTMLSpanElement>, 'color'>) {
    return (
        <Tag
            {...rest}
            variant="neutral"
            className={`shadow-none bg-transparent !m-0 p-0 gap-1.5 ${rest.className ?? ''}`}
            size={size}
            icon={
                <CircleFillIcon
                    className="mb-0.5"
                    width={9}
                    height={9}
                    color={`var(--${color ?? 'ib-brand-black'})`}
                    aria-hidden
                />
            }>
            {name}
        </Tag>
    )
}
