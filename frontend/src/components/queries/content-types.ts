import { commonGetQuery } from '~/components/queries/common'

export const videoContentTypeQuery = commonGetQuery(`
... on idebanken_Video {
    data {
        title
        mediaId
        accountId
        duration
        poster {
            ... on media_Image {
                imageUrl(type: absolute, scale: "block(672, 378)")
            }
        }
        subtitles
    }
}
`)
