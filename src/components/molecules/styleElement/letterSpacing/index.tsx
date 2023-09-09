import { Select } from 'antd'
import React, { useState } from 'react'
import styles from './letterSpacing.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

export default function LetterSpacing({ optionsList = null, showLabel = true, value, onChange, style = {} }) {

    const defaultOptions = [
        { label: '0', value: '0px' },
        { label: '0.5', value: '0.5px' },
        { label: '1', value: '1px' },
        { label: '1.5', value: '1.5px' },
        { label: '2', value: '2px' },
        { label: '2.5', value: '2.5px' },
        { label: '3', value: '3px' },
        { label: '3.5', value: '3.5px' },
        { label: '4', value: '4px' },
        { label: '4.5', value: '4.5px' },
        { label: '5', value: '5px' },
        { label: '5.5', value: '5.5px' },
        { label: '6', value: '6px' },
        { label: '6.5', value: '6.5px' },
        { label: '7', value: '7px' },
        { label: '7.5', value: '7.5px' },
        { label: '8', value: '8px' },
    ]
    const [options, setOptions] = useState(optionsList || defaultOptions)

    const onChangeValue = (value) => {
        onChange('letterSpacing', value)
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.fontFamilyElementWrap}`} style={style}>
            {showLabel && <div className={`${styleElementCSS.label} ${styles.label}`}>Letter Spacing</div>}
            <div className={styleElementCSS.elementWrap}>
                <Select
                    showSearch
                    defaultValue={options[0].value}
                    value={value}
                    style={{ width: '100%' }}
                    onChange={(value) => onChangeValue(value)}
                    options={options}
                />
            </div>
        </div>
    )
}
