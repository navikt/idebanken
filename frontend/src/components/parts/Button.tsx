import React from 'react'
import { PartData } from '@enonic/nextjs-adapter'
import { Button } from '@navikt/ds-react'
import { CommonType } from '../queries/common'

export interface ButtonData {
    part: PartData
    common: CommonType
}

export const ButtonView = ({ part, common }: ButtonData) => {
    return <Button variant={part?.config?.variant}>{part?.config?.text || '<placeholder>'}</Button>
}
