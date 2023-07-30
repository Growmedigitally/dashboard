import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from "@constant/craftBuilder";
import { getObjectType } from "@util/craftBuilderUtils";
import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';

const getImageObject = (src) => {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(src, function (img: any) {
            if (img == null) return;
            else {
                img.set({
                    left: 50,
                    top: 50,
                    uid: uuid(),
                    [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${OBJECT_TYPES.qrCode}`
                }).scaleToWidth(50);
                resolve(img);
            }
        }, { crossOrigin: 'anonymous' });
    })
}

const getQrImage = (qrConfig) => {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(qrConfig.src, function (img) {
            var patternSourceCanvas = new fabric.StaticCanvas();
            patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + (qrConfig.padding * 5), height: img.getScaledHeight() + (qrConfig.padding * 5) });
            const center = patternSourceCanvas.getCenterPoint();
            patternSourceCanvas.add(img);
            patternSourceCanvas._centerObject(img, center)
            //add rect
            // const rect = new fabric.Rect({
            //     fill: 'red',
            //     width: 100 + patternSourceCanvas.width + (qrConfig.padding * 5),
            //     height: 100 + patternSourceCanvas.height + (qrConfig.padding * 5),
            //     id: uuid(),
            //     rx: qrConfig.corner * 10,
            //     ry: qrConfig.corner * 10,
            //     name: 'rectangle',
            //     uid: uuid(),
            //     statefullCache: true,
            //     objectCaching: false
            // });
            // patternSourceCanvas.add(rect);
            // patternSourceCanvas._centerObject(rect, center)
            // rect.sendToBack();

            //add as pattern
            // const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: 'repeat' })
            // patternSourceCanvas?.set('fill', pattern);

            patternSourceCanvas.backgroundColor = qrConfig.bgColor;
            fabric.Image.fromURL(patternSourceCanvas.toDataURL(), function (img) {
                resolve(img)
            }, { crossOrigin: 'anonymous' });
        }, { crossOrigin: 'anonymous' });
    })
}

// const addQR = (canvas, updateLocalCanvas, imageSrc, qrConfig) => {
//     fabric.Image.fromURL(imageSrc, function (img) {

//         var patternSourceCanvas = new fabric.StaticCanvas();
//         patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + (qrConfig.padding * 5), height: img.getScaledHeight() + (qrConfig.padding * 5) });
//         const center = patternSourceCanvas.getCenterPoint();
//         patternSourceCanvas.add(img);
//         patternSourceCanvas._centerObject(img, center)

//         //add rect
//         // const rect = new fabric.Rect({
//         //     fill: 'red',
//         //     width: 100 + patternSourceCanvas.width + (qrConfig.padding * 5),
//         //     height: 100 + patternSourceCanvas.height + (qrConfig.padding * 5),
//         //     id: uuid(),
//         //     rx: qrConfig.corner * 10,
//         //     ry: qrConfig.corner * 10,
//         //     name: 'rectangle',
//         //     uid: uuid(),
//         //     statefullCache: true,
//         //     objectCaching: false
//         // });
//         // patternSourceCanvas.add(rect);
//         // patternSourceCanvas._centerObject(rect, center)
//         // rect.sendToBack();

//         //add as pattern
//         // const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: 'repeat' })
//         // patternSourceCanvas?.set('fill', pattern);

//         patternSourceCanvas.backgroundColor = qrConfig.bgColor;
//         fabric.Image.fromURL(patternSourceCanvas.toDataURL(), function (img) {
//             canvas.add(img);
//             canvas.viewportCenterObject(img)
//             canvas.setActiveObject(img)
//             updateLocalCanvas(canvas, 'Images');
//         }, { crossOrigin: 'anonymous' });
//     }, { crossOrigin: 'anonymous' });
// }

export const addSelectedQRImage = (canvas, updateLocalCanvas, qrConfig) => {
    getQrImage(qrConfig).then((imgObject) => {
        canvas.add(imgObject);
        canvas.viewportCenterObject(imgObject)
        canvas.setActiveObject(imgObject)
        updateLocalCanvas(canvas, 'Images');
    });
};