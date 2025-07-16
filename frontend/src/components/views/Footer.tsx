import { PageBlock } from '@navikt/ds-react/Page'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'

export default function Footer() {
    return (
        <BleedingBackgroundPageBlock bgColor={'bg-brand-black'}>
            <PageBlock as="footer" width="2xl">
                <div className="container mx-auto py-4 text-center">
                    <p className="text-sm text-brand-white">
                        © 2025 Idebanken. All rights reserved.
                    </p>
                </div>
            </PageBlock>
        </BleedingBackgroundPageBlock>
    )
}
