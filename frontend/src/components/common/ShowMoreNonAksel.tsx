'use client'

import React, { forwardRef, useMemo, useRef, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons'
import { Button, HeadingProps, useId } from '@navikt/ds-react'

import './ShowMore.styles.css'
import { HeadingView } from '~/components/parts/Heading'
import classNames from 'classnames'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'

type PossibleRef<T> = React.Ref<T> | undefined
function mergeRefs<T>(refs: PossibleRef<T>[]): React.RefCallback<T> {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value)
            } else if (ref && 'current' in ref) {
                ;(ref as React.MutableRefObject<T | null>).current = value
            }
        })
    }
}
export type ShowMoreRef = {
    isOpen: boolean
    toggleOpen: () => void
    scrollTo: () => void
    focus: () => void
}

export interface ShowMoreProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
    /**
     * Override what element to render the wrapper as.
     *
     * @default aside
     */
    as?: 'aside' | 'section'
    /**
     * Content. Is [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) when collapsed.
     */
    children: React.ReactNode
    /**
     * Changes button size
     *
     * @default medium
     */
    size?: 'medium' | 'small'
    /**
     * Changes background color
     *
     * @default default
     */
    variant?: 'default'
    /**
     * Custom height of content when collapsed.
     *
     * @default 10rem
     */
    collapsedHeight?: `${number}${string}` | number
    /**
     * Heading text. Always available to screen readers.
     * Used as accessible label unless you define `aria-label` or `aria-labelledby`.
     */
    heading?: string
    /**
     * Heading size
     *
     * @default medium
     */
    headingSize?: HeadingProps['size']
    /**
     * Heading level
     *
     * @default "1"
     */
    headingLevel?: HeadingProps['level']
    /**
     * Scroll back up to the component after collapsing.
     *
     * @default true
     */
    scrollBackOnCollapse?: boolean
    /**
     * Navn på på innhold.
     * Brukes til logging i Umami
     */
    name: string
}

/**
 * A component for partially hiding less important content.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/show-more)
 * @see 🏷️ {@link ShowMoreProps}
 *
 * @example
 * <ShowMore heading="Facts about toads">
 *   Toads have dry, leathery skin, short legs, and large bumps covering the parotoid glands.
 * </ShowMore>
 */
export const ShowMoreNonAksel = forwardRef<ShowMoreRef, ShowMoreProps>(
    (
        {
            as: Component = 'aside',
            children,
            size = 'medium',
            variant = 'default',
            collapsedHeight = '10rem',
            heading,
            headingSize = 'medium',
            headingLevel = '1',
            scrollBackOnCollapse = true,
            className,
            name,
            'aria-labelledby': ariaLabelledby,
            ...rest
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false)
        const localRef = useRef<HTMLElement>(null)
        const scrollTo = () => {
            const SCROLL_OFFSET = 55
            if (!localRef?.current) return
            window.scrollBy({
                top: localRef.current.getBoundingClientRect().top - SCROLL_OFFSET,
                behavior: 'smooth',
            })
        }
        const focus = () => {
            localRef.current?.focus()
            scrollTo()
            if (!isOpen) {
                toggleOpen()
            }
        }
        const toggleOpen = () => {
            if (isOpen) {
                void umami(AnalyticsEvents.SHOW_MORE_COLLAPSE, { tittel: name })
                setIsOpen(false)
                if (scrollBackOnCollapse) {
                    scrollTo()
                }
            } else {
                void umami(AnalyticsEvents.SHOW_MORE_EXPAND, { tittel: name })
                setIsOpen(true)
            }
        }

        const ariaLabelId = useId()

        const ChevronIcon = isOpen ? ChevronUpIcon : ChevronDownIcon

        // For å kunne bruke ref fra utsiden
        React.useImperativeHandle(ref, () => ({
            isOpen,
            toggleOpen,
            scrollTo,
            focus,
        }))

        const mergedRef = useMemo(
            () => mergeRefs<HTMLElement | ShowMoreRef>([localRef, ref]),
            [ref]
        )

        return (
            <Component
                ref={mergedRef}
                className={classNames('navds-show-more', `navds-show-more--${variant}`, className, {
                    'navds-show-more--closed': !isOpen,
                })}
                aria-labelledby={
                    !ariaLabelledby && !rest['aria-label'] ? ariaLabelId : ariaLabelledby
                }
                {...rest}>
                {heading && (
                    <HeadingView size={headingSize} level={headingLevel} id={ariaLabelId}>
                        {heading}
                    </HeadingView>
                )}

                <div className="navds-show-more__button-section">
                    <Button
                        data-testid="showmore-button"
                        type="button"
                        variant="secondary-neutral"
                        className="navds-show-more__button bg-(--ib-brand-white)"
                        icon={<ChevronIcon aria-hidden />}
                        iconPosition="right"
                        size={size}
                        onClick={toggleOpen}>
                        {isOpen ? 'Vis mindre' : 'Vis mer'}
                    </Button>
                </div>

                <div
                    className={classNames(
                        'navds-show-more__content',
                        'transition-all duration-200 ease-in-out overflow-hidden'
                    )}
                    style={isOpen ? {} : { height: collapsedHeight }}
                    inert={isOpen ? undefined : true}>
                    {children}
                </div>
            </Component>
        )
    }
)
ShowMoreNonAksel.displayName = 'ShowMore'

export default ShowMoreNonAksel
