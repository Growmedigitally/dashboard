import { Select } from 'antd'
import React from 'react'
import styles from './lineHeight.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

export default function LineHeight({ showLabel = true, value, onChange }) {

    const optionsList = [
        { label: '1', value: '1px' },
        { label: '3', value: '3px' },
        { label: '5', value: '5px' },
        { label: '6', value: '6px' },
        { label: '7', value: '7px' },
        { label: '8', value: '8px' },
        { label: '9', value: '9px' },
        { label: '10', value: '10px' },
        { label: '15', value: '15px' },
        { label: '20', value: '20px' },
        { label: '25', value: '25px' },
        { label: '30', value: '30px' },
        { label: '35', value: '35px' },
        { label: '40', value: '40px' },
        { label: '50', value: '50px' },
    ]

    const onChangeValue = (value) => {
        onChange('lineHeight', value)
    }

    return (
        <div className={`${styleElementCSS.styleElementWrap} ${styles.fontFamilyElementWrap}`}>
            {showLabel && <div className={`${styleElementCSS.label} ${styles.label}`}>Line Spacing</div>}
            <div className={styleElementCSS.elementWrapp}>
                <Select
                    showSearch
                    defaultValue={optionsList[0].value}
                    style={{ width: '100%' }}
                    onChange={(value) => onChangeValue(value)}
                    options={optionsList}
                />
            </div>
        </div>
    )
}
