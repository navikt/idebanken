'use client'

import classNames from 'classnames'
import { joinArrayWithCommasAndAnd } from '~/utils/utils'
import { MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'
import { Circle } from '~/components/common/Circle'
import { XP_Image } from '@xp-types/site/parts'
import Image from 'next/image'
import { BodyShort, Box, VStack } from '@navikt/ds-react'
import { PlaceholderComponent } from '@enonic/nextjs-adapter/views/BaseComponent'
import {
    accentColors,
    formatImageUrl,
    ImageData,
    imgRatios,
    standardSizeMap,
    StyledImageProps,
} from '~/utils/image'

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
        standard,
        sizeVariant,
    } = parseImageProps(config, meta)

    if (!src) return <PlaceholderComponent type={'bilde'} descriptor={'idebanken:image'} />

    const sizes =
        (width && width >= 1024) || !width
            ? '(min-width: 1280px) 1024px, 100vw'
            : `(min-width: ${width}px) ${Math.round(width * 1.5)}px, 100vw`

    if (config['image-size']?._selected === 'aspect-ratio') {
        const { aspectRatio, maxWidth, roundedCorners, centerHorizontally, centerVertically } =
            config['image-size']['aspect-ratio']
        return (
            <VStack
                as={'figure'}
                className={classNames(
                    hideOnMobile && 'max-md:hidden',
                    centerVertically && 'h-full'
                )}>
                <Box
                    className={classNames(
                        'relative flex flex-col',
                        imgRatios[aspectRatio || '16:9'],
                        centerHorizontally && 'mx-auto',
                        centerVertically && 'my-auto'
                    )}
                    style={{
                        width: maxWidth ? `min(${maxWidth}px, 100%)` : '100%',
                    }}>
                    <Image
                        unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                        src={src}
                        alt={caption ? '' : alt}
                        aria-hidden={decorative || undefined}
                        fill
                        className={classNames('object-cover', roundedCorners ? 'rounded-ib' : '')}
                        sizes={sizes}
                    />
                </Box>
                {caption && (
                    <figcaption
                        className={classNames(
                            'mt-(--ax-space-16)',
                            centerHorizontally && 'mx-auto'
                        )}
                        style={{
                            width: maxWidth ? `min(${maxWidth}px, 100%)` : '100%',
                        }}>
                        <BodyShort size="small" className="leading-normal">
                            {caption}
                        </BodyShort>
                    </figcaption>
                )}
            </VStack>
        )
    }

    const borderDist = showBorder && borderDistance ? borderDistance : 0
    const paddingFullX = paddingX + borderDist
    const paddingFullY = paddingY + borderDist

    const bleedClass =
        sizeVariant === 'large' ? 'lg:mx-[-11rem]' : sizeVariant === 'medium' ? 'lg:mx-[-3rem]' : ''

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
                width: width && !standard ? `min(${width}px, 90vw)` : 'auto',
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
            {standard ? (
                <Image
                    unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                    src={src}
                    alt={caption ? '' : alt}
                    aria-hidden={decorative || undefined}
                    width={width}
                    height={height}
                    className="w-full h-auto object-cover rounded-ib"
                    sizes={sizes}
                />
            ) : (
                <div
                    className={classNames('relative overflow-hidden')}
                    style={{
                        width: width ? `min(${width}px, 90vw)` : 'auto',
                        ...(height ? { height: `min(${height}px, 80vh)` } : {}),
                        borderRadius,
                    }}>
                    <Image
                        unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                        src={src}
                        alt={caption ? '' : alt}
                        aria-hidden={decorative || undefined}
                        fill
                        className="object-cover"
                        sizes={sizes}
                    />
                </div>
            )}
            {caption && (
                <figcaption className="mt-(--ax-space-16)">
                    <BodyShort size="small" className="leading-normal">
                        {caption}
                    </BodyShort>
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

    // Bleed only for standard-size 'medium'/'large'
    return bleed ? <div className={bleedClass}>{figure}</div> : figure
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
    const cmsCaption = image?.data?.caption?.trim() || ''
    const overrideCap = overrideCaption?.trim() || ''
    const captionRaw = includeCaption ? overrideCap || cmsCaption : ''
    const artists = image?.data?.artist?.filter(Boolean) || []
    const fotoBy = artists.length ? `FOTO: ${joinArrayWithCommasAndAnd(artists)}.` : ''
    const caption =
        captionRaw || fotoBy ? [captionRaw, fotoBy].filter(Boolean).join(' / ') : undefined

    let width: number | undefined
    let height: number | undefined
    let borderRadius = 0
    let centerHorizontally = false
    let centerVertically = false
    let paddingX = 0
    let paddingY = 0
    let showBorder = false
    let borderDistance = 0
    let circles: StyledImageProps['circles'] = []
    let bleed = false
    let standard = false
    let sizeVariant: 'standard' | 'medium' | 'large' | undefined
    if (imageSize?._selected === 'aspect-ratio') {
        width = imageSize['aspect-ratio'].maxWidth
    } else if (imageSize?._selected === 'standard-size') {
        const sel = imageSize['standard-size'].standardWidth
        width = standardSizeMap[sel]
        height = Math.round((width * 9) / 16)
        standard = true
        centerHorizontally = true

        // Bleed only for medium and large
        bleed = sel === 'medium' || sel === 'large'
        sizeVariant = sel
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

    const src = formatImageUrl(meta, image?.imageUrl, width, height)

    return {
        src,
        caption,
        decorative: Boolean(decorative),
        alt: image?.data?.altText?.trim() || '',
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
        standard,
        sizeVariant, // 'standard' | 'medium' | 'large'
    }
}
