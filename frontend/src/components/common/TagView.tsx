import { Tag } from '@navikt/ds-react'
import { CircleFillIcon } from '@navikt/aksel-icons'

export default function TagView({
    name,
    color,
    size = 'medium',
}: {
    name: string
    color?: string | null
    size: 'medium' | 'small' | 'xsmall'
}) {
    return (
        <Tag
            variant="neutral"
            className="shadow-none bg-transparent !m-0 gap-1"
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
