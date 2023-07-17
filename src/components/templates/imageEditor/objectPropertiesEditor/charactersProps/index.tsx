import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from './charactersProps.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { activeObjectsState } from '@template/imageEditor/types';

type pageProps = {
    rerenderCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

function CharactersProps({ rerenderCanvas, canvas, activeObjectsState }: pageProps) {

    const [activeObjectId, setActiveObjectId] = useState(null);

    useEffect(() => {
        console.log(activeObjectsState.selectedObject)
        console.log(canvas)
        setActiveObjectId(activeObjectsState.selectedObject[0].get('id'))

    }, [activeObjectsState.selectedObject])

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.CharactersProps}`}>

        </div>
    )
}

export default CharactersProps