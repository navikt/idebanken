import classNames from 'classnames'

export const alignmentClassNames = (
    xAlignment?: 'center' | 'right' | undefined,
    yAlignment?: 'center' | 'bottom' | undefined
) =>
    classNames(
        xAlignment || yAlignment ? 'flex' : '',
        xAlignment === 'center' ? 'justify-center text-center' : '',
        xAlignment === 'right' ? 'justify-end text-right' : '',
        yAlignment === 'center' ? 'items-center' : '',
        yAlignment === 'bottom' ? 'items-end' : ''
    )
