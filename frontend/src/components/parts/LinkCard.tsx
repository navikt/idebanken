import type { Part_Idebanken_Link_Card } from '~/types/generated.d'
import { Box } from '@navikt/ds-react'
import { LinkCard, LinkCardIcon, LinkCardTitle, LinkCardAnchor } from '@navikt/ds-react/LinkCard'
import { PersonIcon } from '@navikt/aksel-icons'
import { validatedLinkCardConfig } from '~/utils/runtimeValidation'

export interface LinkCardData {
    part: { descriptor: string; config: Part_Idebanken_Link_Card }
}

export const LinkCardView = (props: LinkCardData) => {
    const { part } = props
    const link = validatedLinkCardConfig(part.config)

    if (!link) return null

    return (
        <LinkCard className="rounded-[100px] bg-pink-500">
            <Box asChild padding="space-8">
                <LinkCardIcon>
                    <PersonIcon fontSize="2.5rem" />
                </LinkCardIcon>
            </Box>
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
