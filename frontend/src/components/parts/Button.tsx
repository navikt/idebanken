import NextLink from 'next/link'
import { Button, Link } from '@navikt/ds-react'
import { Part_Idebanken_Button } from '~/types/generated.d'
import { validatedButtonConfig } from '~/utils/runtimeValidation'
import { MouseEventHandler } from 'react'
import { PartData } from '~/types/graphql-types'
import { LinkHeading } from './LinkHeading'

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
        return <LinkHeading show={true} title={btn.text} href={btn.url || '#'} />
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
