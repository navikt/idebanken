import { BubblesBackgroundSvgStyle } from '~/utils/BubblesBackgroundSvgStyle'
import { MetaData } from '@enonic/nextjs-adapter'

export default function BubblesOverlayTop({ meta }: { meta: MetaData }) {
    const contentTypesWithBubbles = ['portal:site']
    if (!contentTypesWithBubbles.includes(meta.type)) {
        return null
    }

    const orange = 'hsla(14, 100%, 50%, 0.25)'
    const pink = 'hsla(337, 100%, 81%, 0.25)'

    return (
        <div
            inert={true}
            className={'absolute left-0 top-20 sm:top-0 w-full h-full pointer-events-none'}
            style={BubblesBackgroundSvgStyle(
                [
                    { radius: 180, down: -140, left: 120, fill: pink },
                    { radius: 20, down: 230, left: 360, fill: pink },
                    { radius: 120, down: 120, left: 90, fill: orange },
                    { radius: 20, down: 200, right: 370, fill: pink },
                    { radius: 180, down: -20, right: 0, fill: pink },
                    { radius: 120, down: -50, right: 230, fill: orange },
                ],
                '0 0 1600 600'
            )}
        />
    )
}
