import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ShowMoreNonAksel } from '~/components/common/ShowMoreNonAksel'

// The component imports a CSS file — Vitest/jsdom ignores it, no extra config needed.

describe('ShowMoreNonAksel', () => {
    it('renders children in the collapsed state', () => {
        render(
            <ShowMoreNonAksel name="test-section">
                <p>Hidden content here</p>
            </ShowMoreNonAksel>
        )
        expect(screen.getByText('Hidden content here')).toBeInTheDocument()
    })

    it('renders a heading when the heading prop is provided', () => {
        render(
            <ShowMoreNonAksel name="test-section" heading="Les mer">
                <p>Content</p>
            </ShowMoreNonAksel>
        )
        expect(screen.getByText('Les mer')).toBeInTheDocument()
    })

    it('shows an expand button in the collapsed state', () => {
        render(
            <ShowMoreNonAksel name="test-section">
                <p>Content</p>
            </ShowMoreNonAksel>
        )
        // The button label changes between open/closed — just check a button is present
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('toggles open on button click', async () => {
        render(
            <ShowMoreNonAksel name="test-section">
                <p>Content</p>
            </ShowMoreNonAksel>
        )
        const btn = screen.getByRole('button')
        const labelBefore = btn.textContent

        await userEvent.click(btn)

        // After clicking, the button text should change (open ↔ collapsed label)
        expect(btn.textContent).not.toBe(labelBefore)
    })

    it('renders as <aside> by default', () => {
        const { container } = render(
            <ShowMoreNonAksel name="test-section">
                <p>Content</p>
            </ShowMoreNonAksel>
        )
        expect(container.querySelector('aside')).toBeInTheDocument()
    })

    it('renders as <section> when as="section" is specified', () => {
        const { container } = render(
            <ShowMoreNonAksel name="test-section" as="section">
                <p>Content</p>
            </ShowMoreNonAksel>
        )
        expect(container.querySelector('section')).toBeInTheDocument()
    })
})
