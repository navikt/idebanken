import type { Link_Card, Part_Idebanken_Link_Card } from '~/types/generated.d'
import { Box, Tag } from '@navikt/ds-react'
import {
    LinkCard,
    LinkCardAnchor,
    LinkCardDescription,
    LinkCardFooter,
    LinkCardIcon,
    LinkCardImage,
    LinkCardTitle,
} from '@navikt/ds-react/LinkCard'
import React from 'react'
import Image from 'next/image'
import { MetaData } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'

export const LinkCardPartView = ({ part, meta }: PartData<Part_Idebanken_Link_Card>) => {
    const { config } = part
    const { resolvedLinkCard, displayType, brand } = config

    return LinkCardView({
        ...resolvedLinkCard,
        brand,
        displayType,
        meta,
    })
}

export type LinkCardViewParams = Omit<Link_Card, 'description' | '__typename'> & {
    description?: string | React.ReactNode
    brand?: string | null
    displayType?: 'withImage' | 'withIcon' | string | null
    meta?: MetaData
}

export const LinkCardView = ({
    title,
    description,
    url,
    categories,
    image,
    iconColor,
    icon,
    external,
    brand,
    displayType,
    meta,
}: LinkCardViewParams) => {
    const isIcon = displayType !== 'withImage'

    return (
        <LinkCard data-color={brand ?? 'neutral'} className="h-full">
            {!isIcon && image?.url && (
                <LinkCardImage aspectRatio="16/8">
                    <Image
                        unoptimized={meta?.renderMode !== 'next'}
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
                    padding="space-8"
                    borderRadius="12"
                    style={iconColor ? { backgroundColor: `var(--${iconColor})` } : undefined}>
                    <LinkCardIcon>
                        <Image
                            unoptimized={meta?.renderMode !== 'next'}
                            src={icon.url}
                            alt={icon.caption ?? 'Ikon'}
                            width={40}
                            height={40}
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
            {description && <LinkCardDescription>{description}</LinkCardDescription>}
            {categories && categories.length > 0 && (
                <LinkCardFooter>
                    {categories.map((tag, index) => (
                        <Tag key={index} size="small" variant="neutral">
                            {tag.name}
                        </Tag>
                    ))}
                </LinkCardFooter>
            )}
        </LinkCard>
    )
}
