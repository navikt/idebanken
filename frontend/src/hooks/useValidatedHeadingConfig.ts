import { parse } from 'valibot'
import { HeadingConfig, headingConfigSchema } from '~/types/parts'
import { Part_Idebanken_Heading } from '~/types/generated.d'

export default function useValidatedHeadingConfig(config: Part_Idebanken_Heading): HeadingConfig {
    try {
        return parse(headingConfigSchema, config)
    } catch {
        console.error('Invalid heading config:', config)
        return { level: '1', size: 'xlarge', text: '' }
    }
}