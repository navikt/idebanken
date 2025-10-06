import { imageUrl } from '/lib/xp/portal'

export function iconUrlOfId(iconId: string | undefined) {
    return iconId ? imageUrl({ id: iconId, type: 'absolute', scale: 'full' }) : undefined
}
