import { getUrl, MetaData } from '@enonic/nextjs-adapter'

export function formatImageUrl(
    meta: MetaData,
    url?: string,
    width?: number,
    height?: number
): string {
    if (!url) return ''
    if (!width && !height) return url
    let resizeType: 'block' | 'width' | 'height'
    let dim: string
    const upscale = 1.4
    if (width && height) {
        resizeType = 'block'
        dim = `${Math.round(width * upscale)}-${Math.round(height * upscale)}`
    } else if (width) {
        resizeType = 'width'
        dim = `${Math.round(width * upscale)}`
    } else {
        resizeType = 'height'
        dim = `${Math.round((height ?? 800) * upscale)}`
    }
    const resolved = getUrl(url, meta) || url
    return resolved.replace(/(\/_\/image\/[^/]+)\/([^/]+)/, `$1/${resizeType}-${dim}`)
}

export const imgRatios: Record<string, string> = {
    '16:9': 'aspect-16/9',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
    '3:4': 'aspect-3/4',
    '9:16': 'aspect-9/16',
}
export type ImageData = {
    image?: {
        imageUrl?: string
        data?: {
            altText?: string | null
            caption?: string | null
            artist?: Array<string> | null
        }
    }
}

interface BasicImageProps {
    src: string
    caption?: string
    decorative: boolean
    alt: string
    width?: number
    height?: number
    centerHorizontally: boolean
    centerVertically: boolean
    paddingX: number
    paddingY: number
    hideOnMobile?: boolean | null
}

export interface StyledImageProps extends BasicImageProps {
    borderRadius?: number
    showBorder: boolean
    borderDistance: number
    circles: Array<{
        size: number
        color: string
        bottom: number
        left: number
    }>
    bleed: boolean
    standard: boolean
    sizeVariant?: 'standard' | 'medium' | 'large'
}

export const accentColors: Record<string, string> = {
    pink: 'bg-(--ib-pink-100A)',
    red: 'bg-(--ib-pink-400A)',
    blue: 'bg-(--ib-dark-blue-100A)',
}
export const standardSizeMap: Record<'standard' | 'medium' | 'large', number> = {
    standard: 672,
    medium: 768,
    large: 1024,
}
