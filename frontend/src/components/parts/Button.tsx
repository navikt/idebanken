import React from 'react'
import { Button } from '@navikt/ds-react'
import { CommonType } from '../queries/common'
import { Part_Idebanken_Button } from '~/types/generated.d'
import { validatedButtonConfig } from '~/utils/runtimeValidation'

export interface ButtonData {
    part: { descriptor: string; config: Part_Idebanken_Button }
    common: CommonType
}

export const ButtonView = ({ part }: ButtonData) => {
    console.log('ButtonView', part)


    const config = validatedButtonConfig(part.config)
    if (!config) return null

    return (
        <Button variant={config.variant} size={config.size}>
            {part.config.text}
        </Button>
    )
}
