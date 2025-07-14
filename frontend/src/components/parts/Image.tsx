import classNames from 'classnames'
import { forceArray } from '~/utils/utils'
import { getUrl } from '@enonic/nextjs-adapter'
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
    alt?: string | null
    width: number
    height: number
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

export const ImageView = (props: PartData<Part_Idebanken_Image & ImageData>) => {
    const { part, meta } = props
    const { image } = part.config

    const { config } = part
    const scale = config.scale ? Number(config.scale) / 100 : 1
    const width1 = config.width ? Number(config.width) : 440
    const height1 = config.height ? Number(config.height) : 675
    const scaledWidth = Math.round(Number(width1) * scale)
    const scaledHeight = Math.round(Number(height1) * scale)

    const parsedProps = {
        imageUrl:
            scaledWidth && scaledHeight
                ? getUrl(image.imageUrl, meta)?.replace(
                      /(\/_\/image\/[^/]+)\/([^/]+)/,
                      `$1/block-${scaledWidth}-${scaledHeight}`
                  )
                : image.imageUrl,
        width: width1,
        height: height1,
        scale,
        showBorder: config.border ?? false,
        borderRadius: config.borderRadius ? Number(config.borderRadius) : 0,
        borderDistance: config.borderDistance ? Number(config.borderDistance) : 0,
        circles: forceArray(config.circles as Part_Idebanken_Image_Circles[]).map((circle) => ({
            size: circle.size ? Number(circle.size) : 200,
            color: circle.color ? accentColors[circle.color] : accentColors.pink,
            bottom: circle.bottom ? Number(circle.bottom) : -50,
            left: circle.left ? Number(circle.left) : -90,
            opacity: circle.opacity ? Number(circle.opacity) / 100 : 0.8,
        })),
    }
    return (
        <>
            {config.styleActive ? (
                <StyledImage
                    src={parsedProps.imageUrl}
                    alt={image.data.altText}
                    width={parsedProps.width}
                    height={parsedProps.height}
                    borderRadius={parsedProps.borderRadius}
                    showBorder={parsedProps.showBorder}
                    borderDistance={parsedProps.borderDistance}
                    circles={parsedProps.circles}
                />
            ) : (
                <BasicImage
                    src={parsedProps.imageUrl}
                    alt={image.data.altText}
                    width={parsedProps.width}
                    height={parsedProps.height}
                />
            )}
        </>
    )
}

function BasicImage({ src, alt, width, height, className }: Readonly<BasicImageProps>) {
    return (
        <div className={classNames('relative inline-block', className)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt ?? 'Bilde'}
                className="object-cover"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
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
    borderRadius,
    showBorder,
    borderDistance,
    circles = [],
    className,
}: Readonly<StyledImageProps>) {
    const borderDist = borderDistance || 0
    return (
        <div
            className={classNames('relative inline-block', className)}
            style={{ margin: `${Math.round(borderDist / 2)}px` }}>
            {showBorder && (
                <div
                    className={classNames('absolute -inset-3 border-1 border-[#0000004D]')}
                    style={{
                        width: `${width + borderDist}px`,
                        height: `${height + borderDist}px`,
                        left: -Math.round(borderDist / 2),
                        top: -Math.round(borderDist / 2),
                        borderRadius: `${borderRadius}px`,
                    }}
                />
            )}

            <div
                className={classNames('relative overflow-hidden')}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
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
                        bottom: `${bottom}px`,
                        left: `${left}px`,
                        zIndex: id + 1,
                        opacity: opacity,
                    }}
                />
            ))}
        </div>
    )
}
