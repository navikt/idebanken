import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { Footer as FooterProps } from '~/types/generated'
import { BodyLong, HGrid, Link, VStack } from '@navikt/ds-react'
import NextLink from 'next/link'
import { HeadingView } from '~/components/parts/Heading'
import { Separator } from '~/components/macros/Separator'
import { getAsset, getUrl, MetaData } from '@enonic/nextjs-adapter'
import Image from 'next/image'
import { ButtonView } from '~/components/parts/Button'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { BubblesBackgroundSvgStyle } from '~/utils/BubblesBackgroundSvgStyle'
import ScrollToTop from '~/components/common/ScrollToTop'

export default function Footer({
    footerProps,
    meta,
}: Readonly<{ footerProps?: FooterProps; meta: MetaData }>) {
    const { newsletterSubscribeLink, newsletterSubscribeText, footerText, linkGroups } =
        footerProps || {}
    return (
        <BleedingBackgroundPageBlock
            width={'2xl'}
            as="footer"
            className={'py-11'}
            bleedClassName={'bg-(--ib-brand-white)'}
            backgroundStyle={{
                ...BubblesBackgroundSvgStyle([
                    { radius: 150, down: 50, left: 50, fill: 'hsl(335 100% 53% / 0.05)' },
                    { radius: 100, down: -50, left: 0, fill: 'hsl(43 100% 50% / 0.15)' },
                    { radius: 100, down: 100, right: 100, fill: 'hsl(43 100% 50% / 0.15)' },
                    { radius: 80, down: 220, right: 25, fill: 'hsl(335 100% 53% / 0.05)' },
                ]),
            }}>
            <ScrollToTop />
            <HGrid
                align={'center'}
                gap={{ xs: 'space-16', md: 'space-44', lg: 'space-72' }}
                columns={{ xs: 1, sm: 2, md: 5 }}>
                <BodyLong
                    id={'subscribe-to-newsletter'}
                    size={'large'}
                    className={'min-w-0 md:col-span-3'}>
                    {newsletterSubscribeText}
                </BodyLong>
                <div className={'flex justify-center md:col-span-2 md:justify-end'}>
                    <ButtonView
                        config={{
                            variant: 'primary',
                            size: 'medium',
                            url: newsletterSubscribeLink?.url || '#',
                            linkText: '',
                            external: newsletterSubscribeLink?.external ?? false,
                        }}
                        meta={meta}
                        aria-describedby={'subscribe-to-newsletter'}
                        className={'md:!justify-self-auto md:!self-auto'}>
                        {newsletterSubscribeLink?.linkText}
                    </ButtonView>
                </div>
            </HGrid>
            <Separator className={'my-(--ax-space-44)'} />
            <HGrid gap={{ xs: 'space-24', md: 'space-56' }} columns={{ xs: 1, md: 3, lg: 5 }}>
                <VStack gridColumn={{ xs: '1', md: '1/4', lg: '1/3' }} gap={'space-16'}>
                    <Image
                        src={getAsset('/images/logo-light.svg', meta)}
                        alt={'Idébanken logo'}
                        width={200}
                        height={100}
                        className="w-48 block dark:hidden"
                        priority
                    />
                    <Image
                        src={getAsset('/images/logo-dark.svg', meta)}
                        alt={'Idébanken logo'}
                        width={200}
                        height={100}
                        className="w-48 hidden dark:block"
                        priority
                    />
                    <RichTextView
                        // @ts-expect-error data.processedHtml is not required
                        data={{ processedHtml: footerText }}
                        meta={meta}
                        customReplacer={htmlRichTextReplacer}
                        className={'font-extralight text-(--ib-text-dark-blue)'}
                    />
                </VStack>
                {linkGroups?.map(({ title, links }, i) => (
                    <VStack key={i} gap={'space-16'}>
                        <HeadingView
                            key={i}
                            level="2"
                            size="xsmall"
                            className="text-(--ib-text-dark-blue) mb-0"
                            autoId={false}>
                            {title}
                        </HeadingView>
                        {links?.map(({ url, linkText }, j) => (
                            <Link as={NextLink} key={j} href={getUrl(url, meta)}>
                                {linkText ?? '[Default link text]'}
                            </Link>
                        ))}
                    </VStack>
                ))}
            </HGrid>
        </BleedingBackgroundPageBlock>
    )
}
