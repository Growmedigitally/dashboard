import React, { useRef, useEffect, useCallback, useState } from "react";
import { fabric } from "fabric";
import { Drawer, Layout, Space, theme, Tooltip } from "antd";
import TabsWrapper from "@template/imageEditor/ImageEditorTabs";
import styles from "./imageEditor.module.scss";
import initControls from "./initControls";
import initDrraging from "./initDragging";
import CanvasControls from "./canvasControls/canvasControls";
import initAligningGuidelines from "./initAligningGuidelines";
import initControlsRotate from "./initControlsRotate";
import initHotkeys from "./initHotKeys";
import { CUSTOME_ATTRIBUTES, CUSTOME_ATTRIBUTES_LIST, editorEventMode, EDITOR_TABS, eventOneType, INITIAL_BG_LARGE, INITIAL_BG_SQUARE, OBJECT_TYPES, SHOW_BEYOND_CANVAS } from "@constant/imageEditor";
import handleSelctionEvent from "./handleSelctionEvent";
import ObjectPropertiesEditor from "./objectPropertiesEditor";
import { activeObjectsState } from "./types";
import TabsComposer from "./tabsComposer";
import { initGridLines } from "./initGridLines";
import { getObjectType } from "@util/imageEditorUtils";
import { removeObjRef } from "@util/utils";
import Layers from "./tabsComposer/layers";
import { BsLayers, BsChevronBarRight } from "react-icons/bs";
import { IoCloseSharp } from 'react-icons/io5'
import QuickActionsMenu from "./quickActionsMenu";
import Header from "./header";
const initialState = {
    id: 1,
    data: {
        version: "1.0.0",
        objects: []
    }
};

