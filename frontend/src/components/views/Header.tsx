'use client'
import { MetaData } from '@enonic/nextjs-adapter'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { PageBlock } from '@navikt/ds-react/Page'

export interface HeaderProps {
	title: string
	logoUrl: string
	meta: MetaData
}

const Header = ({ title, logoUrl }: HeaderProps) => {
	return (
		<PageBlock as="header" width="2xl">
			<NextLink href="/">
				<NextImage
					src={logoUrl}
					alt={title}
					width={200}
					height={100}
					className="w-48 h-auto"
					priority
				/>
			</NextLink>
		</PageBlock>
	)
}

export default Header
