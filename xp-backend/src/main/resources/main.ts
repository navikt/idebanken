import { isMaster } from '/lib/xp/cluster'
import { initializeProject } from '/lib/project-initializer'

if (isMaster()) {
    initializeProject()
}
