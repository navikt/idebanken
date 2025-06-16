import { parse } from 'valibot'
import { 
            HeadingConfig, headingConfigSchema, 
            ButtonConfig, buttonConfigSchema 
        } from '~/types/parts'
import { 
            Part_Idebanken_Heading, 
            Part_Idebanken_Button 
        } from '~/types/generated.d'

export function validatedHeadingConfig(config: Part_Idebanken_Heading): HeadingConfig | null {
    try {
        return parse(headingConfigSchema, config)
    } catch {
        console.error('Invalid heading config:', config)
        return null
    }
}

export function validatedButtonConfig(config: Part_Idebanken_Button): ButtonConfig | null {
    try {
        return parse(buttonConfigSchema, config)
    } catch {
        console.error('Invalid button config:', config)
        return null
    }
}