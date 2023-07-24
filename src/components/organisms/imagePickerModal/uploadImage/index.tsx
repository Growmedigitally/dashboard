import React, { useRef, useState } from 'react'
import styles from './uploadImage.module.scss'
import { Button, Modal } from 'antd';
import { LuImagePlus, LuUpload } from 'react-icons/lu';
import { AiOutlineClose } from 'react-icons/ai';
import ImageCropper from '@organisms/imageCropper';

function UploadImage({ onUpload }) {
    const fileInputRef = useRef(null);

    const [showCropperModal, setShowCropperModal] = useState({ active: false, src: null })

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setShowCropperModal({ active: true, src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.uploadImageWrap}>
            <Button size='middle' onClick={() => fileInputRef.current.click()} icon={<LuUpload />} >Upload from your computer</Button>
            <input type="file" style={{ display: 'none' }} accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
            <ImageCropper onCancel={() => setShowCropperModal({ active: false, src: null })} modalData={showCropperModal} onSave={onUpload} />
        </div>
    )
}

export default UploadImage