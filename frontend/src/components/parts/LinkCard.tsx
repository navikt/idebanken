/* eslint-disable @next/next/no-img-element */
import type { Part_Idebanken_Link_Card } from '~/types/generated.d'
import { Box, Tag } from '@navikt/ds-react'
import {
    LinkCard,
    LinkCardIcon,
    LinkCardTitle,
    LinkCardAnchor,
    LinkCardDescription,
    LinkCardFooter,
    LinkCardImage,
} from '@navikt/ds-react/LinkCard'
import {
    HandShakeHeartIcon,
    ReceptionIcon,
    Chat2Icon,
    HandshakeIcon,
    PersonGroupIcon,
    TasklistIcon,
    ClockIcon,
} from '@navikt/aksel-icons'
import { validatedLinkCardConfig } from '~/utils/runtimeValidation'
// import { XP_LinkCard } from '@xp-types/site/parts'
import transformBlockOptionSet from '~/utils/transformBlockOptionSet'

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

export const LinkCardView = (props: LinkCardData) => {
    const { part } = props

    console.log('LinkCardView part', part.config)
    if (part.config.blockOptionSet) {
        const transformed = transformBlockOptionSet(part.config?.blockOptionSet || null)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { blockOptionSet, ...rest } = part.config
        const testCard = { ...rest, ...transformed }
        console.log('LinkCardView transformed', testCard)
    }

    const card = validatedLinkCardConfig(part.config)

    if (!card) return null

    const Icon = iconMap[card.iconName as keyof typeof iconMap] || null
    const imageUrl = card.image?.imageUrl || card.image?.mediaUrl || null
    const altText = card.image?.data?.altText || card.image?.data?.caption || 'Illustrasjonsbilde'

    return (
        <LinkCard className={`h-full ${card.bgColor || 'bg-pink-100'}`}>
            {imageUrl && (
                <LinkCardImage aspectRatio="16/8">
                    <img src={imageUrl} alt={altText} width="700" />
                </LinkCardImage>
            )}
            {Icon && (
                <Box
                    asChild
                    padding="space-8"
                    borderRadius="12"
                    style={
                        card.iconColor ? { backgroundColor: `var(--${card.iconColor})` } : undefined
                    }>
                    <LinkCardIcon>
                        <Icon fontSize="2.5rem" />
                    </LinkCardIcon>
                </Box>
            )}
            <LinkCardTitle>
                <LinkCardAnchor
                    href={card.url || '#'}
                    {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {card.text}
                </LinkCardAnchor>
            </LinkCardTitle>
            {card.description && <LinkCardDescription>{card.description}</LinkCardDescription>}
            {card.tags && card.tags.length > 0 && (
                <LinkCardFooter>
                    {card.tags?.map((tag, index) => (
                        <Tag key={index} size="small" variant="neutral">
                            {tag}
                        </Tag>
                    ))}
                </LinkCardFooter>
            )}
        </LinkCard>
    )
}
