import { Content, get } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'
import { generateSearchDocumentId } from '../utils'
import { getNestedValues } from '/lib/utils/object-utils'
import { getSiteConfig } from '/lib/utils/site-config'
import { logger } from '/lib/utils/logging'
import { getSearchDocumentTextSegments } from './field-resolvers/text'
import { buildSearchDocumentIngress } from './field-resolvers/ingress'
import { SiteConfig } from '@xp-types/site'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { resolveIcon } from '/lib/utils/media'

export type SearchConfig = SiteConfig['searchConfig']
type KeysConfig = Partial<SearchConfig['defaultKeys']>
type MetaKey = keyof KeysConfig

export type SearchDocument = {
    id: string
    href: string
    title: string
    ingress: string
    text: string
    metadata: {
        createdAt: string
        lastUpdated: string
        language: string
        type: string
        metatags?: string[]
        keywords?: string[]
        iconUrl?: string
        iconColor?: string
        categories?: string[]
    }
}

class ExternalSearchDocumentBuilder {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly content: Content<any>
    private readonly locale: string
    private readonly searchConfig: SearchConfig
    private readonly contentGroupKeys?: KeysConfig

    constructor(
        content: Content,
        locale: string,
        searchConfig: SearchConfig,
        contentGroupKeys?: KeysConfig
    ) {
        this.content = content
        this.locale = locale
        this.searchConfig = searchConfig
        this.contentGroupKeys = contentGroupKeys
    }

    public build(): SearchDocument | null {
        const { content, locale } = this

        const href = enonicSitePathToHref(content._path)
        if (!href) {
            logger.warning(`No href found for ${content._id} / ${locale}`)
            return null
        }

        const title = this.getTitle()
        if (!title) {
            logger.error(`No title found for ${content._id} / ${locale}`)
            return null
        }

        const publishedTime = content.publish?.from || content.createdTime
        const ibX = content.x.idebanken

        return {
            id: generateSearchDocumentId(content._id, locale),
            href,
            title: title,
            ingress: this.getIngress(),
            text: this.getText(),
            metadata: {
                createdAt: publishedTime,
                lastUpdated: content.modifiedTime || publishedTime,
                language: 'nb',
                type: content.type?.split(':').pop() ?? content.type,
                metatags: forceArray(content.data.metatags),
                keywords: forceArray(content.data.keywords),
                iconUrl: resolveIcon(content, false)?.url,
                iconColor: ibX?.meta?.iconColor,
                categories: forceArray(ibX?.category?.categories),
            },
        }
    }

    private getFirstMatchingFieldValue(metaKey: MetaKey) {
        const fieldKeys = this.getFieldKeys(metaKey)

        for (const key of fieldKeys) {
            const value = getNestedValues(this.content, key)
            if (!value) {
                continue
            }

            if (Array.isArray(value)) {
                const stringValue = value.find((item) => typeof item === 'string')
                if (stringValue) {
                    return stringValue
                }
            } else if (typeof value === 'string') {
                return value
            }
        }

        return undefined
    }

    private getFieldKeys(metaKey: MetaKey) {
        const fieldKeys: string[] = []

        if (this.contentGroupKeys) {
            const contentConfigKeys = forceArray(this.contentGroupKeys[metaKey])
            fieldKeys.push(...contentConfigKeys)
        }

        const defaultConfigKeys = forceArray(this.searchConfig.defaultKeys[metaKey])
        fieldKeys.push(...defaultConfigKeys)

        return fieldKeys.filter(Boolean)
    }

    private getTitle(): string | null {
        const title = this.getFirstMatchingFieldValue('titleKey')
        if (!title) {
            return null
        }

        return title
    }

    private getIngress(): string {
        return buildSearchDocumentIngress(
            this.getFirstMatchingFieldValue('ingressKey') ||
                this.getFirstMatchingFieldValue('textKey')
        )
    }

    private getText(): string {
        const fieldKeys = this.getFieldKeys('textKey')
        return getSearchDocumentTextSegments(this.content, fieldKeys).join('\n')
    }
}

const getContentGroupConfig = (searchConfig: SearchConfig, content: Content) => {
    return forceArray(searchConfig.contentGroups).find((group) =>
        forceArray(group.contentTypes).some((contentType) => contentType === content.type)
    )
}

const isExcludedContent = (content: Content, searchConfig: SiteConfig['searchConfig']) => {
    if (!content?.data) {
        return true
    }

    const { excludeContent, excludeContentAndChildren } = searchConfig
    const excludePaths = forceArray(excludeContentAndChildren).map(
        (id) => get({ key: id })?._path?.replace(/^\/content/, '') ?? 'nowhere'
    )
    const contentPathStrippedPrefix = content._path.replace(/^\/content/, '')

    return (
        content.x?.['com-enonic-app-metafields']?.['meta-data']?.blockRobots ||
        excludePaths.some((excludePath) => contentPathStrippedPrefix.startsWith(excludePath)) ||
        forceArray(excludeContent).includes(content._id)
    )
}

export const buildExternalSearchDocument = (
    content: Content,
    locale: string
): SearchDocument | null => {
    const searchConfig = getSiteConfig()?.searchConfig
    if (!searchConfig) {
        logger.error('No search config found!')
        return null
    }

    if (isExcludedContent(content, searchConfig)) {
        return null
    }

    const contentGroupConfig = getContentGroupConfig(searchConfig, content)
    if (!contentGroupConfig) {
        return null
    }

    return new ExternalSearchDocumentBuilder(
        content,
        locale,
        searchConfig,
        contentGroupConfig.groupKeys
    ).build()
}
