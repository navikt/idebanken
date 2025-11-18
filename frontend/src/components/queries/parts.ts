import { resolvedLinkSelector } from '~/components/queries/common'

export const imageQuery = `{
	image {
		... on media_Image {
			imageUrl(type: absolute, scale: "height(800)")
			data {
				altText
				caption
				artist
			}
		}
	}
	includeCaption
    overrideCaption
	decorative
	scale
    hideOnMobile
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
        ${resolvedLinkSelector}
    }
    linksAbsolute
}`

export const videoMacroQuery = `{
    targetContent {
        ... on idebanken_Video {
            data {
                title
                mediaId
                accountId
                duration
                poster {
                    ... on media_Image {
                        imageUrl(type: absolute, scale: "block(200, 100)")
                    }
                }
                subtitles
            }
        }
    }
    language
}`

export const titleIngressQuery = `{
    bgColor
}`

export const newsletterQuery = `{
    title
    description
    redirectContent {
        _path
    }
}`
