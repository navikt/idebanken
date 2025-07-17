import { create, CreateScheduledJobParams, get, modify, ScheduledJob } from '/lib/xp/scheduler'
import { logger } from '/lib/utils/logging'
import { runAsAdmin } from '/lib/project-initializer'
import { run } from '../tasks/log-cleanup/log-cleanup'

const EVERY_DAY_CRON = '0 2 * * *' //every day at 02:00
const LOG_CLEANUP_NAME = 'log-cleanup'
export const LOVDATA_DESCRIPTOR = `${app.name}:${LOG_CLEANUP_NAME}`

export function setupSchedulers(): void {
    runAsAdmin(() => {
        run()
        upsertScheduledJob({
            description: 'cron for getting new info from Lovdata',
            descriptor: LOVDATA_DESCRIPTOR,
            schedule: {
                type: 'CRON',
                value: EVERY_DAY_CRON,
                timeZone: `GMT${getTimezoneOffset()}`,
            },
            user: `user:system:su`,
            config: {},
            enabled: true,
            name: LOG_CLEANUP_NAME,
        })
    })
}

function upsertScheduledJob<Config extends Record<string, unknown>>(
    params: CreateScheduledJobParams<Config>
): ScheduledJob<Config> {
    const job =
        get(params) === null
            ? create<Config>(params)
            : modify<Config>({
                  name: params.name,
                  editor: (scheduledJob) => ({
                      ...scheduledJob,
                      config: params.config,
                      description: params.description,
                      descriptor: params.descriptor,
                      schedule: params.schedule,
                      user: params.user ?? scheduledJob.user,
                      enabled: params.enabled,
                  }),
              })

    logger.info(
        job.enabled
            ? `Scheduled job at ${formatCronValue(job.schedule.value)} named "${job.name}"`
            : `Disabled scheduled job "${job.name}"`
    )

    return job
}

function getTimezoneOffset(): string {
    function makeDoubleDigit(n: number): string {
        return (n < 10 ? '0' : '') + n
    }

    let offset = new Date().getTimezoneOffset()
    const sign = offset < 0 ? '+' : '-'
    offset = Math.abs(offset)
    //format eg +2:00
    return `${sign}${(offset / 60) | 0}:${makeDoubleDigit(offset % 60)}`
}

function formatCronValue(cron: string): string {
    const [minutes, hours] = cron.split(' ')
    return `${padTime(hours)}:${padTime(minutes)}`
}

function padTime(str: string): string {
    return str.length === 2 ? str : `0${str}`
}
