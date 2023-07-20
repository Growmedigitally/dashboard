import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from "@constant/imageEditor";
import defaultCraftBuilderConfig from "src/data/defaultCraftBuilderConfig";

export const getObjectType = (canvasObject) => {
    return canvasObject ? (canvasObject?.get('type').includes('text') ? OBJECT_TYPES.text : canvasObject.get('type')) : '';
}

export function insertImgFile(str: string) {
    return new Promise((resolve) => {
        const imgEl = document.createElement('img');
        imgEl.src = str;
        // insert page
        document.body.appendChild(imgEl);
        imgEl.onload = () => {
            resolve(imgEl);
        };
    });
}

export function convertDataUrlToSvg(dataUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const svgDataUrl = canvas.toDataURL('image/svg+xml');
            resolve(svgDataUrl);
        };
        image.onerror = function () {
            reject(new Error('Failed to load image.'));
        };
        image.src = dataUrl;
    });
}

export const checkNonRestrictedObject = (obj) => {
    // used in src/components/templates/imageEditor/initDragging.ts & src/components/templates/imageEditor/initHotKeys.ts
    if (obj[CUSTOME_ATTRIBUTES.OBJECT_TYPE] == OBJECT_TYPES.workspace) {
        return false
    } else if (obj[CUSTOME_ATTRIBUTES.OBJECT_TYPE] == OBJECT_TYPES.watermark && !defaultCraftBuilderConfig.isPro) {
        return false
    } return true;
}