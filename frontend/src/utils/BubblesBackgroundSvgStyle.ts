import { forceArray } from '~/utils/utils'
import { CSSProperties } from 'react'

export const BubblesBackgroundSvgStyle = (
    circles: Array<{
        radius: number
        fill: string
        down?: number
        right?: number
        left?: number
        center?: boolean
    }>,
    viewBox: string = '0 0 1200 600',
    backgroundSize: string = 'min(1900px, 130vw) auto',
    backgroundPosition: string = 'center top'
): CSSProperties => {
    const circleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
            ${forceArray(circles).map(({ radius, down, right = 0, left, center, fill }) => {
                const c = `<circle
                    cx="${left !== undefined ? `calc(${center ? '50%' : '100%'} - ${radius}px - ${left}px)` : right !== undefined ? `calc(${center ? `50%` : `${radius}px`} + ${right}px)` : `${center ? '50%' : `0px`}`}"
                    cy="calc(${center ? '50%' : `${radius}px`} + ${down ? `${down}px` : '0px'})"
                    r="${radius}px"
                    fill="${fill}"
                />`

                if (center) {
                    console.log('circle:', c)
                }
                return c
            })}
        </svg>`

    return {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: backgroundPosition,
        backgroundSize: backgroundSize,
        backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(circleSvg)}')`,
    }
}
