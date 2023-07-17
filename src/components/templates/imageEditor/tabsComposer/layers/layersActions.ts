import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from "@constant/imageEditor";
import { workspace } from "@template/imageEditor";

const getWorkspace = (canvas) => {
    return canvas.getObjects().find((obj) => obj.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) == OBJECT_TYPES.workspace);
}

export const moveLayerUp = (canvas, activeObject, rerenderCanvas) => {
    activeObject && activeObject.bringForward();
    canvas.requestRenderAll();
    getWorkspace(canvas).sendToBack();
    rerenderCanvas(canvas)
}

export const moveLayerUpTop = (canvas, activeObject, rerenderCanvas) => {
    activeObject && activeObject.bringToFront();
    canvas.requestRenderAll();
    getWorkspace(canvas).sendToBack();
    rerenderCanvas(canvas)
}

export const moveLayerDown = (canvas, activeObject, rerenderCanvas) => {
    activeObject && activeObject.sendBackwards();
    canvas.requestRenderAll();
    getWorkspace(canvas).sendToBack();
    rerenderCanvas(canvas)
}

export const moveLayerDownTop = (canvas, activeObject, rerenderCanvas) => {
    activeObject && activeObject.sendToBack();
    canvas.requestRenderAll();
    getWorkspace(canvas).sendToBack();
    rerenderCanvas(canvas)
}

// export const moveLayerUp = (canvas, layerId) => {
//     const activeObject = canvas.getObjects().find((item) => item.uid === layerId);
//     const actives = canvas.getActiveObjects();
//     if (actives && actives.length === 1) {
//         const activeObject = canvas.getActiveObjects()[0];
//         activeObject && activeObject.bringForward();
//         canvas.requestRenderAll();
//         workspace.sendToBack();
//     }
// }

// export const moveLayerUpTop = (canvas, layerId) => {
//     const actives = canvas.getActiveObjects();
//     if (actives && actives.length === 1) {
//         const activeObject = canvas.getActiveObjects()[0];
//         activeObject && activeObject.bringToFront();
//         canvas.requestRenderAll();
//         workspace.sendToBack();
//     }
// }

// export const moveLayerDown = (canvas, layerId) => {
//     const actives = canvas.getActiveObjects();
//     if (actives && actives.length === 1) {
//         const activeObject = canvas.getActiveObjects()[0];
//         activeObject && activeObject.sendBackwards();
//         canvas.requestRenderAll();
//         workspace.sendToBack();
//     }
// }

// export const moveLayerDownTop = (canvas, layerId) => {
//     const actives = canvas.getActiveObjects();
//     if (actives && actives.length === 1) {
//         const activeObject = canvas.getActiveObjects()[0];
//         activeObject && activeObject.sendToBack();
//         canvas.requestRenderAll();
//         workspace.sendToBack();
//     }
// }


// function handleOnDragEnd(result) {
//     if (!result.destination) return;
//     const newPosition = result.destination.index;
//     const layerId = result.draggableId;

//     moveObjects(layerId, newPosition)

//     // if (selectedObjectTypes == SELECTED_OBJECTS_TYPES.GROUP && activeTab == TAB_TYPES.GROUP_LAYERS) {
//     //     if (canvas.getActiveObjects()) {
//     //         const groupObjects = canvas.getActiveObjects()[0].getObjects()
//     //         let objectToReposition = groupObjects.find((item) => item.uid === layerId);
//     //         canvas.getActiveObjects()[0].remove(objectToReposition);
//     //         canvas.getActiveObjects()[0].insertAt(objectToReposition, (groupObjects.length - 1) - newPosition);
//     //         canvas.renderAll();
//     //     }

//     // } else if (selectedObjectTypes == SELECTED_OBJECTS_TYPES.MULTIPLE) {
//     //     const activeObjects = canvas.getActiveObjects();
//     //     let objectToReposition = activeObjects.find((item) => item.uid === layerId);
//     //     const objects = canvas.getObjects();
//     //     canvas.remove(objectToReposition);
//     //     canvas.insertAt(objectToReposition, (objects.length - 1) - newPosition);
//     //     canvas.renderAll();

//     // } else {
//     //     //  else if (selectedObjectTypes == SELECTED_OBJECTS_TYPES.SINGLE) {
//     //     let objectToReposition = canvas.getObjects().find((item) => item.uid === layerId);
//     //     const objects = canvas.getObjects();
//     //     canvas.remove(objectToReposition);
//     //     canvas.insertAt(objectToReposition, (objects.length - 1) - newPosition);
//     //     canvas.renderAll();
//     // }


//     // if (selectedObjectTypes == SELECTED_OBJECTS_TYPES.GROUP) {

//     // } else {
//     //     const objects = canvas.getObjects();
//     //     canvas.remove(objectToReposition);
//     //     canvas.insertAt(objectToReposition, (objects.length - 1) - newPosition);
//     //     canvas.renderAll();

//     //     // if (oldPosition < newPosition) {
//     //     //     //   move back 
//     //     //     // const objects = canvas.getObjects();
//     //     //     // const index = objects.indexOf(objectToReposition);
//     //     //     // if (index !== -1) {
//     //     //     //     canvas.remove(objectToReposition);
//     //     //     //     canvas.add(objectToReposition, 0); // Adds the object at the beginning (back) of the canvas
//     //     //     //     canvas.renderAll();
//     //     //     // }
//     //     //     for (var i = oldPosition; i <= newPosition; i++) {
//     //     //         moveLayerDown(canvas, objectToReposition, rerenderCanvas)
//     //     //     }
//     //     // } else if (oldPosition > newPosition) {
//     //     //     // move front
//     //     //     // const objects = canvas.getObjects();
//     //     //     // const index = objects.indexOf(objectToReposition);
//     //     //     // if (index !== -1) {
//     //     //     //     canvas.remove(objectToReposition);
//     //     //     //     canvas.add(objectToReposition);
//     //     //     //     canvas.renderAll();
//     //     //     // }
//     //     //     for (var i = oldPosition; i >= newPosition; i--) {
//     //     //         moveLayerUp(canvas, objectToReposition, rerenderCanvas)
//     //     //     }
//     //     // }
//     // }
//     setTimeout(() => {
//         canvas.requestRenderAll()
//         prepareLayersData()
//     }, 100);
// }