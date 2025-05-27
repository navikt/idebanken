import { create as createProject, get as getProject } from '/lib/xp/project';
import { publish } from '/lib/xp/content';
import { run } from '/lib/xp/context';
import { isMaster } from '/lib/xp/cluster';
import { executeFunction } from '/lib/xp/task';
import { importNodes } from '/lib/xp/export';

const projectData = {
    id: 'intro',
    displayName: 'Intro Project',
    description: 'Sample content from the cinematic industry',
    language: 'en',
    siteConfig: [{
        applicationKey: app.name
    }],
    readAccess: {
        public: true
    }
}

const runInContext = (callback) => {
    let result;
    try {
        result = run({
            principals: ["role:system.admin"],
            repository: 'com.enonic.cms.' + projectData.id
        }, callback);
    } catch (e) {
        log.info('Error: ' + e.message);
    }

    return result;
}

const doCreateProject = () => createProject(projectData);

const doGetProject = () => getProject({ id: projectData.id });

const initializeProject = () => {
    runInContext(() => {
        const project = doGetProject();
        if (!project) {
            log.info(`Project ${projectData.id} not found. Creating...`);
            executeFunction({
                description: 'Importing Intro DB content',
                func: doInitProject
            });
        }
        else {
            log.debug(`Project ${project.id} exists, skipping import`);
        }
    });
};

const doInitProject = () => {
    const project = doCreateProject();

    if (project) {
        log.info('Project "' + projectData.id + '" successfully created');
        createContent();
        publishRoot();
    } else {
        log.error('Project "' + projectData.id + '" create failed');
    }
};

const createContent = () => {
    const nodes = importNodes({
        source: resolve('/import'),
        targetNodePath: '/content',
        xslt: resolve('/import/replace_app.xsl'),
        xsltParams: {
            applicationId: app.name
        },
        includeNodeIds: true,
        nodeImported: () => {},
        nodeResolved: () => {}
    });
    log.info('Importing Intro DB content');
    if (nodes.importErrors.length > 0) {
        log.warning('Errors:');
        nodes.importErrors.forEach(element => log.warning(element.message));
        log.info('-------------------');
    }
}

const publishRoot = () => {
    const result = publish({
        keys: ['/movies', '/persons','/articles', '/playlists' ]
    });
    if (!result) {
        log.warning('Could not publish imported content.');
    }
}

if (isMaster()) {
    initializeProject();
}
