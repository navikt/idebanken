'use client'

import { Chips } from '@navikt/ds-react'
import { ChipsToggle } from '@navikt/ds-react/Chips'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'

type Tag = Part_Idebanken_Article_Card_List['availableTypeTags'][number]

// Build a ::before dot class using a specific CSS var (e.g. ib-orange-400A)
function dotClass(colorVar: string): string {
    console.log(colorVar)
    // colorVar is like "ib-orange-400A" -> before:bg-[var(--ib-orange-400A)]
    return `before:content-[""] before:inline-block before:mr-2 before:w-3 before:h-3 before:rounded-full before:bg-[var(--${colorVar})]`
}

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
    const baseChip = 'shadow-none rounded-[74px] py-[var(--ax-space-12)] px-[var(--ax-space-24)]'
    const commonChipProps = { checkmark: false }

    return (
        <Chips className="justify-center gap-6">
            <ChipsToggle
                {...commonChipProps}
                selected={showAll}
                onClick={onToggleAll}
                className={baseChip}>
                {allLabel}
            </ChipsToggle>

            {tags.map((tag) => {
                const colorVar = tag.color || 'ib-brand-black'
                const withDot = dotClass(colorVar)

                return (
                    <ChipsToggle
                        {...commonChipProps}
                        key={tag.id}
                        className={`${baseChip} ${withDot}`}
                        selected={!showAll && selectedIds.has(tag.id)}
                        onClick={() => onToggleTag(tag.id)}>
                        {tag.name}
                    </ChipsToggle>
                )
            })}
        </Chips>
    )
}
