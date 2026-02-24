import { forceArray } from '~/utils/utils'
import { PageComponent } from '@enonic/nextjs-adapter'
import { CommonContentType } from '~/types/graphql-types'

type Schema = {
    '@context': string
    '@type': string
    [key: string]: string | object | string[] | object[] | undefined | null
}

export const getOrganizationJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Idébanken',
    url: 'https://idebanken.no',
    //logo: 'https://idebanken.no/public/images/logo-light.svg', // Update with actual path
    sameAs: [
        'https://www.facebook.com/idebanken.org',
        'https://www.linkedin.com/company/id%C3%A9banken---inkluderende-arbeidsliv/',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        email: 'post@idebanken.org',
        contactType: 'Organization',
    },
})

export const getWebSiteJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Idébanken',
    url: 'https://idebanken.no',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://idebanken.no/sok?ord={search_term_string}',
        'query-input': 'name=search_term_string',
    },
})

export const getWebPageJsonLd = (content: CommonContentType) => {
    const meta = content.metaFields
    const isNewsArticle = content.type === 'idebanken:artikkel'

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        headline: meta?.title ?? content.displayName,
        description: meta?.description,
        datePublished:
            (isNewsArticle ? content.dataAsJson?.publicationDate : content.publish?.first) ??
            content.publish?.first,
        dateModified:
            (isNewsArticle ? content.modifiedTime : content.dataAsJson?.publicationDate) ??
            content.modifiedTime,
    }
}

export const getArticleJsonLd = (content: CommonContentType) => {
    const image = content.metaFields?.image
    const data = content?.dataAsJson
    const author = (forceArray(data?.authors) as string[])?.pop() || 'Idébanken'
    const isIdebankenAuthor = author.toLowerCase()?.match(/id[eé]banken/)
    const isNewsArticle = content.type === 'idebanken:artikkel'
    return {
        '@context': 'https://schema.org',
        '@type': isNewsArticle ? 'NewsArticle' : 'Article',
        headline: content.metaFields?.title ?? content?.displayName,
        image: image?.imageUrl ?? '',
        datePublished:
            (isNewsArticle ? data?.publicationDate : content.publish?.first) ??
            content.publish?.first,
        dateModified:
            (isNewsArticle ? content.modifiedTime : data?.publicationDate) ?? content.modifiedTime,
        author: {
            '@type': isIdebankenAuthor ? 'Organization' : 'Person',
            name: author,
        },
        publisher: {
            '@type': isIdebankenAuthor ? 'Organization' : 'Person',
            name: author,
        },
    }
}

export const getHowToJsonLd = (content: CommonContentType, page: PageComponent) => {
    console.log('page', page)
    // todo: implement steps by recursively parsing the page content for "descriptor": "idebanken:card" which is a HowToSection. And then the child objects which contain header H3 should be the step name, and the content below should be the step description. If there are images, they should be added as well.
    // const steps =
    const metaFields = content.metaFields

    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: metaFields?.title ?? content.displayName,
        description: metaFields?.description,
        totalTime: content.dataAsJson?.estimatedTime
            ? `PT${content.dataAsJson.estimatedTime}M`
            : 'PT5M', // Assumes 5 minutes
        // step: steps,
    }
}

export const getCourseJsonLd = (content: CommonContentType) => {
    const metaFields = content.metaFields
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: metaFields?.title ?? content.displayName,
        description: metaFields?.description,
        provider: {
            '@type': 'Organization',
            name: 'Idébanken',
            sameAs: 'https://idebanken.no',
        },
        educationalLevel: 'Beginner',
        hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'Online',
            courseWorkload: 'PT1H',
        },
    }
}

export const getGuideJsonLd = (content: CommonContentType) => {
    const metaFields = content.metaFields
    const name = metaFields?.title ?? content.displayName
    return {
        '@context': 'https://schema.org',
        '@type': 'Guide',
        name: name,
        description: metaFields?.description,
        about: name,
        educationalLevel: 'Beginner',
        learningResourceType: 'Guidance',
    }
}

export const getContentJsonLd = ({
    content,
    page,
}: {
    content?: CommonContentType
    page?: PageComponent | null
}): Array<Schema> => {
    if (!content || !page) return []

    const schemas: Array<Schema> = [
        getOrganizationJsonLd(),
        getWebSiteJsonLd(),
        getWebPageJsonLd(content),
    ]

    const type = content.type
    console.log('content.x?.idebanken?.tags', content.x)
    const typeTag = content.x?.idebanken?.articleTags?.typeTags?.pop()?.name?.toLowerCase()
    console.log('typeTag', typeTag)
    switch (typeTag) {
        case 'guide':
            schemas.push(getHowToJsonLd(content, page))
            return schemas
        case 'lynkurs':
            schemas.push(getCourseJsonLd(content))
            return schemas
    }

    switch (type) {
        case 'idebanken:kjerneartikkel':
        case 'idebanken:artikkel':
            schemas.push(getArticleJsonLd(content))
            break
        case 'idebanken:section-page':
        case 'idebanken:singleton-theme':
            schemas.push(getGuideJsonLd(content))
            break
    }
    return schemas
}
