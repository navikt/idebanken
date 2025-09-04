import NextLink from 'next/link'
import { Link } from '@navikt/ds-react'

export const LinkHeading = (props: {
    show: boolean
    title?: string | null
    href?: string
    customClassName?: string
}) => {
    if (!props.show) return null
    const base =
        'text-inherit navds-heading--medium hover:underline hover:[text-decoration-thickness:0.111em]'
    const className = props.customClassName ? `${base} ${props.customClassName}` : base

    return (
        <Link as={NextLink} href={props.href || '#'} className={className}>
            {props.title}
        </Link>
    )
}
