import {
    array,
    boolean,
    InferOutput,
    nullable,
    nullish,
    object,
    optional,
    picklist,
    pipe,
    string,
    transform,
    union,
} from 'valibot'
import { richTextSchema } from '~/types/valibot/richTextSchema'
import { buildRelativeInternalPath } from '~/utils/buildRelativeInternalPath'

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
    const sel = config?._selected

    if (sel === 'externalLink') {
        const raw = (config?.externalLink?.url || '').trim()
        if (!raw) return { url: undefined, external: true }
        const finalUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
        return { url: finalUrl, external: true }
    }
    if (sel === 'internalLink') {
        const pageUrl = config?.internalLink?.ideBankContentSelector?.pageUrl || ''
        const rel = buildRelativeInternalPath(pageUrl)
        return { url: rel, external: false }
    }

    return { url: undefined, external: false }
}

// Heading
export const headingConfigSchema = object({
    level: picklist(['1', '2', '3', '4', '5', '6']),
    size: picklist(['xlarge', 'large', 'medium', 'small', 'xsmall']),
    text: nullable(string()),
    className: optional(string()),
    autoId: optional(boolean()),
})

export type HeadingConfig = InferOutput<typeof headingConfigSchema>

// Button link
export const buttonConfigSchema = pipe(
    object({
        variant: picklist(['primary', 'secondary', 'tertiary', 'link']),
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

// Image
export const imageDataSchema = object({
    mediaUrl: optional(string()),
    imageUrl: optional(string()),
    data: object({
        caption: nullish(string()),
        altText: nullish(string()),
    }),
})
