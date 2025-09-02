import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import type { ContentApiBaseBodyVariables, LocaleMapping, PartProps } from '@enonic/nextjs-adapter'
import { getContentApiUrl } from '@enonic/nextjs-adapter'
import { LinkCardView } from './LinkCard'
import type { Part_Idebanken_Link_Card } from '~/types/generated.d'
import { HGrid } from '@navikt/ds-react'
import { buildLocaleMapping } from '~/utils/buildLocaleMapping'
import { sectionGuidesQuery } from '~/components/queries/parts'
import { validatedSectionGuidesConfig } from '~/utils/runtimeValidation'

type GuideImage =
    | {
          imageUrl?: string
          data?: { altText?: string; caption?: string }
      }
    | undefined

type Guide = {
    _path: string
    displayName: string
    data?: {
        title?: string
        description?: string
        iconName?: string
        iconColor?: string
        image?: GuideImage
    }
}

async function fetchGuides(
    apiUrl: string,
    sectionPath: string,
    localeMapping: LocaleMapping,
    selectedPaths?: string[],
    limitStr?: string
): Promise<Guide[]> {
    const variables = {
        section: sectionPath,
        ...(selectedPaths && selectedPaths.length ? { selected: selectedPaths } : {}),
        ...(limitStr ? { limit: limitStr } : {}),
    } as unknown as ContentApiBaseBodyVariables

    const res = (await fetchGuillotine(apiUrl, localeMapping, {
        method: 'POST',
        body: { query: sectionGuidesQuery, variables },
    })) as { guillotine?: { guidesUnderSection?: Guide[] } }

    return res.guillotine?.guidesUnderSection ?? []
}

function guideToLinkCardConfig(
    g: Guide,
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
        tags: [], // no tags yet
        image: cardType === 'withImage' ? g.data?.image || null : null,
    } as Part_Idebanken_Link_Card
}

function splitColumns<T>(items: T[], cols: number): T[][] {
    const buckets: T[][] = Array.from({ length: cols }, () => [])
    items.forEach((it, i) => buckets[i % cols].push(it))
    return buckets
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

    if (!guides.length) {
        return (
            <section>
                {showHeading && <h2>{props.common.get.displayName || 'Veiledere'}</h2>}
                <p>Ingen veiledere.</p>
            </section>
        )
    }

    // Decide layout based on cardType
    const useThreeColumn = cardType === 'withImage'
    const columns = useThreeColumn ? 3 : 2
    const spans = useThreeColumn ? 4 : 6 // 12 grid system
    const grouped = splitColumns(guides, columns)

    return (
        <section>
            {showHeading && <h2>{props.common.get.displayName || 'Veiledere'}</h2>}
            <HGrid
                columns={{ xs: 1, md: 12 }}
                gap={{ xs: 'space-16', lg: 'space-20', xl: 'space-24' }}
                className="items-stretch">
                {grouped.map((col, idx) => (
                    <div
                        key={idx}
                        className={`col-span-1 md:col-span-${spans} flex flex-col gap-4`}>
                        {col.map((g) => (
                            <LinkCardView
                                key={g._path}
                                part={{
                                    descriptor: 'generated:link-card',
                                    config: guideToLinkCardConfig(g, cardType),
                                }}
                            />
                        ))}
                    </div>
                ))}
            </HGrid>
        </section>
    )
}
