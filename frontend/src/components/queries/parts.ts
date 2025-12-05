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
	image_size {
      _selected
      standard_size {
        standardWidth
      }
      custom_size {
        width
        height
        borderRadius
        centerHorizontally
        centerVertically
        paddingX
        paddingY
        border
        borderDistance
        scale
        circles {
          color
          size
          bottom
          left
        }
      }
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
        themeTags {
            name
            id
            iconUrl
            iconColor
            caption
        }
        typeTags {
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
        themeTags {
            name
            id
            iconUrl
            iconColor
            caption
        }
        typeTags {
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

export const videoPartOrMacroQuery = `{
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

export const downloadsQuery = `{
    selectedFiles {
        displayName
        _path
        ... on media_Document {
            mediaUrl(type: absolute)
            attachments {
                size
            }
        }
    }
}`

export const themeCardListQuery = `{
    data(offset: 0, count: 5, path: $path) {
        total
        list {
            url
            title
            description
            image { url caption }
            themeTags { id name }
            typeTags { id name }
        }
    }
}`
