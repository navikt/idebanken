// This query is executed for every page rendering.
// Result is included in props.common

import { Category, Footer, Header } from '~/types/generated'

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
      ${metaFields}
      skyra {
        slug
        source
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

export function commonVariables(path: string) {
    return {
        path,
    }
}

export type CommonType<T = UnknownJSONContent> = {
    get: CommonContentType<T>
    getSite: CommonGetSite
    header: Header
    footer: Footer
    categories: Array<Category>
}

type CommonContentType<T = UnknownJSONContent> = {
    displayName: string
    _id: string
    type: `${string}:${string}`
    dataAsJson: T
    xAsJson: UnknownJSONContent
}

type CommonGetSite = {
    displayName: string
    _path: string
}

type UnknownJSONContent = Record<string, string | Array<string> | object>
