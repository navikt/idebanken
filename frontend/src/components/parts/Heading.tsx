import { Heading } from '@navikt/ds-react'
import { CommonType } from '../queries/common'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import useValidatedHeadingConfig from '~/hooks/useValidatedHeadingConfig'

export interface HeadingData {
    part: { descriptor: string, config: Part_Idebanken_Heading }
    common: CommonType
}

const HeadingView = ({ part, common }: HeadingData) => { 
    const config = useValidatedHeadingConfig(part.config)

    return (
        <Heading 
            level={config.level}
            size={config.size}
            className="font-light"
        >
            {config.text || common?.get?.displayName}
        </Heading>
    )
}

export default HeadingView
