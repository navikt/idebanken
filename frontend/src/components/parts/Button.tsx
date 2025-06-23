import NextLink from 'next/link'
import { Button } from '@navikt/ds-react'
import { CommonType } from '../queries/common'
import { Part_Idebanken_Button } from '~/types/generated.d'
import { validatedButtonConfig } from '~/utils/runtimeValidation'

export interface ButtonData {
    part: { descriptor: string; config: Part_Idebanken_Button }
    common: CommonType
}

export const ButtonView = ({ part }: ButtonData) => {
    const config = validatedButtonConfig(part.config)
    if (!config) return null

    return (
        <Button 
            as={NextLink}
            href={config.url || '#'}
            variant={config.variant}
            size={config.size}
            target={config.external ? "_blank" : undefined}
        >
            {config.text}
        </Button> 
    )
}
