'use client'
import { MetaData } from '@enonic/nextjs-adapter'
import NextLink from 'next/link'
import NextImage from 'next/image'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { SearchWrapper } from '~/components/common/SearchWrapper'

export interface HeaderProps {
    title: string
    logoUrl: string
    meta: MetaData
}

const Header = ({ title, logoUrl }: HeaderProps) => {
    return (
        <BleedingBackgroundPageBlock
            as={'header'}
            className={'flex flex-row justify-between items-center py-4'}>
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
            <SearchWrapper />
        </BleedingBackgroundPageBlock>
    )
}

export default Header
