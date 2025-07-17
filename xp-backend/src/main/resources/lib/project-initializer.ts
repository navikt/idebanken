import { publish } from '/lib/xp/content'
import { executeFunction } from '/lib/xp/task'
import { create as createProject, get as getProject } from '/lib/xp/project'
import { run } from '/lib/xp/context'
import { CONTENT_LOCALE_DEFAULT } from '/lib/constants'
import { logger } from '/lib/utils/logging'

export const projectData = {
    id: 'idebanken',
    displayName: 'Idébanken',
    description: 'Nettside for Idébanken',
    language: CONTENT_LOCALE_DEFAULT,
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
    runAsAdmin(() => {
        const project = getProject({ id: projectData.id })
        if (!project) {
            logger.info(`Project ${projectData.displayName} not found. Creating...`)
            executeFunction({
                description: `Create ${projectData.displayName} project`,
                func: () => {
                    const project = createProject(projectData)

                    if (project) {
                        logger.info('Project "' + projectData.id + '" successfully created')
                        const result = publish({
                            keys: [`/${projectData.id}`],
                        })
                        if (!result) {
                            logger.warning('Could not publish imported content.')
                        }
                    } else {
                        logger.error('Project "' + projectData.id + '" create failed')
                    }
                },
            })
        } else {
            logger.debug(`Project ${project.id} exists, skipping import`)
        }
    })
}

export const runAsAdmin = <T>(callback: () => T) => {
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
        logger.info('Error: ' + e.message)
    }

    return result
}
