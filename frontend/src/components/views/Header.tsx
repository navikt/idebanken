'use client'

import { MetaData } from '@enonic/nextjs-adapter'
import NextLink from 'next/link'
import NextImage from 'next/image'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { SearchWrapper } from '~/components/common/SearchWrapper'
import { HeadlessCms } from '~/types/generated'
import { Bleed, Box, Button, HGrid, HStack, VStack } from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'
import { MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons'
import { useState } from 'react'
import { PageBlock } from '@navikt/ds-react/Page'
import classNames from 'classnames'

export interface HeaderProps {
    title: string
    logoUrl: string
    meta: MetaData
    header?: HeadlessCms['header']
}

const Header = ({ title, logoUrl, header }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <BleedingBackgroundPageBlock
                as={'header'}
                className="bg-extra-light-pink relative z-50">
                <HStack
                    align="center"
                    justify="space-between"
                    gap="6"
                    paddingBlock={{ xs: '0 space-8', md: 'space-16 space-20' }}
                    className="shadow-[0_-1px_0_0_#CFCFCF_inset]">
                    <NextLink href="/" className={'content-center h-12'}>
                        <NextImage
                            src={logoUrl}
                            alt={title}
                            width={200}
                            height={100}
                            className="w-48 h-full"
                            priority
                        />
                    </NextLink>

                    <Button
                        variant="tertiary"
                        aria-label={isMenuOpen ? 'Lukk meny' : 'Åpne meny'}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="[&_.navds-label]:translate-y-[2px] flex-col sm:flex-row"
                        icon={
                            <div
                                className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}>
                                {isMenuOpen ? (
                                    <XMarkIcon aria-hidden />
                                ) : (
                                    <MenuHamburgerIcon aria-hidden />
                                )}
                            </div>
                        }>
                        Meny
                    </Button>
                </HStack>
            </BleedingBackgroundPageBlock>
            <PageBlock
                className={classNames(
                    'absolute',
                    'bg-light-pink',
                    'z-40',
                    'left-1/2',
                    'transform',
                    '-translate-x-1/2',
                    'transition-all duration-300',
                    'rounded-b-4xl',
                    isMenuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-10 pointer-events-none h-0 overflow-hidden'
                )}
                aria-hidden={!isMenuOpen}
                width={'2xl'}
                gutters>
                <HGrid columns={{ xs: 1, md: 12 }} gap={'space-20'} className={'py-12'}>
                    <SearchWrapper className={'col-span-1 md:col-span-4 md:order-2'} />
                    <Box
                        as={'nav'}
                        className={
                            'col-span-1 md:col-span-8 md:order-1 flex flex-wrap gap-x-20 gap-y-6'
                        }>
                        {header?.map(({ title, links }, id) => (
                            <VStack key={id} gap={'2'}>
                                <HeadingView key={id} level={'2'} size={'xsmall'}>
                                    {title}
                                </HeadingView>
                                {links?.map(({ linkText, href }, id) => (
                                    <NextLink
                                        key={id}
                                        href={href ?? '/'}
                                        className="underline hover:no-underline">
                                        {linkText}
                                    </NextLink>
                                ))}
                            </VStack>
                        ))}
                    </Box>
                </HGrid>
            </PageBlock>

            {/* Overlay to darken the page */}
            <Bleed
                className={classNames(
                    'fixed inset-x-0 top-0 bottom-0 bg-black transition-opacity duration-300 z-30',
                    isMenuOpen ? 'opacity-30' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => setIsMenuOpen(false)}></Bleed>
        </>
    )
}

export default Header
