import {
    any,
    array,
    InferOutput,
    looseObject,
    nullable,
    object,
    optional,
    picklist,
    record,
    string,
} from 'valibot'

export const contentSchema = optional(
    nullable(
        looseObject({
            _id: string(),
        })
    )
)

export const mediaIntentTypeSchema = picklist(['download', 'inline'])

export const mediaSchema = object({
    __typename: optional(string()),
    content: contentSchema,
    intent: optional(nullable(mediaIntentTypeSchema)),
})

export const imageStyleSchema = object({
    __typename: optional(string()),
    aspectRatio: optional(nullable(string())),
    filter: optional(nullable(string())),
    name: optional(nullable(string())),
})

export const imageSchema = object({
    __typename: optional(string()),
    image: optional(nullable(contentSchema)),
    ref: optional(nullable(string())),
    style: optional(nullable(imageStyleSchema)),
})

export const linkSchema = object({
    __typename: optional(string()),
    content: optional(nullable(contentSchema)),
    media: optional(nullable(mediaSchema)),
    ref: optional(nullable(string())),
    uri: optional(nullable(string())),
})

export const macroConfigSchema = record(
    string(),
    optional(
        nullable(
            object({
                __typename: optional(string()),
                body: optional(nullable(string())),
            })
        )
    )
)

export const macroSchema = object({
    __typename: optional(string()),
    config: optional(nullable(macroConfigSchema)),
    descriptor: optional(nullable(string())),
    name: optional(nullable(string())),
    ref: optional(nullable(string())),
})

export const richTextSchema = nullable(
    object({
        __typename: optional(string()),
        images: array(nullable(imageSchema)),
        links: array(nullable(linkSchema)),
        macros: array(nullable(macroSchema)),
        macrosAsJson: optional(nullable(record(string(), any()))),
        processedHtml: string(),
        raw: optional(nullable(string())),
    })
)

export type RichTextData = InferOutput<typeof richTextSchema>
