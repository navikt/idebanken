import Image from 'next/image'
import { BodyShort } from '@navikt/ds-react'

type HeroImageProps = {
    src?: string | null
    altText?: string | null
    caption?: string | null
    artist?: string | null
    width?: number
    height?: number
    sizes?: string
    className?: string
    wrapperClassName?: string
    unoptimized?: boolean
}

export function HeroImage({
    src,
    altText,
    caption,
    artist,
    width = 1024,
    height = 576,
    sizes = '(min-width: 1024px) 1024px, 100vw',
    className = 'w-full h-auto object-cover rounded-xl',
    wrapperClassName = 'lg:mx-[-11rem]',
    unoptimized,
}: HeroImageProps) {
    if (!src) return null

    const captionText = [caption, artist && `FOTO: ${artist}`].filter(Boolean).join(' / ')

    const imgAlt = captionText ? '' : (altText ?? '')

    const img = (
        <Image
            unoptimized={unoptimized}
            src={src}
            alt={imgAlt}
            width={width}
            height={height}
            sizes={sizes}
            className={className}
            priority
        />
    )

    if (captionText) {
        return (
            <figure className={wrapperClassName}>
                {img}
                <figcaption className="mt-(--ax-space-16)">
                    <BodyShort size="small">{captionText}</BodyShort>
                </figcaption>
            </figure>
        )
    }

    return wrapperClassName ? <div className={wrapperClassName}>{img}</div> : img
}

export default HeroImage
