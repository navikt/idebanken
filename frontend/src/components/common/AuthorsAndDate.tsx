import { BodyShort, HStack, VStack } from '@navikt/ds-react'
import { Separator } from '~/components/macros/Separator'
import { joinArrayWithCommasAndAnd } from '~/utils/utils'
import { localizedDateTime } from '~/components/common/localizedDateTime'

interface AuthorsProps {
    authors?: string | string[]
    artist?: string | string[]
    published?: string
    coreArticle?: boolean
}

export const AuthorsAndDate = ({
    authors,
    artist,
    published,
    coreArticle = false,
}: AuthorsProps) => {
    if (!authors && !published) return null

    if (coreArticle) {
        return (
            <VStack className="mt-0" gap="2">
                {authors && (
                    <BodyShort size="medium" className="mb-(--ax-space-2)">
                        Innholdet er laget av: {joinArrayWithCommasAndAnd(authors)}
                    </BodyShort>
                )}
                {published && (
                    <BodyShort size="medium">Oppdatert: {localizedDateTime(published)}</BodyShort>
                )}
            </VStack>
        )
    }

    return (
        <VStack className="mt-0">
            <Separator className="mb-(--ax-space-16) border-t-1" />
            <HStack gap="2" className="mb-(--ax-space-2)">
                {authors && (
                    <BodyShort size="small">Tekst: {joinArrayWithCommasAndAnd(authors)}</BodyShort>
                )}
                {artist && (
                    <BodyShort size="small">Foto: {joinArrayWithCommasAndAnd(artist)}</BodyShort>
                )}
            </HStack>
            {published && (
                <BodyShort size="small">Publisert {localizedDateTime(published)}</BodyShort>
            )}
            <Separator className="mt-(--ax-space-16) border-t-1" />
        </VStack>
    )
}
