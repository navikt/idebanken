import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { MetaData, ReplacerResult, sanitizeGraphqlName, MacroData } from '@enonic/nextjs-adapter'
import { MACRO_ATTR } from '@enonic/react-components/constants'
import { ErrorComponent } from '@enonic/nextjs-adapter/views/BaseComponent'
import BaseMacro from '@enonic/nextjs-adapter/views/BaseMacro'
import { validatedMacro } from '~/utils/runtimeValidation'

export function handleMacro(
    el: Element,
    macros: MacroData[] | undefined,
    meta: MetaData,
    renderMacroInEditMode: boolean,
    options: HTMLReactParserOptions
): ReplacerResult {
    if (!macros || !Array.isArray(macros)) {
        return <ErrorComponent reason={'No macro-elements found!'} />
    }

    const ref = el.attribs[MACRO_ATTR]

    if (!ref) {
        return <ErrorComponent reason={'Macro element has no data-macro-ref attribute!'} />
    }

    const macroData = macros.find((d) => d.ref === ref)

    const validMacroData = validatedMacro(macroData)

    if (!validMacroData) {
        return <ErrorComponent reason={'Invalid macro data!'} />
    }

    const { descriptor, name, config: configs } = validMacroData

    const macroKey = sanitizeGraphqlName(name)
    const originalConfig = configs[macroKey]
    const macroProps = {
        name,
        descriptor: descriptor as `${string}:${string}`,
        config: originalConfig
            ? {
                  [macroKey]: {
                      ...originalConfig,
                      body: originalConfig.body?.replace(/youtube\.com/g, 'youtube-nocookie.com'),
                  },
              }
            : {},
    }

    const children = domToReact(el.children as DOMNode[], options)

    return (
        <BaseMacro data={macroProps} meta={meta} renderInEditMode={renderMacroInEditMode}>
            {children}
        </BaseMacro>
    )
}
