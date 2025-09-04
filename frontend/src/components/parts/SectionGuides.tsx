import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import type { ContentApiBaseBodyVariables, LocaleMapping, PartProps } from '@enonic/nextjs-adapter'
import { getContentApiUrl } from '@enonic/nextjs-adapter'
import { LinkCardView } from './LinkCard'
import type { Part_Idebanken_Link_Card } from '~/types/generated.d'
import { HGrid } from '@navikt/ds-react'
import { buildLocaleMapping } from '~/utils/buildLocaleMapping'
import { sectionGuidesQuery } from '~/components/queries/parts'
import {
    validatedSectionGuidesConfig,
    validatedDocumentCardConfig,
} from '~/utils/runtimeValidation'
import { DocumentCardConfigRaw, DocumentCardConfig } from '~/types/valibot/parts'
import { buildRelativeInternalPath } from '~/utils/buildRelativeInternalPath'
import { LinkHeading } from './LinkHeading'

async function fetchGuides(
    apiUrl: string,
    sectionPath: string,
    localeMapping: LocaleMapping,
    selectedPaths?: string[],
    limitStr?: string
): Promise<DocumentCardConfig[]> {
    const variables = {
        section: sectionPath,
        ...(selectedPaths && selectedPaths.length ? { selected: selectedPaths } : {}),
        ...(limitStr ? { limit: limitStr } : {}),
    } as unknown as ContentApiBaseBodyVariables

    const res = (await fetchGuillotine(apiUrl, localeMapping, {
        method: 'POST',
        body: { query: sectionGuidesQuery, variables },
    })) as { guillotine?: { guidesUnderSection?: DocumentCardConfigRaw[] } }
    const guides = validatedDocumentCardConfig(res.guillotine?.guidesUnderSection) || []
    return guides
}

function guideToLinkCardConfig(
    g: DocumentCardConfig,
    cardType: 'withIcon' | 'withImage' | undefined
): Part_Idebanken_Link_Card {
    return {
        url: g._path,
        external: false,
        text: g.data?.title || g.displayName,
        description: g.data?.description || '',
        iconName: cardType === 'withIcon' ? g.data?.iconName || null : null,
        iconColor: cardType === 'withIcon' ? g.data?.iconColor || null : null,
        bgColor: '',
        tags: g.data?.categories || [],
        image: cardType === 'withImage' ? g.data?.image || null : null,
    } as Part_Idebanken_Link_Card
}

export async function SectionGuidesView(props: PartProps) {
    const cfg = validatedSectionGuidesConfig(props.part.config)

    if (!cfg) return null

    const sectionPath = cfg.overrideSection?._path || props.common.get._path
    const cardType = cfg.cardType

    const localeMapping = buildLocaleMapping(props.meta, props.common.getSite)

    const limit = cfg.limit && cfg.limit > 0 ? String(cfg.limit) : undefined
    const selectedPaths = cfg.selectedGuides?.length
        ? cfg.selectedGuides.map((g) => g._path)
        : undefined
    const showHeading = cfg.showHeading !== false

    const apiUrl = getContentApiUrl({ contentPath: props.meta.apiUrl ?? '' })

    const guides = await fetchGuides(apiUrl, sectionPath, localeMapping, selectedPaths, limit)

    const isImageCards = cardType === 'withImage'
    const spanClass = isImageCards ? 'md:col-span-4' : 'md:col-span-6'
    const headingLink = buildRelativeInternalPath(sectionPath)
    const rawDisplayName = cfg.overrideSection?.displayName || props.common.get.displayName
    const headingTitle = rawDisplayName
        ? rawDisplayName.charAt(0).toUpperCase() + rawDisplayName.slice(1)
        : rawDisplayName

    if (!guides.length) {
        return (
            <section>
                <LinkHeading
                    show={showHeading}
                    title={headingTitle}
                    href={headingLink}
                    customClassName="mb-12"
                />
                <p>Ingen veiledere.</p>
            </section>
        )
    }

    return (
        <section>
            <LinkHeading
                show={showHeading}
                title={headingTitle}
                href={headingLink}
                customClassName="mb-12"
            />
            <HGrid
                columns={{ xs: 1, md: 12 }}
                gap={{ xs: 'space-16', lg: 'space-20', xl: 'space-24' }}
                className="items-start">
                {guides.map((g) => (
                    <div key={g._path} className={`col-span-1 ${spanClass}`}>
                        <LinkCardView
                            part={{
                                descriptor: 'generated:link-card',
                                config: guideToLinkCardConfig(g, cardType),
                            }}
                        />
                    </div>
                ))}
            </HGrid>
        </section>
    )
}
