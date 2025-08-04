import type { CreateNodeParams, Node, RepoConnection } from '/lib/xp/node'
import { forceArray } from '/lib/utils/array-utils'
import { getRepoConnection } from '/lib/repos/repo-utils'
import { LogLevel } from '/lib/utils/logging'
import { DateTimeFormatter, LocalDateTime } from '/lib/time'

export type DashboardErrorLog = {
    logs: Array<string> | string
}

export const DASHBOARD_LOG_REPO_ID = 'dashboard-log'
export const DASHBOARD_LOG_PARENT_PATH = '/dashboard-error-log'

export class LogToDashboard {
    private readonly date: string
    private readonly level: LogLevel
    private readonly repoConnection: RepoConnection

    constructor(level: LogLevel) {
        this.level = level
        this.date = LocalDateTime.now().format(DateTimeFormatter.ofPattern('dd.MM.YYYY'))
        this.repoConnection = getRepoConnection({
            repoId: DASHBOARD_LOG_REPO_ID,
            branch: 'master',
            asAdmin: true,
        })
        if (!this.repoConnection.exists(DASHBOARD_LOG_PARENT_PATH)) {
            this.repoConnection.create({
                _parentPath: '/',
                _name: DASHBOARD_LOG_PARENT_PATH.replace('/', ''),
            })
        }
    }

    public log(...message: unknown[]): void {
        const date = LocalDateTime.now().format(DateTimeFormatter.ofPattern('dd.MM.YYYY HH:mm'))
        const formattedMessage = `[${this.level}][${date}] ${message.join(' ')}`
        const currentEntry = `${DASHBOARD_LOG_PARENT_PATH}/${this.date}`
        if (this.repoConnection.exists(currentEntry)) {
            this.repoConnection.modify({
                key: currentEntry,
                editor: (node: Node<DashboardErrorLog>) => ({
                    ...node,
                    logs: forceArray(node.logs).concat(formattedMessage),
                }),
            })
        } else {
            this.repoConnection.create<CreateNodeParams<DashboardErrorLog>>({
                _parentPath: DASHBOARD_LOG_PARENT_PATH,
                _name: this.date,
                logs: [formattedMessage],
            })
        }
    }
}
