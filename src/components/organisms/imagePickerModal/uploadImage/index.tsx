import React, { useRef } from 'react'
import styles from './uploadImage.module.scss'
import { Button } from 'antd';
import { LuImagePlus } from 'react-icons/lu';

function UploadImage({ onUpload }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                onUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.uploadImageWrap}>
            <Button size='middle' onClick={() => fileInputRef.current.click()} icon={<LuImagePlus />} >Upload from your computer</Button>
            <input type="file" style={{ display: 'none' }} accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
        </div>
    )
}

export default UploadImage