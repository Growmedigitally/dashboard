import { BUILDER_DEFAULT_COLORS } from '@constant/builder';
import { ColorPicker, theme } from 'antd';
import type { Color, ColorPickerProps } from 'antd/es/color-picker';
import React, { useEffect, useMemo, useState } from 'react';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import styles from './colorPicker.module.scss'
import { BACKGROUND_TYPES, NO_COLOR_VALUE } from '@constant/common';
import { getSiteConfig } from '@reduxStore/slices/siteConfig';
import { useAppSelector } from '@hook/useAppSelector';
import { removeObjRef } from '@util/utils';

const valueSample = [{ color: '#000', format: 'hex' }];

function ColorPickerComponent({ page = '', hideColorString = false, hidePresets = false, value, onChange, label = '', hideTransparency = false, parentStyles = {} }) {


    const { token } = theme.useToken();
    const [activeColor, setActiveColor] = useState<Color | string>(value.color);
    const [activeColorFormat, setActiveColorFormat] = useState<ColorPickerProps['format']>(value.format);
    const siteConfig = useAppSelector(getSiteConfig);
    const [colorPresets, setColorPresets] = useState([])

    useEffect(() => {
        if (page == BACKGROUND_TYPES.GRADIENT) {
            setActiveColor(value.color);
        }
    }, [value])


    useEffect(() => {
        siteConfig && setColorPresets(removeObjRef(siteConfig.colors))
    }, [siteConfig])

    const onClickTransparency = () => {
        onChange({ color: NO_COLOR_VALUE, format: 'hex' })
    }

    const colorString = useMemo(
        () => (typeof activeColor === 'string' ? activeColor : activeColor.toHexString()),
        [activeColor],
    );

    useEffect(() => {
        onChange({
            color: colorString,
            format: activeColorFormat
        })
    }, [colorString])

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.colorPickerWrap}`} style={{ ...parentStyles }}>
            {label && <div className={styleElementCSS.label}>{label}</div>}
            <div className={styles.elementWrap}>
                <ColorPicker
                    trigger="hover"
                    presets={!hidePresets ? [...colorPresets] : []}
                    format={activeColorFormat}
                    value={activeColor}
                    onChange={setActiveColor}
                    onFormatChange={setActiveColorFormat}
                />
                {!hideColorString && <div className={styles.colorValue}>
                    {colorString}
                </div>}
                {!hideTransparency && <div className={`${styles.transparentWrap} ${value.color == NO_COLOR_VALUE ? styles.noColor : ''}`} onClick={onClickTransparency}>
                    Unset
                </div>}
            </div>
        </div>
    )
}

export default ColorPickerComponent