import { object, string, picklist, InferOutput, nullable, transform, array, pipe } from 'valibot'

// Heading
export const headingConfigSchema = object({
  level: picklist(['1', '2', '3', '4', '5', '6']),
  size: picklist(['xlarge', 'large', 'medium', 'small', 'xsmall']),
  text: nullable(string()),
})

export type HeadingConfig = InferOutput<typeof headingConfigSchema>

// Button
export const buttonConfigSchema = object({
  variant: picklist(['primary', 'secondary', 'tertiary']),
  size: picklist(['medium', 'small', 'xsmall']),
  text: nullable(string()),
})

export type ButtonConfig = InferOutput<typeof buttonConfigSchema>

export const accordionItemSchema = object({
  simpleTextEditor: string(),
  header: string(),
})

// Accordion
export const accordionConfigSchema = object({
  accordionItem: pipe(
    array(accordionItemSchema),
    transform((value) => Array.isArray(value) ? value : value ? [value] : [])
  ),
})

export type AccordionConfig = InferOutput<typeof accordionConfigSchema>