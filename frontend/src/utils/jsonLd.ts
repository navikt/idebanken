import { forceArray } from '~/utils/utils'
import { PageComponent, PageData, PageRegion } from '@enonic/nextjs-adapter'
import { CommonContentType } from '~/types/graphql-types'
import { convert } from 'html-to-text'

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

    const publicationOrModifiedDate = content.dataAsJson?.publicationDate
        ? new Date(content.dataAsJson.publicationDate as string).toISOString()
        : undefined

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        headline: meta?.title ?? content.displayName,
        description: meta?.description,
        datePublished:
            (isNewsArticle ? publicationOrModifiedDate : content.publish?.first) ??
            content.publish?.first,
        dateModified:
            (isNewsArticle ? content.modifiedTime : publicationOrModifiedDate) ??
            content.modifiedTime,
    }
}

export const getArticleJsonLd = (content: CommonContentType) => {
    const image = content.metaFields?.image
    const data = content?.dataAsJson
    const author = (forceArray(data?.authors) as string[])?.pop() || 'Idébanken'
    const isIdebankenAuthor = author.toLowerCase()?.match(/id[eé]banken/)
    const isNewsArticle = content.type === 'idebanken:artikkel'

    const publicationOrModifiedDate = content.dataAsJson?.publicationDate
        ? new Date(content.dataAsJson.publicationDate as string).toISOString()
        : undefined

    return {
        '@context': 'https://schema.org',
        '@type': isNewsArticle ? 'NewsArticle' : 'Article',
        headline: content.metaFields?.title ?? content?.displayName,
        image: image?.imageUrl ?? '',
        datePublished:
            (isNewsArticle ? publicationOrModifiedDate : content.publish?.first) ??
            content.publish?.first,
        dateModified:
            (isNewsArticle ? content.modifiedTime : publicationOrModifiedDate) ??
            content.modifiedTime,
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

const stripHtml = (html: string | null | undefined): string => {
    if (!html) return ''
    const text = convert(html, {
        wordwrap: false,
    })
    return text.trim()
}

const findStepsInRegion = (region: PageRegion | undefined): unknown[] => {
    if (!region || !region.components) return []
    const steps: unknown[] = []

    region.components.forEach((component) => {
        if (component.type === 'part' && component.part?.descriptor === 'idebanken:text-editor') {
            const html = component.part.config?.simpleTextEditor?.processedHtml
            const text = stripHtml(html)
            if (text) {
                steps.push({
                    '@type': 'HowToStep',
                    position: steps.length + 1,
                    text: text,
                })
            }
        }
        // Recursively look into layout regions if nested
        if (component.regions) {
            Object.values(component.regions).forEach((r) => {
                steps.push(...findStepsInRegion(r))
            })
        }
    })
    return steps
}

const findHowToSections = (page?: PageData | null): unknown[] => {
    const sections: unknown[] = []

    const traverse = (component: PageComponent) => {
        // specific check for idebanken:card which acts as a section
        if (component.type === 'layout' && component.layout?.descriptor === 'idebanken:card') {
            const sectionName = component.layout.config?.heading
            const steps = findStepsInRegion(component.regions?.['content'])

            if (steps.length > 0) {
                sections.push({
                    '@type': 'HowToSection',
                    position: sections.length + 1,
                    name: sectionName ?? 'Seksjon',
                    itemListElement: steps,
                })
                return
            }
        }

        // Generic recursion
        if (component.regions) {
            Object.values(component.regions).forEach((region) => {
                region.components?.forEach((child) => traverse(child))
            })
        }
    }

    // Start traversal from main page regions
    if (page && page.regions) {
        Object.values(page.regions).forEach((region) => {
            region.components?.forEach((child) => traverse(child))
        })
    }

    return sections
}

export const getHowToJsonLd = (content: CommonContentType, page: PageComponent) => {
    const metaFields = content.metaFields

    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: metaFields?.title ?? content.displayName,
        description: metaFields?.description,
        totalTime: content.dataAsJson?.estimatedTime
            ? `PT${content.dataAsJson.estimatedTime}M`
            : undefined,
        step: findHowToSections(page.page),
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
    if (!content || !page) return [getOrganizationJsonLd(), getWebSiteJsonLd()]

    const schemas: Array<Schema> = [
        getOrganizationJsonLd(),
        getWebSiteJsonLd(),
        getWebPageJsonLd(content),
    ]

    const typeTag = content.x?.idebanken?.articleTags?.typeTags?.pop()?.name?.toLowerCase()

    switch (typeTag) {
        case 'guide':
            schemas.push(getHowToJsonLd(content, page))
            break
        case 'lynkurs':
            schemas.push(getCourseJsonLd(content))
            break
    }

    switch (content.type) {
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
