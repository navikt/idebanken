import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import type { ContentApiBaseBodyVariables, LocaleMapping } from '@enonic/nextjs-adapter'
import { getContentApiUrl } from '@enonic/nextjs-adapter'
import { LinkCardView } from './LinkCard'
import type { Part_Idebanken_Link_Card } from '~/types/generated.d'
import { HGrid } from '@navikt/ds-react'

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

interface PartProps {
    part: {
        descriptor: string
        config: null | {
            overrideSection?: { _path: string }
            selectedGuides?: Array<string>
            limit?: number
            showHeading?: boolean
            cardType?: 'withIcon' | 'withImage'
        }
    }
    common: {
        get: { _path: string; displayName?: string }
        getSite: { _path: string }
    }
    meta: {
        apiUrl: string
        locale: string
        defaultLocale: string
    }
}

const QUERY = `query($section:String!, $selected:[String!], $limit:String){
    guillotine {
        guidesUnderSection(
            section:$section,
            selectedGuidePaths:$selected,
            limit:$limit
        ){
            _path
            displayName
            ... on idebanken_Guide { 
                data { 
                    title 
                    description
                    iconName
                    iconColor
                    image {
                        ... on media_Image {
                            imageUrl(type:absolute scale:"height(800)")
                            data { altText }
                        }
                        ... on media_Vector {
                            mediaUrl(type:absolute)
                            data { caption }
                        }
                    }
                }
            }
        }
    }
}`

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
        body: { query: QUERY, variables },
    })) as { guillotine?: { guidesUnderSection?: Guide[] } }

    return res.guillotine?.guidesUnderSection ?? []
}

// Helper: map a Guide -> LinkCard part config
function guideToLinkCardConfig(
    g: Guide,
    cardType: 'withIcon' | 'withImage' | undefined
): Part_Idebanken_Link_Card {
    return {
        // Required fields for validatedLinkCardConfig (supply safe fallbacks)
        url: g._path,
        external: false,
        text: g.data?.title || g.displayName,
        description: g.data?.description || '',
        iconName: cardType === 'withIcon' ? g.data?.iconName || null : null,
        iconColor: cardType === 'withIcon' ? g.data?.iconColor || null : null,
        bgColor: '', // or choose a default e.g. 'bg-pink-100'
        tags: [], // no tags yet
        image: cardType === 'withImage' ? g.data?.image || null : null,
    } as Part_Idebanken_Link_Card
}

// Helper to split guides into N columns (round‑robin)
function splitColumns<T>(items: T[], cols: number): T[][] {
    const buckets: T[][] = Array.from({ length: cols }, () => [])
    items.forEach((it, i) => buckets[i % cols].push(it))
    return buckets
}

export async function SectionGuidesView(props: PartProps) {
    const cfg = props.part.config || {}
    const sectionPath = cfg.overrideSection?._path || props.common.get._path
    const cardType = cfg.cardType

    const localeMapping: LocaleMapping = {
        locale: props.meta.locale,
        default: props.meta.locale === props.meta.defaultLocale,
        project: 'idebanken',
        site: props.common.getSite._path,
    } as unknown as LocaleMapping

    console.log('cfg.limit', cfg.limit)

    const limit = cfg.limit && cfg.limit > 0 ? cfg.limit : undefined
    const selectedPaths = cfg.selectedGuides?.length ? cfg.selectedGuides.map((g) => g) : undefined
    const limitStr = limit ? String(limit) : undefined
    const apiUrl = getContentApiUrl({ contentPath: props.meta.apiUrl ?? '' })

    const guides = await fetchGuides(apiUrl, sectionPath, localeMapping, selectedPaths, limitStr)
    const showHeading = cfg.showHeading !== false

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
