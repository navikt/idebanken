import type { LayoutProps } from '@enonic/nextjs-adapter';
import { RegionView } from '@enonic/nextjs-adapter/views/Region';
import styles from './PanelLayoutTwoColumn.module.css';
import classNames from 'classnames';

const PanelLayoutTwoColumn = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const { common, meta, layout } = props;

    const [ bg1, bg2 ] = layout.config?.background || [];

    return (
        <div 
            className={bg1?.bgColor || 'bg-extra-light-pink'}
            style={{ [`--left-span`]: Number(layout.config?.leftSpan || 6) + 1 } as React.CSSProperties}
        >
            <div className={styles.wrapper}>
                <div className={classNames(styles.panel, bg2?.bgColor || 'bg-extra-light-pink')}>
                    <div className={styles.left}>
                        <RegionView name="left" components={regions['left']?.components} common={common} meta={meta}/>
                    </div>
                    <div className={styles.right}>
                        <RegionView name="right" components={regions['right']?.components} common={common} meta={meta}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanelLayoutTwoColumn;