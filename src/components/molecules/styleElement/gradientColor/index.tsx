import { Popover, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import ColorPickerComponent from '../colorPicker';
import styles from './gradientColor.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import getBackground from '@util/getBackgroundStyle';
import Gradients from './gradients';
import { MdOutlineClose, MdAdd } from 'react-icons/md'
import { BACKGROUND_TYPES } from '@constant/common';
import { getGradientValue } from '@util/utils';

const gradientDirectionsList = [
    { value: 'to right', label: 'Right' },
    { value: 'to right bottom', label: 'Right Bottom' },
    { value: 'to right top', label: 'Right Top' },
    { value: 'to left', label: 'Left' },
    { value: 'to left bottom', label: 'Left Bottom' },
    { value: 'to left top', label: 'Left Top' },
    { value: 'to bottom', label: 'Bottom' },
    { value: 'to top', label: 'Top' },
]

const valueSample = {
    value: 'linear-gradient(to right, #fff, #000)',
    type: 'Gradient',
    direction: 'to right',
    colors: [{ color: '#000', format: 'hex' }]
}

function GradientColor({ value, onChange }) {

    const [showGradientsList, setShowGradientsList] = useState(false);

    const onSelectGradient = (selectedConfig) => {
        setShowGradientsList(false);
        const colors = selectedConfig.colors.map(c => { return { color: c, format: 'hex' } })
        const gradientObj = {
            value: getGradientValue(colors),
            type: 'Gradient',
            direction: 'to right',
            colors
        }
        onChange(gradientObj);
    }

    const onChangeColor = (index, newColor) => {
        const valueCopy = { ...value };
        const colorsCopy = [...valueCopy.colors];
        colorsCopy[index] = newColor;
        valueCopy.colors = colorsCopy;
        valueCopy.value = getGradientValue(valueCopy.colors, valueCopy.direction);
        onChange(valueCopy);
    }

    const onChangeDirection = (direction) => {
        const valueCopy = { ...value };
        valueCopy.direction = direction;
        const colorsCopy = [...valueCopy.colors];
        valueCopy.colors = colorsCopy;
        valueCopy.value = getGradientValue(valueCopy.colors, valueCopy.direction);
        onChange(valueCopy);
    }

    const removeColor = (colorIndex) => {
        const valueCopy = { ...value };
        const colorsCopy = [...valueCopy.colors];
        colorsCopy.splice(colorIndex, 1);
        valueCopy.colors = colorsCopy;
        valueCopy.value = getGradientValue(valueCopy.colors, valueCopy.direction);
        onChange(valueCopy);
    }

    const onAddColor = () => {
        const valueCopy = { ...value };
        const colorsCopy = [...valueCopy.colors];
        colorsCopy.push({ color: '#0a192f', format: 'hex' })
        valueCopy.colors = colorsCopy;
        valueCopy.value = getGradientValue(valueCopy.colors, valueCopy.direction);
        onChange(valueCopy);
    }

    return (
        <div className={`${styleElementCSS.styleElementWrap} ${styles.gradientColorWrap}`}>
            {/* {showLabel && <div className={styleElementCSS.label}>Gradient Color</div>} */}
            <div className={styles.elementWrapp}>
                <div className={styles.colorWrap} style={{ ...getBackground(value) }}></div>
                <div className={styles.actionWrap}>
                    <div className={styles.colorPicker}>
                        {value.colors.map((colorData, cIndex) => {
                            return <div className={`${styles.colorItemWrap}`} key={cIndex}>
                                {value.colors.length > 2 && <div className={styles.iconWrap} onClick={() => removeColor(cIndex)}>
                                    <MdOutlineClose />
                                </div>}
                                <ColorPickerComponent
                                    hideColorString
                                    hideTransparency
                                    page={BACKGROUND_TYPES.GRADIENT}
                                    value={colorData}
                                    onChange={(value) => onChangeColor(cIndex, value)}
                                    parentStyles={{ width: "auto", margin: 'unset' }}
                                />
                            </div>
                        })}
                        {value.colors.length <= 6 && <div className={`${styles.colorItemWrap} ${styles.addColor}`} onClick={onAddColor}>
                            <MdAdd />
                        </div>}
                    </div>
                    <div className={styles.positionWrap}>
                        <Select
                            showSearch
                            defaultValue={gradientDirectionsList[0].value}
                            style={{ width: 160 }}
                            onChange={(value) => onChangeDirection(value)}
                            options={gradientDirectionsList}
                        />
                    </div>
                    <Popover
                        // open={showGradientsList}
                        content={<Gradients onSelect={(value) => onSelectGradient(value)} />}
                        title={<div className={styles.popoverTitle}>
                            Colorful Gradients Pallets
                            <div className={`${styles.iconWrap}`} onClick={() => setShowGradientsList(false)}>
                                <MdOutlineClose />
                            </div>
                        </div>}
                        placement="left"
                        trigger="hover"
                        overlayInnerStyle={{ padding: '0px' }}
                    >
                        <div className={`${styles.exploreWrap} ${showGradientsList ? styles.active : ''}`}
                            onMouseEnter={() => setShowGradientsList(true)}
                        // onMouseLeave={() => setShowGradientsList(false)}
                        >
                            Explore More
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default GradientColor