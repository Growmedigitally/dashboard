import React, { useState } from 'react'
import styles from './backgroundImage.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { Button, Checkbox, Image, Modal, Switch, theme } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { removeObjRef } from '@util/utils';
import bodyBackgroundImages from 'src/data/bodyBackgroundImages';
import { BiShow, BiCheck } from 'react-icons/bi'
import ImagePickerModal from '../../../organisms/imagePickerModal';


function BackgroundImage({ label = '', value, onChange }) {

    const { token } = theme.useToken();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onChangeAppearance = (e: CheckboxChangeEvent, from) => {
        const valueCopy = removeObjRef(value);
        valueCopy[from] = e.target.checked;
        onChange(valueCopy);
    };

    const onChangeImage = (updatedImage) => {
        !updatedImage.doNotCloseDrawer && setIsModalOpen(false)
        const valueCopy = removeObjRef(value);
        valueCopy.src = updatedImage.src;
        onChange(valueCopy);
    }

    return (
        <div className={`${styleElementCSS.styleElementWrap} ${styles.backgroundImageWrap}`}>
            {label && <div className={styleElementCSS.label}>{label}</div>}
            <div className={`${styleElementCSS.elementWrapp} ${styles.imageContentWrap}`}>
                <div className={styles.uploadedImage} style={{ backgroundImage: value.src ? `url(${value.src})` : 'unset' }}></div>
                <div className={styles.actionsWrap}>
                    <div className={styles.actions} style={{ background: 'unset', color: 'black' }}>
                        <div className={styles.heading}>
                            Image visibility:
                        </div>
                        <div className={styles.action} >
                            <Checkbox defaultChecked={value.isMobile} style={{ color: 'black' }} checked={value.isMobile} onChange={(e) => onChangeAppearance(e, 'isMobile')}>Mobile</Checkbox>
                        </div>
                        <div className={styles.action} >
                            <Checkbox defaultChecked={value.isDesktop} style={{ color: 'black' }} checked={value.isDesktop} onChange={(e) => onChangeAppearance(e, 'isDesktop')}>Desktop</Checkbox>
                        </div>
                    </div>
                    <div className={`${styles.actions} ${styles.updateImageBtn}`} style={{ borderColor: token.colorBgBase }} onClick={showModal}>
                        Change Image
                    </div>
                    {isModalOpen && <ImagePickerModal open={isModalOpen} value={value} onSave={(image) => onChangeImage(image)} onCancel={() => setIsModalOpen(false)} />}
                </div>
            </div>
        </div>
    )
}

export default BackgroundImage