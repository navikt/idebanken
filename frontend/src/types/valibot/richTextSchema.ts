import {
    any,
    array,
    InferOutput,
    looseObject,
    custom,
    nullish,
    object,
    optional,
    picklist,
    record,
    string,
} from 'valibot'

export const contentSchema = nullish(
    looseObject({
        _id: string(),
    })
)

export const mediaIntentTypeSchema = picklist(['download', 'inline'])

export const mediaSchema = object({
    __typename: optional(string()),
    content: contentSchema,
    intent: nullish(mediaIntentTypeSchema),
})

export const imageStyleSchema = object({
    __typename: optional(string()),
    aspectRatio: nullish(string()),
    filter: nullish(string()),
    name: nullish(string()),
})

export const imageSchema = object({
    __typename: optional(string()),
    image: nullish(contentSchema),
    ref: nullish(string()),
    style: nullish(imageStyleSchema),
})

export const linkSchema = object({
    __typename: optional(string()),
    content: nullish(contentSchema),
    media: nullish(mediaSchema),
    ref: nullish(string()),
    uri: nullish(string()),
})

export const macroConfigSchema = record(string(), any())

export const macroDescriptorSchema = custom<`${string}:${string}`>(
    (input) => typeof input === 'string' && input.includes(':') && input.split(':').length === 2
)

export const macroSchema = object({
    __typename: optional(string()),
    config: record(string(), nullish(macroConfigSchema)),
    descriptor: macroDescriptorSchema,
    name: string(),
    ref: string(),
})

export const richTextSchema = object({
    __typename: optional(string()),
    images: optional(array(imageSchema)),
    links: optional(array(linkSchema)),
    macros: optional(array(macroSchema)),
    macrosAsJson: nullish(record(string(), any())),
    processedHtml: string(),
    raw: nullish(string()),
})

export type RichTextData = InferOutput<typeof richTextSchema>
