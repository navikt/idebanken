export const imageQuery = `
    {
        image {
            ... on media_Image {
                imageUrl(type: absolute, scale: "height(800)")
                data {
                    altText
                }
            }
        }
    }
`

export const buttonQuery = `
    query ButtonPart($contentId: ID!) {
        guillotine {
            get(key: $contentId) {
                _id
                displayName
                type
                url: pageUrl(type: server)
            }
        }
    }
`