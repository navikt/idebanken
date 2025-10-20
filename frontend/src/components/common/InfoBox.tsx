import { Info } from '~/components/icons/Info'
import type { PropsWithChildren } from 'react'

interface InfoBoxProps extends PropsWithChildren {
    bgColorClass?: string
}

export const InfoBox = ({ children, bgColorClass = 'bg-extra-light-pink' }: InfoBoxProps) => {
    return (
        <div
            style={{
                filter: 'drop-shadow(0px 24px 44px rgba(88, 84, 106, 0.30))',
            }}
            className="
				relative
				pt-4 pr-4
				flex-1
			">
            <div
                className="
					bg-dark-blue-500
					h-16 w-16
					rounded-full
					absolute
					top-0 right-0
					z-1
					flex justify-center items-center
				">
                <Info />
            </div>
            <div
                style={{
                    mask: 'radial-gradient(circle 1px at calc(100% - 16px) calc(0% + 16px), transparent 39px, purple 0)',
                }}
                className={`
					${bgColorClass}
					py-16 px-[1.5rem]
					rounded-[72px]
				`}>
                {children}
            </div>
        </div>
    )
}
