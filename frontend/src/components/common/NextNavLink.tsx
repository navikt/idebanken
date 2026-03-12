'use client'

import { Link } from '@navikt/ds-react'
import NextLink from 'next/link'
import { ComponentProps, PropsWithChildren } from 'react'

type NextNavLinkProps = Omit<ComponentProps<typeof Link>, 'as'> & Required<PropsWithChildren>

export default function NextNavLink(props: NextNavLinkProps) {
    return <Link as={NextLink} {...props} />
}
