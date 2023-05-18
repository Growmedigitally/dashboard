import { Divider, Select, Slider, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './directionProperty.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

function DirectionProperty({ propertyType, onChange, value }) {
    const { token } = theme.useToken();
    const [property, setProperty] = useState({ top: 1, bottom: 1, right: 1, left: 1, type: 'px' });
    const [propertyList, setPropertyList] = useState([]);
    const [commonProperty, setCommonProperty] = useState(4);

    const typesList = [
        { label: 'Top', value: 'top' },
        { label: 'Right', value: 'right' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' }
    ]

    useEffect(() => {
        setPropertyList(getOptionsList());
    }, [value])

    const getOptionsList = () => {
        const res = [];
        for (let i = 0; i <= 100; i++) {
            res.push({ label: i, value: i })
        }
        return res;
    }

    const typeList = [
        { label: 'px', value: 'px' },
        { label: '%', value: '%' }
    ]

    const onChangeValue = (from, value) => {
        const propertyCopy = { ...property };
        propertyCopy[from] = value;
        setCommonProperty(0);
        setProperty(propertyCopy);
        onChange(propertyType, `${propertyCopy.top + propertyCopy.type} ${propertyCopy.right + propertyCopy.type} ${propertyCopy.bottom + propertyCopy.type} ${propertyCopy.left + propertyCopy.type}`);
        setPropertyList(getOptionsList());
    }

    const onChangeProperty = (from, value) => {
        const propertyCopy = { ...property };
        if (from == 'type') {
            propertyCopy.type = value;
        } else {
            setCommonProperty(value);
            propertyCopy.top = value;
            propertyCopy.right = value;
            propertyCopy.bottom = value;
            propertyCopy.left = value;
        }
        setProperty({ ...propertyCopy });
        onChange(propertyType, `${propertyCopy.top + propertyCopy.type} ${propertyCopy.right + propertyCopy.type} ${propertyCopy.bottom + propertyCopy.type} ${propertyCopy.left + propertyCopy.type}`);
        setPropertyList(getOptionsList());
    }

    return (
        <div className={`${styleElementCSS.styleElementWrap}`}>
            <div className={styleElementCSS.label}>{propertyType}</div>
            <div className={`${styleElementCSS.elementWrapp} ${styles.elementOuter}`}>
                {typesList.map((type, i) => {
                    return <div key={i} className={`${styleElementCSS.styleElementWrap} ${styles.elementWrap}`}>
                        <div className={`${styleElementCSS.label}  ${styles.elementLabel}`}>{type.label} ({property[type.value]}{property.type})</div>
                        <div className={`${styleElementCSS.elementWrapp} ${styles.element}`}>
                            {/* <Select
                            showSearch
                            defaultValue={property.top}
                            style={{ width: '100px' }}
                            onChange={(value) => onChangeValue('top', value)}
                            options={propertyList}
                        /> */}
                            <Slider
                                min={0}
                                max={100}
                                className={styles.siderWrap}
                                defaultValue={1}
                                style={{ width: '100%' }}
                                railStyle={{ background: token.colorBgMask, }}
                                trackStyle={{ background: `black`, }}
                                onChange={(value) => onChangeValue(type.value, value)}
                                value={property[type.value]}
                                step={1}
                            />
                        </div>
                    </div>
                })}
                <Divider className={styles.devider} children={<div style={{ fontSize: '10px' }}>Or</div>} />
                <div className={`${styleElementCSS.styleElementWrap} ${styles.elementWrap} ${styles.commonElementWrap}`}>
                    <div className={`${styleElementCSS.label} ${styles.elementLabel}`}>Common</div>
                    <div className={`${styleElementCSS.elementWrapp} ${styles.element}`}>
                        <Select
                            showSearch
                            defaultValue={commonProperty}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeProperty('value', value)}
                            options={propertyList}
                        />
                        <Select
                            defaultValue={'px'}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeProperty('type', value)}
                            options={typeList}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DirectionProperty