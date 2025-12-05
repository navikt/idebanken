import { HeadlessCms } from '~/types/generated'
import { Link } from '@navikt/ds-react'
import NextLink from 'next/link'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { PageBlock } from '@navikt/ds-react/Page'

export default function Backlink({ common }: { common: HeadlessCms }) {
    const backlink = common.get?.backlink
    if (!backlink) return null
    const { text, href } = backlink

    return (
        <PageBlock width={'lg'} className={'mt-(--ax-space-8) lg:my-(--ax-space-24)'} gutters>
            <Link as={NextLink} href={href} className={'min-h-[44px] min-w-[44px]'}>
                <ArrowLeftIcon width={24} height={24} aria-hidden={true} />
                {text}
            </Link>
        </PageBlock>
    )
}
