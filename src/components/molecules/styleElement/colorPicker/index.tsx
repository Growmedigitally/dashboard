import { BUILDER_DEFAULT_COLORS } from '@constant/builder';
import { ColorPicker, theme } from 'antd';
import type { Color, ColorPickerProps } from 'antd/es/color-picker';
import React, { useEffect, useMemo, useState } from 'react';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import styles from './colorPicker.module.scss'
import { RxTransparencyGrid } from 'react-icons/rx';


function ColorPickerComponent({ value, onChange, closeOnSelect = false, label = '', hideTransparency = false }) {
    const { token } = theme.useToken();
    const [activeColor, setActiveColor] = useState<Color | string>(value);
    const [activeColorFormat, setactiveColorFormat] = useState<ColorPickerProps['format']>('hex');

    const [colorHex, setColorHex] = useState<Color | string>('#1677ff');
    const [colorHsb, setColorHsb] = useState<Color | string>('hsb(215, 91%, 100%)');
    const [colorRgb, setColorRgb] = useState<Color | string>('rgb(22, 119, 255)');

    //color format
    const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');
    const [formatHsb, setFormatHsb] = useState<ColorPickerProps['format']>('hsb');
    const [formatRgb, setFormatRgb] = useState<ColorPickerProps['format']>('rgb');

    const hexString = useMemo(() => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()), [colorHex],);

    const hsbString = useMemo(() => (typeof colorHsb === 'string' ? colorHsb : colorHsb.toHsbString()), [colorHsb],);

    const rgbString = useMemo(() => (typeof colorRgb === 'string' ? colorRgb : colorRgb.toRgbString()), [colorRgb],);

    useEffect(() => {
        console.log("value", value)
        setActiveColor(value);
        if (value?.includes('#')) {
            setactiveColorFormat('hex');
        } else if (value?.includes('hsb')) {
            setactiveColorFormat('hsb');
        } else if (value?.includes('rgb')) {
            setactiveColorFormat('rgb');
        }
    }, [value])

    const getColor = (value) => {
        let color = '';
        console.log("activeColorFormat", activeColorFormat)
        switch (activeColorFormat) {
            case 'hex':
                color = (typeof value === 'string' ? value : value.toHexString());
                break;
            case 'hsb':
                color = (typeof value === 'string' ? value : value.toHsbString());
                break;
            case 'rgb':
                color = (typeof value === 'string' ? value : value.toRgbString());
                break;
            default:
                break;
        }
        console.log("color", color)
        return color;
    }
    const handleChange = (color) => {
        setActiveColor(color);
        console.log("getColor(color)", getColor(color))
        onChange(getColor(color));
    };

    const onClickTransparency = () => {
        onChange('transparent');
        // setActiveColor({ ...activeColor, a: value })
    }

    return (

        <>

            <div className={`${styleElementCSS.styleElementWrap} ${styles.colorPickerWrap}`}>
                {label && <div className={styleElementCSS.label}>{label}</div>}
                <div className={styles.elementWrap}>
                    <ColorPicker
                        trigger="hover"
                        presets={BUILDER_DEFAULT_COLORS}
                        format={activeColorFormat}
                        value={activeColor}
                        onChange={handleChange}
                        onFormatChange={setactiveColorFormat}
                    // defaultValue={token.colorPrimary}
                    // allowClear

                    // format={formatHsb}
                    // value={colorHsb}
                    // onChange={setColorHsb}
                    // onFormatChange={setFormatHsb}

                    // format={formatRgb}
                    // value={colorRgb}
                    // onChange={setColorRgb}
                    // onFormatChange={setFormatRgb}
                    />
                    {!hideTransparency && <div className={`${styles.transparentWrap}`} style={{ borderColor: value == 'transparent' ? token.colorPrimary : 'darkgray' }} onClick={onClickTransparency}>
                        {/* <RxTransparencyGrid /> */}
                        No Color
                    </div>}
                </div>
            </div>
        </>
    )
}

export default ColorPickerComponent