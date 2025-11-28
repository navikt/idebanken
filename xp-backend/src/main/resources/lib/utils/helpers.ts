import { Content, get } from '/lib/xp/content'
import { AktueltTags, Tags } from '@xp-types/site/x-data'

export function getOrNull<T extends Content>(key?: string): T | null {
    return key ? get<T>({ key }) : null
}

export function getTags(ibxData: XpXData['idebanken']): Tags | AktueltTags | undefined {
    return ibxData?.tags || ibxData?.['aktuelt-tags']
}
