import React, { useEffect } from 'react'
import { activeObjectsState } from '../types'
import { fabric } from "fabric";
import { theme, Typography } from 'antd';
import Group from './group';
import Lock, { lockObject } from './lock';
import styles from './objectPropertiesEditor.module.scss'
import CenterAlignment from './centerAlignment';
import Flip from './flip';
import { getObjectType } from '@util/imageEditorUtils';
import ImageObjectProps from './ImageProps';
import TextObjectProps from './TextProps';
import Saperator from '@atoms/Saperator';
import GroupAlignment from './groupAlignment';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/imageEditor';
import { useAppDispatch } from '@hook/useAppDispatch';
import Angle from './angle';
import Opacity from './opacity';
import Shadow from './shadow';
import Stroke from './stroke';
import ShapesProps from './shapesProps';
import CharactersProps from './charactersProps';
import ThreeD from '../tabsComposer/threeD';
const { Text } = Typography;

type pageProps = {
    rerenderCanvas: any
    workspace: fabric.Rect
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState
}

function ObjectPropertiesEditor({ rerenderCanvas, workspace, canvas, activeObjectsState }: pageProps) {
    const dispatch = useAppDispatch()
    const { token } = theme.useToken();
    useEffect(() => {
        if (canvas?.getActiveObject() && activeObjectsState.isSelected && !canvas.getActiveObject().locked) {
            //if all child elements are locked then make parent object locked,
            //need to implememnt this because evry time we select multiple element canvas create new activeObject() (not activeObjects())
            if (activeObjectsState.selectedObject.filter((o) => !o.locked).length == 0) {
                lockObject(canvas.getActiveObject());
                canvas.renderAll();
            }
        }
    }, [activeObjectsState, canvas]);


    return (
        <React.Fragment>
            {activeObjectsState.isSelected && <div className={styles.objectPropertiesEditorWrap}>
                <div className={styles.groupLockWrap}>
                    <Group rerenderCanvas={rerenderCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                    <Lock rerenderCanvas={rerenderCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                </div>
                {canvas?.getActiveObject()?.locked && <div style={{ marginTop: '10px', textAlign: 'center', color: token.colorErrorActive }}>For editing element need to unlock </div>}
                <Saperator />
                <div className={`${styles.propsWrap} ${canvas?.getActiveObject()?.locked ? 'disabled' : ''}`}>
                    <CenterAlignment rerenderCanvas={rerenderCanvas} workspace={workspace} canvas={canvas} activeObjectsState={activeObjectsState} />

                    {activeObjectsState.isMultiple ? <>
                        {activeObjectsState.isMultiple && <GroupAlignment rerenderCanvas={rerenderCanvas} workspace={workspace} canvas={canvas} activeObjectsState={activeObjectsState} />}
                        <Saperator />
                    </> : <>
                        {(!activeObjectsState.isGroup && getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.image) && <div className={styles.imagePropsWrapper}>
                            <>
                                <ImageObjectProps rerenderCanvas={rerenderCanvas} workspace={workspace} canvas={canvas} activeObjectsState={activeObjectsState} />
                                <Saperator />
                            </>
                        </div>}
                        {(!activeObjectsState.isGroup && getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.text) && <div className={styles.textPropsWrapper}>
                            <>
                                <TextObjectProps rerenderCanvas={rerenderCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                                <Saperator />
                            </>
                        </div>}
                        <Saperator />
                        {(getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.rect ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.polygon ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.circle ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.ellipse ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.triangle ||
                            getObjectType(activeObjectsState.selectedObject[0]) == OBJECT_TYPES.path) &&
                            <ShapesProps rerenderCanvas={rerenderCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />}

                        {(activeObjectsState?.selectedObject[0]?.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) == OBJECT_TYPES.CharactersProps) && <CharactersProps rerenderCanvas={rerenderCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />}
                        <Opacity rerenderCanvas={rerenderCanvas} canvas={canvas} />
                        <Saperator />
                        <Angle rerenderCanvas={rerenderCanvas} canvas={canvas} />
                        <Saperator />
                        <Stroke rerenderCanvas={rerenderCanvas} canvas={canvas} />
                        <Saperator />
                        <Shadow rerenderCanvas={rerenderCanvas} canvas={canvas} />
                        <Saperator />
                    </>}
                    <ThreeD rerenderCanvas={rerenderCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                    <Saperator />
                    <div className={styles.groupLockWrap}>
                        <Flip rerenderCanvas={rerenderCanvas} canvas={canvas} />
                    </div>
                    <Saperator />
                </div>
            </div>}
        </React.Fragment>
    )
}

export default ObjectPropertiesEditor