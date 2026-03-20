import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterChips } from '~/components/common/FilterChips'

const tags = [
    { id: 'tag-1', name: 'Rekruttering', color: 'ib-brand-pink' },
    { id: 'tag-2', name: 'Onboarding', color: 'ib-brand-yellow' },
    { id: 'tag-3', name: 'Ledelse', color: 'ib-brand-blue' },
]

describe('FilterChips', () => {
    it('renders the "Vis alle" chip by default', () => {
        render(
            <FilterChips
                tags={tags}
                showAll={true}
                selectedIds={new Set()}
                onToggleAll={vi.fn()}
                onToggleTag={vi.fn()}
            />
        )
        expect(screen.getByText('Vis alle')).toBeInTheDocument()
    })

    it('renders a chip for every tag', () => {
        render(
            <FilterChips
                tags={tags}
                showAll={true}
                selectedIds={new Set()}
                onToggleAll={vi.fn()}
                onToggleTag={vi.fn()}
            />
        )
        tags.forEach((tag) => {
            expect(screen.getByText(tag.name)).toBeInTheDocument()
        })
    })

    it('uses a custom allLabel when provided', () => {
        render(
            <FilterChips
                tags={tags}
                showAll={true}
                selectedIds={new Set()}
                onToggleAll={vi.fn()}
                onToggleTag={vi.fn()}
                allLabel="Alle kategorier"
            />
        )
        expect(screen.getByText('Alle kategorier')).toBeInTheDocument()
    })

    it('calls onToggleAll when the "Vis alle" chip is clicked', async () => {
        const onToggleAll = vi.fn()
        render(
            <FilterChips
                tags={tags}
                showAll={true}
                selectedIds={new Set()}
                onToggleAll={onToggleAll}
                onToggleTag={vi.fn()}
            />
        )
        await userEvent.click(screen.getByText('Vis alle'))
        expect(onToggleAll).toHaveBeenCalledOnce()
    })

    it('calls onToggleTag with the correct id when a tag chip is clicked', async () => {
        const onToggleTag = vi.fn()
        render(
            <FilterChips
                tags={tags}
                showAll={false}
                selectedIds={new Set()}
                onToggleAll={vi.fn()}
                onToggleTag={onToggleTag}
            />
        )
        await userEvent.click(screen.getByText('Rekruttering'))
        expect(onToggleTag).toHaveBeenCalledWith('tag-1')
    })

    it('marks a tag chip as selected when its id is in selectedIds', () => {
        render(
            <FilterChips
                tags={tags}
                showAll={false}
                selectedIds={new Set(['tag-2'])}
                onToggleAll={vi.fn()}
                onToggleTag={vi.fn()}
            />
        )
        // NAV Aksel ChipsToggle sets aria-pressed="true" on the selected button
        const onboardingChip = screen.getByText('Onboarding').closest('button')
        expect(onboardingChip).toHaveAttribute('aria-pressed', 'true')
    })
})