let historyStack: any = [initialState];
let workspaceEl = null;
export let workspace = null;
let initialFrame = {
    type: 'horizontal',
    width: 620,
    height: 427,
}
const INITIAL_BG_FLOW = false;
export default function ImageEditor() {
    const canvasRef: any = useRef();
    const canvasWrapperRef: any = useRef();
    const [canvas, setCanvas] = useState<any>();
    const [canvasHistory, setCanvasHistory] = useState<any>([initialState]);
    const [canvasState, setCanvasState] = useState<any>(initialState);
    const { token } = theme.useToken();
    const canvasInstance: fabric.canvas = useRef();
    const [activeEditorTab, setActiveEditorTab] = useState('');
    const [showLayers, setShowLayers] = useState(false)
    const [actionMenuProps, setActionMenuProps] = useState({ type: '', active: false, activeObject: null, top: 0, left: 0, contextMenuTop: 0, contextMenuLeft: 0, showContextMenu: false })
    const [activeObjectsState, setActiveObjectsState] = useState<activeObjectsState>({
        eventMode: editorEventMode.EMPTY,
        isGroup: false,
        isMultiple: false,
        selectedObject: [],
        isSelected: false
    })

    const onObjectModified = useCallback((e: any) => {
        updatedHistoryStack(e.target.canvas);
        updateActiveObjectCords()
    }, [setCanvasState, setCanvasHistory]);

    //set frame size for actual canvas
    const updateCanvasFrame = () => {
        return new Promise((resolve, reject) => {
            fabric.Image.fromURL(INITIAL_BG_SQUARE, function (img: any) {
                if (img == null) {
                    alert("Error!");
                    reject()
                } else {
                    const { width, height } = img;
                    initialFrame = { width, height, type: 'square' };
                    resolve(initialFrame);
                }
            }, { crossOrigin: 'anonymous' });
        })
    }

    useEffect(() => {
        workspaceEl = canvasWrapperRef.current;
        if (workspaceEl) {
            const canvas = new fabric.Canvas(canvasRef.current);
            canvasInstance.current = canvas;
            fabric.SHARED_ATTRIBUTES = ["id"],
                updateCanvasFrame().then((res) => {
                    initCanvas()
                    initResizeObserve();
                    initDrraging(canvasInstance.current);
                    loadCanvasFromJson(initialState.data);
                    initControls(canvasInstance.current, token);
                    // initControlsRotate(canvasInstance.current);
                    initHotkeys(canvasInstance.current);
                    initAligningGuidelines(canvasInstance.current, token);
                    setCanvas(canvasInstance.current);
                    setAutoSizing(true)
                    INITIAL_BG_SQUARE && loadBackgroundImage(INITIAL_BG_SQUARE);//INITIAL_BG_SQUARE, INITIAL_BG_LARGE
                    initWorkspace()
                    // initGridLines(canvasInstance.current, token.colorPrimary);
                })
        } else {
            console.log("Error while loading builder please reload")
        }
        // return () => canvas.dispose();
    }, [canvasRef, onObjectModified, setCanvas]);

    const updateActiveObjectCords = (showContextMenu = false) => {
        const activeObject = canvasInstance.current.getActiveObject();
        if (activeObject) {
            let leftCenter = ((activeObject.getScaledWidth() / 2) - 50 + activeObject.getBoundingRect().left);
            // if (leftCenter > (activeObject.getBoundingRect().left + activeObject.getScaledWidth())) {
            //     leftCenter = activeObject.getBoundingRect().left + activeObject.getScaledWidth()
            // }
            const leftCord = getObjectType(activeObject) == OBJECT_TYPES.text ? activeObject.getBoundingRect().left : ((activeObject.getScaledWidth() / 2) - 55 + activeObject.getBoundingRect().left)
            const contextMenuGap = 10;
            setActionMenuProps({
                type: getObjectType(activeObject),
                active: true,
                activeObject,
                top: activeObject.getBoundingRect().top - 60,
                left: leftCord,
                showContextMenu: showContextMenu || false,
                contextMenuTop: (activeObject.getBoundingRect().top),
                // contextMenuTop: ((activeObject.getScaledHeight() / 2) - contextMenuHeight + activeObject.getBoundingRect().top),
                contextMenuLeft: (activeObject.getBoundingRect().left + activeObject.getScaledWidth() + contextMenuGap),
            })
        } else {
            setActionMenuProps({ type: '', active: false, activeObject: null, top: 0, left: 0, showContextMenu: false, contextMenuTop: 0, contextMenuLeft: 0, })
        }
    }

    //handle object selection events
    const handleCanvasEvents = useCallback((e) => {
        handleSelctionEvent(e, canvasInstance.current, setActiveObjectsState)
        updateActiveObjectCords()
    }, [setCanvas]);

    const handleCanvasZoom = useCallback(
        (event: any) => {
            if (event?.target?.canvas) {
                const canvasRef = event.target.canvas;
                var delta = event.e.deltaY;
                var zoomRatio = canvasRef.getZoom();
                zoomRatio *= 0.999 ** delta;
                if (zoomRatio > 20) zoomRatio = 20;
                if (zoomRatio < 0.01) zoomRatio = 0.01;
                canvasRef.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoomRatio);
                event.e.preventDefault();
                event.e.stopPropagation();
                updateActiveObjectCords()
            }
        },
        [setCanvas]
    );

    const getScale = () => {
        const viewPortWidth = canvasWrapperRef?.current?.offsetWidth;
        const viewPortHeight = canvasWrapperRef?.current?.offsetHeight;
        // by width
        if (viewPortWidth / viewPortHeight < initialFrame.width / initialFrame.height) {
            return viewPortWidth / initialFrame.width;
        } // Scale by width
        return viewPortHeight / initialFrame.height;
        // return 1;
    }

    //on template click
    const setSize = (width: number, height: number) => {
        initCanvas();
        initialFrame.width = width;
        initialFrame.height = height;
        workspace = canvasInstance.current.getObjects().find((item) => item[CUSTOME_ATTRIBUTES.OBJECT_TYPE] === OBJECT_TYPES.workspace) as fabric.Rect;
        workspace.set('width', width);
        workspace.set('height', height);
        setAutoSizing();
    }

    const setCenterFromObject = () => {
        if (workspace) {
            const objCenter = workspace.getCenterPoint();
            const viewportTransform = canvasInstance.current.viewportTransform;
            if (canvasInstance.current.width === undefined || canvasInstance.current.height === undefined || !viewportTransform) return;
            viewportTransform[4] = canvasInstance.current.width / 2 - objCenter.x * viewportTransform[0];
            viewportTransform[5] = canvasInstance.current.height / 2 - objCenter.y * viewportTransform[3];
            canvasInstance.current.setViewportTransform(viewportTransform);
            canvasInstance.current.renderAll();
            updateActiveObjectCords()
        }
    }

    // auto scaling
    const setAutoSizing = (initialScale = false) => {
        setZoomAuto(initialScale ? 1 : (getScale() - 0.08));
    }

    const setZoomAuto = (scale: number, cb?: (left?: number, top?: number) => void) => {
        var width = Number(canvasWrapperRef?.current?.clientWidth);
        var height = Number(canvasWrapperRef?.current?.clientHeight);
        canvasInstance.current.setDimensions({ width: width, height: height });
        const center = canvasInstance.current.getCenter();
        canvasInstance.current.setViewportTransform(fabric.iMatrix.concat());
        canvasInstance.current.zoomToPoint(new fabric.Point(center.left, center.top), scale > 1 ? 1 : scale);
        setCenterFromObject();
    }

    const clipedCanvas = (status = SHOW_BEYOND_CANVAS) => {
        // Do not display beyond the canvasRef
        if (!status) {
            workspace.clone((cloned: fabric.Rect) => {
                canvasInstance.current.clipPath = cloned;
                canvasInstance.current.requestRenderAll();
            });
        } else {
            canvasInstance.current.clipPath = null;
            canvasInstance.current.requestRenderAll();
        }
    }

    const initCanvas = () => {
        // canvasRef.backgroundImage = 'https://image-editor-ten.vercel.app/Backgrounds/Large_Banner/Salon/Frame%20164.png';
        canvasInstance.current.setWidth(canvasWrapperRef?.current?.offsetWidth);
        canvasInstance.current.setHeight(canvasWrapperRef?.current?.offsetHeight);
        // Event listeners
        canvasInstance.current.on("object:modified", onObjectModified);
        canvasInstance.current.on('mouse:wheel', handleCanvasZoom);
        canvasInstance.current.on('selection:created', handleCanvasEvents);
        canvasInstance.current.on('selection:updated', handleCanvasEvents);
        canvasInstance.current.on('selection:cleared', handleCanvasEvents);
        canvasInstance.current.on('object:contextmenu', () => {
            updateActiveObjectCords(true);
        });
        canvasInstance.current.on('object:added', (e) => {
            setTimeout(() => updateActiveObjectCords(), 500);
        });
        //in case of patteres scalling pattern image also gelts scalled
        canvasInstance.current.on("object:scaling", function (e) {
            var shape = e.target;
            //apply scaling only for  shapes from scalling
            if (getObjectType(shape) == OBJECT_TYPES.triangle || getObjectType(shape) == OBJECT_TYPES.rect) {
                shape.width = shape.scaleX * shape.width;
                shape.height = shape.scaleY * shape.height;
                shape.scaleX = 1;
                shape.scaleY = 1;
            }
        });
    }

    const initWorkspace = () => {
        const { width, height } = initialFrame;
        const workspaceWrap = new fabric.Rect({ fill: 'rgba(255,255,255,1)', width, height, id: OBJECT_TYPES.workspace, [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: OBJECT_TYPES.workspace });
        workspaceWrap.set('selectable', false);
        workspaceWrap.set('hasControls', false);
        workspaceWrap.hoverCursor = 'default';
        canvasInstance.current.add(workspaceWrap);
        canvasInstance.current.renderAll();
        workspace = workspaceWrap;
    }

    const initResizeObserve = () => {
        const resizeObserver = new ResizeObserver(() => setAutoSizing());
        resizeObserver.observe(workspaceEl);
    }

    const loadCanvasFromJson = (json: any) => {
        canvasInstance.current.loadFromJSON(json, () => {
            canvasInstance.current.forEachObject(function (obj) {
                if (obj.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) == OBJECT_TYPES.workspace) {
                    obj.selectable = false;
                    obj.hasControls = false;
                    obj.hoverCursor = 'default';
                }
            });
        });
    }

    const loadBackgroundImage = (imageSrc: string) => {
        if (INITIAL_BG_FLOW) {
            fabric.Image.fromURL(imageSrc, function (img) {
                initialFrame = { type: '', width: img.width, height: img.height }
                canvasInstance.current.setBackgroundImage(img, canvasInstance.current.renderAll.bind(canvasInstance.current));
            });
        }
    }

    const updatedHistoryStack = (canvasObj: any) => {
        const newCanvasState = {
            id: Math.random(),
            data: canvasObj.toJSON(CUSTOME_ATTRIBUTES_LIST)
        };
        setCanvasState(newCanvasState);
        const history = removeObjRef(historyStack);
        history.push(newCanvasState);
        historyStack = removeObjRef(history);
        setCanvasHistory(removeObjRef(history));
        return historyStack;
    }

    const moveHistory = useCallback(
        (step: any) => {
            const currentStateIndex = canvasHistory.findIndex((c: any) => c.id == canvasState.id);
            const prevState = canvasHistory[currentStateIndex + step];
            if (prevState?.data) {
                loadCanvasFromJson(prevState.data)
                setCanvasState(prevState);
            }
        },
        [canvas, canvasState, canvasHistory, setCanvasState]
    );

    const updateHistoryState = useCallback((from) => moveHistory(from == 'undo' ? -1 : 1), [moveHistory]);

    const updateCanvas = (updatedCanvas: any) => {
        setCanvas(updatedCanvas);
        updatedHistoryStack(updatedCanvas)
    }

    const onChangeTab = (tab) => {
        setActiveEditorTab(tab);
        // setActiveObjectsState({eventMode: '',isGroup: false,isMultiple: false,selectedObject: [],isSelected: false});
        canvas?.discardActiveObject().renderAll();
    }

    const rerenderCanvas = (updatedCanvas) => {
        // canvas.renderAll();
        canvas.requestRenderAll();
        console.log("rerenderCanvas")
        // canvas.discardActiveObject().renderAll();
        updateCanvas(updatedCanvas)
    }

    return (
        <React.Fragment>
            <div className={styles.editorWrap}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
                <div className={styles.editorContainer} style={{ background: token.colorBgContainer, color: token.colorTextBase }}>
                    <div className={styles.tabsSection}>
                        <TabsWrapper activeEditorTab={activeEditorTab} setActiveEditorTab={onChangeTab} />
                    </div>
                    <div className={styles.editorContent} >
                        {activeObjectsState.isSelected && <div className={`${styles.tabActionsSection} ${styles.propsEditorSection}`} style={{ background: token.colorBgElevated, color: token.colorTextBase }}>
                            <div className={styles.tabActionsWrap} style={{ color: token.colorTextBase }}>
                                <ObjectPropertiesEditor rerenderCanvas={rerenderCanvas} workspace={workspace} canvas={canvasInstance.current} activeObjectsState={activeObjectsState} />
                            </div>
                        </div>}
                        {activeEditorTab && <div className={styles.tabActionsSection} style={{ background: token.colorBgElevated, color: token.colorTextBase }}>
                            <div className={styles.tabActionsWrap} style={{ background: token.colorBorder, color: token.colorTextBase, padding: '5px' }}>
                                <TabsComposer
                                    activeObjectsState={activeObjectsState}
                                    canvas={canvasInstance.current}
                                    rerenderCanvas={(updatedCanvas: any) => rerenderCanvas(updatedCanvas)}
                                    activeTab={activeEditorTab}
                                    workspace={workspace}
                                    setActiveEditorTab={setActiveEditorTab} />
                            </div>
                        </div>}
                        <div className={styles.editorCanvasContent} style={{ width: `calc(100% - ${Boolean(activeEditorTab) ? 300 : 0}px)`, background: token.colorBgTextHover, color: token.colorTextBase }}>
                            <div className={styles.headerWrap} >
                                <Header
                                    setAutoSizing={setAutoSizing}
                                    rerenderCanvas={rerenderCanvas}
                                    canvas={canvasInstance.current}
                                    activeObjectsState={activeObjectsState}
                                />
                            </div>
                            <div className={styles.canvasSection} id="canvasWrapper" ref={canvasWrapperRef}>
                                {/* canvas mounter */}
                                <canvas ref={canvasRef} width="300" height="300" />
                                {/* //canvas active object quick actions */}
                                <QuickActionsMenu
                                    rerenderCanvas={rerenderCanvas}
                                    canvas={canvasInstance.current}
                                    activeObjectsState={activeObjectsState}
                                    actionMenuProps={actionMenuProps}
                                    updateActiveObjectCords={updateActiveObjectCords}
                                />
                                {/* //canvas actions like zoom pan select */}
                                <CanvasControls
                                    updateCanvas={updateCanvas}
                                    canvasHistory={canvasHistory}
                                    canvasState={canvasState}
                                    canvas={canvasInstance.current}
                                    setAutoSizing={setAutoSizing}
                                    clipedCanvas={clipedCanvas}
                                    updateHistoryState={(from: string) => updateHistoryState(from)}
                                />
                                {/* //layers wrap */}
                                <div className={`${styles.layersWrapper} ${showLayers ? styles.showLayers : ''}`}
                                    style={{ background: token.colorBgBase, color: token.colorTextBase }}>
                                    <div style={{ background: showLayers ? token.colorBgBase : '', color: token.colorTextBase }}
                                        className={`${styles.showLayerAction}`} onClick={() => setShowLayers(!showLayers)}>
                                        {/* <Tooltip title={`${showLayers ? 'Hide' : 'Show'} Layers`}> */}
                                        {showLayers ? <IoCloseSharp /> : <BsLayers />}
                                        {/* </Tooltip> */}
                                    </div>
                                    {showLayers && <>
                                        <Layers canvas={canvas} rerenderCanvas={rerenderCanvas} activeObjectsState={activeObjectsState} />
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </React.Fragment>
    );
}

