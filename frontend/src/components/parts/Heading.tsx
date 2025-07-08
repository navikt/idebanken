import { Heading } from '@navikt/ds-react'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { validatedHeadingConfig } from '~/utils/runtimeValidation'
import { PartData } from '~/types/graphql-types'
import { headingIdOfString } from '~/utils/utils'

const HeadingView = ({ part, common }: PartData<Part_Idebanken_Heading>) => {
    const config = validatedHeadingConfig(part.config)
    if (!config) {
        return null
    }

    const headingText = config.text ?? common?.get?.displayName
    return (
        <Heading
            id={headingIdOfString(headingText)}
            level={config.level}
            size={config.size}
            className="font-light">
            {headingText}
        </Heading>
    )
}

export default HeadingView
