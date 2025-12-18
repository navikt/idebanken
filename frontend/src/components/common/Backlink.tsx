import { Link } from '@navikt/ds-react'
import NextLink from 'next/link'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { PageBlock } from '@navikt/ds-react/Page'
import { FetchContentResult, getUrl } from '@enonic/nextjs-adapter'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'

export default function Backlink({ contentResult }: { contentResult: FetchContentResult }) {
    const { common, meta } = contentResult
    const backlink = common?.get?.backlink
    if (!backlink) return null
    const { text, href } = backlink

    const linkElement = (
        <Link as={NextLink} href={getUrl(href, meta)} className={'min-h-[44px] min-w-[44px]'}>
            <ArrowLeftIcon width={24} height={24} aria-hidden={true} />
            {text}
        </Link>
    )

    const shouldBleedPink =
        meta?.type === 'idebanken:section-page' || meta?.type === 'idebanken:singleton-aktuelt-page'

    if (shouldBleedPink) {
        return (
            <BleedingBackgroundPageBlock
                width={'lg'}
                bgColor={'ib-brand-pink'}
                bleedClassName={'pt-[24px]'}>
                {linkElement}
            </BleedingBackgroundPageBlock>
        )
    }

    return (
        <PageBlock width={'lg'} className={'pt-[24px]'} gutters>
            {linkElement}
        </PageBlock>
    )
}
