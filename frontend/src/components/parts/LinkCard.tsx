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

// Update mapping to match actual config values (they include the 'bg-' prefix from background-color.xml)
const bgClassMap: Record<string, string> = {
    'bg-white': 'var-bg-white',
    'bg-extra-light-pink': 'var-bg-extra-light-pink',
    'bg-light-pink': 'var-bg-light-pink',
    'bg-pink': 'var-bg-pink',
    'bg-dark-blue': 'var-bg-dark-blue',
}

// Helper to normalize (in case future values come without prefix)
function resolveBgClass(raw?: string): string {
    if (!raw) return 'var-bg-extra-light-pink' // matches your XML default
    if (bgClassMap[raw]) return bgClassMap[raw]
    const withPrefixGuess = raw.startsWith('bg-') ? raw : `bg-${raw}`
    return bgClassMap[withPrefixGuess] || 'var-bg-extra-light-pink'
}

export interface LinkCardData {
    part: { descriptor: string; config: Part_Idebanken_Link_Card }
}

export const LinkCardPartView = (props: LinkCardData) => {
    const { part } = props
    console.log('LinkCardPartView props', part.config)
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
        bgColor,
    } = card
    const Icon = iconMap[iconName as keyof typeof iconMap] || null

    const bgClass = resolveBgClass(bgColor)

    return (
        <LinkCard className={`h-full ${bgClass}`}>
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
                            {tag}
                        </Tag>
                    ))}
                </LinkCardFooter>
            )}
        </LinkCard>
    )
}
