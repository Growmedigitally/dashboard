import { Select } from 'antd';
import React, { useState } from 'react'
import ColorPicker from '../colorPicker';
import styles from './gradientColor.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

function GradientColor({ showLabel = true, value, onChange }) {
    const gradientDirectionsList = [
        { value: 'right', label: 'Right' },
        { value: 'right bottom', label: 'Right Bottom' },
        { value: 'right top', label: 'Right Top' },
        { value: 'left', label: 'Left' },
        { value: 'left bottom', label: 'Left Bottom' },
        { value: 'left top', label: 'Left Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'top', label: 'Top' },
    ]
    const [gradientProps, setGradientProps] = useState({
        direction: gradientDirectionsList[0].value,
        fromColor: '#fff',
        toColor: '#000',
        gradientValue: `linear-gradient(to ${gradientDirectionsList[0].value}, #fff, #000)`,
    })

    const onChangeProps = (from, value) => {
        const gradientPropsCopy = { ...gradientProps };
        gradientPropsCopy[from] = value;
        gradientPropsCopy.gradientValue = `linear-gradient(to ${gradientPropsCopy.direction}, ${gradientPropsCopy.fromColor}, ${gradientPropsCopy.toColor})`
        onChange(gradientPropsCopy.gradientValue);
        setGradientProps({ ...gradientPropsCopy });
    }

    return (
        <div className={`${styleElementCSS.styleElementWrap} ${styles.gradientColorWrap}`}>
            {showLabel && <div className={styleElementCSS.label}>Gradient Color</div>}
            <div className={styles.elementWrapp}>
                <div className={styles.colorWrap} style={{
                    background: gradientProps.gradientValue
                }}>

                </div>
                <div className={styles.actionWrap}>
                    <div className={styles.colorPicker}>
                        <ColorPicker hideTransparency closeOnSelect={true} disableAlpha={true} value={gradientProps.fromColor} onChange={(value) => onChangeProps('fromColor', value)} />
                        <ColorPicker hideTransparency closeOnSelect={true} disableAlpha={true} value={gradientProps.toColor} onChange={(value) => onChangeProps('toColor', value)} />
                    </div>
                    <div className={styles.positionWrap}>
                        <Select
                            showSearch
                            defaultValue={gradientDirectionsList[0].value}
                            style={{ width: 130 }}
                            onChange={(value) => onChangeProps('direction', value)}
                            options={gradientDirectionsList}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GradientColor