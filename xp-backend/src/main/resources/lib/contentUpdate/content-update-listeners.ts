import * as eventLib from '/lib/xp/event'
import * as contentLib from '/lib/xp/content'
import { Content } from '/lib/xp/content'
import { updateQbrickVideoContent } from './video-update'
import { CONTENT_REPO_PREFIX } from '/lib/constants'
import { runInContext } from '/lib/repos/run-in-context'
import { isMaster } from '/lib/xp/cluster'
import { Video } from '@xp-types/site/content-types'

let hasContentUpdateListener = false

const handleUpdateEvent = (event: eventLib.EnonicEvent) => {
    if (!isMaster()) {
        return
    }

    event.data.nodes.forEach((node) => {
        const { id, repo } = node

        if (!repo.startsWith(CONTENT_REPO_PREFIX)) {
            return
        }

        runInContext({ repository: repo }, () => {
            const content = contentLib.get({ key: id })
            if (!content) {
                return
            }

            const { type } = content

            switch (type) {
                case 'idebanken:video': {
                    updateQbrickVideoContent(content as Content<Video>)
                    break
                }
            }
        })
    })
}

export const activateContentUpdateListener = () => {
    if (hasContentUpdateListener) {
        return
    }

    hasContentUpdateListener = true

    eventLib.listener({
        type: 'node.updated',
        callback: handleUpdateEvent,
    })
}
