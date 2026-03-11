import styles from '~/styles/loading.module.css'
import { Box } from '@navikt/ds-react'
import React from 'react'
import classNames from 'classnames'

export default function LoadingCircles({
    ariaLabel,
    className,
}: {
    ariaLabel?: string
    className?: string
}) {
    return (
        <Box
            className={classNames(
                'h-6 flex justify-center align-middle content-center items-center',
                className
            )}>
            <Box className={styles.loading} aria-label={ariaLabel} />
        </Box>
    )
}
