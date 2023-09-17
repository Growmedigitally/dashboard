import { Segmented, Slider, theme, Tooltip } from 'antd'
import React from 'react'
import styles from './segmentComponent.module.scss';

export const SEGMENT_OPTIONS_TYPES = {
    ARRAY: 'ARRAY',
    ARRAY_OF_OBJECTS: 'ARRAY_OF_OBJECTS'
}

type SizeType = 'small' | 'middle' | 'large';

const MIDDLE_SIZE: SizeType = "middle"

const SegmentComponent = ({ label, value, onChange, options, type, size = MIDDLE_SIZE, showIcon = false, entity = "" }) => {
    const { token } = theme.useToken();

    const getSegmentOptions = () => {
        if (type == SEGMENT_OPTIONS_TYPES.ARRAY) {
            return options.map((option) => {
                return {
                    label:
                        <Tooltip title={`${option} ${entity}`}>
                            <div style={{ color: value == option.value ? token.colorBgBase : token.colorTextBase }}
                                className={`${styles.segmentItem} ${value == option.value ? styles.active : ''}`}>
                                <div className={styles.name}>{option}</div>
                            </div>
                        </Tooltip>,
                    value: option
                }
            })

        } else return options.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} ${entity}`}>
                        <div style={{ color: value == option.value ? token.colorBgBase : token.colorTextBase }}
                            className={`${styles.segmentItem} ${value == option.value ? styles.active : ''}`}>
                            {showIcon && <div className={styles.iconWrap} style={{
                                backgroundColor: value == option.key ? token.colorPrimaryBorderHover : token.colorBgBase,
                                color: value == option.key ? token.colorBgBase : token.colorTextBase
                            }}>
                                {option.icon}
                            </div>}
                            <div className={styles.name} style={{ color: token.colorTextBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }
    return (
        <div className={`${styles.segmentComponentWrap}`} style={{ color: token.colorTextBase }}>
            {label && <div className={`${styles.label}`}>{label}</div>}
            <div className={`${styles.segmentWrap}`}>
                <Segmented
                    value={value}
                    style={{ background: token.colorBorder }}
                    size={size}
                    block={true}
                    defaultValue={value}
                    onChange={onChange}
                    options={getSegmentOptions()}
                />
            </div>
        </div>
    )
}

export default SegmentComponent