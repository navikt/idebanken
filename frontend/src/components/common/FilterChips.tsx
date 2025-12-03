'use client'
import { Chips } from '@navikt/ds-react'
import { ChipsToggle } from '@navikt/ds-react/Chips'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'

type Tag = Part_Idebanken_Article_Card_List['availableTypeTags'][number]

export function FilterChips({
    tags,
    showAll,
    selectedIds,
    onToggleAll,
    onToggleTag,
    allLabel = 'Vis alle',
}: {
    tags: Tag[]
    showAll: boolean
    selectedIds: Set<string>
    onToggleAll: () => void
    onToggleTag: (id: string) => void
    allLabel?: string
}) {
    return (
        <Chips>
            <ChipsToggle selected={showAll} onClick={onToggleAll}>
                {allLabel}
            </ChipsToggle>
            {tags.map((tag) => (
                <ChipsToggle
                    key={tag.id}
                    selected={!showAll && selectedIds.has(tag.id)}
                    onClick={() => onToggleTag(tag.id)}>
                    {tag.name}
                </ChipsToggle>
            ))}
        </Chips>
    )
}
