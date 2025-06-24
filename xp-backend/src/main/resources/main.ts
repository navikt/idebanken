import { isMaster } from '/lib/xp/cluster'
import { initializeProject } from '/lib/project-initializer'
import { activateExternalSearchIndexEventHandlers } from '/lib/search/event-handlers'

import './lib/polyfills'

if (isMaster()) {
    initializeProject()
}

activateExternalSearchIndexEventHandlers()
