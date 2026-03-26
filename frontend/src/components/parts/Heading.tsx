import { BodyLong, Heading } from '@navikt/ds-react'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { PartData } from '~/types/graphql-types'
import { extractTextFromNodes, headingIdOfString } from '~/utils/utils'
import type { PropsWithChildren } from 'react'
import { PlaceholderComponent } from '@enonic/nextjs-adapter/views/BaseComponent'

export type HeadingConfig = {
    level: '1' | '2' | '3' | '4' | '5' | '6'
    size:
        | 'display'
        | '4xlarge'
        | '3xlarge'
        | '2xlarge'
        | 'xlarge'
        | 'large'
        | 'medium'
        | 'small'
        | 'xsmall'
    text: string | null
    className?: string
    autoId?: boolean
    headingLede?: string | null
    halfWidth?: boolean
}

function renderWithBodyShort(value: string, halfWidth: string) {
    return value
        .trim()
        .split(/\r?\n\s*\r?\n/)
        .filter(Boolean)
        .map((p, i) => (
            <BodyLong
                key={i}
                spacing
                size="large"
                className={`w-full ${halfWidth} text-2xl/[150%]`}>
                {p}
            </BodyLong>
        ))
}

type AkselSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
type ExtendedSize = AkselSize | '2xlarge' | '3xlarge' | '4xlarge' | 'display'

function normalizeSize(size?: string): { aksel: AkselSize; overrideClass: string } {
    const overrideByExtra: Record<string, string> = {
        '2xlarge': 'text-[2.25rem] leading-10 md:text-[3rem] md:leading-15',
        '3xlarge': 'text-[2.75rem] leading-13 md:text-[3.25rem] md:leading-16',
        '4xlarge': 'text-[2.75rem] leading-13 md:text-[3.75rem] md:leading-[120%]',
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
            {...rest}
            className={`${fontClass} ${className} ${overrideClass}`}>
            {children}
        </Heading>
    )
}

const HeadingViewPart = ({ part, common }: PartData<Part_Idebanken_Heading>) => {
    const config = part?.config as unknown as HeadingConfig | null
    if (!config) {
        return <PlaceholderComponent type={'Heading'} descriptor={'idebanken:heading'} />
    }

    const halfWidth = config?.halfWidth ? 'md:w-1/2' : ''
    const partFontClass = ['small', 'xsmall'].includes(config.size ?? '')
        ? 'font-ib-bold'
        : undefined

    return (
        <>
            <HeadingView level={config.level} size={config.size} fontClass={partFontClass}>
                {config.text ?? common?.get?.displayName}
            </HeadingView>
            {config?.headingLede && renderWithBodyShort(config.headingLede, halfWidth)}
        </>
    )
}

export { HeadingView, HeadingViewPart }
