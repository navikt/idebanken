'use client'

import { ArrowUpIcon } from '@navikt/aksel-icons'
import { Link } from '@navikt/ds-react'

export default function ScrollToTop() {
    return (
        <Link
            href={'#main-content'}
            onClick={() => window.scrollTo(0, 0)}
            className={'w-fit gap-1 flex flex-row mb-(--ax-space-24)'}>
            <ArrowUpIcon aria-hidden={true} width={24} height={24} />
            Til toppen
        </Link>
    )
}
