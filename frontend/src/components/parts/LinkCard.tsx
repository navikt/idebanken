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
import { validatedLinkCardConfig } from '~/utils/runtimeValidation'
import React from 'react'
import { iconMap } from '~/utils/iconMap'

export interface LinkCardData {
    part: { descriptor: string; config: Part_Idebanken_Link_Card }
}

export const LinkCardPartView = (props: LinkCardData) => {
    const { part } = props
    const card = validatedLinkCardConfig(part.config)

    if (!card) return null

    return LinkCardView(card)
}

export type LinkCardViewParams = Omit<Link_Card_List_Item, 'description'> & {
    description?: string | React.ReactNode
    altText?: string
    external?: boolean
    brand?: string
}

export const LinkCardView = (card: LinkCardViewParams) => {
    const {
        title,
        description,
        url,
        categories,
        imageUrl,
        altText,
        iconColor,
        iconName,
        external,
        brand,
    } = card
    const Icon = iconMap[iconName as keyof typeof iconMap] || null

    return (
        <LinkCard data-color={brand} className="h-full">
            {imageUrl && (
                <LinkCardImage aspectRatio="16/8">
                    <img src={imageUrl} alt={altText || 'Illustrasjonsbilde'} width="700" />
                </LinkCardImage>
            )}
            {Icon && (
                <Box
                    asChild
                    padding="space-8"
                    borderRadius="12"
                    style={iconColor ? { backgroundColor: `var(--${iconColor})` } : undefined}>
                    <LinkCardIcon>
                        <Icon fontSize="2.5rem" />
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
