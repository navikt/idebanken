import { resolvedLinkSelector } from '~/components/queries/common'

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

export const buttonQuery = `{
	link {
	    ${resolvedLinkSelector}
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

export const linkCardQuery = `{
    brand
    displayType
    hideArrow
    resolvedLinkCard {
        url
        external
        title
        description
        image {
            url
            caption
        }
        icon {
            url
            caption
            iconColor
        }
        categories {
            name
            id
            iconUrl
            iconColor
            caption
        }
    }
}`

export const tableOfContentsQuery = `{
    title
    sections(path: $path)
}`

export const linkCardListQuery = `{
    displayType
    nEachRow
    hideArrow
    brand
    heading {
        title
        href
    }
    list {
        url
        external
        title
        description
        image {
            url
            caption
        }
        icon {
            url
            caption
            iconColor
        }
        categories {
            name
            id
            iconUrl
            iconColor
            caption
        }
    }
}`

export const highlightedBoxMacroQuery = `{
    title
    icon {
        url
        caption
        altText
    }
    brand
    links {
        _path
        displayName
        dataAsJson
    }
    linksAbsolute
}`

export const titleIngressQuery = `{
    bgColor
    ${imageAndVectorFields.slice(1, -1)}
}`
