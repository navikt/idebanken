import { parse } from 'valibot'
import { HeadingConfig, headingConfigSchema } from '~/types/parts'
import { Part_Idebanken_Heading } from '~/types/generated.d'

export function validatedHeadingConfig(config: Part_Idebanken_Heading): HeadingConfig | null {
    try {
        return parse(headingConfigSchema, config)
    } catch {
        console.error('Invalid heading config:', config)
        return null
    }
}