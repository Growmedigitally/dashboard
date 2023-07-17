import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from './shapesProps.module.scss';
import { Space, theme } from 'antd';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import { activeObjectsState } from '@template/imageEditor/types';
import Saperator from '@atoms/Saperator';
import Corner from './corner';
import { getObjectType } from '@util/imageEditorUtils';
import { OBJECT_TYPES } from '@constant/imageEditor';
import { getPolygonVertices, getStarPolygonPoints } from '@template/imageEditor/tabsComposer/shapes';
import { removeObjRef } from '@util/utils';
import Patterns from '../patterns';

type pageProps = {
    rerenderCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

function ShapesProps({ rerenderCanvas, canvas, activeObjectsState }: pageProps) {
    const { token } = theme.useToken();
    const [attribute, setAttributes] = useState<any>({ height: 100, width: 100, rx: 0 });
    const [initialPropsGets, setInitialPropsGets] = useState(false);

    useEffect(() => {
        const activeObject = canvas?.getActiveObjects()[0];
        if (activeObject) {
            const attributesCopy = { ...attribute };
            Object.keys(attributesCopy).map((type) => {
                attributesCopy[type] = activeObject.get(type);
                setInitialPropsGets(true)
            })
            setAttributes(removeObjRef(attributesCopy));
        }
    }, [canvas, activeObjectsState])

    const onChange = (property, value) => {
        if (initialPropsGets) {
            const activeObject = canvas.getActiveObject();
            activeObject.set(property, value);
            if (property == 'rx') activeObject.set('ry', value);
            setAttributes({ ...attribute, [property]: value })
            rerenderCanvas(canvas);
        }
    }

    const onChangePolygon = (value) => {
        if (initialPropsGets) {
            const activeObject = canvas.getActiveObject();
            if (activeObject.get('name') == 'hexagon' || activeObject.get('name') == 'pentagon') {
                activeObject.set('points', getPolygonVertices(6, value));
            } else {
                activeObject.set('points', getStarPolygonPoints(5, value, 25));
            }
            setAttributes({ ...attribute, points: value })
            rerenderCanvas(canvas);
        }
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.shapesPropsWrap}`}>
            {initialPropsGets && <div className={`${styleElementCSS.elementWrap}`}>
                {canvas?.getActiveObject() && <Patterns canvas={canvas} rerenderCanvas={rerenderCanvas} activeObjectsState={activeObjectsState} activeObject={canvas?.getActiveObject()} />}
                <Saperator />
                {getObjectType(canvas?.getActiveObject()) == OBJECT_TYPES.rect && <div className={styles.propertyWrapper}>
                    <Corner max={attribute.width / 2} value={attribute.rx} onChange={(value) => onChange('rx', value)} />
                </div>}
                {/* {getObjectType(canvas?.getActiveObject()) == OBJECT_TYPES.polygon && <div className={styles.propertyWrapper}>
                    <Corner max={attribute.width / 2} value={attribute.rx} onChange={(value) => onChangePolygon(value)} />
                </div>} */}
            </div>}
        </div>
    )
}

export default ShapesProps;