import React, { Fragment } from 'react'
import {APP_NAME, PartData, richTextQuery} from '@enonic/nextjs-adapter';
import htmlReactParser, {
    Element,
    domToReact,
    attributesToProps,
    DOMNode,
    HTMLReactParserOptions,
} from 'html-react-parser';
import { isTag, isText } from 'domhandler';
import { BodyLong, Heading, Link } from '@navikt/ds-react';

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

export interface TextEditorData {
    part: PartData;
    common: any;
}

export const TextEditorView = (props: TextEditorData) => {
    const {part, common} = props
    // console.log(props)
    // console.log({part})
    // console.log({common})
    const markup = { __html: part.config.myhtmlarea || 'Placeholder' };
    console.log({markup})
    return (
        // <div dangerouslySetInnerHTML={markup}>
        // </div>
        <ParsedHtml processedHtml={part.config.myhtmlarea} />
    )
};

export const TextEditorQuery = `query($path:ID!){
    guillotine {
        get(key:$path) {
            _path
            type
            displayName
            processedHtml
        }
    }
}`;

const getNonEmptyChildren = ({ children }: Element): Element['children'] => {
    if (!children) {
        return [];
    }

    return children.filter((child) => {
        if (isTag(child)) {
            // Macros and image tags are allowed to be empty
            if (
                (child.name === 'img' && child.attribs?.src)
            ) {
                return true;
            }

            const grandChildren = getNonEmptyChildren(child);
            return grandChildren.length > 0;
        }

        if (isText(child)) {
            const stringData = child.data?.replace?.(/&nbsp;/g, ' ').trim();
            return !!stringData;
        }

        return true;
    });
};

export const ParsedHtml = ({ processedHtml }) => {
    // const { editorView, language } = usePageContentProps();
    console.log('INSIDE COMP', processedHtml)

    console.log({processedHtml})

    if (!processedHtml) {
        return null;
    }

    // TODO: refactor this mess :D
    const parserOptions: HTMLReactParserOptions = {
        replace: (element: DOMNode) => {
            if (!isTag(element)) {
                return undefined;
            }

            const { name, attribs, children } = element;
            const tag = name?.toLowerCase();
            //Remove all inline styling except in table cells
            if (tag !== 'td') {
                delete attribs?.style;
            }
            const domNodes = children as DOMNode[];
            const props = !!attribs && attributesToProps(attribs);
            const validChildren = getNonEmptyChildren(element) as DOMNode[];
            const tagIsEmpty = validChildren.length === 0;


            // // Remove img without src
            // if (tag === 'img') {
            //     if (!attribs?.src) {
            //         return <Fragment />;
            //     }
            //     return (
            //         <NextImage
            //             {...props}
            //             alt={attribs.alt || ''}
            //             src={getMediaUrl(attribs.src, !!editorView, language)}
            //         />
            //     );
            // }

            // Fix header-tags
            // if (isHeadingTag(tag)) {
            //     // Header-tags should not be used as empty spacers
            //     if (tagIsEmpty) {
            //         return <p>{''}</p>;
            //     }

                // const level = tag === 'h1' ? '2' : headingToLevel[tag]; //Level 1 reserved for page heading
                // const level '2'
                // const size = 'large';


            //     return (
            //         // H1 tags should only be used for the page heading
            //         <Heading {...props} size={size} level={level} spacing>
            //             {domToReact(validChildren, parserOptions)}
            //         </Heading>
            //     );
            // }

            // Handle paragraphs
            if (tag === 'p' && children) {
                // Block level elements should not be nested under inline elements
                return (
                    <BodyLong spacing {...props} className={undefined}>
                        {domToReact(domNodes, parserOptions)}
                    </BodyLong>
                );
            }

            // Remove underline
            if (tag === 'u') {
                if (!children) {
                    return <Fragment />;
                }

                return <>{domToReact(domNodes, parserOptions)}</>;
            }

            // Handle links
            if (tag === 'a') {
                if (tagIsEmpty || typeof props.href !== 'string') {
                    return <Fragment />;
                }

                return (
                    <Link
                        {...props}
                        href={props.href}
                    >
                        {domToReact(validChildren, parserOptions)}
                    </Link>
                );
            }

            // Remove empty lists and other tags that should not be empty
            switch (tag) {
                case 'ul':
                case 'ol':
                case 'dl':
                case 'div':
                case 'thead':
                    if (tagIsEmpty) {
                        return <Fragment />;
                    }
                    break;
            }

            // Handle li - remove if empty
            if (tag === 'li') {
                if (tagIsEmpty) {
                    return <Fragment />;
                }
                return (
                    <BodyLong {...props} as={'li'}>
                        {domToReact(validChildren, parserOptions)}
                    </BodyLong>
                );
            }

            // // Table class fix, excluding large-table (statistics pages)
            // if (tag === 'table' && attribs?.class !== 'statTab') {
            //     return <Table>{domToReact(validChildren, parserOptions)}</Table>;
            // }

            // Replace empty rows with stylable element
            if (tag === 'tr' && tagIsEmpty) {
                return <tr {...props} role="none" className={'spacer-row'} />;
            }
        },
    };

    console.log({processedHtml})

    const htmlParsed = htmlReactParser(processedHtml, parserOptions);

//     // If the html renders to an empty string (or whitespace only), show an
//     // error message in the editor
//     // if (editorView === 'edit') {
//     //     const htmlRaw = ReactDOMServer.renderToStaticMarkup(
//     //         <Provider store={store}>{htmlParsed}</Provider>
//     //     ).trim();

//         // if (!htmlRaw) {
//         //     return (
//         //         <EditorHelp
//         //             text={"HTML'en er tom eller inneholder feil."}
//         //             globalWarningText={'Feil på riktekst/HTML-komponent'}
//         //             type={'error'}
//         //         />
//         //     );
//         // }
//     }

    return <>{htmlParsed}</>;
}