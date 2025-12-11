// This query is executed for every page rendering.
// Result is included in props.common

const metaFields = `
metaFields {
  canonical {
    _score
    createdTime
    modifiedTime
    type
    displayName
    hasChildren
    language
    valid
    dataAsJson
    xAsJson
    pageAsJson
    pageUrl
  }
  description
  fullTitle
  image {
    ... on media_Image {
      imageUrl(type: absolute, scale: "block(1200,627)")
      data {
        altText
      }
    }
  }
  locale
  verification {
    google
  }
  twitter {
    hideImages
    site
  }
  robots {
    follow
    index
  }
  openGraph {
    hideImages
    hideUrl
    type
  }
  siteName
  title
  baseUrl
}
`
export const resolvedLinkSelector = `
url
linkText
external
download
`
const linkGroups = `
title
links {
    ${resolvedLinkSelector}
}
`
export const commonQuery = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      backlink {
        text
        href
      }
      displayName
      _id
      _path
      type
      dataAsJson
      xAsJson
      ... on idebanken_Kjerneartikkel {
        x {
          idebanken {
            articleTypeTags: tags {
              typeTags { id name color }
            }
          }
        }
      }
      ... on idebanken_Artikkel {
       x {
          idebanken {
            articleTypeTags:aktuelt_tags {
                typeTags { id name color }
            }
          }
        }
        data {
            publicationDate
            heroImage {
                ... on media_Image  {
                    url: imageUrl(type: absolute, scale: "block(1024,576)")
                    data {
                        altText
                        caption
                        artist
                    }
                }
                ... on media_Vector {
                    url: mediaUrl(type: absolute)
                    data {
                        caption
                        artist
                    }
                }
          }
        }
      }

      ${metaFields}
      skyraSlugs
      publish {
        first
      }
    }
    getSite {
      displayName
      _path
    }
    header {
        linkGroups {
            ${linkGroups}
        }
        linksBottom {
            ${resolvedLinkSelector}
        }
    }
    footer {
      newsletterSubscribeText
      newsletterSubscribeLink {
        ${resolvedLinkSelector}
      }
      footerText
      linkGroups {
        ${linkGroups}
      }
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
    }
    siteConfiguration {
        searchPageHref
        cookieInfoText
    }
  }
}`

export const commonGetQuery = (getRequest: string) => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      type
      ${getRequest}
    }
  }
}`

export function commonVariables(path: string) {
    return {
        path,
    }
}
