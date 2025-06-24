import React from 'react'
import styles from './InfoBox.module.css'
import { Info } from '../icons/Info'
import classNames from 'classnames'

export type BgColorClasses = 'bg-extra-light-pink' | 'bg-light-pink' | 'bg-pink' | 'bg-dark-blue'

export interface InfoBoxProps {
	children: React.ReactNode
	bgColorClass?: BgColorClasses
}

export const InfoBox = ({ children, bgColorClass = 'bg-extra-light-pink' }: InfoBoxProps) => {
	return (
		<div className={styles.infoboxContainer}>
			<div className={styles.iconbox}>
				<Info />
			</div>
			<div className={classNames(styles.infobox, bgColorClass)}>{children}</div>
		</div>
	)
}
