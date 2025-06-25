import { PartData } from '@enonic/nextjs-adapter'
import { parseHtml } from '~/utils/parseHtml'
import styles from './TipPanel.module.css'
import { Heading } from '@navikt/ds-react'
import classNames from 'classnames'
import { Card } from '../common/Card'

export interface TipPanelData {
	part: PartData
}

export const TipPanelView = (props: TipPanelData) => {
	const { part } = props
	const { heading, panel = [], bgColor = 'bg-extra-light-pink', reverse = false } = part.config

	const [card1, card2] = Array.isArray(panel) ? panel : [panel]

	return (
		<div className={classNames(styles.panel, bgColor)}>
			<div className={styles.heading}>
				<Heading level="2" size="large">
					{heading}
				</Heading>
			</div>
			<Card
				className={classNames(styles.card1, reverse && styles.reverse)}
				bgColorClass={card1.bgColor}>
				<>{parseHtml(card1?.simpleTextEditor)}</>
			</Card>
			{card2 && (
				<Card
					className={classNames(styles.card2, card2.bgColor, reverse && styles.reverse)}
					bgColorClass={card2.bgColor}>
					<>{parseHtml(card2?.simpleTextEditor)}</>
				</Card>
			)}
		</div>
	)
}
