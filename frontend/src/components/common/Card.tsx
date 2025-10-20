import React, { PropsWithChildren } from 'react'
import styles from './Card.module.css'
import classNames from 'classnames'

export type BgColorClasses = 'bg-extra-light-pink' | 'bg-light-pink' | 'bg-pink' | 'bg-dark-blue'

export interface CardProps extends PropsWithChildren {
    bgColorClass?: BgColorClasses
    className?: string
}

export const Card = ({ children, bgColorClass = 'bg-extra-light-pink', className }: CardProps) => {
    return <div className={classNames(styles.card, bgColorClass, className)}>{children}</div>
}
