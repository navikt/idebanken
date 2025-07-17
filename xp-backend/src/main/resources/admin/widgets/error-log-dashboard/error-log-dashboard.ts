import type { RepoConnection } from '/lib/xp/node'
import { render } from '/lib/thymeleaf'
import { Request, Response } from '@enonic-types/core'
import {
    DASHBOARD_LOG_PARENT_PATH,
    DASHBOARD_LOG_REPO_ID,
    type DashboardErrorLog,
} from './log-to-dashboard'
import {
    createRepoIfNotExists,
    getNodesFromQueryHits,
    getRepoConnection,
} from '/lib/repos/repo-utils'
import { forceArray } from '/lib/utils/array-utils'

type ErrorLogEntries = {
    logEntries: Array<
        Omit<DashboardErrorLog, 'logs'> & {
            logs: Array<string>
        }
    >
}

const view = resolve('error-log-dashboard.html')

export function get(req: Request): Response {
    const DEFALUT_NUMBER_OF_LOGS: Readonly<number> = 100

    const numberOfLogs = req?.params?.numberOfLogs
        ? parseInt(req?.params?.numberOfLogs as string)
        : DEFALUT_NUMBER_OF_LOGS

    createRepoIfNotExists(DASHBOARD_LOG_REPO_ID)
    const connection = getRepoConnection({
        repoId: DASHBOARD_LOG_REPO_ID,
        branch: 'master',
        asAdmin: true,
    })
    const logData = { logEntries: getErrorLogs(connection, numberOfLogs) }

    return {
        status: 200,
        body: render<ErrorLogEntries>(view, logData),
        contentType: 'text/html',
    }
}

function getErrorLogs(conn: RepoConnection, count: number): ErrorLogEntries['logEntries'] {
    if (!conn.exists(DASHBOARD_LOG_PARENT_PATH)) {
        return []
    } else {
        const children = conn.findChildren({
            parentKey: DASHBOARD_LOG_PARENT_PATH,
            count: count,
            childOrder: '_ts DESC',
        })

        return getNodesFromQueryHits<DashboardErrorLog>(children.hits, conn).map(({ logs }) => ({
            logs: forceArray(logs),
        }))
    }
}
