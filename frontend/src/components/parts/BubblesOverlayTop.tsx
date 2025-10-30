import { BubblesBackgroundSvgStyle } from '~/utils/BubblesBackgroundSvgStyle'
import { MetaData } from '@enonic/nextjs-adapter'

export default function BubblesOverlayTop({ meta }: { meta: MetaData }) {
    const contentTypesWithBubbles = ['portal:site', 'idebanken:section-page']
    if (!contentTypesWithBubbles.includes(meta.type)) {
        return null
    }

    return (
        <div
            inert={true}
            className={'absolute left-0 top-0 w-full h-full pointer-events-none max-sm:mt-20'}
            style={BubblesBackgroundSvgStyle([
                { radius: 80, down: 0, left: 40, fill: 'hsl(14 100% 51% / 0.8)' },
                { radius: 80, down: 100, left: 120, fill: 'hsl(335 100% 51% / 0.3)' },
            ])}
        />
    )
}
