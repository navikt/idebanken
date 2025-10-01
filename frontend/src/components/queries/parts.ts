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

export const imageAndVectorFields = `
image {
  ... on media_Image {
    imageUrl(type:absolute scale:"height(800)")
    data { altText }
  }
  ... on media_Vector {
    mediaUrl(type:absolute)
    data { caption }
  }
}
`

export const imageAndVectorQuery = `{${imageAndVectorFields}}`

export const linkCardQuery = `{
    ${linkQuery.slice(1, -1)}
    ${imageAndVectorQuery.slice(1, -1)}
}`

export const tableOfContentsQuery = `{
    title
    sections(path: $path) {
        title
    }
}`

export const tableOfContentsSectionQuery = `{
    title
    sectionNumber(path: $path)
}`

export const linkCardListQuery = `{
    displayType
    brand
    heading {
        title
        href
    }
    list {
        url
        title
        description
        imageUrl
        iconName
        iconColor
        categories {
            name
            id
            iconName
            iconColor
        }
    }
}`

export const highlightedBoxMacroQuery = `{
    title
    icon {
        ... on media_Image {
            url: imageUrl(type: absolute, scale: "block(30,30)")
        }
        ... on media_Vector {
            url: mediaUrl(type: absolute)
        }
    }
    brand
    links {
        _path
        displayName
        dataAsJson
    }
    linksAbsolute
}`
