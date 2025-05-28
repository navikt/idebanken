import { create as createProject, get as getProject } from '/lib/xp/project'
import { publish } from '/lib/xp/content'
import { run } from '/lib/xp/context'
import { isMaster } from '/lib/xp/cluster'
import { executeFunction } from '/lib/xp/task'

const projectData = {
    id: 'idebanken',
    displayName: 'Idébanken',
    description: 'Nettside for Idébanken',
    language: 'no',
    siteConfig: [
        {
            applicationKey: app.name,
        },
    ],
    readAccess: {
        public: true,
    },
}

const runInContext = (callback) => {
    let result
    try {
        result = run(
            {
                principals: ['role:system.admin'],
                repository: 'com.enonic.cms.' + projectData.id,
            },
            callback
        )
    } catch (e) {
        log.info('Error: ' + e.message)
    }

    return result
}

const doCreateProject = () => createProject(projectData)

const doGetProject = () => getProject({ id: projectData.id })

const initializeProject = () => {
    runInContext(() => {
        const project = doGetProject()
        if (!project) {
            log.info(`Project ${projectData.id} not found. Creating...`)
            executeFunction({
                description: 'Importing Intro DB content',
                func: doInitProject,
            })
        } else {
            log.debug(`Project ${project.id} exists, skipping import`)
        }
    })
}

const doInitProject = () => {
    const project = doCreateProject()

    if (project) {
        log.info('Project "' + projectData.id + '" successfully created')
        publishRoot()
    } else {
        log.error('Project "' + projectData.id + '" create failed')
    }
}

const publishRoot = () => {
    const result = publish({
        keys: ['/movies', '/persons', '/articles', '/playlists'],
    })
    if (!result) {
        log.warning('Could not publish imported content.')
    }
}

if (isMaster()) {
    initializeProject()
}
