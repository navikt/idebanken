import {
    DASHBOARD_LOG_PARENT_PATH,
    DASHBOARD_LOG_REPO_ID,
} from '../../admin/widgets/error-log-dashboard/log-to-dashboard'
import { Instant, LocalDate, ZoneId } from '/lib/time'
import { logger } from '/lib/utils/logging'
import { getRepoConnection } from '/lib/repos/repo-utils'

const RETENTION_PERIOD = 30

export function run(): void {
    const retentionDate = LocalDate.ofInstant(Instant.now(), ZoneId.of('UTC'))
        .minusDays(RETENTION_PERIOD)
        .toString()

    const connection = getRepoConnection({
        repoId: DASHBOARD_LOG_REPO_ID,
        branch: 'master',
        asAdmin: true,
    })
    const logsToBeDeleted =
        connection
            .query({
                count: -1,
                query: {
                    boolean: {
                        must: [
                            {
                                range: {
                                    field: '_ts',
                                    lt: retentionDate,
                                },
                                pathMatch: {
                                    field: '_path',
                                    path: `${DASHBOARD_LOG_PARENT_PATH}/*`,
                                },
                            },
                        ],
                    },
                },
            })
            ?.hits?.map((h) => h.id) || []

    if (logsToBeDeleted.length) {
        logger.info(`deleting ${logsToBeDeleted.length} logs older than ${RETENTION_PERIOD} days`)
        connection.delete(logsToBeDeleted)
    }
}
