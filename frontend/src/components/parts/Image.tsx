import { ImageData } from 'types/valibot/parts'

export const ImageView = (props: ImageData) => {
    const { part } = props
    const { image } = part.config

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.imageUrl} alt={image.data.altText || 'Bilde'} />
    )
}
