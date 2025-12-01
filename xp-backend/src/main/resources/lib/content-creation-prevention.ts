import { delete as deleteContent, get, query } from '/lib/xp/content'
import { CONTENT_ROOT_PROJECT_ID, CONTENT_ROOT_REPO_ID } from '/lib/constants'
import { logger } from '/lib/utils/logging'
import * as eventLib from '/lib/xp/event'
import { runInContext } from '/lib/repos/run-in-context'

let isActive = false

const singletonAktueltPage = `${CONTENT_ROOT_PROJECT_ID}:singleton-aktuelt-page`
const singletonAktuelt = `${CONTENT_ROOT_PROJECT_ID}:singleton-aktuelt`
const singletonTheme = `${CONTENT_ROOT_PROJECT_ID}:singleton-theme`
const singletonType = `${CONTENT_ROOT_PROJECT_ID}:singleton-type`

const typeTagAktuelt = `${CONTENT_ROOT_PROJECT_ID}:aktuelt-type-tag`
const typeTag = `${CONTENT_ROOT_PROJECT_ID}:type-tag`
const themeTag = `${CONTENT_ROOT_PROJECT_ID}:theme-tag`

const singletons = [singletonAktuelt, singletonTheme, singletonType, singletonAktueltPage]
const tags = [typeTagAktuelt, typeTag, themeTag]

export const activateContentCreationPrevention = () => {
    if (isActive) {
        logger.error(
            `Attempted to activate search index event handlers, but handlers were already active!`
        )
        return
    }

    isActive = true

    eventLib.listener({
        type: 'node.created',
        callback: (event) =>
            event.data.nodes.forEach(({ id, path, repo }) => {
                if (repo !== CONTENT_ROOT_REPO_ID) {
                    return
                }
                runInContext({ repository: repo, asAdmin: true }, () => {
                    const createdContent = get({ key: id })
                    if (!createdContent) {
                        return
                    }

                    const { type } = createdContent

                    if (singletons.includes(type)) {
                        const existingSingletons = query({
                            filters: {
                                hasValue: {
                                    field: 'type',
                                    values: [type],
                                },
                            },
                        }).hits

                        if (existingSingletons.length > 1) {
                            logger.info(
                                `Can only have one content of singleton type ${type}. Deleted duplicate content with id ${id} at path ${path}`
                            )
                            deleteContent({ key: id })
                        }
                    } else if (tags.includes(type)) {
                        const parentType = get({
                            key: createdContent._path.replace(/\/[^/]+$/, ''),
                        })?.type

                        if (type === typeTagAktuelt && parentType !== singletonAktuelt) {
                            logger.info(
                                `Can only create typeTagAktuelt under singleton-aktuelt. Deleted tag content with id ${id} at path ${path} of type ${type} under parent type ${parentType}`
                            )
                            deleteContent({ key: id })
                        } else if (type === typeTag && parentType !== singletonType) {
                            logger.info(
                                `Can only create typeTag under singleton-type. Deleted tag content with id ${id} at path ${path} of type ${type} under parent type ${parentType}`
                            )
                            deleteContent({ key: id })
                        } else if (type === themeTag && parentType !== singletonTheme) {
                            logger.info(
                                `Can only create themeTag under singleton-theme. Deleted tag content with id ${id} at path ${path} of type ${type} under parent type ${parentType}`
                            )
                            deleteContent({ key: id })
                        }
                    }
                })
            }),
    })

    logger.info('Started event listener for content creation prevention.')
}
