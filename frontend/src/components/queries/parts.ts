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
      aspect_ratio {
        aspectRatio
        maxWidth
        roundedCorners
        centerHorizontally
        centerVertically
      }
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

const linkCard = `
    url
    external
    title
    description
    lang
    image {
        url
        caption
    }
    icon {
        url
        caption
    }
    themeTags {
        name
        id
        iconUrl
    }
    typeTags {
        name
        id
        color
}`

export const linkCardQuery = `{
    displayType
    hideArrow
    hideTag
    color
    resolvedLinkCard {
        ${linkCard}
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
    hideTag
    color
    heading {
        title
        href
    }
    list {
        ${linkCard}
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
    linksAbsolute {
        ${resolvedLinkSelector}
    }
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
                        imageUrl(type: absolute, scale: "block(124,74)")
                    }
                }
                subtitles
            }
        }
    }
    displayType
    language
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
    data(offset: 0, count: 6, path: $path) {
        total
        list {
            url
            title
            description
            image { url caption }
            themeTags { id name }
            typeTags { id name color }
        }
    }
}`

export const crashCoursePlanQuery = `{
    parts {
        label
        title
        slides {
            icon {
                ... on media_Image {
                    url: imageUrl(type:absolute scale:"height(44)")
                    data { altText }
                }
                ... on media_Vector {
                    url: mediaUrl(type:absolute)
                    data { caption }
                }
            }
            text
        }
    }
}`
