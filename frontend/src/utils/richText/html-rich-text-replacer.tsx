import { Replacer, ReplacerResult } from '@enonic/nextjs-adapter'
import { ElementType } from 'domelementtype'
import { BodyLong, List } from '@navikt/ds-react'
import {
    attributesToProps,
    DOMNode,
    domToReact,
    Element,
    HTMLReactParserOptions,
} from 'html-react-parser'
import { HeadingView } from '~/components/parts/Heading'
import { ListItem } from '@navikt/ds-react/List'
import { MACRO_TAG } from '@enonic/react-components/constants'
import React from 'react'
import { handleLink } from '~/utils/richText/handle-link'
import { handleMacro } from '~/utils/richText/handle-macro'
import { handleImage } from '~/utils/richText/handle-image'

export const htmlRichTextReplacer: Replacer = (
    domNode,
    data,
    meta,
    renderMacroInEditMode = true
): ReplacerResult => {
    const options: HTMLReactParserOptions = {
        replace: (domNode, _) => {
            if (domNode.type !== ElementType.Tag) {
                return domNode
            }
            const el = domNode as Element
            switch (el.name) {
                case 'p':
                    return (
                        <BodyLong {...attributesToProps(el.attribs)} className="font-light" spacing>
                            {domToReact(el.children as DOMNode[], options)}
                        </BodyLong>
                    )
                case 'h1':
                    return (
                        <HeadingView level="1" size="xlarge">
                            {domToReact(el.children as DOMNode[], options)}
                        </HeadingView>
                    )
                case 'h2':
                    return (
                        <HeadingView level="2" size="large">
                            {domToReact(el.children as DOMNode[], options)}
                        </HeadingView>
                    )
                case 'h3':
                    return (
                        <HeadingView level="3" size="medium">
                            {domToReact(el.children as DOMNode[], options)}
                        </HeadingView>
                    )
                case 'h4':
                    return (
                        <HeadingView level="4" size="small">
                            {domToReact(el.children as DOMNode[], options)}
                        </HeadingView>
                    )
                case 'h5':
                    return (
                        <HeadingView level="5" size="xsmall">
                            {domToReact(el.children as DOMNode[], options)}
                        </HeadingView>
                    )
                case 'h6':
                    return (
                        <HeadingView level="6" size="xsmall">
                            {domToReact(el.children as DOMNode[], options)}
                        </HeadingView>
                    )
                case 'ul':
                    return <List as="ul">{domToReact(el.children as DOMNode[], options)}</List>
                case 'ol':
                    return <List as="ol">{domToReact(el.children as DOMNode[], options)}</List>
                case 'li':
                    return (
                        <ListItem className="font-light">
                            {domToReact(el.children as DOMNode[], options)}
                        </ListItem>
                    )
                case 'a':
                    return handleLink(el, data, meta, options)
                case MACRO_TAG:
                    return handleMacro(el, data, meta, renderMacroInEditMode, options)
                case 'img':
                    return handleImage(el, data, meta)
                default:
                    return el.children?.length
                        ? React.createElement(
                              el.name,
                              attributesToProps(el.attribs),
                              domToReact(el.children as DOMNode[], options)
                          )
                        : el
            }
        },
    }
    const replacer = options as { replace: (domNode: DOMNode, index?: number) => ReplacerResult }
    return replacer.replace(domNode)
}
