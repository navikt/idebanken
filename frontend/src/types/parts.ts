import { object, string, picklist, InferOutput, nullable } from 'valibot'

export const headingConfigSchema = object({
  level: picklist(['1', '2', '3', '4', '5', '6']),
  size: picklist(['xlarge', 'large', 'medium', 'small', 'xsmall']),
  text: nullable(string()),
})

export type HeadingConfig = InferOutput<typeof headingConfigSchema>