import classNames from 'classnames'
import { forceArray } from '~/utils/utils'
import { getUrl, MetaData } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Image, Part_Idebanken_Image_Circles } from '~/types/generated'

// Image
export type ImageData = {
    image: {
        imageUrl: string
        data: {
            altText?: string | null
        }
    }
}

interface BasicImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    centerHorizontally: boolean
    centerVertically: boolean
    paddingX: number
    paddingY: number
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
        opacity: number
    }>
}

const accentColors: Record<string, string> = {
    pink: 'bg-pink-500',
    red: 'bg-red-500',
    blue: 'bg-dark-blue-500',
}

export const ImageView = ({ part, meta }: PartData<Part_Idebanken_Image & ImageData>) => {
    const { config } = part

    const {
        src,
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

    return (
        <>
            {config.styleActive ? (
                <StyledImage
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    centerHorizontally={centerHorizontally}
                    centerVertically={centerVertically}
                    paddingX={paddingX}
                    paddingY={paddingY}
                    borderRadius={borderRadius}
                    showBorder={showBorder}
                    borderDistance={borderDistance}
                    circles={circles}
                />
            ) : (
                <BasicImage
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    centerHorizontally={centerHorizontally}
                    centerVertically={centerVertically}
                    paddingX={paddingX}
                    paddingY={paddingY}
                />
            )}
        </>
    )
}

function BasicImage({
    src,
    alt,
    width,
    height,
    className,
    centerHorizontally,
    centerVertically,
    paddingX,
    paddingY,
}: Readonly<BasicImageProps>) {
    return (
        <div
            className={classNames(
                'relative flex',
                className,
                centerVertically ? 'h-full items-center self-center' : '',
                centerHorizontally ? 'justify-center' : ''
            )}
            style={{
                padding: `${paddingY}px ${paddingX}px`,
            }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt ?? 'Bilde'}
                className="object-cover"
                style={{
                    width: width ? `${width}px` : 'auto',
                    height: height ? `${height}px` : 'auto',
                }}
                loading="lazy"
                decoding="async"
            />
        </div>
    )
}

function StyledImage({
    src,
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
    circles = [],
    className,
}: Readonly<StyledImageProps>) {
    const borderDist = borderDistance || 0
    const borderOffsetX = -Math.round(borderDist / 2) + paddingX
    const borderOffsetY = -Math.round(borderDist / 2) + paddingY
    return (
        <div
            className={classNames(
                'relative flex',
                className,
                centerVertically ? 'h-full items-center self-center' : '',
                centerHorizontally ? 'justify-self-center' : ''
            )}
            style={{
                margin: `${Math.abs(borderOffsetY)}px ${Math.abs(borderOffsetX)}px`,
                padding: `${paddingY}px ${paddingX}px`,
            }}>
            {showBorder && (
                <div
                    className={classNames('absolute')}
                    style={{
                        width: width ? `${width + borderDist}px` : 'auto',
                        height: height ? `${height + borderDist}px` : 'auto',
                        left: borderOffsetX,
                        top: borderOffsetY,
                        bottom: borderOffsetY,
                        right: borderOffsetX,
                        borderRadius: `${borderRadius}px`,
                        border: '1px solid #0000004D',
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    loading="lazy"
                    decoding="async"
                    src={src}
                    alt={alt}
                    width={'100%'}
                    height={'100%'}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ height: '100%', width: '100%' }}
                />
            </div>

            {circles?.map(({ size, color, bottom, left, opacity }, id) => (
                <div
                    key={id}
                    className={classNames(`absolute rounded-full `, color)}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        bottom: `${bottom + paddingY}px`,
                        left: `${left + paddingX}px`,
                        zIndex: id + 1,
                        opacity: opacity,
                    }}
                />
            ))}
        </div>
    )
}

function parseImageProps(
    config: Part_Idebanken_Image & ImageData,
    meta: MetaData
): StyledImageProps {
    const scale = config.scale ? Number(config.scale) / 100 : 1
    const width = config.width ? Number(config.width) : undefined
    const height = config.height ? Number(config.height) : undefined
    const scaledWidth = width ? Math.round(width * scale) : undefined
    const scaledHeight = height ? Math.round(height * scale) : undefined

    return {
        src: getFormattedImageUrl(config.image.imageUrl, meta, scaledWidth, scaledHeight),
        alt: config.image.data.altText ?? '',
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
            opacity: circle.opacity ? Number(circle.opacity) / 100 : 0.8,
        })),
    }
}

const getFormattedImageUrl = (
    imageUrl: string,
    meta: MetaData,
    width?: number,
    height?: number
) => {
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
