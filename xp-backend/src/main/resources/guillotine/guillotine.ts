import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { Extensions } from '@enonic-types/guillotine/extensions'

import { commonGuillotineTypes } from './common-guillotine-types'
import { headlessCmsExtensions } from './extensions/headless-cms'
import { categoryExtensions } from './extensions/category'
import { tableOfContentsExtensions } from './extensions/parts/table-of-contents'
import { linkCardListExtensions } from './extensions/parts/link-card-list'
import { linkCardExtensions } from './extensions/parts/link-card'
import { highlightedBoxMacroExtensions } from './extensions/highlighted-box-macro'
import { buttonExtensions } from './extensions/parts/button'
import { contentExtensions } from './extensions/content'

export function extensions(graphQL: GraphQL): Extensions {
    const extensions = [
        headlessCmsExtensions,
        categoryExtensions,
        tableOfContentsExtensions,
        linkCardListExtensions,
        linkCardExtensions,
        highlightedBoxMacroExtensions,
        buttonExtensions,
        contentExtensions,
    ].map((ext) => ext(graphQL))

    return {
        types: {
            ...commonGuillotineTypes(graphQL),
            ...extensions.reduce(
                (acc, curr) => ({ ...acc, ...curr.types }),
                {} as Extensions['types']
            ),
        },
        resolvers: {
            ...extensions.reduce(
                (acc, curr) => ({ ...acc, ...curr.resolvers }),
                {} as Extensions['resolvers']
            ),
        },
        creationCallbacks: {
            ...extensions.reduce(
                (acc, curr) => ({ ...acc, ...curr.creationCallbacks }),
                {} as Extensions['creationCallbacks']
            ),
        },
    }
}
