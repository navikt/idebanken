import { Content } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'
import { generateSearchDocumentId } from '../utils'
import { getNestedValues } from '/lib/utils/object-utils'
import { getExternalSearchConfig } from '../config'
import { logger } from '/lib/utils/logging'
import { getSearchDocumentTextSegments } from './field-resolvers/text'
import { buildSearchDocumentIngress } from './field-resolvers/ingress'
import { SiteConfig } from '@xp-types/site'

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
        keywords?: string[]
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

        const href = content._path //TODO fix getSearchNodeHref(content, locale)
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

        return {
            id: generateSearchDocumentId(content._id, locale),
            href,
            title: title,
            ingress: this.getIngress(),
            text: this.getText(),
            metadata: {
                createdAt: publishedTime,
                lastUpdated: content.modifiedTime || publishedTime,
                keywords: forceArray(content.data.keywords),
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

        const defaultConfigKeys = forceArray(this.searchConfig.data.defaultKeys[metaKey])
        fieldKeys.push(...defaultConfigKeys)

        return fieldKeys.filter(Boolean)
    }

    private getTitle(): string | null {
        const title = this.getFirstMatchingFieldValue('titleKey')
        if (!title) {
            return null
        }

        if (this.content.type === 'no.nav.navno:form-details') {
            const formNumbers = forceArray(this.content.data.formNumbers)
            if (formNumbers.length > 0) {
                return `${title} (${formNumbers.join(', ')})`
            }
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

const isExcludedContent = (content: Content) => {
    if (!content?.data) {
        return true
    }

    if (
        // eslint-disable-next-line no-constant-condition
        false
        // TODO
        // isContentAwaitingPrepublish(content) ||
        // isContentNoIndex(content) ||
        // isContentPreviewOnly(content) ||
        // getContentLocaleRedirectTarget(content) ||
        // isExcludedLocalContent(content)
    ) {
        return true
    }
    return false
}

export const buildExternalSearchDocument = (
    content: Content,
    locale: string
): SearchDocument | null => {
    if (isExcludedContent(content)) {
        return null
    }

    const searchConfig = getExternalSearchConfig()
    if (!searchConfig) {
        logger.error('No search config found!')
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
