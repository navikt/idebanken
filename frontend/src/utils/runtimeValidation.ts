import { Link } from './../types/generated.d'
import { parse } from 'valibot'
import {
    AccordionConfig,
    accordionConfigSchema,
    ButtonConfig,
    buttonConfigSchema,
    HeadingConfig,
    headingConfigSchema,
    InfoBoxConfig,
    infoBoxConfigSchema,
    LinkCardConfig,
    linkCardConfigSchema,
} from '~/types/valibot/parts'
import {
    Part_Idebanken_Accordion,
    Part_Idebanken_Button,
    Part_Idebanken_Heading,
    Part_Idebanken_Info_Box,
    Part_Idebanken_Link_Card,
} from '~/types/generated.d'

export function validatedHeadingConfig(config: Part_Idebanken_Heading): HeadingConfig | null {
    try {
        return parse(headingConfigSchema, config)
    } catch {
        console.error('Invalid heading config:', config)
        return null
    }
}

export function validatedButtonConfig(
    config: Part_Idebanken_Button | undefined
): ButtonConfig | null {
    try {
        return parse(buttonConfigSchema, config)
    } catch {
        console.error('Invalid button config:', config)
        return null
    }
}

export function validatedAccordionConfig(config: Part_Idebanken_Accordion): AccordionConfig | null {
    try {
        return parse(accordionConfigSchema, config)
    } catch {
        console.error('Invalid accordion config:', config)
        return null
    }
}

export function validatedInfoBoxConfig(config: Part_Idebanken_Info_Box): InfoBoxConfig | null {
    try {
        return parse(infoBoxConfigSchema, config)
    } catch {
        console.error('Invalid info box config:', config)
        return null
    }
}

export function validatedLinkCardConfig(config: Part_Idebanken_Link_Card): LinkCardConfig | null {
    try {
        return parse(linkCardConfigSchema, config)
    } catch {
        console.error('Invalid link card config:', config)
        return null
    }
}
