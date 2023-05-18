import { Segmented, theme } from 'antd';
import React, { useState } from 'react'
import BackgroundColor from '../backgroundColor';
import { IoMdColorFilter } from 'react-icons/io';
import { VscColorMode } from 'react-icons/vsc';
import { BsFillImageFill } from 'react-icons/bs';
import styles from "./background.module.scss";
import GrdientColor from '../gradientColor';
import ImagePicker from '../imagePicker';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

function BackgroundElement({ onChange, value }) {
    const { token } = theme.useToken();
    const getTypeOptions = () => {
        const typeOptions = [
            { title: 'Color', icon: <IoMdColorFilter /> },
            { title: 'Gradient', icon: <VscColorMode /> },
            { title: 'Image', icon: <BsFillImageFill /> },
        ]
        return typeOptions.map((option, i) => {
            return {
                label: <div style={{ color: activeBgType == option.title ? token.colorPrimaryText : token.colorText }}
                    className={`${styles.segmentItem} ${activeBgType == option.title ? styles.active : ''}`}>
                    {/* <div className={styles.iconWrap} >
                        {option.icon}
                    </div> */}
                    <div className={styles.title} style={{ color: activeBgType == option.title ? token.colorPrimaryText : token.colorText }}>{option.title}</div>
                </div>,
                value: option.title
            }
        });
    }

    const [activeBgType, setActiveBgType] = useState('Color');

    return (
        <div className={`${styleElementCSS.styleElementWrap} ${styles.backgroundElementWrap}`}>
            <div className={styleElementCSS.label}>Background</div>
            <div className={`${styleElementCSS.elementWrapp}`}>
                <div className={styles.segmentWrap}>
                    <Segmented
                        size="small"
                        block={true}
                        value={activeBgType}
                        className={`${styles.heading} ${styles.subHeading}`}
                        onChange={(tab: any) => setActiveBgType(tab)}
                        options={getTypeOptions()}
                    />
                </div>
                <div className={styles.content}>
                    {activeBgType == 'Color' && <BackgroundColor showLabel={false} value={value} onChange={onChange} />}
                    {activeBgType == 'Gradient' && <GrdientColor showLabel={false} value={value} onChange={onChange} />}
                    {activeBgType == 'Image' && <ImagePicker />}
                </div>
            </div>
        </div>
    )
}

export default BackgroundElement