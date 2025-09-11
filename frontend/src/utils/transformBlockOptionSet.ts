import { buildRelativeInternalPath } from '~/utils/buildRelativeInternalPath'
import { Part_Idebanken_Link_Card_BlockOptionSet as BlockOptionSet } from '~/types/generated.d'

export default function transformBlockOptionSet(config?: BlockOptionSet | null) {
    const sel = config?._selected

    if (sel === 'externalLink') {
        const raw = (config?.externalLink?.url || '').trim()
        if (!raw) return { url: undefined, external: true }
        const finalUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
        return { url: finalUrl, external: true }
    }
    if (sel === 'internalLink') {
        const pageUrl = config?.internalLink?.ideBankContentSelector?.pageUrl || ''
        const rel = buildRelativeInternalPath(pageUrl)
        return { url: rel, external: false }
    }

    return { url: undefined, external: false }
}
