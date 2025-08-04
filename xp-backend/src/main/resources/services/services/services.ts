import * as taskLib from '/lib/xp/task'
import thymeleafLib from '/lib/thymeleaf'
import { Request } from '@enonic-types/core'
import { serviceUrl } from '/lib/xp/portal'
import { externalSearchUpdateAll } from '/lib/search/update-all'
import { runAsAdmin } from '/lib/project-initializer'

type ActionsMap = Record<string, { description: string; callback: () => unknown }>

type Params = {
    cmd: keyof typeof validActions
}

const view = resolve('services.html')

const validActions: ActionsMap = {
    updateAllSearchNodesExternal: {
        description: 'Oppdater alle dokumenter for eksternt søk',
        callback: externalSearchUpdateAll,
    },
}

export const get = (req: Request) => {
    const { cmd } = req.params as Params
    const actionToRun = validActions[cmd]

    if (actionToRun) {
        taskLib.executeFunction({
            description: actionToRun.description,
            func: () => {
                runAsAdmin(() => actionToRun.callback)
            },
        })
    }

    const model = {
        actionUrl: serviceUrl({ service: 'services' }),
        cmds: Object.entries(validActions).map(([name, action]) => ({
            cmd: name,
            description: action.description,
        })),
        runningCmd: actionToRun ? cmd : undefined,
    }

    return {
        body: thymeleafLib.render(view, model),
        contentType: 'text/html; charset=UTF-8',
    }
}
