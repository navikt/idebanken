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
      displayName
      _id
      _path
      type
      dataAsJson
      xAsJson
      x {
        idebanken {
          meta {
            icon {
              ... on media_Vector {
                mediaUrl(type: absolute)
                data {
                  caption
                }
              }
            }
          }
        }
      }
      ... on idebanken_Artikkel {
        data {
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
    categories {
        name
        id
        iconUrl
        iconColor
    }
    siteConfiguration {
        searchPageHref
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
