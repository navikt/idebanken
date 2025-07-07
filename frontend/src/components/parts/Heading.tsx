import { Heading } from '@navikt/ds-react'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { validatedHeadingConfig } from '~/utils/runtimeValidation'
import { PartData } from '~/types/graphql-types'

const HeadingView = ({ part, common }: PartData<Part_Idebanken_Heading>) => {
    const config = validatedHeadingConfig(part.config)
    if (!config) return null

    return (
        <Heading level={config.level} size={config.size} className="font-light">
            {config.text ?? common?.get?.displayName}
        </Heading>
    )
}

export default HeadingView
