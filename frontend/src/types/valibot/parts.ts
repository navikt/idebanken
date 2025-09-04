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
    number,
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

// LinkCard
export const linkCardConfigSchema = pipe(
    object({
        url: nullish(string()),
        external: optional(nullable(boolean())),
        blockOptionSet: optional(blockOptionSetSchema),
        text: string(),
        description: optional(string()),
        iconName: nullish(string()),
        iconColor: nullish(string()),
        bgColor: string(),
        tags: optional(array(string())),
        image: nullish(imageDataSchema),
    }),
    transform((c) => {
        let url = c.url?.trim()
        let external = c.external ?? null
        if (!url && c.blockOptionSet) {
            const { url: dUrl, external: dExt } = transformBlockOptionSet(c.blockOptionSet)
            url = dUrl ?? undefined
            external = dExt
        }
        // Normalize internal URLs to relative (strip site root)
        if (url && external !== true) {
            url = buildRelativeInternalPath(url)
        }
        return {
            text: c.text,
            description: c.description || '',
            iconName: c.iconName || null,
            iconColor: c.iconColor || null,
            bgColor: c.bgColor,
            tags: c.tags || [],
            image: c.image || null,
            url,
            external: external ?? false,
        }
    })
)

export type LinkCardConfig = InferOutput<typeof linkCardConfigSchema>

// Section Guides part
export const sectionGuidesConfigSchema = object({
    overrideSection: optional(
        nullable(
            object({
                displayName: string(),
                _path: string(),
            })
        )
    ),
    selectedGuides: optional(
        nullable(
            array(
                object({
                    _path: string(),
                })
            )
        )
    ),
    limit: optional(nullable(number())),
    showHeading: optional(nullable(boolean())),
    cardType: optional(picklist(['withIcon', 'withImage'])),
})

export type SectionGuidesConfig = InferOutput<typeof sectionGuidesConfigSchema>

// Raw document card (accepts optional x-data categories)
const documentCardRawSchema = object({
    _path: string(),
    displayName: string(),
    data: optional(
        object({
            title: optional(string()),
            description: optional(string()),
            iconName: optional(string()),
            iconColor: optional(string()),
            image: optional(imageDataSchema),
            categories: optional(array(string())), // in case backend already flattens
        })
    ),
    // x-data structure (optional)
    x: optional(
        object({
            idebanken: optional(
                object({
                    category: optional(
                        object({
                            categories: optional(array(string())),
                        })
                    ),
                })
            ),
        })
    ),
})

export type DocumentCardConfigRaw = InferOutput<typeof documentCardRawSchema>

// Final normalized schema: categories always under data.categories (array<string>)
export const documentCardSchema = pipe(
    documentCardRawSchema,
    transform((raw) => {
        const catsFromX = raw.x?.idebanken?.category?.categories ?? raw.data?.categories ?? []
        return {
            _path: raw._path,
            displayName: raw.displayName,
            data: {
                title: raw.data?.title,
                description: raw.data?.description,
                iconName: raw.data?.iconName,
                iconColor: raw.data?.iconColor,
                image: raw.data?.image,
                categories: catsFromX,
            },
        }
    })
)

export type DocumentCardConfig = InferOutput<typeof documentCardSchema>
