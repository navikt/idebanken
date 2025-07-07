import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { getUrl, MetaData, ReplacerResult, RichTextData } from '@enonic/nextjs-adapter'
import { LINK_ATTR } from '@enonic/react-components/constants'
import { ElementType } from 'domelementtype'
import { Link } from '@navikt/ds-react'
import React from 'react'
import { ErrorComponent } from '@enonic/nextjs-adapter/views/BaseComponent'

export function handleLink(
    el: Element,
    data: RichTextData,
    meta: MetaData,
    options: HTMLReactParserOptions
): ReplacerResult {
    const { links } = data
    const {
        attribs: { href, [LINK_ATTR]: linkRef, target, title },
    } = el

    if (!linkRef) {
        // non-content links like mailto and external links
        const basicOptions: HTMLReactParserOptions = {
            replace: (node) => {
                if (node.type !== ElementType.Tag) return node
                const element = node as Element
                if (element.name === 'a') {
                    return element
                }
                return element
            },
        }
        const children = domToReact(el.children as DOMNode[], basicOptions)
        return (
            <Link href={href || '#'} target={target} rel={el.attribs?.rel} title={title}>
                {children}
            </Link>
        )
    }

    if (!href) {
        return <ErrorComponent reason={'Link element has no href attribute!'} />
    }

    if (!links || !links.length) {
        return (
            <ErrorComponent
                reason={"Can't replace link, when there are no links in the data object!"}
            />
        )
    }

    const linkData = links.find((data) => data.ref === linkRef)
    if (!linkData) {
        return (
            <ErrorComponent reason={`Unable to find link with ref ${linkRef} in links object!`} />
        )
    }

    const processedHref = getUrl(href, meta)
    const children = domToReact(el.children as DOMNode[], options)

    return (
        <Link href={processedHref} target={target} title={title}>
            {children}
        </Link>
    )
}
