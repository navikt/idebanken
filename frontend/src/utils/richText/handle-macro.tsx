import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { MetaData, ReplacerResult, sanitizeGraphqlName, MacroData } from '@enonic/nextjs-adapter'
import { MACRO_ATTR } from '@enonic/react-components/constants'
import { ErrorComponent } from '@enonic/nextjs-adapter/views/BaseComponent'
import BaseMacro from '@enonic/nextjs-adapter/views/BaseMacro'
// import { validatedMacros } from '~/utils/runtimeValidation'

export function handleMacro(
    el: Element,
    macros: MacroData[] | undefined,
    meta: MetaData,
    renderMacroInEditMode: boolean,
    options: HTMLReactParserOptions
): ReplacerResult {
    // NB: should validate relevant macro

    if (!macros || !Array.isArray(macros)) {
        return <ErrorComponent reason={'No macro elements found!'} />
    }

    // const macros = validatedMacros(rawMacrosData)

    // if (!macros) {
    //     return <ErrorComponent reason={'Macro element contains errors!'} />
    // }

    const ref = el.attribs[MACRO_ATTR]

    if (!ref) {
        return <ErrorComponent reason={'Macro element has no data-macro-ref attribute!'} />
    }

    const macroData = macros.find((d) => d.ref === ref)

    if (!macroData) {
        return <ErrorComponent reason={'Unable to find macro with ref {ref} in macros object!'} />
    }

    const { descriptor, name, config: configs } = macroData

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
