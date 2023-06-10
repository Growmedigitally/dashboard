import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './fontSize.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { Empty } from 'antd';

function FontSize({ showLabel = true, value, onChange }) {

    const [optionsList, setOptionsList] = useState([])

    useEffect(() => {
        const res = [];
        for (let i = 1; i <= 100; i++) {
            res.push({ label: i, value: i })
        }
        setOptionsList(res);
    }, [value])

    const onChangeValue = (value) => {
        onChange('fontSize', value)
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.fontSizeElementWrap}`}>
            {showLabel && <div className={`${styleElementCSS.label} ${styles.label}`}>Font Size</div>}
            <div className={styleElementCSS.elementWrapp}>
                <Select
                    // notFoundContent={<Empty description=""/>}
                    showSearch
                    defaultValue={12}
                    style={{ width: '100%' }}
                    onChange={(value) => onChangeValue(value)}
                    options={optionsList}
                />
            </div>
        </div>
    )
}

export default FontSize;
