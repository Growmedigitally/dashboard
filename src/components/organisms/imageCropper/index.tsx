import { Modal } from 'antd'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './imageCropper.module.scss'

function ImageCropper({ modalData, onSave, onCancel }) {

    const onClickSave = () => {
        onSave(modalData.src)
        onCancel()
    }

    return (
        <Modal
            destroyOnClose
            title="Crop selected image"
            open={Boolean(modalData.active)}
            onCancel={onCancel}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
            className={styles.cropperModal}
            closeIcon={<AiOutlineClose />}
            width={'max-content'}
            onOk={onClickSave}
            okText={'Crop & Upload Image'}
        >
            <div className={styles.cropperModalContent}>

                <div className={styles.originalImageWrap}>
                    <img src={modalData?.src} />
                </div>
                <div className={styles.imageCropperWrap}>

                </div>
            </div>
        </Modal>
    )
}

export default ImageCropper