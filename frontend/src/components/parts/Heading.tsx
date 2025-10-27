import { BodyLong, Heading } from '@navikt/ds-react'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { validatedHeadingConfig } from '~/utils/runtimeValidation'
import { PartData } from '~/types/graphql-types'
import { extractTextFromNodes, headingIdOfString } from '~/utils/utils'
import { HeadingConfig } from '~/types/valibot/parts'
import type { PropsWithChildren } from 'react'

function renderWithBodyShort(value: string, halfWidth: string) {
    return value
        .trim()
        .split(/\r?\n\s*\r?\n/)
        .filter(Boolean)
        .map((p, i) => (
            <BodyLong
                key={i}
                weight="regular"
                spacing
                size="large"
                className={`w-full ${halfWidth}`}>
                {p}
            </BodyLong>
        ))
}

const HeadingView = ({
    level,
    size,
    className = '',
    autoId = true,
    fontClass = `font-normal`,
    children,
    ...rest
}: PropsWithChildren<
    Omit<HeadingConfig, 'text'> & React.HTMLAttributes<HTMLHeadingElement> & { fontClass?: string }
>) => {
    return (
        <Heading
            id={autoId && !rest.id ? headingIdOfString(extractTextFromNodes(children)) : rest.id}
            level={level}
            size={size}
            spacing
            {...rest}
            className={`${fontClass} ${className}`}>
            {children}
        </Heading>
    )
}

const HeadingViewPart = ({ part, common }: PartData<Part_Idebanken_Heading>) => {
    const config = validatedHeadingConfig(part?.config)
    if (!config) {
        return null
    }

    const halfWidth = config?.halfWidth ? 'md:w-1/2' : ''

    return (
        <>
            <HeadingView level={config.level} size={config.size}>
                {config.text ?? common?.get?.displayName}
            </HeadingView>
            {config?.headingLede && renderWithBodyShort(config.headingLede, halfWidth)}
        </>
    )
}

export { HeadingView, HeadingViewPart }
