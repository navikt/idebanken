import { PageBlock } from '@navikt/ds-react/Page'

export default function Footer() {
    return (
        <PageBlock as="footer" width="2xl" className="bg-brand-black">
            <div className="container mx-auto py-4 text-center">
                <p className="text-sm text-brand-white">© 2025 Idebanken. All rights reserved.</p>
            </div>
        </PageBlock>
    )
}
