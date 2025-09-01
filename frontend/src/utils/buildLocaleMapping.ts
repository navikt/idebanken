import type { LocaleMapping } from '@enonic/nextjs-adapter'

interface MetaLike {
    locale: string
    defaultLocale: string
}
interface SiteLike {
    _path: string
    displayName?: string
}

export function buildLocaleMapping(
    meta: MetaLike,
    site: SiteLike,
    projectFallback = 'idebanken'
): LocaleMapping {
    return {
        locale: meta.locale,
        default: meta.locale === meta.defaultLocale,
        project: site.displayName || projectFallback,
        site: site._path,
    } as unknown as LocaleMapping
}
