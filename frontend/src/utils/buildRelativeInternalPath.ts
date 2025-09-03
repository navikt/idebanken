const SITE_ROOT = '/idebanken'

// Generic helper: turn an internal XP path into site‑relative (strip /idebanken and branch prefixes)
export function buildRelativeInternalPath(p?: string | null): string | undefined {
    if (!p) return undefined
    let v = p.trim()
    if (!v) return undefined
    // Strip optional /site/<site>/branch/ prefix
    v = v.replace(new RegExp(`^/site/${SITE_ROOT.slice(1)}/(master|draft)/`), '/')
    // Strip optional /master/ or /draft/ prefix
    v = v.replace(/^\/(master|draft)(?=\/)/, '')
    if (v === SITE_ROOT) return '/'
    if (v.startsWith(SITE_ROOT + '/')) v = v.slice(SITE_ROOT.length)
    if (!v.startsWith('/')) v = '/' + v
    return v || '/'
}
