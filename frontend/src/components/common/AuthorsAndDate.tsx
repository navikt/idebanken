import { BodyShort, VStack } from '@navikt/ds-react'
import { Separator } from '~/components/macros/Separator'
import { joinArrayWithCommasAndAnd } from '~/utils/utils'
import { localizedDateTime } from '~/components/common/localizedDateTime'

interface AuthorsProps {
    authors?: string | string[]
    published?: string
}

export const AuthorsAndDate = ({ authors, published }: AuthorsProps) => {
    if (!authors) return null
    return (
        <VStack className="mt-0">
            <Separator className="mb-(--ax-space-16) border-t-2" />
            <BodyShort size="small" className="mb-(--ax-space-2)">
                TEKST: {joinArrayWithCommasAndAnd(authors)}
            </BodyShort>
            {published && (
                <BodyShort size="small">Publisert {localizedDateTime(published)}</BodyShort>
            )}
            <Separator className="mt-(--ax-space-16) border-t-2" />
        </VStack>
    )
}
