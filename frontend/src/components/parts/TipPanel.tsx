import styles from './TipPanel.module.css'
import classNames from 'classnames'
import { BgColorClasses, Card } from '~/components/common/Card'
import { Part_Idebanken_Tip_Panel } from '~/types/generated'
import { PartData } from '~/types/graphql-types'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { HeadingView } from '~/components/parts/Heading'

export const TipPanelView = ({ part, meta }: PartData<Part_Idebanken_Tip_Panel>) => {
    const { heading, panel = [], bgColor = 'bg-extra-light-pink', reverse = false } = part.config

    const [card1, card2] = Array.isArray(panel) ? panel : [panel]

    return (
        <div className={classNames(styles.panel, bgColor)}>
            <div className={styles.heading}>
                <HeadingView level="2" size="large">
                    {heading ?? ''}
                </HeadingView>
            </div>
            <Card
                className={classNames(styles.card1, reverse && styles.reverse)}
                bgColorClass={card1?.bgColor as BgColorClasses}>
                <RichTextView
                    // @ts-expect-error data.processedHtml is not required
                    data={card1?.simpleTextEditor ?? {}}
                    meta={meta}
                    customReplacer={htmlRichTextReplacer}
                />
            </Card>
            {card2 && (
                <Card
                    className={classNames(styles.card2, card2.bgColor, reverse && styles.reverse)}
                    bgColorClass={card2?.bgColor as BgColorClasses}>
                    <RichTextView
                        // @ts-expect-error data.processedHtml is not required
                        data={card2?.simpleTextEditor ?? {}}
                        meta={meta}
                        customReplacer={htmlRichTextReplacer}
                    />
                </Card>
            )}
        </div>
    )
}
