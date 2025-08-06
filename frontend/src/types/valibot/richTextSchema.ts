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

// export const macroConfigSchema = record(
//     string(),
//     nullish(
//         object({
//             __typename: optional(string()),
//             body: nullish(string()),
//         })
//     )
// )
export const macroConfigSchema = nullish(
    object({
        __typename: optional(string()),
        body: nullish(string()),
    })
)

export const macroSchema = object({
    __typename: optional(string()),
    config: record(string(), nullish(macroConfigSchema)),
    descriptor: string(),
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

/*
// Media intent type
export const mediaIntentTypeSchema = picklist(['download', 'inline'])

// Media schema
export const mediaSchema = object({
    __typename: optional(string()),
    content: optional(contentSchema),
    intent: optional(mediaIntentTypeSchema),
})

// Image style schema
export const imageStyleSchema = object({
    __typename: optional(string()),
    aspectRatio: optional(string()),
    filter: optional(string()),
    name: optional(string()),
})

// Image schema
export const imageSchema = object({
    __typename: optional(string()),
    image: optional(contentSchema),
    ref: string(),
    style: optional(imageStyleSchema),
})

// Link schema
export const linkSchema = object({
    __typename: optional(string()),
    content: optional(contentSchema),
    media: optional(mediaSchema),
    ref: string(),
    uri: string(),
})

// Macro config schema
export const macroConfigSchema = record(
    string(),
    object({
        __typename: optional(string()),
        body: optional(string()),
    })
)

// Macro schema
export const macroSchema = object({
    __typename: optional(string()),
    config: optional(macroConfigSchema),
    descriptor: string(),
    name: string(),
    ref: string(),
})

// Compatible RichTextData schema
export const richTextSchema = object({
    __typename: optional(string()),
    images: optional(array(imageSchema)),
    links: optional(array(linkSchema)),
    macros: optional(array(macroSchema)),
    macrosAsJson: optional(record(string(), any())),
    processedHtml: string(),
    raw: optional(string()),
})

export type RichTextData = InferOutput<typeof richTextSchema>
*/
