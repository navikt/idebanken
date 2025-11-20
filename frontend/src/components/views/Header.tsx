'use client'

import { getAsset, getUrl, MetaData } from '@enonic/nextjs-adapter'
import NextLink from 'next/link'
import Image from 'next/image'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { SearchWrapper } from '~/components/common/SearchWrapper'
import { HeadlessCms, SiteConfiguration } from '~/types/generated'
import { Bleed, Button, HStack, Stack, VStack } from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'
import {
    ArrowRightIcon,
    MagnifyingGlassIcon,
    MenuHamburgerIcon,
    XMarkIcon,
} from '@navikt/aksel-icons'
import { useEffect, useMemo, useState } from 'react'
import { PageBlock } from '@navikt/ds-react/Page'
import classNames from 'classnames'
import { LinkCard, LinkCardAnchor, LinkCardTitle } from '@navikt/ds-react/LinkCard'
import { debounce, search, SearchResult } from '~/utils/search'
import SearchResults from '~/components/common/SearchResults'
import { usePathname, useRouter } from 'next/navigation'
import { SOK_SEARCH_PARAM } from '~/utils/constants'
import { ThemeButton } from '~/app/[locale]/theming/theme-button'
import { SearchFrom, trackSearchResult } from '~/utils/analytics/umami'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { CookieBanner } from '~/components/common/cookies/CookieBanner'

export interface HeaderProps {
    title: string
    meta: MetaData
    common?: HeadlessCms
}

