import { Select } from 'antd'
import React from 'react'
import styles from './fontFamily.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

export default function FontFamily({ showLabel = true, value, onChange }) {

    const optionsList = [
        { label: 'Poppins', value: 'Poppins' },
        { label: 'Abuget', value: 'Abuget' },
        { label: 'AlexisMarie', value: 'AlexisMarie' },
        { label: 'Allura', value: 'Allura' },
        { label: 'Antonio', value: 'Antonio' },
        { label: 'ArgoFlats', value: 'ArgoFlats' },
        { label: 'Bakery', value: 'bakery' },
        { label: 'Blackjack', value: 'Blackjack' },
        { label: 'Claredon', value: 'Claredon' },
        { label: 'Domaine', value: 'Domaine' },
        { label: 'Enchanting', value: 'Enchanting' },
        { label: 'Fontspring', value: 'Fontspring' },
        { label: 'Gothic', value: 'Gothic' },
        { label: 'Lhandw', value: 'Lhandw' },
        { label: 'Manta', value: 'Manta' },
        { label: 'Mvboli', value: 'Mvboli' },
        { label: 'Philosopher', value: 'Philosopher' },
        { label: 'Thunder', value: 'Thunder' },
        { label: 'Wayfarer', value: 'Wayfarer' }
    ]

    const onChangeValue = (value) => {
        onChange('fontFamily', value)
    }

    return (
        <div className={`styleElement ${styleElementCSS.styleWrap} ${styles.fontFamilyElementWrap}`}>
            {showLabel && <div className={`${styleElementCSS.label} ${styles.label}`}>Font Family</div>}
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
