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