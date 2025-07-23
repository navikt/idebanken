'use client'
import { MetaData } from '@enonic/nextjs-adapter'
import NextLink from 'next/link'
import NextImage from 'next/image'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { SearchWrapper } from '~/components/common/SearchWrapper'
import { OverridableContentLink } from '~/types/generated'
import { HStack } from '@navikt/ds-react'

export interface HeaderProps {
    title: string
    logoUrl: string
    meta: MetaData
    menu?: Array<OverridableContentLink>
}

const Header = ({ title, logoUrl, menu }: HeaderProps) => {
    return (
        <BleedingBackgroundPageBlock
            as={'header'}
            className={'flex flex-row justify-between items-center py-4'}>
            <HStack align="center" gap="6">
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
                {menu?.map(({ href, linkText }, id) => (
                    <NextLink key={id} href={href ?? '/'} className="text-black hover:underline">
                        {linkText}
                    </NextLink>
                ))}
            </HStack>
            <SearchWrapper />
        </BleedingBackgroundPageBlock>
    )
}

export default Header
