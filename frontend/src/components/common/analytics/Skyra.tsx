import { SkyraData } from '~/types/generated'
import { enonicSitePathToHref } from '~/utils/utils'

export function Skyra({
    skyra,
    isDraftMode,
}: {
    skyra?: Array<Omit<SkyraData, '__typename'>>
    isDraftMode: boolean
}) {
    const shouldLoadScripts = !isDraftMode && process.env.ENV !== 'local'

    if (!skyra?.length) {
        return <></>
    } else if (shouldLoadScripts) {
        return (
            <>
                {skyra.map(({ slug }, i) => (
                    // @ts-expect-error skyra-survey does not exist
                    <skyra-survey key={i} slug={slug} consent="false" />
                ))}
            </>
        )
    } else {
        return (
            <div className={'fixed bottom-0 bg-(--ax-neutral-100) text-sm group z-50'}>
                Skyra
                <div className={'hidden group-hover:block p-1'}>
                    Skyra vil laste inn følgende skjemaer på denne siden:
                    {skyra?.map((s, i) => (
                        <p key={i}>
                            {`> slug: "${s.slug}"${s.source ? `, hentet fra: ${enonicSitePathToHref(s.source)}` : ''}`}
                        </p>
                    ))}
                </div>
            </div>
        )
    }
}

export default Skyra
