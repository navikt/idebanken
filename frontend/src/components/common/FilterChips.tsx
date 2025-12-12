'use client'

import { Chips } from '@navikt/ds-react'
import { ChipsToggle } from '@navikt/ds-react/Chips'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'

type Tag = Part_Idebanken_Article_Card_List['availableTypeTags'][number]

const DOT_BASE = `before:content-[""] 
    before:inline-block 
    before:mr-2 
    before:w-4 
    before:h-4 
    before:rounded-full 
    before:bg-current`

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
    const baseChip = `shadow-none 
        rounded-[74px] 
        py-[var(--ax-space-12)] 
        px-[var(--ax-space-24)] 
        data-[pressed=true]:bg-[var(--ib-bg-dark-blue-strong)]`

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
                const token = tag.color || 'ib-brand-black'
                return (
                    <ChipsToggle
                        {...commonChipProps}
                        key={tag.id}
                        className={[
                            baseChip,
                            DOT_BASE,
                            '[&>span]:text-[color:var(--ax-text-default)]',
                            'data-[pressed=true]:[&>span]:text-[color:var(--ax-text-contrast)]',
                        ].join(' ')}
                        style={{ color: `var(--${token})` }}
                        selected={!showAll && selectedIds.has(tag.id)}
                        onClick={() => onToggleTag(tag.id)}>
                        {tag.name}
                    </ChipsToggle>
                )
            })}
        </Chips>
    )
}
