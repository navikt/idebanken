import { Heading } from '@navikt/ds-react'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { validatedHeadingConfig } from '~/utils/runtimeValidation'
import { PartData } from '~/types/graphql-types'
import { forceArray, headingIdOfString } from '~/utils/utils'
import { HeadingConfig } from '~/types/valibot/parts'
import { DOMNode } from 'html-react-parser'
import type { JSX } from 'react'

const HeadingView = ({
    level,
    size,
    children,
}: Omit<HeadingConfig, 'text'> & {
    children: string | JSX.Element | JSX.Element[] | undefined
}) => {
    const headingText = extractText(children)
    return (
        <Heading
            id={headingIdOfString(headingText)}
            level={level}
            size={size}
            className="font-light">
            {headingText}
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(nodes: any): string {
    return forceArray(nodes)
        .map((node) => {
            if (typeof node === 'string') return node
            if ('data' in node && typeof node.data === 'string') return node.data
            if ('children' in node && Array.isArray(node.children))
                return extractText(node.children as DOMNode[])
            return ''
        })
        .join('')
}

export { HeadingView, HeadingViewPart }
