import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { Extensions } from '@enonic-types/guillotine/extensions'

import { commonGuillotineTypes } from './common-guillotine-types'
import { headlessCmsExtensions } from './extensions/headless-cms'
import { categoryExtensions } from './extensions/category'
import { tableOfContentsExtensions } from './extensions/parts/table-of-contents'
import { linkCardListExtensions } from './extensions/parts/link-card-list'
import { linkCardExtensions } from './extensions/parts/link-card'
import { highlightedBoxMacroExtensions } from './extensions/highlighted-box-macro'

export function extensions(graphQL: GraphQL): Extensions {
    const headlessCms = headlessCmsExtensions(graphQL)
    const category = categoryExtensions(graphQL)
    const tableOfContents = tableOfContentsExtensions(graphQL)
    const linkCardList = linkCardListExtensions(graphQL)
    const linkCard = linkCardExtensions(graphQL)
    const highlightedBoxMacro = highlightedBoxMacroExtensions(graphQL)

    return {
        types: {
            ...commonGuillotineTypes(graphQL),
            ...headlessCms.types,
            ...category.types,
            ...linkCardList.types,
            ...linkCard.types,
            ...highlightedBoxMacro.types,
        },
        resolvers: {
            ...headlessCms.resolvers,
            ...category.resolvers,
            ...tableOfContents.resolvers,
            ...linkCardList.resolvers,
            ...linkCard.resolvers,
            ...highlightedBoxMacro.resolvers,
        },
        creationCallbacks: {
            ...headlessCms.creationCallbacks,
            ...category.creationCallbacks,
            ...tableOfContents.creationCallbacks,
            ...linkCardList.creationCallbacks,
            ...linkCard.creationCallbacks,
            ...highlightedBoxMacro.creationCallbacks,
        },
    }
}
