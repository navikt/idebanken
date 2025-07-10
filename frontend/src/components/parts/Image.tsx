import { ImageData } from 'types/valibot/parts'
import classNames from 'classnames'
import Image from 'next/image'
import { forceArray } from '~/utils/utils'

export const ImageView = (props: ImageData) => {
    const { part } = props
    const { image } = part.config
    const { config } = part
    console.log(part.config)

    return (
        <>
            {config.styleActive ? (
                <StyledImage
                    src={image.imageUrl}
                    alt={image.data.altText}
                    width={config.width}
                    height={config.height}
                    borderRadius={config.borderRadius}
                    showBorder={config.border}
                    borderDistance={config.borderDistance}
                    circles={forceArray(config.circles)}
                    className=""
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.imageUrl} alt={image.data.altText || 'Bilde'} />
            )}
        </>
    )
}

interface StyledImageProps {
    src: string
    alt?: string
    width?: number
    height?: number
    borderRadius?: string
    showBorder?: boolean
    borderDistance?: string
    circles?: Array<{
        size: string
        color: 'pink' | 'red' | 'blue'
        bottom?: string
        left?: string
        opacity?: number
    }>
    className?: string
}

function StyledImage({
    src,
    alt = '#',
    width = 440,
    height = 675,
    borderRadius = '9999',
    showBorder = false,
    borderDistance = '40',
    circles = [],
    className,
}: Readonly<StyledImageProps>) {
    const accentColors = {
        pink: 'bg-pink-500',
        red: 'bg-red-500',
        blue: 'bg-dark-blue-500',
    }
    const borderDist = borderDistance ? Number(borderDistance) : 0
    return (
        <div className={classNames('relative inline-block', className)}>
            {showBorder && (
                <div
                    className={classNames('absolute -inset-3 border-1 border-[#0000004D]')}
                    style={{
                        width: width + borderDist,
                        height: height + borderDist,
                        left: -(borderDist / 2),
                        top: -(borderDist / 2),
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
                <Image
                    src={src || '/placeholder.svg'}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
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
