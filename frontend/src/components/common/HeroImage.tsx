import Image from 'next/image'

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
    width = 1024,
    height = 576,
    sizes = '(min-width: 1024px) 1024px, 100vw',
    className = 'w-full h-auto object-cover rounded-ib',
    wrapperClassName = 'lg:mx-[-11rem]',
    unoptimized,
}: HeroImageProps) {
    if (!src) return null

    const imgAlt = (altText && altText.trim()) || caption || ''

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

    return wrapperClassName ? <div className={wrapperClassName}>{img}</div> : img
}

export default HeroImage
