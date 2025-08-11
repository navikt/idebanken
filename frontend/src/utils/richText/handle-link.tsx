import htmlParser, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import {
    getUrl,
    LinkData,
    MetaData,
    RENDER_MODE,
    ReplacerResult,
    RichTextData,
} from '@enonic/nextjs-adapter'
import { LINK_ATTR } from '@enonic/react-components/constants'
import { ElementType } from 'domelementtype'
import { Link } from '@navikt/ds-react'
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

    const processedHref = getUrl(href, meta)
    const children = domToReact(el.children as DOMNode[], options)

    return (
        <>
            <Link href={processedHref} target={target} title={title}>
                {children}
            </Link>
            {validateAnchorsAndReturnJSXElement(linkData, processedHref, meta)}
        </>
    )
}

/**
 * Validates that the anchor (h1-h6 id) exists in the linked content.
 * Only runs in edit, inline, or preview mode.
 */
async function validateAnchorsAndReturnJSXElement(
    linkData: LinkData,
    processedHref: string,
    meta: MetaData
) {
    if (![RENDER_MODE.EDIT, RENDER_MODE.INLINE, RENDER_MODE.PREVIEW].includes(meta.renderMode)) {
        // Only validate anchors in edit, inline, or preview mode
        return <></>
    }

    const anchors = Array.from(linkData?.uri.matchAll(/[?&]fragment=([^&]*)/g))?.map((anchor) => {
        return anchor[1]
    })
    if (!anchors?.length) {
        return <></>
    }

    const hrefWithoutParams = processedHref
        ?.replace(/[#&?][^/]*$/, '')
        ?.replace(/^\/admin\/.+\/draft\/idebanken/, '')

    try {
        // Fetch the full HTML content using the preview API
        const response = await fetch(
            `${process.env.__NEXT_PRIVATE_ORIGIN}/api/preview?path=${hrefWithoutParams}&token=${process.env.ENONIC_API_TOKEN}`,
            { next: { tags: ['content'] } }
        ).then((res) => res.text())

        // Extract all heading IDs from the HTML content
        const headingIds = extractHeadingIds(response)

        // Validate anchors
        const missingAnchors = anchors.filter((anchor) => !headingIds.includes(anchor))
        if (missingAnchors.length > 0) {
            console.warn(
                `Anchors not found in content "${meta.path}" at href ${hrefWithoutParams}:`,
                missingAnchors
            )
            return (
                <>
                    <br />
                    <span style={{ color: 'red', fontSize: '.8em' }}>
                        Feil i linken over! Fant ikke ankeret: {missingAnchors?.join(', eller: ')}
                    </span>
                    <br />
                    <span style={{ color: 'red', fontSize: '.8em' }}>
                        Mulige ankere på lenket side:{' '}
                        {headingIds?.map((id) => `"${id}"`)?.join(', ') || 'ingen'}
                    </span>
                </>
            )
        }
    } catch (error) {
        console.error(
            `Failed to validate anchors in content "${meta.path}" at href "${hrefWithoutParams}":`,
            error
        )
    }
    return <></>
}

/**
 * Extracts all heading IDs from HTML content
 * @param html The HTML content to parse
 * @returns Array of heading ID strings
 */
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
