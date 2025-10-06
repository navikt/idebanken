import { imageUrl } from '/lib/xp/portal'
import { Content, get } from '/lib/xp/content'

export function iconUrlOfId(iconId?: string) {
    return iconId ? imageUrl({ id: iconId, type: 'absolute', scale: 'full' }) : undefined
}

export function getOrNull<T extends Content>(key?: string): T | null {
    return key ? get<T>({ key }) : null
}
