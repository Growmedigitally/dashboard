import React, { useState } from 'react'
import { fabric } from "fabric";
import styles from './header.module.scss'
import { LuImage, LuShare2 } from 'react-icons/lu'
import { activeObjectsState } from '../types';
import { Button, Popover, theme, Image, Tooltip, Modal } from 'antd';

type pageProps = {
    setAutoSizing: any,
    rerenderCanvas: any,
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState
}

function Header({ setAutoSizing, rerenderCanvas, canvas, activeObjectsState }: pageProps) {

    const [previewUrl, setPreviewUrl] = useState('')
    const { token } = theme.useToken();

    const getImgUrl = () => {
        const workspace = canvas.getObjects().find((item: fabric.Object) => item.id === 'workspace');
        const { left, top, width, height } = workspace as fabric.Object;
        const option = {
            name: 'New Image',
            format: 'png',
            quality: 1,
            width,
            height,
            left,
            top,
        };
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        canvas.renderAll();

        const previewWidth = 1000;  // Desired preview width in pixels
        const previewHeight = 1000; // Desired preview height in pixels


        const offscreenCanvas = new fabric.StaticCanvas(null, {
            width: previewWidth,
            height: previewHeight
        });
        offscreenCanvas.renderAll();
        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = previewWidth;
        previewCanvas.height = previewHeight;
        const previewCtx = previewCanvas.getContext('2d');
        previewCtx.drawImage(offscreenCanvas.getElement(), 0, 0, previewWidth, previewHeight);
        const dataUrl = previewCanvas.toDataURL('image/png');
        setAutoSizing();
        return dataUrl;
    };

    const onClickPreview = () => {
        const dataUrl = getImgUrl();
        setPreviewUrl(dataUrl)
    }

    return (
        <div className={styles.headerWrap}>
            <div className={styles.actionsWrap}>
                <Button type='primary' icon={<LuImage />} onClick={onClickPreview}>
                    Preview
                </Button>
                <Button type='primary' icon={<LuShare2 />}>
                    Share
                </Button>
            </div>
            <Modal
                title="Final image preview"
                open={Boolean(previewUrl)}
                onCancel={() => setPreviewUrl('')}
                maskStyle={{
                    backdropFilter: 'blur(3px)'
                }}
                footer={null}
            >
                <div className={styles.previewImageWrap}>
                    <img src={previewUrl} />
                </div>
            </Modal>
        </div>
    )
}

export default Header