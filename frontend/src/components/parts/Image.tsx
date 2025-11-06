import classNames from 'classnames'
import { forceArray } from '~/utils/utils'
import { getUrl, MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Image_Circles } from '~/types/generated'
import { Circle } from '~/components/common/Circle'
import { XP_Image } from '@xp-types/site/parts'
import NextImage from 'next/image'

// Image
export type ImageData = {
    image?: {
        imageUrl?: string
        data?: {
            altText?: string | null
        }
    }
}

interface BasicImageProps {
    src: string
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
        <div
            className={classNames(
                'relative flex',
                centerVertically ? 'h-full items-center self-center' : '',
                centerHorizontally ? 'justify-self-center' : '',
                config.hideOnMobile ? 'max-md:hidden' : ''
            )}
            style={{
                padding: `${paddingFullY}px ${paddingFullX}px`,
            }}>
            {showBorder && (
                <div
                    className={classNames('absolute border border-(--ib-border-dark-blue-subtleA)')}
                    style={{
                        width: width ? `${width + borderDist * 2}px` : 'auto',
                        height: height ? `${height + borderDist * 2}px` : 'auto',
                        top: paddingY,
                        left: paddingX,
                        borderRadius: `${borderRadius}px`,
                    }}
                />
            )}

            <div
                className={classNames('relative overflow-hidden')}
                style={{
                    width: width ? `${width}px` : 'auto',
                    height: height ? `${height}px` : 'auto',
                    borderRadius: `${borderRadius}px`,
                }}>
                <NextImage
                    unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                    src={src}
                    alt={alt}
                    aria-hidden={decorative}
                    objectFit={'cover'}
                    fill
                />
            </div>

            {circles?.map(({ size, color, bottom, left }, id) => (
                <Circle
                    key={id}
                    className={color}
                    diameter={size}
                    bottom={bottom + paddingY}
                    left={left + paddingX}
                />
            ))}
        </div>
    )
}

function parseImageProps(config: ImageData & XP_Image, meta: MetaData): StyledImageProps {
    const scale = config.scale ? Number(config.scale) / 100 : 1
    const width = config.width ? Number(config.width) : undefined
    const height = config.height ? Number(config.height) : undefined
    const scaledWidth = width ? Math.round(width * scale) : undefined
    const scaledHeight = height ? Math.round(height * scale) : undefined

    return {
        src: getFormattedImageUrl(meta, config.image?.imageUrl, scaledWidth, scaledHeight),
        decorative: Boolean(config.decorative),
        alt: config.image?.data?.altText ?? '',
        width,
        height,
        showBorder: config.border ?? false,
        borderRadius: config.borderRadius ? Number(config.borderRadius) : 0,
        borderDistance: config.borderDistance ? Number(config.borderDistance) : 0,
        centerHorizontally: config.centerHorizontally ?? false,
        centerVertically: config.centerVertically ?? false,
        paddingX: config.paddingX ? Number(config.paddingX) : 0,
        paddingY: config.paddingY ? Number(config.paddingY) : 0,
        circles: forceArray(config.circles as Part_Idebanken_Image_Circles[]).map((circle) => ({
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
