import { Button, theme, Image, Tooltip } from 'antd';
import React, { useState } from 'react'
import { BiCheck, BiShow } from 'react-icons/bi';
import styles from './bgImageRenderer.module.scss';

function BgImageRenderer({ active, imageData, onSelect, styleProps }) {
    const { token } = theme.useToken();
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div className={`${styles.imageWrap} ${active ? styles.active : ''}`}
            style={{ outlineColor: active ? token.colorPrimary : '#d1d5e8', height: styleProps.height, width: `calc(100% / ${styleProps.column} - 10px)` }}
        >
            <div className={styles.imageContent} >
                <div className={styles.imageActionsWrap}>
                    <Tooltip title="Click to see large view of image">
                        <Button onClick={() => setShowPreview(true)} type="primary" size="middle" icon={<BiShow />} />
                    </Tooltip>
                    <Tooltip title="Select image to view in builder">
                        <Button onClick={() => onSelect(imageData)} type="primary" size="middle" icon={<BiCheck />}>Select</Button>
                    </Tooltip>
                </div>
                <Image src={imageData.src} preview={false} />
                {showPreview && <Image
                    style={{ display: 'none' }}
                    src={imageData.src}
                    preview={{
                        visible: showPreview,
                        scaleStep: 1,
                        src: imageData.src,
                        style: { background: token.colorBgLayout },
                        onVisibleChange: (value) => setShowPreview(value),
                    }} />}
            </div>
            {imageData.title && <div className={styles.title} style={{ backgroundColor: active ? token.colorPrimary : '#d1d5e8' }}>{imageData.title}</div>}
        </div>
    )
}

export default BgImageRenderer