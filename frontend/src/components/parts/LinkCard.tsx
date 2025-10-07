/* eslint-disable @next/next/no-img-element */
import type { Link_Card_List_Item, Part_Idebanken_Link_Card } from '~/types/generated.d'
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

export interface LinkCardData {
    part: { descriptor: string; config: Part_Idebanken_Link_Card }
    meta: MetaData
}

export const LinkCardPartView = ({ part, meta }: LinkCardData) => {
    const { config } = part

    return LinkCardView({
        ...config,
        title: config.text ?? '',
        url: config.url ?? '',
        brand: config.brand ?? 'neutral',
        meta,
    })
}

export type LinkCardViewParams = Omit<Link_Card_List_Item, 'description' | '__typename'> & {
    description?: string | React.ReactNode
    external?: boolean
    brand?: string
    meta?: MetaData
}

export const LinkCardView = (card: LinkCardViewParams) => {
    const { title, description, url, categories, image, iconColor, icon, external, brand, meta } =
        card

    return (
        <LinkCard data-color={brand} className="h-full">
            {image?.url && (
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
            {icon?.url && (
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
