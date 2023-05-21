import { Segmented, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import BackgroundColor from '../backgroundColor';
import { IoMdColorFilter } from 'react-icons/io';
import { VscColorMode } from 'react-icons/vsc';
import { BsFillImageFill } from 'react-icons/bs';
import styles from "./backgroundElement.module.scss";
import GradientColor from '../gradientColor';
import ImagePicker from '../imagePicker';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { BACKGROUND_TYPES } from '@constant/common';
import { COLOR_INITIAL_VALUE, GRADIENT_INITIAL_VALUE, IMAGE_INITIAL_VALUE } from 'src/data/backgroundValues';

const typeOptions = [
    { title: BACKGROUND_TYPES.COLOR, icon: <IoMdColorFilter /> },
    { title: BACKGROUND_TYPES.GRADIENT, icon: <VscColorMode /> },
    { title: BACKGROUND_TYPES.IMAGE, icon: <BsFillImageFill /> },
]

const valueSample = {
    value: '#000',
    type: 'Color',
    colors: [{ color: '#000', format: 'hex' }]
}
function BackgroundElement({ onChange, value }) {
    const { token } = theme.useToken();

    const getTypeOptions = () => {
        return typeOptions.map((option, i) => {
            return {
                label: <div style={{ color: value?.type == option.title ? token.colorPrimaryText : token.colorText }}
                    className={`${styles.segmentItem} ${value?.type == option.title ? styles.active : ''}`}>
                    <div className={styles.title} style={{ color: value?.type == option.title ? token.colorPrimaryText : token.colorText }}>{option.title}</div>
                </div>,
                value: option.title
            }
        });
    }

    const onChangeBgColor = (newColor) => {
        const valueCopy = { ...value };
        const colorsCopy = [...valueCopy.colors];
        colorsCopy[0] = newColor;
        valueCopy.value = newColor.color;
        valueCopy.colors = colorsCopy;
        onChange(valueCopy);
    }

    const onChangeType = (type) => {
        if (type == BACKGROUND_TYPES.COLOR) {
            onChange(COLOR_INITIAL_VALUE);
        } else if (type == BACKGROUND_TYPES.GRADIENT) {
            onChange(GRADIENT_INITIAL_VALUE);
        } else {
            onChange(IMAGE_INITIAL_VALUE);
        }
    }

    return (
        <div className={`${styleElementCSS.styleElementWrap} ${styles.backgroundElementWrap}`}>
            <div className={styleElementCSS.label}>Background</div>
            <div className={`${styleElementCSS.elementWrapp}`}>
                <div className={styles.segmentWrap}>
                    <Segmented
                        size="small"
                        block={true}
                        value={value?.type}
                        className={`${styles.heading} ${styles.subHeading}`}
                        onChange={(tab: any) => onChangeType(tab)}
                        options={getTypeOptions()}
                    />
                </div>
                <div className={styles.content}>
                    {value?.type == BACKGROUND_TYPES.COLOR && <BackgroundColor value={value?.colors[0]} onChange={(newColor) => onChangeBgColor(newColor)} />}
                    {value?.type == BACKGROUND_TYPES.GRADIENT && <GradientColor value={value} onChange={onChange} />}
                    {value?.type == BACKGROUND_TYPES.IMAGE && <ImagePicker />}
                </div>
            </div>
        </div>
    )
}

export default BackgroundElement;