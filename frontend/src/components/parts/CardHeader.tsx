import classNames from 'classnames'
import { HeadingView } from './Heading'
import { headingIdOfString } from '~/utils/utils'

interface CardHeaderProps {
    prefix?: string | null
    heading?: string | null
    headingColor?: string | null
    shadow?: boolean
}

const CardHeader = ({ prefix, heading, headingColor, shadow }: CardHeaderProps) => {
    if (!heading && !prefix) return null
    return (
        <div
            id={headingIdOfString(heading)}
            className={classNames(
                'rounded-t-3xl -mt-6 md:-mt-8 -mx-6 px-6 py-4 md:py-5',
                shadow ? ' mb-10' : '',
                headingColor
            )}>
            {heading && (
                <HeadingView
                    autoId={false}
                    level="2"
                    size="large"
                    className="m-0 inline-flex items-center gap-4">
                    {prefix && (
                        <span
                            className="translate-y-[-3px] flex items-center justify-center rounded-full w-12 h-12 shrink-0 leading-none"
                            style={{
                                backgroundColor: 'var(--ax-bg-default)',
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
