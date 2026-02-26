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
            <VStack className="mt-0" gap="space-8">
                {authors && (
                    <BodyShort size="medium" className="mb-(--ax-space-2) leading-normal">
                        Innholdet er laget av: {joinArrayWithCommasAndAnd(authors)}
                    </BodyShort>
                )}
                {published && (
                    <BodyShort size="medium" className="leading-normal">
                        Oppdatert: {localizedDateTime(published)}
                    </BodyShort>
                )}
            </VStack>
        )
    }

    return (
        <VStack className="mt-0">
            <Separator className="mb-(--ax-space-12) border-t" />
            <HStack gap="space-8" className="mb-(--ax-space-2)">
                {authors && (
                    <BodyShort size="small" className="leading-normal">
                        Tekst: {joinArrayWithCommasAndAnd(authors)}
                    </BodyShort>
                )}
                {artist && (
                    <BodyShort size="small" className="leading-normal">
                        Foto: {joinArrayWithCommasAndAnd(artist)}
                    </BodyShort>
                )}
            </HStack>
            {published && (
                <BodyShort size="small" className="leading-normal">
                    Publisert {localizedDateTime(published)}
                </BodyShort>
            )}
            <Separator className="mt-(--ax-space-12) border-t" />
        </VStack>
    )
}
