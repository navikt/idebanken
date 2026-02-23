import { Content } from '~/types/generated'
import { forceArray } from '~/utils/utils'

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

export const getWebPageJsonLd = (content: Content) => {
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

export const getArticleJsonLd = (content: Content) => {
    const image = content.metaFields?.image
    const data = content?.dataAsJson
    const author: string = forceArray(data?.authors)?.pop() || 'Idébanken'
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

export const getHowToJsonLd = (content: Content) => {
    // const steps =
    //     content.data?.steps?.map((step: any, index: number) => ({
    //         '@type': 'HowToStep',
    //         position: index + 1,
    //         name: step.title,
    //         text: step.text, // Ensure HTML is stripped or safe
    //         url: `${content._path}#step${index + 1}`,
    //     })) || []
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

export const getCourseJsonLd = (content: Content) => {
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

export const getContentJsonLd = (content: Content) => {
    const schemas: Array<{
        '@context': string
        '@type': string
        [key: string]: string | object | string[] | object[] | undefined | null
    }> = [getOrganizationJsonLd(), getWebSiteJsonLd(), getWebPageJsonLd(content)]

    const type = content.type
    const typeTag = content.x?.idebanken?.tags?.typeTags?.pop()?.name?.toLowerCase()
    if (typeTag === 'guide') {
        schemas.push(getHowToJsonLd(content))
    } else {
        switch (type) {
            case 'idebanken:kjerneartikkel':
            case 'idebanken:artikkel':
                schemas.push(getArticleJsonLd(content))
                break
            case 'idebanken:crash-course':
                schemas.push(getCourseJsonLd(content))
                break
        }
    }
    return schemas
}
