import React from 'react'
import { APP_NAME, PartData } from '@enonic/nextjs-adapter'
import { Heading } from '@navikt/ds-react'
import { CommonType } from '../queries/common'

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`

export interface HeadingData {
    part: PartData
    common: CommonType
}

const HeadingView = ({ part, common }: HeadingData) => { 
    return (
        <Heading 
            level={part?.config?.level || 1}
            size={part?.config?.size || 'xlarge'}
            className="font-light">
                {part?.config?.heading || common?.get?.displayName}
        </Heading>
    )
}

export default HeadingView
