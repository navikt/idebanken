import NextNavLink from '~/components/common/NextNavLink'
import { PropsWithChildren } from 'react'

export const LinkHeading = (
    props: PropsWithChildren<{
        show: boolean
        title?: string | null
        href?: string
        customClassName?: string
    }>
) => {
    if (!props.show) return null
    const base =
        'text-inherit navds-heading--medium hover:underline hover:[text-decoration-thickness:0.111em]'
    const className = props.customClassName ? `${base} ${props.customClassName}` : base

    return (
        <NextNavLink href={props.href || '#'} className={className}>
            {props.title || props.children || ''}
        </NextNavLink>
    )
}
