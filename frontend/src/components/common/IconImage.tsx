import Image from 'next/image'

type IconImageConfig = {
    icon: {
        altText?: string
        caption?: string
        url: string
    }
}

export const IconImage = ({ config }: { config: IconImageConfig }) => (
    <Image
        src={config.icon.url}
        alt={config.icon.altText ?? config.icon.caption ?? 'Ikon for fremhevet boks'}
        width={36}
        height={36}
        role="presentation"
        className={[
            'block h-auto w-11 filter',
            /\.svg(\?.*)?$/i.test(config.icon.url)
                ? 'dark:invert dark:brightness-0 dark:contrast-50'
                : '',
        ].join(' ')}
    />
)
