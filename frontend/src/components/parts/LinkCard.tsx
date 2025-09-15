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
import {
    Chat2Icon,
    ClockIcon,
    HandShakeHeartIcon,
    HandshakeIcon,
    PersonGroupIcon,
    ReceptionIcon,
    TasklistIcon,
} from '@navikt/aksel-icons'
import { validatedLinkCardConfig } from '~/utils/runtimeValidation'

const iconMap = {
    'hand-shake-heart': HandShakeHeartIcon,
    reception: ReceptionIcon,
    'chat-2': Chat2Icon,
    'hand-shake': HandshakeIcon,
    'person-group': PersonGroupIcon,
    'task-list': TasklistIcon,
    clock: ClockIcon,
}

export interface LinkCardData {
    part: { descriptor: string; config: Part_Idebanken_Link_Card }
}

export const LinkCardPartView = (props: LinkCardData) => {
    const { part } = props
    const card = validatedLinkCardConfig(part.config)

    if (!card) return null

    return LinkCardView(card)
}

export type LinkCardViewParams = Link_Card_List_Item & {
    altText?: string
    external?: boolean
    bgColor?: string
}

export const LinkCardView = (card: LinkCardViewParams) => {
    const { title, description, url, categories, imageUrl, altText, iconColor, iconName } =
        card ?? {}
    const Icon = iconMap[iconName as keyof typeof iconMap] || null

    return (
        <LinkCard className={`h-full ${card.bgColor || 'bg-pink-100'}`}>
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
                    {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {title}
                </LinkCardAnchor>
            </LinkCardTitle>
            {description && <LinkCardDescription>{description}</LinkCardDescription>}
            {categories && categories.length > 0 && (
                <LinkCardFooter>
                    {categories?.map((tag, index) => (
                        <Tag key={index} size="small" variant="neutral">
                            {tag}
                        </Tag>
                    ))}
                </LinkCardFooter>
            )}
        </LinkCard>
    )
}
