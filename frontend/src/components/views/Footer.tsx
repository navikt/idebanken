import { PageBlock } from '@navikt/ds-react/Page'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { Footer as FooterProps } from '~/types/generated'
import { BodyShort, HStack, VStack } from '@navikt/ds-react'
import NextLink from 'next/link'
import { HeadingView } from '~/components/parts/Heading'

export default function Footer({ footerProps }: Readonly<{ footerProps?: FooterProps }>) {
    return (
        <BleedingBackgroundPageBlock bgColor={'bg-brand-black'} width={'2xl'}>
            <PageBlock as="footer" width="2xl" className="container mx-auto py-8 text-brand-white">
                <HStack gap="8" justify="space-between" align="center">
                    <VStack>
                        {/* Logo */}
                        <BodyShort className="text-[#FFF3E2] italic font-extralight" size="small">
                            {footerProps?.footerText ?? ''}
                        </BodyShort>
                    </VStack>
                    {footerProps?.linkGroups?.map(({ title, links }, i) => (
                        <VStack key={i} gap="2">
                            <HeadingView
                                key={i}
                                level="2"
                                size="xsmall"
                                className="opacity-80"
                                autoId={false}>
                                {title}
                            </HeadingView>
                            {links?.map(({ url, linkText }, j) => (
                                <NextLink
                                    key={j}
                                    href={url}
                                    className="text-[#FFF3E2] underline hover:no-underline">
                                    {linkText ?? '[Default link text]'}
                                </NextLink>
                            ))}
                        </VStack>
                    ))}
                </HStack>
            </PageBlock>
        </BleedingBackgroundPageBlock>
    )
}
