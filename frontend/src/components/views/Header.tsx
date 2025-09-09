'use client'

import { MetaData } from '@enonic/nextjs-adapter'
import NextLink from 'next/link'
import NextImage from 'next/image'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { SearchWrapper } from '~/components/common/SearchWrapper'
import { HeadlessCms } from '~/types/generated'
import { Bleed, Button, HStack, VStack } from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'
import { MagnifyingGlassIcon, MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons'
import { useState } from 'react'
import { PageBlock } from '@navikt/ds-react/Page'
import classNames from 'classnames'
import { LinkCard, LinkCardAnchor, LinkCardTitle } from '@navikt/ds-react/LinkCard'

export interface HeaderProps {
    title: string
    logoUrl: string
    meta: MetaData
    header?: HeadlessCms['header']
}

const Header = ({ title, logoUrl, header }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <>
            <BleedingBackgroundPageBlock
                as="header"
                width={'2xl'}
                className="relative items-center"
                bleedClassName="shadow-[0_-1px_0_0_#CFCFCF_inset] relative z-40 overflow-y-visible">
                <HStack
                    align="center"
                    justify="space-between"
                    gap="6"
                    paddingBlock={{ xs: 'space-8', md: 'space-16' }}>
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
                    <HStack gap="2">
                        <Button
                            variant="tertiary"
                            aria-label={isMenuOpen ? 'Lukk meny' : 'Åpne meny'}
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen)
                                setIsSearchOpen(false)
                            }}
                            className="[&_.navds-label]:translate-y-[2px] flex-col sm:flex-row"
                            icon={
                                <div
                                    className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}>
                                    {isMenuOpen ? (
                                        <XMarkIcon aria-hidden />
                                    ) : (
                                        <MenuHamburgerIcon aria-hidden />
                                    )}
                                </div>
                            }>
                            Meny
                        </Button>
                        <Button
                            variant={'tertiary'}
                            aria-label={isSearchOpen ? 'Lukk søk' : 'Åpne søk'}
                            onClick={() => {
                                setIsSearchOpen(!isSearchOpen)
                                setIsMenuOpen(false)
                            }}
                            className={'[&_.navds-label]:translate-y-[2px] flex-col sm:flex-row'}
                            icon={
                                <div
                                    className={`transition-transform duration-200 ${isSearchOpen ? 'rotate-90' : ''}`}>
                                    {isSearchOpen ? (
                                        <XMarkIcon aria-hidden />
                                    ) : (
                                        <MagnifyingGlassIcon aria-hidden />
                                    )}
                                </div>
                            }>
                            Søk
                        </Button>
                    </HStack>
                </HStack>

                <PageBlock
                    className={classNames(
                        'absolute',
                        'top-full',
                        'right-0',
                        'transform',
                        'bg-light-pink',
                        'z-40',
                        'transition-all duration-300',
                        'rounded-b-4xl',
                        isMenuOpen
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-3 pointer-events-none h-0 overflow-hidden'
                    )}
                    aria-hidden={!isMenuOpen}
                    inert={!isMenuOpen}
                    width={'2xl'}
                    gutters>
                    <VStack as={'nav'} gap={'8'} className={''} padding={'10'}>
                        <HStack gap={{ xs: '8', md: '16' }}>
                            {header?.linkGroups?.map(({ title, links }, id) => (
                                <VStack key={id} gap={'2'}>
                                    <HeadingView
                                        key={id}
                                        level={'2'}
                                        size={'xsmall'}
                                        className={'font-bold'}>
                                        {/*TODO fix font bold*/}
                                        {title}
                                    </HeadingView>
                                    {links?.map(({ linkText, href }, id) => (
                                        <NextLink
                                            key={id}
                                            href={href ?? '/'}
                                            className="underline hover:no-underline w-fit">
                                            {linkText}
                                        </NextLink>
                                    ))}
                                </VStack>
                            ))}
                        </HStack>
                        <hr className="separator" />
                        <HStack gap={{ xs: '4', md: '16' }}>
                            {header?.linksBottom?.map(({ linkText, href }, id) => (
                                <LinkCard key={id}>
                                    <LinkCardTitle>
                                        <LinkCardAnchor href={href}>{linkText}</LinkCardAnchor>
                                    </LinkCardTitle>
                                </LinkCard>
                            ))}
                        </HStack>
                    </VStack>
                </PageBlock>

                <PageBlock
                    className={classNames(
                        'absolute',
                        'top-full',
                        'right-0',
                        'transform',
                        'bg-light-pink',
                        'z-40',
                        'transition-all duration-300',
                        'rounded-b-4xl',
                        isSearchOpen
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-3 pointer-events-none h-0 overflow-hidden'
                    )}
                    aria-hidden={!isSearchOpen}
                    inert={!isSearchOpen}
                    width={'md'}
                    gutters>
                    <VStack gap={'space-20'} className={'py-12'} maxWidth={'xs'} maxHeight={'xs'}>
                        <SearchWrapper className={''} isSearchOpen={isSearchOpen} />
                    </VStack>
                </PageBlock>
            </BleedingBackgroundPageBlock>

            {/* Overlay to darken the page */}
            <Bleed
                className={classNames(
                    'absolute inset-x-0 top-24 md:top-20 bottom-0 bg-black transition-opacity duration-300 z-30',
                    isMenuOpen || isSearchOpen ? 'opacity-30' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => {
                    setIsMenuOpen(false)
                    setIsSearchOpen(false)
                }}></Bleed>
        </>
    )
}

export default Header
