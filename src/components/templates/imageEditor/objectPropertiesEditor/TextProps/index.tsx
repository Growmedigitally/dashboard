import React, { } from 'react'
import { activeObjectsState } from '../../types'
import { fabric } from "fabric";
import StylesProps from './stylesProps';
import Saperator from '@atoms/Saperator';
import Opacity from '../opacity';
import Angle from '../angle';
import Stroke from '../stroke';
import Shadow from '../shadow';

type pageProps = {
    rerenderCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

function TextObjectProps({ rerenderCanvas, canvas, activeObjectsState }: pageProps) {
    return (
        <React.Fragment>
            <StylesProps rerenderCanvas={rerenderCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
        </React.Fragment>
    )
}

export default TextObjectProps