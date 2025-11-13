'use client'

import classNames from 'classnames'
import { forceArray } from '~/utils/utils'
import { getUrl, MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Image_Circles } from '~/types/generated'
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
    className?: string
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
}

const accentColors: Record<string, string> = {
    pink: 'bg-(--ib-pink-100A)',
    red: 'bg-(--ib-pink-400A)',
    blue: 'bg-(--ib-dark-blue-100A)',
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
    } = parseImageProps(config, meta)

    const borderDist = showBorder && borderDistance ? borderDistance : 0
    const paddingFullX = paddingX + borderDist
    const paddingFullY = paddingY + borderDist

    return (
        <figure
            className={classNames(
                'relative flex flex-col',
                centerVertically ? 'h-full items-center self-center' : '',
                centerHorizontally ? 'justify-self-center' : '',
                config.hideOnMobile ? 'max-md:hidden' : ''
            )}
            style={{
                padding: `${paddingFullY}px ${paddingFullX}px`,
                width: width ? `min(${width}px, 90vw)` : 'auto',
            }}>
            {showBorder && (
                <div
                    className={classNames('absolute border border-(--ib-border-dark-blue-subtleA)')}
                    style={{
                        width: width ? `min(${width + borderDist * 2}px, 92vw)` : 'auto',
                        height: height ? `min(${height + borderDist * 2}px, 82vh)` : 'auto',
                        top: paddingY,
                        left: paddingX,
                        borderRadius: `${borderRadius}px`,
                    }}
                />
            )}

            <div
                className={classNames('relative overflow-hidden')}
                style={{
                    width: width ? `min(${width}px, 90vw)` : 'auto',
                    height: height ? `min(${height}px, 80vh)` : 'auto',
                    borderRadius: `${borderRadius}px`,
                }}>
                <Image
                    unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                    src={src}
                    alt={alt}
                    aria-hidden={decorative}
                    objectFit={'cover'}
                    fill
                />
            </div>
            {caption && (
                <figcaption className={'mt-(--ax-space-16)'}>
                    <BodyShort size={'small'}>{caption}</BodyShort>
                </figcaption>
            )}

            {circles?.map(({ size, color, bottom, left }, id) => (
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
}

function parseImageProps(
    {
        image,
        scale,
        width,
        height,
        overrideCaption,
        includeCaption,
        decorative,
        borderDistance,
        borderRadius,
        border,
        centerHorizontally,
        centerVertically,
        paddingX,
        paddingY,
        circles,
    }: ImageData & XP_Image,
    meta: MetaData
): StyledImageProps {
    const pScale = scale ? Number(scale) / 100 : 1
    const pWidth = width ? Number(width) : undefined
    const pHeight = height ? Number(height) : undefined
    const scaledWidth = pWidth ? Math.round(pWidth * pScale) : undefined
    const scaledHeight = pHeight ? Math.round(pHeight * pScale) : undefined

    const caption = includeCaption ? (overrideCaption ?? image?.data?.caption ?? '') : undefined
    return {
        src: getFormattedImageUrl(meta, image?.imageUrl, scaledWidth, scaledHeight),
        caption:
            typeof caption === 'string'
                ? caption
                      .concat(caption.length ? ' / ' : '')
                      .concat(
                          image?.data?.artist
                              ? `FOTO: ${forceArray(image?.data?.artist).join(', ')}`
                              : ''
                      )
                : undefined,
        decorative: Boolean(decorative),
        alt: image?.data?.altText ?? '',
        width: pWidth,
        height: pHeight,
        showBorder: border ?? false,
        borderRadius: borderRadius ? Number(borderRadius) : 0,
        borderDistance: borderDistance ? Number(borderDistance) : 0,
        centerHorizontally: centerHorizontally ?? false,
        centerVertically: centerVertically ?? false,
        paddingX: paddingX ? Number(paddingX) : 0,
        paddingY: paddingY ? Number(paddingY) : 0,
        circles: forceArray(circles as Part_Idebanken_Image_Circles[]).map((circle) => ({
            size: circle.size ? Number(circle.size) : 200,
            color: circle.color ? accentColors[circle.color] : accentColors.pink,
            bottom: circle.bottom ? Number(circle.bottom) : -50,
            left: circle.left ? Number(circle.left) : -90,
        })),
    }
}

const getFormattedImageUrl = (
    meta: MetaData,
    imageUrl?: string,
    width?: number,
    height?: number
) => {
    if (!imageUrl) return '/'
    if (!width && !height) {
        return imageUrl
    }

    let resizeType: string
    let dimensionParam: string

    if (width && height) {
        resizeType = 'block'
        dimensionParam = `${width}-${height}`
    } else if (width) {
        resizeType = 'width'
        dimensionParam = `${width}`
    } else {
        resizeType = 'height'
        dimensionParam = `${height}`
    }

    return getUrl(imageUrl, meta)?.replace(
        /(\/_\/image\/[^/]+)\/([^/]+)/,
        `$1/${resizeType}-${dimensionParam}`
    )
}
