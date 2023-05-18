import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './border.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import ColorPicker from '../colorPicker';
import { BORDER } from '@constant/editorStylesProperties';

function Border({ onChange, value }) {

    const [border, setBorder] = useState({ size: '1px', type: 'solid', color: 'transparent' });

    const sizeList = [
        { label: '1', value: '1px' },
        { label: '3', value: '3px' },
        { label: '5', value: '5px' },
        { label: '6', value: '6px' },
        { label: '7', value: '7px' },
        { label: '8', value: '8px' },
        { label: '9', value: '9px' },
        { label: '10', value: '10px' }
    ]

    const typeList = [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' }
    ]

    const onChangeValue = (from, value) => {
        const borderCopy = { ...border };
        borderCopy[from] = value;
        setBorder(borderCopy);
        onChange(BORDER, `${borderCopy.size || '1px'} ${borderCopy.type || 'solid'} ${borderCopy.color || 'black'}`)
    }

    return (
        <div className={`${styleElementCSS.styleElementWrap} ${styles.borderWrap}`}>
            <div className={styleElementCSS.label}>Border</div>

            <div className={`${styleElementCSS.elementWrapp} ${styles.elementWrapp}`}>
                <div className={`${styleElementCSS.styleElementWrap} ${styles.borderItemWrap}`}>
                    <div className={styleElementCSS.label}>Size</div>
                    <div className={styleElementCSS.elementWrapp}>
                        <Select
                            showSearch
                            defaultValue={sizeList[0].value}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeValue('size', value)}
                            options={sizeList}
                        />
                    </div>
                </div>
                <div className={`${styleElementCSS.styleElementWrap} ${styles.borderItemWrap}`}>
                    <div className={styleElementCSS.label}>Type</div>
                    <div className={styleElementCSS.elementWrapp}>
                        <Select
                            defaultValue={typeList[0].value}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeValue('type', value)}
                            options={typeList}
                        />
                    </div>
                </div>
            </div>

            <div className={`${styleElementCSS.elementWrapp} ${styles.elementWrapp}`}>
                <div className={`${styleElementCSS.subStyleElementWrap}`}>
                    <ColorPicker label='Color' value={border.color} onChange={(value) => onChangeValue('color', value)} />
                </div>
            </div>
        </div>
    )
}

export default Border