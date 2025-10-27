import { forceArray } from '~/utils/utils'
import { CSSProperties } from 'react'

export const BubblesBackgroundSvgStyle = (
    circles: Array<{
        radius: number
        down: number
        right?: number
        left?: number
        fill: string
    }>
): CSSProperties => {
    const circleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
            ${forceArray(circles)
                .filter(({ right, left }) => right !== undefined || left !== undefined)
                .map(
                    ({ radius, down, right, left, fill }) =>
                        `<circle
                    cx="${left !== undefined ? `calc(100% - ${radius}px - ${left}px)` : `calc(${radius}px + ${right}px)`}"
                    cy="calc(${radius}px + ${down}px)"
                    r="${radius}px"
                    fill="${fill}"
                />`
                )}
        </svg>`

    return {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'min(1900px, 130vw) auto',
        backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(circleSvg)}')`,
    }
}
