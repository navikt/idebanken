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
		<PageBlock as="header" width="xl">
			<NextLink href="/">
				<NextImage src={logoUrl} alt={title} width={200} height={200} priority />
			</NextLink>
		</PageBlock>
	)
}

export default Header
