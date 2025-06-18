import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser'
import { BodyLong, Heading, Link } from '@navikt/ds-react'
import { List, ListItem } from '@navikt/ds-react/List'

export function parseHtml(html: string) {    
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode.type === 'tag') {
                const el = domNode as Element
                switch (el.name) {
                    case 'p':
                        return <BodyLong className="font-light" spacing>{domToReact(el.children as DOMNode[], options)}</BodyLong>
                    case 'h1':
                        return <Heading level="1" size="xlarge">{domToReact(el.children as DOMNode[], options)}</Heading>
                    case 'h2':
                        return <Heading level="2" size="large">{domToReact(el.children as DOMNode[], options)}</Heading>
                    case 'h3':
                        return <Heading level="3" size="medium">{domToReact(el.children as DOMNode[], options)}</Heading>
                    case 'h4':
                        return <Heading level="4" size="small">{domToReact(el.children as DOMNode[], options)}</Heading>
                    case 'h5':
                        return <Heading level="5" size="xsmall">{domToReact(el.children as DOMNode[], options)}</Heading>
                    case 'h6':
                        return <Heading level="6" size="xsmall">{domToReact(el.children as DOMNode[], options)}</Heading>
                    case 'ul':
                        return <List as="ul">{domToReact(el.children as DOMNode[], options)}</List>
                    case 'ol':
                        return <List as="ol">{domToReact(el.children as DOMNode[], options)}</List>
                    case 'li':
                        return <ListItem className="font-light">{domToReact(el.children as DOMNode[], options)}</ListItem>
                    case 'a': {
                        const href = el.attribs?.href || '#'
                        return (
                            <Link href={href} target={el.attribs?.target} rel={el.attribs?.rel}>
                                {domToReact(el.children as DOMNode[], options)}
                            </Link>
                        )
                    }
                }          
                // Add more mappings as needed
            }
        }
    }
    
    return parse(html, options)
}