import { isMaster } from '/lib/xp/cluster'
import { initializeProject } from '/lib/project-initializer'
import { activateExternalSearchIndexEventHandlers } from '/lib/search/event-handlers'
import { setupSchedulers } from '/lib/scheduler'

import './lib/polyfills'
import { activateContentUpdateListener } from '/lib/contentUpdate/content-update-listeners'

if (isMaster()) {
    initializeProject()
}

activateExternalSearchIndexEventHandlers()
activateContentUpdateListener()
setupSchedulers()
