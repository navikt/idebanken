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
import HeadingView from '~/components/parts/Heading'
import { ListItem } from '@navikt/ds-react/List'
import { MACRO_TAG } from '@enonic/react-components/constants'
import React from 'react'
import { handleLink } from '~/utils/richText/handle-link'
import { handleMacro } from '~/utils/richText/handle-macro'
import { handleImage } from '~/utils/richText/handle-image'
import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Heading } from '~/types/generated'

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
                    return headingPart('1', 'xlarge', el)
                case 'h2':
                    return headingPart('2', 'large', el)
                case 'h3':
                    return headingPart('3', 'medium', el)
                case 'h4':
                    return headingPart('4', 'small', el)
                case 'h5':
                    return headingPart('5', 'xsmall', el)
                case 'h6':
                    return headingPart('6', 'xsmall', el)
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
                    return React.createElement(
                        el.name,
                        attributesToProps(el.attribs),
                        domToReact(el.children as DOMNode[], options)
                    )
            }
        },
    }
    const replacer = options as { replace: (domNode: DOMNode, index?: number) => ReplacerResult }
    return replacer.replace(domNode)
}

function extractText(nodes: DOMNode[]): string {
    return nodes
        .map((node) => {
            if (typeof node === 'string') return node
            if ('data' in node && typeof node.data === 'string') return node.data
            if ('children' in node && Array.isArray(node.children))
                return extractText(node.children as DOMNode[])
            return ''
        })
        .join('')
}

function headingPart(level: string, size: string, el: Element) {
    const partData = {
        descriptor: 'idebanken:heading',
        config: {
            level,
            size,
            text: extractText(el.children as DOMNode[]),
        },
    } as PartData<Part_Idebanken_Heading>['part']

    // @ts-expect-error common and meta is not required for this part
    return <HeadingView part={partData} />
}
