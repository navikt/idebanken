import { parse } from 'valibot'
import {
    AccordionConfig,
    accordionConfigSchema,
    HeadingConfig,
    headingConfigSchema,
} from '~/types/valibot/parts'
import {
    ImageData,
    imageSchema,
    MacroData,
    macroSchema,
    RichTextData,
    richTextSchema,
} from '~/types/valibot/richTextSchema'
import {
    ImageData as ImageDataAdapter,
    MacroData as MacroDataAdapter,
    RichTextData as RichTExtDataAdapter,
} from '@enonic/nextjs-adapter'
import { Part_Idebanken_Accordion, Part_Idebanken_Heading } from '~/types/generated.d'

export function validatedHeadingConfig(config: Part_Idebanken_Heading): HeadingConfig | null {
    try {
        return parse(headingConfigSchema, config)
    } catch {
        console.error('Invalid heading config:', config)
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

export function validatedRichTextData(data: RichTExtDataAdapter): RichTextData | null {
    try {
        return parse(richTextSchema, data)
    } catch (e) {
        console.error('Invalid rich text data:', data, e)
        return null
    }
}

export function validatedMacro(macro: MacroDataAdapter | undefined): MacroData | null {
    try {
        return parse(macroSchema, macro)
    } catch (e) {
        console.error('Invalid macro:', e)
        return null
    }
}

export function validatedImage(image: ImageDataAdapter | undefined): ImageData | null {
    try {
        return parse(imageSchema, image)
    } catch (e) {
        console.error('Invalid image:', e)
        return null
    }
}
