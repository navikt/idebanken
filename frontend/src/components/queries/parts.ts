export const imageQuery = `{
	image {
		... on media_Image {
			imageUrl(type: absolute, scale: "height(800)")
			data {
				altText
			}
		}
	}
	scale
    hideOnMobile
    styleActive
    width
    height
    borderRadius
    border
    borderDistance
    circles {
      size
      color
      bottom
      left
      opacity
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

export const imageAndVectorQuery = `{
    image {
        ... on media_Image {
            imageUrl(type: absolute, scale: "height(800)")
            data {
                altText
            }
        }
		... on media_Vector {
            mediaUrl(type: absolute)
            data {
                caption
            }
        }
    }
}`

export const linkCardQuery = `{
    ${linkQuery.slice(1, -1)}
    ${imageAndVectorQuery.slice(1, -1)}
}`
