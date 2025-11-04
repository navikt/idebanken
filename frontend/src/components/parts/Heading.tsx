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
            <BodyLong key={i} spacing size="large" className={`w-full ${halfWidth}`}>
                {p}
            </BodyLong>
        ))
}

type AkselSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
type ExtendedSize = AkselSize | '2xlarge' | '3xlarge' | 'display'

function normalizeSize(size?: string): { aksel: AkselSize; overrideClass: string } {
    const overrideByExtra: Record<string, string> = {
        '2xlarge': 'text-[2.75rem] leading-13 md:text-[3.25rem] md:leading-16',
        '3xlarge': 'text-[2.75rem] leading-13 md:text-[3.75rem] md:leading-[120%]',
        display: 'text-[2.75rem] leading-13 md:text-[4.5rem] md:leading-[120%]',
    }

    if (!size) return { aksel: 'medium', overrideClass: '' }

    if (['xsmall', 'small', 'medium', 'large', 'xlarge'].includes(size)) {
        return { aksel: size as AkselSize, overrideClass: '' }
    }

    // Any non-Aksel size: use xlarge as base and override with custom CSS
    return { aksel: 'xlarge', overrideClass: overrideByExtra[size] ?? '' }
}

const HeadingView = ({
    level,
    size,
    className = '',
    autoId = true,
    fontClass = 'font-ib-regular',
    children,
    ...rest
}: PropsWithChildren<
    Omit<HeadingConfig, 'text'> &
        React.HTMLAttributes<HTMLHeadingElement> & {
            fontClass?: string
            size?: ExtendedSize | string
        }
>) => {
    const { aksel, overrideClass } = normalizeSize(size as string | undefined)

    return (
        <Heading
            id={autoId && !rest.id ? headingIdOfString(extractTextFromNodes(children)) : rest.id}
            level={level}
            size={aksel}
            spacing
            {...rest}
            className={`${fontClass} ${className} ${overrideClass}`}>
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
