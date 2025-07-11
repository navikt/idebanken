import {
    array,
    InferOutput,
    nullable,
    object,
    optional,
    picklist,
    pipe,
    string,
    transform,
    union,
} from 'valibot'
import { richTextSchema } from '~/types/valibot/richTextSchema'

// External / Internal Link
export type BlockOptionSet = {
    _selected?: string
    externalLink?: { url?: string | null } | null
    internalLink?: {
        ideBankContentSelector?: { pageUrl?: string | null } | null
    } | null
}

export const blockOptionSetSchema = optional(
    nullable(
        object({
            _selected: string(),
            externalLink: nullable(
                object({
                    url: nullable(string()),
                })
            ),
            internalLink: nullable(
                object({
                    ideBankContentSelector: nullable(
                        object({
                            pageUrl: nullable(string()),
                        })
                    ),
                })
            ),
        })
    )
)

export function transformBlockOptionSet(config?: BlockOptionSet | null) {
    let url: string | null = null
    let external: boolean | null = null
    const selected = config?._selected
    if (selected === 'externalLink') {
        external = true
        const extUrl = config?.externalLink?.url || ''
        if (extUrl) {
            url = /^https?:\/\//i.test(extUrl) ? extUrl : `https://${extUrl}`
        }
    }
    if (selected === 'internalLink') {
        external = false
        const pageUrl = config?.internalLink?.ideBankContentSelector?.pageUrl || ''
        if (pageUrl) {
            const match = pageUrl.match(/\/(?:master|draft)\/idebanken(\/.*)/)
            url = match ? match[1] : pageUrl
        }
    }
    return { url, external }
}

// Heading
export const headingConfigSchema = object({
    level: picklist(['1', '2', '3', '4', '5', '6']),
    size: picklist(['xlarge', 'large', 'medium', 'small', 'xsmall']),
    text: nullable(string()),
})

export type HeadingConfig = InferOutput<typeof headingConfigSchema>

// Button link
export const buttonConfigSchema = pipe(
    object({
        variant: picklist(['primary', 'secondary', 'tertiary']),
        size: picklist(['medium', 'small', 'xsmall']),
        text: nullable(string()),
        blockOptionSet: blockOptionSetSchema,
    }),
    transform((config) => {
        const { url, external } = transformBlockOptionSet(config.blockOptionSet)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { blockOptionSet, ...rest } = config
        return { ...rest, url, external }
    })
)

export type ButtonConfig = InferOutput<typeof buttonConfigSchema>

// Accordion
export const accordionItemSchema = object({
    simpleTextEditor: richTextSchema,
    header: string(),
})

export const accordionConfigSchema = object({
    accordionItems: pipe(
        union([array(accordionItemSchema), accordionItemSchema]),
        transform((value) => (Array.isArray(value) ? value : value ? [value] : []))
    ),
})

export type AccordionConfig = InferOutput<typeof accordionConfigSchema>

// InfoBox
export const infoBoxItemSchema = object({
    bgColor: string(),
    simpleTextEditor: richTextSchema,
})

export const infoBoxConfigSchema = object({
    infoBoxItems: pipe(
        union([array(infoBoxItemSchema), infoBoxItemSchema]),
        transform((value) => (Array.isArray(value) ? value : value ? [value] : []))
    ),
})

export type InfoBoxConfig = InferOutput<typeof infoBoxConfigSchema>

// LinkCard
export const linkCardConfigSchema = pipe(
    object({
        text: nullable(string()),
        blockOptionSet: blockOptionSetSchema,
    }),
    transform((config) => {
        const { url, external } = transformBlockOptionSet(config.blockOptionSet)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { blockOptionSet, ...rest } = config
        return { ...rest, url, external }
    })
)

export type LinkCardConfig = InferOutput<typeof linkCardConfigSchema>
