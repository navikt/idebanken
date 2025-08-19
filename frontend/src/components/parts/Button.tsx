import NextLink from 'next/link'
import { Button, Link } from '@navikt/ds-react'
import { Part_Idebanken_Button } from '~/types/generated.d'
import { validatedButtonConfig } from '~/utils/runtimeValidation'
import { MouseEventHandler } from 'react'
import { PartData } from '~/types/graphql-types'

export interface ButtonData {
    config?: Part_Idebanken_Button
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const ButtonView = ({
    part,
    config,
    onClick,
}: PartData<Part_Idebanken_Button> & ButtonData) => {
    const buttonConfig = part?.config ?? config
    const btn = validatedButtonConfig(buttonConfig)

    if (!btn) return null

    if (btn.variant === 'link') {
        return (
            <Link
                as={NextLink}
                href={btn.url || '#'}
                className="text-inherit navds-heading--medium hover:underline hover:[text-decoration-thickness:0.111em]">
                {btn.text}
            </Link>
        )
    }
    const buttonProps = {
        variant: btn.variant,
        size: btn.size || 'medium',
        children: btn.text,
        ...(btn.external ? { target: '_blank' } : {}),
        ...(btn.url ? { as: NextLink, href: btn.url || '#' } : { onClick }),
    }

    return <Button {...buttonProps} />
}