export const Header = ({ title, common, meta }: HeaderProps) => {
    const { header, siteConfiguration } = common ?? {}

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchResult, setSearchResult] = useState<SearchResult | undefined>()
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    // Shared class utilities to reduce duplication
    const buttonLabelClass = '[&_.navds-label]:translate-y-[2px] flex-col sm:flex-row'
    const rotatingIconClass = (on: boolean) =>
        classNames('transition-transform duration-200', { 'rotate-90': on })
    const dropdownBaseClass =
        'absolute top-full right-0 transform z-40 bg-(--ax-bg-default) transition-all duration-300 rounded-b-4xl'
    const dropdownStateClass = (open: boolean) =>
        open
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-3 pointer-events-none h-0 overflow-hidden'

    useEffect(() => {
        const trackBeforeNavigation = () => {
            if (searchResult?.word?.length && searchResult.word.length > 2) {
                trackSearchResult(searchResult, SearchFrom.HURTIGSOK_MENY, pathname)
            }
        }

        window.addEventListener('beforeunload', trackBeforeNavigation)
        return () => {
            window.removeEventListener('beforeunload', trackBeforeNavigation)
            trackBeforeNavigation()
        }
    }, [searchResult, pathname])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false)
                setIsSearchOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const debouncedLiveSearch = useMemo(
        () =>
            debounce((term: string) => {
                setLoading(true)
                search(term)
                    .then(setSearchResult)
                    .finally(() => setLoading(false))
            }, 500),
        []
    )

    const handleFormChange: React.FormEventHandler<HTMLFormElement> = (e) => {
        const target = e.target as HTMLInputElement | null
        const value = target?.value ?? ''
        setSearchValue(value)
        if (value.length > 2) {
            debouncedLiveSearch(value)
        }
    }

    return (
        <>
            <BleedingBackgroundPageBlock
                as="header"
                width={'2xl'}
                className="relative items-center"
                bleedClassName="shadow-[0_-1px_0_0_#CFCFCF_inset] relative z-[99] overflow-y-visible bg-(--ax-bg-default)">
                <CookieBanner meta={meta} common={common} />
                <a
                    className="z-[100] transition left-0 bg-dark-blue text-primary-content absolute p-3 m-3 -translate-y-16 focus:translate-y-0"
                    href="#main-content">
                    Hopp til hovedinnhold
                </a>
                <HStack
                    align="center"
                    justify="space-between"
                    wrap={false}
                    paddingBlock={{ xs: 'space-8', md: 'space-16' }}>
                    <NextLink
                        aria-label={'Til forsiden'}
                        href={getUrl('/', meta)}
                        className={'content-center h-12 max-w-48'}>
                        <Image
                            className={'block dark:hidden'}
                            src={getAsset('/images/logo-light.svg', meta)}
                            alt={title}
                            width={200}
                            height={100}
                            priority
                        />
                        <Image
                            className={'hidden dark:block'}
                            src={getAsset('/images/logo-dark.svg', meta)}
                            alt={title}
                            width={200}
                            height={100}
                            priority
                        />
                    </NextLink>
                    <HStack gap="2">
                        <Button
                            variant="tertiary-neutral"
                            aria-label={isMenuOpen ? 'Lukk meny' : 'Åpne meny'}
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen)
                                setIsSearchOpen(false)
                            }}
                            className={buttonLabelClass}
                            icon={
                                <div className={rotatingIconClass(isMenuOpen)}>
                                    {isMenuOpen ? (
                                        <XMarkIcon aria-hidden />
                                    ) : (
                                        <MenuHamburgerIcon aria-hidden />
                                    )}
                                </div>
                            }>
                            Meny
                        </Button>
                        <PageBlock
                            className={classNames(
                                dropdownBaseClass,
                                dropdownStateClass(isMenuOpen)
                            )}
                            aria-hidden={!isMenuOpen}
                            inert={!isMenuOpen}
                            width={'2xl'}
                            gutters>
                            <Stack
                                as={'nav'}
                                gap={'8'}
                                className={'py-(--ax-space-24) lg:py-(--ax-space-32)'}
                                justify={'space-between'}
                                direction={{ xs: 'column', lg: 'row' }}>
                                {quickSearch({
                                    isSearchOpen,
                                    handleFormChange,
                                    router,
                                    siteConfiguration,
                                    searchValue,
                                    searchResult,
                                    loading,
                                    meta,
                                    setIsSearchOpen,
                                    className: 'sm:hidden',
                                })}
                                <Stack
                                    gap={{ xs: '8', lg: '16' }}
                                    direction={{ xs: 'column', lg: 'row' }}>
                                    {header?.linkGroups?.map(({ title, links }, id) => (
                                        <VStack key={id} gap={'4'}>
                                            {title && (
                                                <HeadingView
                                                    key={id}
                                                    level={'2'}
                                                    size={'xsmall'}
                                                    fontClass={'ib-bold'}
                                                    className={'mb-0'}>
                                                    {title}
                                                </HeadingView>
                                            )}
                                            {links?.map(({ linkText, url }, id) => (
                                                <NextLink
                                                    key={id}
                                                    href={getUrl(url, meta)}
                                                    className="text-(--ax-text-decoration) underline hover:no-underline w-fit">
                                                    {linkText}
                                                </NextLink>
                                            ))}
                                        </VStack>
                                    ))}
                                </Stack>
                                <VStack gap={{ xs: '4', lg: '6' }}>
                                    {header?.linksBottom?.map(({ linkText, url }, i) => (
                                        <LinkCard
                                            key={i}
                                            arrow={false}
                                            className={
                                                'p-6 text-(--ax-accent-600) hover:underline border-2 border-(--ib-bg-dark-blue-strong)'
                                            }>
                                            <LinkCardTitle>
                                                <LinkCardAnchor
                                                    href={getUrl(url, meta)}
                                                    className={
                                                        'text-(--ax-accent-600) no-underline'
                                                    }>
                                                    {linkText}
                                                </LinkCardAnchor>
                                            </LinkCardTitle>
                                        </LinkCard>
                                    ))}
                                </VStack>
                                <ThemeButton className={'sm:hidden'} />
                            </Stack>
                        </PageBlock>
                        <Button
                            variant={'tertiary-neutral'}
                            aria-label={isSearchOpen ? 'Lukk søk' : 'Åpne søk'}
                            onClick={() => {
                                setIsSearchOpen(!isSearchOpen)
                                setIsMenuOpen(false)
                            }}
                            className={classNames(buttonLabelClass, 'max-sm:hidden')}
                            icon={
                                <div className={rotatingIconClass(isSearchOpen)}>
                                    {isSearchOpen ? (
                                        <XMarkIcon aria-hidden />
                                    ) : (
                                        <MagnifyingGlassIcon aria-hidden />
                                    )}
                                </div>
                            }>
                            Søk
                        </Button>
                        <PageBlock
                            className={classNames(
                                dropdownBaseClass,
                                dropdownStateClass(isSearchOpen),
                                'max-sm:hidden',
                                'py-8'
                            )}
                            aria-hidden={!isSearchOpen}
                            inert={!isSearchOpen}
                            width={'md'}
                            gutters>
                            {quickSearch({
                                isSearchOpen,
                                handleFormChange,
                                router,
                                siteConfiguration,
                                searchValue,
                                searchResult,
                                loading,
                                meta,
                                setIsSearchOpen,
                            })}
                        </PageBlock>
                        <ThemeButton
                            className={'max-sm:hidden'}
                            withTooltip
                            onKeyDown={(e) => {
                                if (e.key === 'Tab' && !e.shiftKey) {
                                    setIsMenuOpen(false)
                                    setIsSearchOpen(false)
                                }
                            }}
                        />
                    </HStack>
                </HStack>
            </BleedingBackgroundPageBlock>

            {/* Overlay to darken the page */}
            <Bleed
                className={classNames(
                    'fixed inset-x-0 top-0 bottom-0 bg-(--ib-brand-black) transition-opacity duration-300 z-30',
                    isMenuOpen || isSearchOpen ? 'opacity-30' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => {
                    setIsMenuOpen(false)
                    setIsSearchOpen(false)
                }}></Bleed>
        </>
    )
}

