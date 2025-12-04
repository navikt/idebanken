import * as nodeLib from '/lib/xp/node'
import { ConnectParams, Node, RepoConnection } from '/lib/xp/node'
import { ADMIN_PRINCIPAL, CONTENT_REPO_PREFIX, SUPER_USER } from '../constants'
import { create as createRepo, type CreateRepositoryParams, get as getRepo } from '/lib/xp/repo'
import { runAsAdmin } from '/lib/project-initializer'
import { forceArray } from '/lib/utils/array-utils'

export function getNodesFromQueryHits<T>(
    hits: Array<{ id: string }>,
    conn: RepoConnection
): ReadonlyArray<Node<T>> {
    return forceArray<Node<T>>(conn.get(hits.map((it) => it.id)))
}

const asAdminParams: Pick<ConnectParams, 'user' | 'principals'> = {
    user: {
        login: SUPER_USER,
    },
    principals: [ADMIN_PRINCIPAL],
}

type Params = Omit<ConnectParams, 'user' | 'principals'> & { asAdmin?: boolean }

export const getRepoConnection = ({ repoId, branch, asAdmin }: Params) =>
    nodeLib.connect({
        repoId,
        branch,
        ...(asAdmin && asAdminParams),
    })

export const getContentProjectIdFromRepoId = (repoId: string) =>
    repoId.replace(`${CONTENT_REPO_PREFIX}.`, '')

export const isDraftAndMasterSameVersion = (contentId: string, repoId: string) => {
    const draftContent = getRepoConnection({ branch: 'draft', repoId }).get(contentId)
    const masterContent = getRepoConnection({ branch: 'master', repoId }).get(contentId)

    return draftContent?._versionKey === masterContent?._versionKey
}

export function createRepoIfNotExists(
    id: string,
    params?: Omit<CreateRepositoryParams, 'id'>
): void {
    runAsAdmin((): void => {
        if (!getRepo(id)) {
            log.info('Creating repository %s', id)
            createRepo({
                ...params,
                id,
            })
        }
    })
}
