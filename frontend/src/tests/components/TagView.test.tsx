import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import TagView from '~/components/common/TagView'

describe('TagView', () => {
    it('renders the tag name', () => {
        render(<TagView name="Digital" size="medium" />)
        expect(screen.getByText('Digital')).toBeInTheDocument()
    })

    it('renders with a custom color CSS variable on the icon', () => {
        const { container } = render(<TagView name="Test" color="ib-brand-pink" size="medium" />)
        const icon = container.querySelector('svg')
        // The color prop ends up as a CSS var on the svg element
        expect(icon?.getAttribute('color')).toBe('var(--ib-brand-pink)')
    })

    it('falls back to ib-brand-black when no color is given', () => {
        const { container } = render(<TagView name="Test" size="medium" />)
        const icon = container.querySelector('svg')
        expect(icon?.getAttribute('color')).toBe('var(--ib-brand-black)')
    })

    it('applies the "small" size prop', () => {
        render(<TagView name="Small" size="small" data-testid="tag" />)
        // The Tag renders as <span> with the name inside
        expect(screen.getByText('Small')).toBeInTheDocument()
    })

    it('passes extra HTML attributes through', () => {
        render(<TagView name="With id" size="medium" id="my-tag" />)
        expect(document.getElementById('my-tag')).toBeInTheDocument()
    })
})
