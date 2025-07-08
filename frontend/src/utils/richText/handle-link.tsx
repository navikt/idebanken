import htmlParser, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { getUrl, LinkData, MetaData, ReplacerResult, RichTextData } from '@enonic/nextjs-adapter'
import { LINK_ATTR } from '@enonic/react-components/constants'
import { ElementType } from 'domelementtype'
import { Link } from '@navikt/ds-react'
import React from 'react'
import { ErrorComponent } from '@enonic/nextjs-adapter/views/BaseComponent'
import { fetchContent } from '@enonic/nextjs-adapter/server'

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

    if (!links?.length) {
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

    const anchors = Array.from(linkData?.uri.matchAll(/[?&]fragment=([^&]*)/g))?.map((anchor) => {
        return anchor[1]
    })
    const processedHref = getUrl(href, meta)
    if (anchors?.length) {
        validateAnchors(anchors, meta, linkData, processedHref)
    }

    const children = domToReact(el.children as DOMNode[], options)

    return (
        <Link href={processedHref} target={target} title={title}>
            {children}
        </Link>
    )
}

async function validateAnchors(
    anchors: string[],
    meta: MetaData,
    linkData: LinkData,
    processedHref: string
) {
    const hrefWithoutParams = processedHref?.replace(/[#&?][^/]*$/, '')
    const content = await fetchContent({
        locale: meta?.locale,
        contentPath: hrefWithoutParams,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function findProcessedHtmlStrings(obj?: any, found: string[] = []): string[] {
        if (!obj || typeof obj !== 'object') return found

        for (const key in obj) {
            if (!Object.hasOwn(obj, key)) continue

            const value = obj[key]
            if (key === 'processedHtml' && typeof value === 'string') {
                found.push(value)
            } else if (typeof value === 'object') {
                findProcessedHtmlStrings(value, found)
            }
        }

        return found
    }

    // Extract all heading IDs from HTML content
    function extractHeadingIds(html: string): string[] {
        const ids: string[] = []

        htmlParser(html, {
            replace: (node) => {
                if (node.type === 'tag' && /^h[1-6]$/.test(node.name) && node.attribs?.id) {
                    ids.push(node.attribs.id)
                }
                return undefined
            },
        })

        return ids
    }

    // Process all content
    const htmlStrings = findProcessedHtmlStrings(content?.page)
    const allHeadingIds = htmlStrings.flatMap(extractHeadingIds)

    // Validate anchors
    const missingAnchors = anchors.filter((anchor) => !allHeadingIds.includes(anchor))
    if (missingAnchors.length > 0) {
        console.warn(`Anchors not found in ${hrefWithoutParams}:`, missingAnchors)
        // You could add more robust error handling here if needed
    }
}
