'use client'
import { Search } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'

export function SearchWrapper() {
    const router = useRouter()
    return (
        <form
            role="search"
            name={'idebanken-search'}
            onSubmit={(e) => {
                e.preventDefault()
                router.push(
                    `/sok?ord=${encodeURIComponent((e.target as HTMLFormElement).sok.value)}`
                )
            }}>
            <Search
                label={'Søk etter innhold på idebanken'}
                id={'sok'}
                className="max-w-60 self-center justify-self-center"
            />
        </form>
    )
}
