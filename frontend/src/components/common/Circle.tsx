import classNames from 'classnames'

/**
 * Needs to be used inside a relative parent element.
 */
export const Circle = ({
    diameter = 230,
    bottom,
    left,
    top,
    right,
    zIndex,
    opacity,
    ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
    diameter?: number
    bottom?: number
    left?: number
    top?: number
    right?: number
    zIndex?: number
    opacity?: number
}) => {
    return (
        <div
            style={{
                width: `${diameter}px`,
                height: `${diameter}px`,
                bottom: bottom !== undefined ? `${Math.max(bottom, 0)}px` : undefined,
                left: left !== undefined ? `${left}px` : undefined,
                top: top !== undefined ? `${top}px` : undefined,
                right: right !== undefined ? `${Math.max(right, 0)}px` : undefined,
                zIndex,
                opacity,
            }}
            {...rest}
            inert={true}
            aria-hidden={true}
            className={classNames(`absolute rounded-full max-md:hidden`, rest.className ?? '')}
        />
    )
}
