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

export const ImageView = (props: PartData<Part_Idebanken_Image & ImageData>) => {
    const { part, meta } = props
    const { image } = part.config
    const { config } = part
    console.log('image config', config)

    return (
        <>
            {config.styleActive ? (
                <StyledImage
                    src={image.imageUrl}
                    alt={image.data.altText}
                    scale={config.scale}
                    width={config.width}
                    height={config.height}
                    borderRadius={config.borderRadius}
                    showBorder={config.border}
                    borderDistance={config.borderDistance}
                    circles={forceArray(config.circles) as Part_Idebanken_Image_Circles[]}
                    meta={meta}
                    className=""
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.imageUrl} alt={image.data.altText ?? 'Bilde'} />
            )}
        </>
    )
}

interface StyledImageProps {
    src: string
    alt?: string | null
    width?: string | null
    height?: string | null
    borderRadius?: string | null
    showBorder?: boolean | null
    borderDistance?: string | null
    scale?: string | null
    circles?: Array<{
        size?: string | null
        color?: string | null
        bottom?: string | null
        left?: string | null
        opacity?: string | null
    }> | null
    className?: string
    meta?: MetaData
}

function StyledImage({
    src,
    alt = '#',
    width = '440',
    height = '675',
    borderRadius = '9999',
    showBorder = false,
    borderDistance = '40',
    circles = [],
    className,
    meta,
    scale = '1',
}: Readonly<StyledImageProps>) {
    const accentColors = {
        pink: 'bg-pink-500',
        red: 'bg-red-500',
        blue: 'bg-dark-blue-500',
    }
    const borderDist = borderDistance ? Number(borderDistance) : 0
    const scaleFactor = scale ? Number(scale) / 100 : 1
    return (
        <div
            className={classNames('relative inline-block', className)}
            style={{ margin: `${Number(borderDist) / 2}px` }}>
            {showBorder && (
                <div
                    className={classNames('absolute -inset-3 border-1 border-[#0000004D]')}
                    style={{
                        width: Number(width) + Number(borderDist),
                        height: Number(height) + Number(borderDist),
                        left: -(Number(borderDist) / 2),
                        top: -(Number(borderDist) / 2),
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
                <img
                    loading="lazy"
                    decoding="async"
                    src={getUrl(src, meta)?.replace(
                        /(\/_\/image\/[^/]+)\/([^/]+)/,
                        `$1/block-${Math.floor(Number(width) * Number(scaleFactor))}-${Math.floor(Number(height) * Number(scaleFactor))}`
                    )}
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
                    className={classNames(
                        `absolute rounded-full `,
                        accentColors[color] || accentColors.pink
                    )}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        bottom: bottom ? `${bottom}px` : '-50px',
                        left: left ? `${left}px` : '-90px',
                        zIndex: id + 1,
                        opacity: opacity ? Number(opacity) / 100 : 0.8,
                    }}
                />
            ))}
        </div>
    )
}