function quickSearch({
    isSearchOpen,
    handleFormChange,
    router,
    siteConfiguration,
    searchValue,
    searchResult,
    loading,
    meta,
    setIsSearchOpen,
    className = '',
}: {
    isSearchOpen: boolean
    handleFormChange: (event: React.FormEvent<HTMLFormElement>) => void
    router: AppRouterInstance
    siteConfiguration: SiteConfiguration | undefined
    searchValue: string
    searchResult: SearchResult | undefined
    loading: boolean
    meta: MetaData
    setIsSearchOpen: (value: ((prevState: boolean) => boolean) | boolean) => void
    className?: string
}) {
    return (
        <VStack className={className}>
            <HeadingView
                id={'idebanken-quicksearch-title'}
                level={'2'}
                size={'medium'}
                aria-hidden={true}>
                Søk på idébanken
            </HeadingView>
            <SearchWrapper
                aria-labelledby={'idebanken-quicksearch-title'}
                isSearchOpen={isSearchOpen}
                onChange={handleFormChange}
                onSubmit={(e) => {
                    e.preventDefault()
                    router.push(
                        `${siteConfiguration?.searchPageHref}?${SOK_SEARCH_PARAM}=${encodeURIComponent(searchValue)}`
                    )
                }}
            />
            {SearchResults(meta, SearchFrom.HURTIGSOK_MENY, searchResult, loading)}
            {searchResult ? (
                <NextLink
                    href={getUrl(
                        `${siteConfiguration?.searchPageHref}?${SOK_SEARCH_PARAM}=${encodeURIComponent(searchValue)}`,
                        meta
                    )}
                    onClick={() => setIsSearchOpen(false)}
                    className={'mt-6 flex flex-row gap-1 underline hover:no-underline w-fit'}>
                    Gå til avansert søk <ArrowRightIcon />
                </NextLink>
            ) : (
                <></>
            )}
        </VStack>
    )
}
