import classNames from 'classnames'
import { HeadingView } from './Heading'

interface CardHeaderProps {
    prefix?: string | null
    heading?: string | null
    headingColor?: string | null
}

const CardHeader = ({ prefix, heading, headingColor }: CardHeaderProps) => {
    if (!heading && !prefix) return null
    return (
        <div
            className={classNames(
                'rounded-t-3xl -mt-6 md:-mt-8 -mx-6 px-6 py-4 md:py-5 mb-10',
                headingColor
            )}>
            {heading && (
                <HeadingView
                    id={heading}
                    level="2"
                    size="large"
                    className="m-0 inline-flex items-center gap-4">
                    {prefix && (
                        <span
                            className="translate-y-[-3px] flex items-center justify-center rounded-full w-12 h-12 shrink-0 leading-none"
                            style={{
                                backgroundColor: 'var(--ib-prefix-bg, var(--ib-pink-200))',
                            }}>
                            <span className="translate-y-[2px]">{prefix}</span>
                        </span>
                    )}
                    <span className="leading-tight">{heading}</span>
                </HeadingView>
            )}
        </div>
    )
}

export default CardHeader
export type { CardHeaderProps }
