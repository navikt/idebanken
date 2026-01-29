import styles from '~/styles/loading.module.css'
import { Box } from '@navikt/ds-react'
import React from 'react'

export default function LoadingCircles({ ariaLabel }: { ariaLabel?: string }) {
    return (
        <Box className={'h-6 flex justify-center align-middle content-center items-center'}>
            <Box className={styles.loading} aria-label={ariaLabel} />
        </Box>
    )
}
