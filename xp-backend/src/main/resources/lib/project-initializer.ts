import { publish } from '/lib/xp/content'
import { executeFunction } from '/lib/xp/task'
import { create as createProject, get as getProject } from '/lib/xp/project'
import { run } from '/lib/xp/context'

export const projectData = {
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

/**
 * Initializes the idébanken project by checking if it exists and creating it if not.
 */
export const initializeProject = () => {
    runAsAdminInIdebankenContext(() => {
        const project = getProject({ id: projectData.id })
        if (!project) {
            log.info(`Project ${projectData.displayName} not found. Creating...`)
            executeFunction({
                description: `Create ${projectData.displayName} project`,
                func: () => {
                    const project = createProject(projectData)

                    if (project) {
                        log.info('Project "' + projectData.id + '" successfully created')
                        const result = publish({
                            keys: [`/${projectData.id}`],
                        })
                        if (!result) {
                            log.warning('Could not publish imported content.')
                        }
                    } else {
                        log.error('Project "' + projectData.id + '" create failed')
                    }
                },
            })
        } else {
            log.debug(`Project ${project.id} exists, skipping import`)
        }
    })
}

export const runAsAdminInIdebankenContext = <T>(callback: () => T) => {
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
