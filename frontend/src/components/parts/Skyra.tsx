import { PartData } from '~/types/graphql-types'
import { XP_Skyra } from '@xp-types/site/parts'
import { RENDER_MODE } from '@enonic/nextjs-adapter'

export default function Skyra({ part, meta }: PartData<XP_Skyra>) {
    const shouldLoadScripts = meta.renderMode === RENDER_MODE.NEXT && process.env.ENV !== 'local'
    const slug = part.config?.slug

    if (shouldLoadScripts) {
        return (
            // @ts-expect-error skyra-survey does not exist
            <skyra-survey slug={slug} consent="false" />
        )
    } else {
        return (
            <div className={'border'}>
                Skyra vil laste inn skjemaet med slug: &#34;{slug}&#34; her
            </div>
        )
    }
}
