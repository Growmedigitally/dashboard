import React, { useRef } from 'react'
import { activeObjectsState } from '../../types'
import { fabric } from "fabric";
import styles from '@objectPropertiesEditor/objectPropertiesEditor.module.scss'
import { Button } from 'antd';
import { LuImagePlus } from 'react-icons/lu'
import { insertImgFile } from '@util/imageEditorUtils';
import { showErrorToast } from '@reduxStore/slices/toast';
import { useAppDispatch } from '@hook/useAppDispatch';
import Filters from './filters';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/imageEditor';

type pageProps = {
    rerenderCanvas: any,
    workspace: fabric.Rect,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

function ImageObjectProps({ rerenderCanvas, workspace, canvas, activeObjectsState }: pageProps) {
    const fileInputRef = useRef(null);
    const dispatch = useAppDispatch();

    const onClickReplace = () => {
        console.log("activeObjectsState", activeObjectsState)
        const activeObject = canvas.getActiveObject();
        if (!activeObject.locked) {
            fileInputRef.current.click();
        } else {
            dispatch(showErrorToast('Element is locked 🔒'))
        }
    }

    const handleImageAdded = async (imageData: any) => {
        const activeObject = canvas.getActiveObjects()[0];
        const imgEl: any = await insertImgFile(imageData);
        const width = activeObject.get('width');
        const height = activeObject.get('height');
        const scaleX = activeObject.get('scaleX');
        const scaleY = activeObject.get('scaleY');
        activeObject.setSrc(imgEl.src, () => {
            activeObject.set('scaleX', (width * scaleX) / imgEl.width);
            activeObject.set('scaleY', (height * scaleY) / imgEl.height);
            rerenderCanvas(canvas)
        });
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


    return (
        <React.Fragment>
            {Boolean(canvas?.getActiveObject()?.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE)?.includes(OBJECT_TYPES.watermark)) && <div className={styles.watermarkImage}>Watermark Image</div>}
            <div className={styles.currentImage}>
                {canvas?.getActiveObject()?._originalElement?.currentSrc && <img src={canvas.getActiveObject()._originalElement.currentSrc} />}
            </div>
            {!Boolean(canvas?.getActiveObject()?.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE)?.includes(OBJECT_TYPES.watermark)) && <Button className={styles.buttonElement} size='middle' onClick={onClickReplace} icon={<LuImagePlus />} >Replace Image</Button>}
            <input type="file" style={{ display: 'none' }} accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
            <Filters rerenderCanvas={rerenderCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
        </React.Fragment>
    )
}

export default ImageObjectProps