import { forceArray } from '/lib/utils/array-utils'
import { getRepoConnection } from '/lib/repos/repo-utils'
import { CONTENT_LOCALE_DEFAULT, CONTENT_ROOT_REPO_ID } from '/lib/constants'
import { Content } from '/lib/xp/content'
import { getNestedValues } from '/lib/utils/object-utils'
import { Node } from '@enonic-types/lib-node'
import { Component } from '@enonic-types/lib-portal'

type FieldKeyBuckets = {
    componentsFieldKeys: string[]
    otherFieldKeys: string[]
}

const COMPONENTS_PARENT_FIELD = 'components'

const stripComponentsPrefix = (fieldKey: string) =>
    fieldKey.replace(`${COMPONENTS_PARENT_FIELD}.`, '')

const getFieldKeyBuckets = (fieldKeys: string[]) => {
    return fieldKeys.reduce<FieldKeyBuckets>(
        (acc, key) => {
            if (key.startsWith(COMPONENTS_PARENT_FIELD)) {
                acc.componentsFieldKeys.push(stripComponentsPrefix(key))
            } else {
                acc.otherFieldKeys.push(key)
            }

            return acc
        },
        {
            componentsFieldKeys: [],
            otherFieldKeys: [],
        }
    )
}

const getFieldValues = (
    contentOrComponent: Content<Node> | Node<Component>,
    fieldKeys: string[]
): string[] => {
    return fieldKeys.reduce<string[]>((acc, key) => {
        const value = getNestedValues(contentOrComponent, key)
        if (typeof value === 'string') {
            acc.push(value)
        } else if (Array.isArray(value)) {
            acc.push(...value.filter((item) => typeof item === 'string'))
        }

        return acc
    }, [])
}

const isHtmlAreaPart = (component: Node<Component>): boolean => {
    return component.type === 'part' && component.part?.descriptor === 'idebanken:text-editor'
}

const resolveFragmentMacrosInPart = (
    component: Node<Component>,
    locale: string
): Node<Component> => {
    if (!isHtmlAreaPart(component)) {
        return component
    }

    if (!component.part.config?.['idebanken']['text-editor']?.html) {
        return component
    }

    const html = component.part.config?.['idebanken']['text-editor']?.html

    if (!html) {
        return component
    }

    const replacedHtml = html.replace(
        /\[html-fragment\s+fragmentId="([0-9a-fA-F-]+).*?"\/\]/g,
        (_, fragmentId) => getHtmlInFragment(fragmentId, locale)
    )

    component.part.config['idebanken']['text-editor'].html = replacedHtml
    return component
}

const getHtmlInFragment = (fragmentId: string, locale: string) => {
    const fragment = getFragment(fragmentId, locale)
    if (!fragment) {
        return ''
    }

    const fragmentHtmlList = forceArray(fragment.components).map((component) => {
        if (!isHtmlAreaPart(component)) {
            return ''
        }

        return component.part.config?.['idebanken']?.['text-editor']?.html
    })

    return fragmentHtmlList.join('')
}

const getFragment = (fragmentId: string, _locale: string) => {
    return getRepoConnection({
        branch: 'master',
        repoId: CONTENT_ROOT_REPO_ID,
    }).get<Content>({ key: fragmentId })
}

const getComponentFieldValues = (
    component: Node<Component>,
    content: Content<Node>,
    fieldKeys: string[]
): string[] => {
    const locale = content.language || CONTENT_LOCALE_DEFAULT

    if (component.type === 'fragment') {
        const fragment = getFragment(component.fragment.id, locale)

        return forceArray(fragment?.components)
            .map((fragmentComponent) => getFieldValues(fragmentComponent, fieldKeys))
            .flat()
    }

    const componentWithResolvedFragments = resolveFragmentMacrosInPart(component, locale)

    return getFieldValues(componentWithResolvedFragments, fieldKeys)
}

export const getSearchDocumentTextSegments = (content: Content<Node>, fieldKeys: string[]) => {
    const { componentsFieldKeys, otherFieldKeys } = getFieldKeyBuckets(fieldKeys)

    const otherFieldValues = getFieldValues(content, otherFieldKeys)

    // For component fields, we need to ensure the final order of values are consistent
    // with their original order in the components array
    const componentsFieldValues = forceArray(content.components)
        .map((component) => getComponentFieldValues(component, content, componentsFieldKeys))
        .flat()

    return otherFieldValues.concat(componentsFieldValues)
}
