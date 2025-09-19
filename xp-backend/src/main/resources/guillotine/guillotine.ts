import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { Extensions } from '@enonic-types/guillotine/extensions'

import { commonGuillotineTypes } from './common-guillotine-types'
import { headlessCmsExtensions } from './extensions/headless-cms'
import { categoryExtensions } from './extensions/category'
import { tableOfContentsExtensions } from './extensions/table-of-contents'
import { linkCardListExtensions } from './extensions/link-card-list'

export function extensions(graphQL: GraphQL): Extensions {
    const headlessCms = headlessCmsExtensions(graphQL)
    const category = categoryExtensions(graphQL)
    const tableOfContents = tableOfContentsExtensions(graphQL)
    const linkCardList = linkCardListExtensions(graphQL)

    return {
        types: {
            ...commonGuillotineTypes(graphQL),
            ...headlessCms.types,
            ...category.types,
            ...linkCardList.types,
        },
        resolvers: {
            ...headlessCms.resolvers,
            ...category.resolvers,
            ...tableOfContents.resolvers,
            ...linkCardList.resolvers,
        },
        creationCallbacks: {
            ...headlessCms.creationCallbacks,
            ...category.creationCallbacks,
            ...tableOfContents.creationCallbacks,
            ...linkCardList.creationCallbacks,
        },
    }
}
