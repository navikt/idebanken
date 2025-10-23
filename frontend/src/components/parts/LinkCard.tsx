import type { Link_Card, Part_Idebanken_Link_Card } from '~/types/generated.d'
import { Box /*, Tag */ } from '@navikt/ds-react'
import {
    LinkCard,
    LinkCardAnchor,
    LinkCardDescription,
    /*LinkCardFooter,*/
    LinkCardIcon,
    LinkCardImage,
    LinkCardTitle,
} from '@navikt/ds-react/LinkCard'
import React from 'react'
import Image from 'next/image'
import { MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'

export const LinkCardPartView = ({ part, meta }: PartData<Part_Idebanken_Link_Card>) => {
    const { config } = part
    const { resolvedLinkCard, displayType, brand, showDescription } = config

    return LinkCardView({
        ...resolvedLinkCard,
        brand,
        showDescription,
        displayType,
        meta,
    })
}

export type LinkCardViewParams = Omit<Link_Card, 'description' | '__typename'> & {
    description?: string | React.ReactNode
    brand?: string | null
    showDescription?: boolean | null
    displayType?: 'withImage' | 'withIcon' | string | null
    meta?: MetaData
}

export const LinkCardView = ({
    title,
    description,
    url,
    /* categories,*/
    image,
    icon,
    external,
    brand,
    showDescription,
    displayType,
    meta,
}: LinkCardViewParams) => {
    const isIcon = displayType !== 'withImage'

    return (
        <LinkCard data-color={brand ?? 'neutral'} className="h-full">
            {!isIcon && image?.url && (
                <LinkCardImage aspectRatio="16/8">
                    <Image
                        unoptimized={meta?.renderMode !== RENDER_MODE.NEXT}
                        src={image.url}
                        alt={image.altText ?? image.caption ?? 'Illustrasjonsbilde'}
                        width={500}
                        height={250}
                    />
                </LinkCardImage>
            )}
            {isIcon && icon?.url && (
                <Box
                    asChild
                    padding="space-12"
                    className="rounded-full"
                    style={
                        icon?.iconColor
                            ? { backgroundColor: `var(--${icon?.iconColor})` }
                            : undefined
                    }>
                    <LinkCardIcon>
                        <Image
                            unoptimized={meta?.renderMode !== RENDER_MODE.NEXT}
                            src={icon.url}
                            alt={icon.caption ?? 'Ikon'}
                            width={24}
                            height={24}
                            className={
                                /\.svg(\?.*)?$/i.test(icon.url)
                                    ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                    : undefined
                            }
                        />
                    </LinkCardIcon>
                </Box>
            )}
            <LinkCardTitle>
                <LinkCardAnchor
                    href={url || '#'}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {title}
                </LinkCardAnchor>
            </LinkCardTitle>
            {description && showDescription && (
                <LinkCardDescription>{description}</LinkCardDescription>
            )}
            {/* {categories && categories.length > 0 && (
                <LinkCardFooter>
                    {categories.map((tag, index) => (
                        <Tag key={index} size="small" variant="neutral">
                            {tag.name}
                        </Tag>
                    ))}
                </LinkCardFooter>
            )} */}
        </LinkCard>
    )
}
