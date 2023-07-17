import Saperator from '@atoms/Saperator';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/imageEditor';
import { WATERMARKS } from '@constant/watermarks';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast } from '@reduxStore/slices/toast';
import { getObjectType, insertImgFile } from '@util/imageEditorUtils';
import { Button, Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { LuImagePlus } from 'react-icons/lu';
import styles from './watermark.module.scss'
const { Search } = Input;

type watermarkType = {
    id: string;
    title: string;
    showImg: boolean;
    showText: boolean;
    isInline: boolean;
}
function Styles({ canvas, watermarkProps, setWatermarkProps, rerenderCanvas }) {
    const fileInputRef = useRef(null);
    const [activeType, setActiveType] = useState<any>({ id: '', title: '', showImg: false, showText: false, isInline: false });
    const dispatch = useAppDispatch()
    const [text, setText] = useState('');

    useEffect(() => {
        setActiveType((WATERMARKS.find((w) => w.id == watermarkProps.type)) || {})
        setText(watermarkProps.text)
    }, [watermarkProps])

    const onClickReplace = () => {
        fileInputRef.current.click();
    }

    const handleImageAdded = async (imageData: any) => {
        const objects = canvas.getObjects();
        const addedWatermarkObjectIndex = objects.findIndex((o) => o.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) == OBJECT_TYPES.watermark);
        const watermarkobject = objects[addedWatermarkObjectIndex];
        const imgEl: any = await insertImgFile(imageData);
        const width = watermarkobject.get('width');
        const height = watermarkobject.get('height');
        const scaleX = watermarkobject.get('scaleX');
        const scaleY = watermarkobject.get('scaleY');
        if (getObjectType(watermarkobject) == OBJECT_TYPES.group) {
            const groupObjects = watermarkobject.getObjects();
            groupObjects.forEach((obj) => {
                if (obj.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) == `${OBJECT_TYPES.watermark}-${OBJECT_TYPES.image}`) {
                    obj.setSrc(imgEl.src, () => {
                        obj.set('scaleX', (width * scaleX) / imgEl.width);
                        obj.set('scaleY', (height * scaleY) / imgEl.height);
                        rerenderCanvas(canvas)
                    });
                }
            })
        } else {
            watermarkobject.setSrc(imgEl.src, () => {
                watermarkobject.set('scaleX', (width * scaleX) / imgEl.width);
                watermarkobject.set('scaleY', (height * scaleY) / imgEl.height);
                rerenderCanvas(canvas)
            });
        }
        imgEl.remove();
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                handleImageAdded(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    };

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            if (text) {
                setWatermarkProps({ ...watermarkProps, text: text });
                const objects = canvas.getObjects();
                const addedWatermarkObjectIndex = objects.findIndex((o) => o.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) == OBJECT_TYPES.watermark);
                const watermarkobject = objects[addedWatermarkObjectIndex];
                if (getObjectType(watermarkobject) == OBJECT_TYPES.group) {
                    const groupObjects = watermarkobject.getObjects();
                    groupObjects.forEach((obj) => {
                        if (obj.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) == `${OBJECT_TYPES.watermark}-${OBJECT_TYPES.text}`) {
                            if (obj.get('text') != text) {
                                obj.set('text', text)
                                rerenderCanvas(canvas)
                            }
                        }
                    })
                } else {
                    if (watermarkobject.get('text') != text) {
                        watermarkobject.set('text', text)
                        rerenderCanvas(canvas)
                    }
                }
            } else dispatch(showErrorToast("Please Enter text"))
        }
    };

    return (
        <div className={styles.watremarkStyles}>{watermarkProps.type}
            {activeType.showImg && <>
                <div className={styles.currentImage}>
                    {watermarkProps.src && <img src={watermarkProps.src} />}
                </div>
                <Button className={styles.buttonElement} size='middle' onClick={onClickReplace} icon={<LuImagePlus />} >Replace Image</Button>
                <input type="file" style={{ display: 'none' }} accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
            </>}
            <Saperator />
            {activeType.showText && <>
                <Search
                    placeholder="Enter watermark label"
                    allowClear
                    enterButton="Update"
                    size="middle"
                    value={text}
                    onChange={handleChange}
                    onSearch={(v: any) => handleKeyDown({ key: 'Enter' })}
                />
            </>}
        </div>
    )
}

export default Styles