export function GlobalSkyraForms({
    skyra,
    isDraftMode,
}: {
    skyra?: Array<string>
    isDraftMode: boolean
}) {
    const shouldLoadScripts = !isDraftMode && process.env.ENV !== 'local'

    if (shouldLoadScripts) {
        return (
            <>
                {skyra?.map((slug, i) => (
                    // @ts-expect-error skyra-survey does not exist
                    <skyra-survey key={i} slug={slug} consent="false" />
                ))}
            </>
        )
    }

    return <></>
}

export default GlobalSkyraForms
