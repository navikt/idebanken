import {
    any,
    array,
    InferOutput,
    looseObject,
    nullable,
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

export const macroConfigSchema = record(
    string(),
    nullish(
        object({
            __typename: optional(string()),
            body: nullish(string()),
        })
    )
)

export const macroSchema = object({
    __typename: optional(string()),
    config: nullish(macroConfigSchema),
    descriptor: nullish(string()),
    name: nullish(string()),
    ref: nullish(string()),
})

export const richTextSchema = nullable(
    object({
        __typename: optional(string()),
        images: array(nullable(imageSchema)),
        links: array(nullable(linkSchema)),
        macros: array(nullable(macroSchema)),
        macrosAsJson: nullish(record(string(), any())),
        processedHtml: string(),
        raw: nullish(string()),
    })
)

export type RichTextData = InferOutput<typeof richTextSchema>
