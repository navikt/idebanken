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

// export const contentSchema = nullish(
//     looseObject({
//         _id: string(),
//     })
// )
export const contentSchema = record(string(), any())

export const mediaIntentTypeSchema = picklist(['download', 'inline'])

export const mediaSchema = object({
    __typename: optional(string()),
    content: contentSchema,
    intent: nullish(mediaIntentTypeSchema),
})

export const imageStyleSchema = object({
    __typename: optional(string()),
    aspectRatio: string(),
    filter: string(),
    name: string(),
})

export const imageSchema = object({
    __typename: optional(string()),
    image: contentSchema,
    ref: string(),
    style: optional(nullish(imageStyleSchema)),
})

export type ImageData = InferOutput<typeof imageSchema>

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

export type MacroData = InferOutput<typeof macroSchema>

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
