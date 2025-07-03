import { PartData } from '@enonic/nextjs-adapter'
import { Box } from '@navikt/ds-react'
import { LinkCard, LinkCardIcon, LinkCardTitle, LinkCardAnchor } from '@navikt/ds-react/LinkCard'
// import styles from './LinkPanel.module.css'
import { PersonIcon } from '@navikt/aksel-icons'

export interface LinkPanelData {
	part: PartData
}

export const LinkCardView = ({ part }: LinkPanelData) => {
	const { url = '#', text = '' } = part?.config || {}

	return (
		<LinkCard>
			<Box>
				<LinkCardIcon>
					<PersonIcon fontSize="2.5rem" />
				</LinkCardIcon>
			</Box>
			<LinkCardTitle>
				<LinkCardAnchor href={url}>{text || 'Mangler lenketekst'}</LinkCardAnchor>
			</LinkCardTitle>
		</LinkCard>
	)
}
