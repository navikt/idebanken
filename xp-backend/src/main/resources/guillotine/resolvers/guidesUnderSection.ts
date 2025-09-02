import { runInContext } from '/lib/repos/run-in-context'
import { get as getContent, getChildren } from '/lib/xp/content'
import type { Content } from '/lib/xp/content'
import { logger } from '/lib/utils/logging'
import type { DataFetchingEnvironment } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'

type EmptyRecord = Record<string, unknown>

type GuidesUnderSectionArgs = {
    section?: string
    selectedGuidePaths?: string[]
    limit?: string
}

function getArgs<T extends object>(env: unknown): T {
    const e = env as { arguments?: T; args?: T }
    return (e.arguments || e.args || {}) as T
}

function getSectionArg(env: unknown): string | undefined {
    const args = getArgs<GuidesUnderSectionArgs>(env)
    const raw = args.section
    if (!raw) return undefined
    const trimmed = raw.trim()
    return trimmed.length ? trimmed : undefined
}

export function guidesUnderSection(
    rawEnv: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
) {
    return runInContext({ asAdmin: true }, () => {
        const args = getArgs<GuidesUnderSectionArgs>(rawEnv)
        logger.info(JSON.stringify(args))

        const sectionPath = getSectionArg(rawEnv)
        if (!sectionPath) return []
        if (!/^\/idebanken\/[^/]+$/.test(sectionPath)) return []

        const parent = getContent({ key: sectionPath }) as Content<unknown> | null
        if (!parent || parent.type !== 'idebanken:section-page') return []

        const rawChildren = getChildren({ key: parent._id, count: 1000 })
        type ChildrenObj = { hits?: Array<Content<unknown>> }
        const children: Array<Content<unknown>> = Array.isArray(rawChildren)
            ? (rawChildren as Array<Content<unknown>>)
            : ((rawChildren as ChildrenObj).hits ?? [])

        let guides = children.filter((c) => c.type === 'idebanken:guide')

        if (args.selectedGuidePaths?.length) {
            const wanted = args.selectedGuidePaths
                .map((p) => p && p.trim())
                .filter(Boolean) as string[]
            const order = new Map(wanted.map((p, i) => [p, i]))
            guides = guides
                .filter((g) => order.has(g._path))
                .sort((a, b) => order.get(a._path)! - order.get(b._path)!)
        }

        if (args.limit) {
            const lim = parseInt(args.limit, 10)
            if (lim > 0 && guides.length > lim) guides = guides.slice(0, lim)
        }
        return guides
    })
}
