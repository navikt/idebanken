import { BodyShort, VStack, HStack } from '@navikt/ds-react'
import { Separator } from '~/components/macros/Separator'
import { joinArrayWithCommasAndAnd } from '~/utils/utils'
import { localizedDateTime } from '~/components/common/localizedDateTime'

interface AuthorsProps {
    authors?: string | string[]
    artist?: string
    published?: string
}

export const AuthorsAndDate = ({ authors, artist, published }: AuthorsProps) => {
    if (!authors) return null
    return (
        <VStack className="mt-0">
            <Separator className="mb-(--ax-space-16) border-t-2" />
            <HStack gap="2" className="mb-(--ax-space-2)">
                <BodyShort size="small">TEKST: {joinArrayWithCommasAndAnd(authors)}</BodyShort>
                {artist && <BodyShort size="small">FOTO: {artist}</BodyShort>}
            </HStack>
            {published && (
                <BodyShort size="small">Publisert {localizedDateTime(published)}</BodyShort>
            )}
            <Separator className="mt-(--ax-space-16) border-t-2" />
        </VStack>
    )
}
