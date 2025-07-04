import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { MetaData, ReplacerResult, RichTextData, sanitizeGraphqlName } from '@enonic/nextjs-adapter'
import { MACRO_ATTR } from '@enonic/react-components/constants'
import { ErrorComponent } from '@enonic/nextjs-adapter/views/BaseComponent'
import BaseMacro from '@enonic/nextjs-adapter/views/BaseMacro'
import React from 'react'

export function handleMacro(
	el: Element,
	data: RichTextData,
	meta: MetaData,
	renderMacroInEditMode: boolean,
	options: HTMLReactParserOptions
): ReplacerResult {
	const ref = el.attribs[MACRO_ATTR]
	if (!ref) {
		return <ErrorComponent reason={'Macro element has no data-macro-ref attribute!'} />
	}

	const { macros } = data

	if (!macros || !macros.length) {
		return (
			<ErrorComponent
				reason={"Can't replace macro, when there are no macros in the data object!"}
			/>
		)
	}

	const macroData = macros.find((d) => d.ref === ref)
	if (!macroData) {
		return <ErrorComponent reason={'Unable to find macro with ref {ref} in macros object!'} />
	}

	const { descriptor, name, config: configs } = macroData
	const config = configs[sanitizeGraphqlName(name)]

	const data2 = {
		name: name,
		descriptor: descriptor,
		config: {
			[sanitizeGraphqlName(name)]: {
				...config,
				body: config?.body?.replace(/youtube\.com/g, 'youtube-nocookie.com'),
			},
		},
	}

	const children = domToReact(el.children as DOMNode[], options)

	return (
		<BaseMacro data={data2} meta={meta} renderInEditMode={renderMacroInEditMode}>
			{children}
		</BaseMacro>
	)
}
