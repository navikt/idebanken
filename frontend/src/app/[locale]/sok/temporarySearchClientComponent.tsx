// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchWrapper } from '~/components/common/SearchWrapper'

export default function TemporarySearchClientComponent() {
    const [searchResult, setSearchResult] = useState<
        { total: number; hits: Array<object>; word: string } | undefined
    >()
    const searchParams = useSearchParams()

    useEffect(() => {
        const sok = searchParams.get('sok')
        if (!sok) {
            return
        }
        search(sok)
    }, [searchParams])

    function search(searchTerm: string) {
        fetch(`/api/search?ord=${searchTerm}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setSearchResult(data)
            })
            .catch((error) => {
                console.error('Error fetching search results:', error)
            })
    }

    return (
        <div>
            <SearchWrapper />
            <div>
                {searchResult ? (
                    <div>
                        <p>
                            {searchResult.total ?? 0} treff på &#34;{searchResult.word}&#34;
                        </p>
                        <ul>
                            {searchResult?.hits?.map((result, index) => (
                                <li key={index} className="pb-8">
                                    {/*{JSON.stringify(result)}*/}
                                    <h2 className="text-2xl font-bold">{result.displayName}</h2>
                                    <p
                                        className="font-extralight"
                                        dangerouslySetInnerHTML={{ __html: result.highlight }}></p>
                                    <p>score: {result.score}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
