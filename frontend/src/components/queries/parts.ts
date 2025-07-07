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
