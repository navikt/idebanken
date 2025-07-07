import { richTextQuery } from '@enonic/nextjs-adapter'

export const imageQuery = `{
	image {
		... on media_Image {
			imageUrl(type: absolute, scale: "height(800)")
			data {
				altText
			}
		}
	}
}`

export const linkQuery = `{
	blockOptionSet {
		_selected
		externalLink {
			url
		}
		internalLink {
			ideBankContentSelector {
				pageUrl(type: server)
			}
		}
	}
}`

export const textEditorQuery = `{
	${richTextQuery('simpleTextEditor')}
}`

export const infoBoxQuery = `{
	bgColor
	${richTextQuery('simpleTextEditor')}
}`

export const tipPanelQuery = `{
	bgColor
	heading
	reverse
	panel {
		bgColor
		${richTextQuery('simpleTextEditor')}
	}
}`

export const accordionQuery = `{
	accordionItem {
		header
		${richTextQuery('simpleTextEditor')}
	}
}`
