import classNames from 'classnames'
import Image from 'next/image'

export default async function Page({ meta }) {
    return (
        <div className={'flex justify-center m-20'}>
            <StyledImage
                src={'/images/image.jpg'}
                alt={'#'}
                variant={'cropped'}
                showBorder={true}
                showAccent={true}
            />
        </div>
    )
}

interface StyledImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    variant?: 'normal' | 'cropped'
    showBorder?: boolean
    showAccent?: boolean
    accentColor?: 'pink' | 'red' | 'blue' | 'green'
    className?: string
}

function StyledImage({
    src,
    alt,
    width = 440,
    height = 675,
    variant = 'normal',
    showBorder = false,
    showAccent = false,
    accentColor = 'pink',
    className,
}: StyledImageProps) {
    const accentColors = {
        pink: 'bg-gradient-to-br from-pink-300 to-pink-500',
        red: 'bg-gradient-to-br from-red-400 to-red-600',
        blue: 'bg-gradient-to-br from-blue-300 to-blue-500',
        green: 'bg-gradient-to-br from-green-300 to-green-500',
    }
    const isCropped = variant === 'cropped'
    const ellipseWidth = isCropped ? width : width
    const ellipseHeight = isCropped ? height : height
    return (
        <div className={classNames('relative inline-block', className)}>
            {showBorder && (
                <div
                    className={classNames(
                        'absolute -inset-3 border-1 border-[#0000004D]',
                        isCropped ? 'rounded-full' : 'rounded-xl'
                    )}
                    style={{
                        width: ellipseWidth + 40,
                        height: ellipseHeight + 40,
                        left: -20,
                        top: -20,
                    }}
                />
            )}

            <div
                className={classNames(
                    'relative overflow-hidden',
                    isCropped ? 'rounded-full' : 'rounded-lg'
                )}
                style={{ width: ellipseWidth, height: ellipseHeight }}>
                <Image
                    src={src || '/placeholder.svg'}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {showAccent && (
                <div
                    className={classNames(
                        `absolute w-[185px] h-[185px] rounded-full -bottom-[50px] -left-[90px] opacity-50`,
                        accentColors[accentColor]
                    )}
                />
            )}
        </div>
    )
}
