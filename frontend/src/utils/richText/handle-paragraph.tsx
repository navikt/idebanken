import {
    attributesToProps,
    DOMNode,
    domToReact,
    Element,
    HTMLReactParserOptions,
} from 'html-react-parser'
import { ReplacerResult, UrlProcessor } from '@enonic/nextjs-adapter'
import { BodyLong } from '@navikt/ds-react'
import { ElementType } from 'domelementtype'

export function handleParagraph(
    el: Element,
    options: HTMLReactParserOptions
): ReplacerResult | string | boolean | object {
    // If the paragraph has only one child and that child is a macro tag, handle it
    const macroChild = isOnlyMacroChild(el)
    if (macroChild) {
        const replaced = options.replace?.(macroChild, 0)
        if (replaced) {
            return replaced
        }
    }

    // If the paragraph contains a mix of regular content and macro children,
    // split them: render non-macro nodes in a BodyLong and macros separately
    if (hasMacroChildThatCantBeRenderedWithinParagraph(el)) {
        const nonMacroChildren = el.children.filter(
            (child) =>
                !(
                    child.type === ElementType.Tag &&
                    (child as Element).name === UrlProcessor.MACRO_TAG
                )
        ) as DOMNode[]
        const macroChildren = el.children.filter(
            (child) =>
                child.type === ElementType.Tag && (child as Element).name === UrlProcessor.MACRO_TAG
        ) as DOMNode[]

        return (
            <>
                {nonMacroChildren.length > 0 && (
                    <BodyLong
                        {...attributesToProps(el.attribs)}
                        className="font-light last:mb-0 [&:has(+hr)]:mb-0"
                        spacing>
                        {domToReact(nonMacroChildren, options)}
                    </BodyLong>
                )}
                {domToReact(macroChildren, options)}
            </>
        )
    }

    return (
        <BodyLong
            {...attributesToProps(el.attribs)}
            className="font-light last:mb-0 [&:has(+hr)]:mb-0"
            spacing>
            {domToReact(el.children as DOMNode[], options)}
        </BodyLong>
    )
}

function isOnlyMacroChild(el: Element): Element | null {
    if (el.children?.length === 1) {
        const onlyChild = el.children[0]
        if (
            onlyChild &&
            onlyChild.type === ElementType.Tag &&
            (onlyChild as Element).name === UrlProcessor.MACRO_TAG
        ) {
            return onlyChild as Element
        }
    }
    return null
}

function hasMacroChildThatCantBeRenderedWithinParagraph(el: Element): boolean {
    return (
        el.children?.some(
            (child) =>
                child.type === ElementType.Tag && (child as Element).name === UrlProcessor.MACRO_TAG
        ) ?? false
    )
}
