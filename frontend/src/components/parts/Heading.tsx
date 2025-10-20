import { Heading } from '@navikt/ds-react'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { validatedHeadingConfig } from '~/utils/runtimeValidation'
import { PartData } from '~/types/graphql-types'
import { extractTextFromNodes, headingIdOfString } from '~/utils/utils'
import { HeadingConfig } from '~/types/valibot/parts'
import type { PropsWithChildren } from 'react'

const HeadingView = ({
    level,
    size,
    className = '',
    autoId = true,
    children,
    ...rest
}: PropsWithChildren<Omit<HeadingConfig, 'text'> & React.HTMLAttributes<HTMLHeadingElement>>) => {
    return (
        <Heading
            id={autoId && !rest.id ? headingIdOfString(extractTextFromNodes(children)) : rest.id}
            level={level}
            size={size}
            spacing
            {...rest}
            className={`font-light ${className}`}>
            {children}
        </Heading>
    )
}

const HeadingViewPart = ({ part, common }: PartData<Part_Idebanken_Heading>) => {
    const config = validatedHeadingConfig(part?.config)
    if (!config) {
        return null
    }

    return (
        <HeadingView level={config.level} size={config.size}>
            {config.text ?? common?.get?.displayName}
        </HeadingView>
    )
}

export { HeadingView, HeadingViewPart }
