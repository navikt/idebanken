import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import type { LocaleMapping } from '@enonic/nextjs-adapter'
import { getContentApiUrl } from '@enonic/nextjs-adapter'

type Guide = {
    _path: string
    displayName: string
    data?: {
        title?: string
        ingress?: { processedHtml: string }
        iconName?: string
        iconColor?: string
    }
}

interface PartProps {
    part: {
        descriptor: string
        config: null | {
            overrideSection?: { _path: string }
            limit?: number
            showHeading?: boolean
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

const QUERY = `query($section:String!){
    guillotine {
        guidesUnderSection(section:$section){
            _path
            displayName
            ... on idebanken_Guide { 
                data { 
                    title 
                    ingress {
                        processedHtml
                    }
                    iconName
                    iconColor
                    image {
                        ... on media_Image {
                            imageUrl(type: absolute, scale: "height(800)")
                            data {
                                altText
                            }
                        }
                        ... on media_Vector {
                            mediaUrl(type: absolute)
                            data {
                                caption
                            }
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
    localeMapping: LocaleMapping
): Promise<Guide[]> {
    const res = (await fetchGuillotine(apiUrl, localeMapping, {
        method: 'POST',
        body: {
            query: QUERY,
            variables: { section: sectionPath },
        },
    })) as { guillotine?: { guidesUnderSection?: Guide[] } }
    console.log('guilliotine', res)
    return res.guillotine?.guidesUnderSection ?? []
}

export async function SectionGuidesView(props: PartProps) {
    const cfg = props.part.config || {}
    const sectionPath = cfg.overrideSection?._path || props.common.get._path

    const localeMapping: LocaleMapping = {
        locale: props.meta.locale,
        default: props.meta.locale === props.meta.defaultLocale,
        project: 'idebanken',
        site: props.common.getSite._path,
    }

    const apiUrl = getContentApiUrl({ contentPath: props.meta.apiUrl ?? '' })

    const guides = await fetchGuides(apiUrl, sectionPath, localeMapping)

    const limit = cfg.limit && cfg.limit > 0 ? cfg.limit : undefined
    const sliced = limit ? guides.slice(0, limit) : guides
    const showHeading = cfg.showHeading !== false

    return (
        <section>
            {showHeading && <h2>{props.common.get.displayName || 'Veiledere'}</h2>}
            {!sliced.length && <p>Ingen veiledere.</p>}
            {sliced.length > 0 && (
                <ul>
                    {sliced.map((g) => (
                        <li key={g._path}>
                            {g.data?.title || g.displayName}
                            <br />
                            {g.data?.ingress?.processedHtml && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: g.data.ingress.processedHtml,
                                    }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
