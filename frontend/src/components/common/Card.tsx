import React from 'react'
import styles from './Card.module.css'
import classNames from 'classnames'

export type BgColorClasses = 'bg-extra-light-pink' | 'bg-light-pink' | 'bg-pink' | 'bg-dark-blue'

export interface CardProps {
    children: React.ReactNode
    bgColorClass?: BgColorClasses
    className?: string
}

export const Card = ({ children, bgColorClass = 'bg-extra-light-pink', className }: CardProps) => {
    return <div className={classNames(styles.card, bgColorClass, className)}>{children}</div>
}
