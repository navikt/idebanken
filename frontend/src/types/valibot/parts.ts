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

// Heading
export const headingConfigSchema = object({
    level: picklist(['1', '2', '3', '4', '5', '6']),
    size: picklist(['xlarge', 'large', 'medium', 'small', 'xsmall']),
    text: nullable(string()),
    className: optional(string()),
    autoId: optional(boolean()),
    headingLede: optional(string()),
    halfWidth: optional(boolean()),
})

export type HeadingConfig = InferOutput<typeof headingConfigSchema>

// Accordion
export const accordionItemSchema = object({
    simpleTextEditor: richTextSchema,
    header: string(),
})

export const accordionConfigSchema = object({
    brand: optional(string()),
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
