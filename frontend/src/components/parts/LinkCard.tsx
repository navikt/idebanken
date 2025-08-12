import type { Part_Idebanken_Link_Card } from '~/types/generated.d'
import { Box } from '@navikt/ds-react'
import { LinkCard, LinkCardIcon, LinkCardTitle, LinkCardAnchor } from '@navikt/ds-react/LinkCard'
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
    const link = validatedLinkCardConfig(part.config)

    if (!link) return null

    const Icon = iconMap[link.icon as keyof typeof iconMap] || null

    return (
        <LinkCard className="bg-pink-100">
            {Icon && (
                <Box
                    asChild
                    padding="space-8"
                    borderRadius="12"
                    style={
                        link.iconColor ? { backgroundColor: `var(--${link.iconColor})` } : undefined
                    }>
                    <LinkCardIcon>
                        <Icon fontSize="2.5rem" />
                    </LinkCardIcon>
                </Box>
            )}
            <LinkCardTitle>
                <LinkCardAnchor
                    href={link.url || '#'}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {link.text}
                </LinkCardAnchor>
            </LinkCardTitle>
        </LinkCard>
    )
}
