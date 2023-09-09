import { Tooltip } from 'antd'
import React from 'react'
import { PiCrownFill } from 'react-icons/pi'
import styles from './proIcon.module.scss'

function ProIcon() {
    return (
        <div className={styles.proIconWrap}>
            <Tooltip title="Available for pro version" color="gold">
                <div className={styles.iconWrap}>
                    <PiCrownFill />
                </div>
            </Tooltip>
        </div>
    )
}

export default ProIcon