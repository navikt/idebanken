import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser'
import { BodyLong, Link } from '@navikt/ds-react'
import HeadingView from '~/components/parts/Heading'
import { List, ListItem } from '@navikt/ds-react/List'

function extractText(nodes: DOMNode[]): string {
    return nodes
        .map((node) => {
            if (typeof node === 'string') return node;
            if ('data' in node && typeof node.data === 'string') return node.data;
            if ('children' in node && Array.isArray(node.children)) return extractText(node.children as DOMNode[]);
            return '';
        })
        .join('');
}

function headingPart(level: string, size: string, el: Element) {
    return {
        config: {
            level,
            size,
            text: extractText(el.children as DOMNode[]),
        }
    }
}

export function parseHtml(html: string) {    
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode.type === 'tag') {
                const el = domNode as Element
                switch (el.name) {
                    case 'p':
                        return <BodyLong className="font-light" spacing>{domToReact(el.children as DOMNode[], options)}</BodyLong>
                    case 'h1': 
                        return <HeadingView part={headingPart('1', 'xlarge', el)} />
                    case 'h2': 
                        return <HeadingView part={headingPart('2', 'large', el)} />
                    case 'h3':
                        return <HeadingView part={headingPart('3', 'medium', el)} />
                    case 'h4':
                        return <HeadingView part={headingPart('4', 'small', el)} />
                    case 'h5':
                        return <HeadingView part={headingPart('5', 'xsmall', el)} />
                    case 'h6':
                        return <HeadingView part={headingPart('6', 'xsmall', el)} />
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