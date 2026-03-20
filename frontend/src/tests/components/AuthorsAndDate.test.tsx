import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthorsAndDate } from '~/components/common/AuthorsAndDate'

// localizedDateTime renders a <time> element — mock the Intl locale
// so the test output is deterministic
describe('AuthorsAndDate', () => {
    it('renders nothing when no authors or published date', () => {
        const { container } = render(<AuthorsAndDate />)
        expect(container.firstChild).toBeNull()
    })

    it('renders author attribution when authors is a string', () => {
        render(<AuthorsAndDate authors="Ola Nordmann" />)
        expect(screen.getByText(/Ola Nordmann/)).toBeInTheDocument()
    })

    it('renders multiple authors joined with "og"', () => {
        render(<AuthorsAndDate authors={['Alice', 'Bob']} />)
        expect(screen.getByText(/Alice og Bob/)).toBeInTheDocument()
    })

    it('renders three authors with commas and "og"', () => {
        render(<AuthorsAndDate authors={['Alice', 'Bob', 'Carol']} />)
        expect(screen.getByText(/Alice, Bob og Carol/)).toBeInTheDocument()
    })

    it('renders photo attribution when artist is provided alongside a published date', () => {
        // The component returns null when neither authors nor published is set,
        // so we supply a published date to make the non-coreArticle branch render.
        render(<AuthorsAndDate artist="Foto-Arne" published="2024-03-15T00:00:00Z" />)
        expect(screen.getByText(/Foto: Foto-Arne/)).toBeInTheDocument()
    })

    it('renders a <time> element when published date is given', () => {
        render(<AuthorsAndDate published="2024-03-15T00:00:00Z" />)
        expect(document.querySelector('time')).toBeInTheDocument()
    })

    it('renders coreArticle variant with "Innholdet er laget av:"', () => {
        render(<AuthorsAndDate authors="NAV" coreArticle />)
        expect(screen.getByText(/Innholdet er laget av: NAV/)).toBeInTheDocument()
    })

    it('renders coreArticle variant with "Oppdatert:" label', () => {
        render(<AuthorsAndDate published="2024-03-15T00:00:00Z" coreArticle />)
        expect(screen.getByText(/Oppdatert:/)).toBeInTheDocument()
    })
})
