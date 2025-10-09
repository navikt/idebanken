import { Content, get } from '/lib/xp/content'

export function getOrNull<T extends Content>(key?: string): T | null {
    return key ? get<T>({ key }) : null
}
