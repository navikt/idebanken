import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser'
import { BodyLong, Heading } from '@navikt/ds-react'

export function parseHtml(html: string) {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode.type === 'tag') {
                const el = domNode as Element
                console.log('el.name', el.name)
                switch (el.name) {
                    case 'p':
                        return <BodyLong>{domToReact(el.children as DOMNode[], options)}</BodyLong>
                    case 'h1':
                        return <Heading level="1" size="large">{domToReact(el.children as DOMNode[], options)}</Heading>
                    case 'h2':
                        return <Heading level="2" size="large">{domToReact(el.children as DOMNode[], options)}</Heading>
                    case 'h3':
                        return <Heading level="3" size="medium">{domToReact(el.children as DOMNode[], options)}</Heading>
                    // Add more mappings as needed
                }
            }
        }
    }
    return parse(html, options)
}