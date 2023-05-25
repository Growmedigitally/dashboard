import React, { useState } from 'react'
import styles from './backgroundImage.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { Button, Checkbox, Image, Modal, Switch, theme } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { removeObjRef } from '@util/utils';
import bodyBackgroundImages from 'src/data/bodyBackgroundImages';
import { BiShow, BiCheck } from 'react-icons/bi'


function BodyBackgroundImage({ label = '', value, onChange }) {

    const { token } = theme.useToken();
    const [showPreview, setShowPreview] = useState({ active: false, imageIndex: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        onChangeImage();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedImage(null)
    };

    const onChangeAppearance = (e: CheckboxChangeEvent, from) => {
        const valueCopy = removeObjRef(value);
        valueCopy[from] = e.target.checked;
        onChange(valueCopy);
    };

    const onChangeImage = () => {
        const valueCopy = removeObjRef(value);
        valueCopy.src = selectedImage.src;
        onChange(valueCopy);
        setSelectedImage(null)
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
                    <Modal
                        title="Backkground Images"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        wrapClassName={styles.imageModalWrap}
                        okText={'Update'}
                        okButtonProps={{
                            disabled: !Boolean(selectedImage?.src)
                        }}
                    >
                        <div className={styles.bgImagesList}>
                            {bodyBackgroundImages.map((imageData, imageIndex) => {
                                return <React.Fragment key={imageIndex}>
                                    <div className={`${styles.imageWrap} ${selectedImage?.src == imageData.src ? styles.active : ''}`}
                                        style={{ outlineColor: selectedImage?.src == imageData.src ? token.colorPrimary : '#d1d5e8' }}
                                    >
                                        <div className={styles.imageContent}>
                                            <div className={styles.imageActionsWrap}>
                                                <Button onClick={() => setShowPreview({ active: true, imageIndex })} type="text" icon={<BiShow />} size={'middle'}>Preview</Button>
                                                <Button onClick={() => setSelectedImage(imageData)} type="primary" icon={<BiCheck />} size={'middle'}>Select</Button>
                                            </div>
                                            <Image src={imageData.src} preview={false} />
                                            {(showPreview.active && showPreview.imageIndex == imageIndex) && <Image
                                                style={{ display: 'none' }}
                                                src={imageData.src}
                                                preview={{
                                                    visible: Boolean(showPreview.active && showPreview.imageIndex == imageIndex),
                                                    scaleStep: 1,
                                                    src: imageData.src,
                                                    style: { background: token.colorBgLayout },
                                                    onVisibleChange: (value) => setShowPreview({ active: value, imageIndex }),
                                                }} />}
                                        </div>
                                        <div className={styles.title} style={{ backgroundColor: selectedImage?.src == imageData.src ? token.colorPrimary : '#d1d5e8' }}>{imageData.title}</div>
                                    </div>
                                </React.Fragment>
                            })}
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default BodyBackgroundImage