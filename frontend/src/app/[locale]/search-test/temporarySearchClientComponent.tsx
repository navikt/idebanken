// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { useState } from 'react'

export default function TemporarySearchClientComponent() {
    const [searchResult, setSearchResult] = useState<
        { total: number; hits: Array<object>; word: string } | undefined
    >()
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    const searchTerm = formData.get('ord') as string

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
                }}>
                <input
                    name="ord"
                    className="border"
                    type="text"
                    placeholder="hva leter du etter?"
                />
                <button type="submit">Søk</button>
            </form>
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
