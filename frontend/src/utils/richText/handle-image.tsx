import { Element } from 'html-react-parser'
import { getUrl, MetaData, ReplacerResult, RichTextData } from '@enonic/nextjs-adapter'
import { ErrorComponent } from '@enonic/nextjs-adapter/views/BaseComponent'
import { IMG_ATTR } from '@enonic/react-components/constants'
import { cssToReactStyle } from '@enonic/react-components'
import React from 'react'

export function handleImage(el: Element, data: RichTextData, meta: MetaData): ReplacerResult {
	const { images } = data

	if (!images || !images.length) {
		return (
			<ErrorComponent
				reason={"Can't replace image, when there are no images in the data object!"}
			/>
		)
	}

	const imageRef = el.attribs[IMG_ATTR]
	if (!imageRef) {
		return <ErrorComponent reason={'Image element has no data-image-ref attribute!'} />
	}

	const imageData = images.find((data) => data.ref === imageRef)
	if (!imageData) {
		return (
			<ErrorComponent reason={'Unable to find image with ref {imageRef} in images object!'} />
		)
	}

	const {
		attribs: { alt, sizes, src, srcset: srcSet, style: styleStr = '' },
	} = el

	const srcSetProcessed = srcSet
		? srcSet
				.split(',')
				.map(
					(s: string) =>
						getUrl(s.trim().split(' ')[0], meta) + ' ' + s.trim().split(' ')[1]
				)
				.join(',')
		: undefined

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={getUrl(src, meta)}
			style={{ ...cssToReactStyle(styleStr), ...imageData.style }}
			alt={alt}
			sizes={sizes}
			srcSet={srcSetProcessed}
		/>
	)
}
