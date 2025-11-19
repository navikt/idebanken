'use client'

import classNames from 'classnames'
import { joinArrayWithCommasAndAnd } from '~/utils/utils'
import { getUrl, MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'
import { Circle } from '~/components/common/Circle'
import { XP_Image } from '@xp-types/site/parts'
import Image from 'next/image'
import { BodyShort } from '@navikt/ds-react'

// Image
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

interface StyledImageProps extends BasicImageProps {
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
}

const accentColors: Record<string, string> = {
    pink: 'bg-(--ib-pink-100A)',
    red: 'bg-(--ib-pink-400A)',
    blue: 'bg-(--ib-dark-blue-100A)',
}

const standardSizeMap: Record<'standard' | 'medium' | 'large', number> = {
    standard: 672,
    medium: 768,
    large: 1024,
}

export const ImageView = ({ part, meta }: PartData<ImageData & XP_Image>) => {
    const { config } = part
    const {
        src,
        caption,
        decorative,
        alt,
        width,
        height,
        centerHorizontally,
        centerVertically,
        paddingX,
        paddingY,
        borderRadius,
        showBorder,
        borderDistance,
        circles,
        hideOnMobile,
        bleed,
    } = parseImageProps(config, meta)

    if (!src) return null

    const borderDist = showBorder && borderDistance ? borderDistance : 0
    const paddingFullX = paddingX + borderDist
    const paddingFullY = paddingY + borderDist

    const figure = (
        <figure
            className={classNames(
                'relative flex flex-col',
                centerVertically && 'h-full items-center self-center',
                centerHorizontally && 'mx-auto',
                hideOnMobile && 'max-md:hidden'
            )}
            style={{
                padding: `${paddingFullY}px ${paddingFullX}px`,
                width: width ? `min(${width}px, 90vw)` : 'auto',
            }}>
            {showBorder && width && height && (
                <div
                    className="absolute border border-(--ib-border-dark-blue-subtleA)"
                    style={{
                        width: `min(${width + borderDist * 2}px, 92vw)`,
                        height: `min(${height + borderDist * 2}px, 82vh)`,
                        top: paddingY,
                        left: paddingX,
                        borderRadius,
                    }}
                />
            )}
            <div
                className="relative overflow-hidden"
                style={{
                    width: width ? `min(${width}px, 90vw)` : 'auto',
                    height: height ? `min(${height}px, 80vh)` : 'auto',
                    borderRadius,
                }}>
                <Image
                    unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                    src={src}
                    alt={caption ? '' : alt}
                    aria-hidden={decorative || undefined}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                />
            </div>
            {caption && (
                <figcaption className="mt-(--ax-space-16)">
                    <BodyShort size="small">{caption}</BodyShort>
                </figcaption>
            )}
            {circles.map(({ size, color, bottom, left }, id) => (
                <Circle
                    key={id}
                    className={color}
                    diameter={size}
                    bottom={bottom + paddingY}
                    left={left + paddingX}
                />
            ))}
        </figure>
    )

    // Bleed only for standard-size
    return bleed ? <div className="lg:mx-[calc(-2*var(--ax-space-96))]">{figure}</div> : figure
}

function parseImageProps(config: ImageData & XP_Image, meta: MetaData): StyledImageProps {
    const {
        image,
        includeCaption,
        overrideCaption,
        decorative,
        hideOnMobile,
        'image-size': imageSize,
    } = config
    const media = image // enriched by configQuery (url + data.*)

    // Base caption data
    const cmsCaption = media?.data?.caption?.trim() || ''
    const overrideCap = overrideCaption?.trim() || ''
    const captionRaw = includeCaption ? overrideCap || cmsCaption : ''
    const artists = media?.data?.artist?.filter(Boolean) || []
    const fotoBy = artists.length ? `FOTO: ${joinArrayWithCommasAndAnd(artists)}.` : ''
    const caption =
        captionRaw || fotoBy ? [captionRaw, fotoBy].filter(Boolean).join(' / ') : undefined

    // Width/height from option-set
    let width: number | undefined
    let height: number | undefined
    let borderRadius = 12
    let centerHorizontally = false
    let centerVertically = false
    let paddingX = 0
    let paddingY = 0
    let showBorder = false
    let borderDistance = 0
    let circles: StyledImageProps['circles'] = []
    let bleed = false

    if (imageSize?._selected === 'standard-size') {
        const sel = imageSize['standard-size'].standardWidth
        width = standardSizeMap[sel]
        height = Math.round((width * 9) / 16) // 16:9 derived
        centerHorizontally = true
        bleed = sel !== 'standard'
    } else if (imageSize?._selected === 'custom-size') {
        const c = imageSize['custom-size']
        const scale = c.scale ? c.scale / 100 : 1
        const baseW = c.width
        const baseH = c.height
        width = baseW ? Math.round(baseW * scale) : undefined
        height = baseH ? Math.round(baseH * scale) : undefined
        borderRadius = c.borderRadius || 0
        centerHorizontally = c.centerHorizontally
        centerVertically = c.centerVertically
        paddingX = c.paddingX || 0
        paddingY = c.paddingY || 0
        showBorder = c.border
        borderDistance = c.borderDistance || 0
        circles = (c.circles || []).map((circle) => ({
            size: circle.size || 200,
            color: accentColors[circle.color],
            bottom: circle.bottom || -50,
            left: circle.left || -90,
        }))
    }

    const src = formatImageUrl(meta, media?.imageUrl, width, height)

    return {
        src,
        caption,
        decorative: Boolean(decorative),
        alt: media?.data?.altText?.trim() || '',
        width,
        height,
        centerHorizontally,
        centerVertically,
        paddingX,
        paddingY,
        hideOnMobile,
        borderRadius,
        showBorder,
        borderDistance,
        circles,
        bleed,
    }
}

function formatImageUrl(meta: MetaData, url?: string, width?: number, height?: number): string {
    if (!url) return ''
    if (!width && !height) return url
    let resizeType: 'block' | 'width' | 'height'
    let dim: string
    if (width && height) {
        resizeType = 'block'
        dim = `${width}-${height}`
    } else if (width) {
        resizeType = 'width'
        dim = `${width}`
    } else {
        resizeType = 'height'
        dim = `${height}`
    }
    const resolved = getUrl(url, meta) || url
    return resolved.replace(/(\/_\/image\/[^/]+)\/([^/]+)/, `$1/${resizeType}-${dim}`)
}
