import hotkeys from 'hotkeys-js';
// import type { fabric } from 'fabric';
import { fabric } from "fabric";
import { zoomInCanvas, zoomOutCanvas } from './canvasControls/canvasControls';
import { CUSTOME_ATTRIBUTES, HOTKEYS_MOVE_PIXELS, OBJECT_TYPES } from '@constant/craftBuilder';
import { getIsGroup } from './handleSelctionEvent';
import { group, unGroup } from './tabsComposer/operations/grouping';
import { checkNonRestrictedObject } from '@util/craftBuilderUtils';

const keyNames = {
  lrdu: 'left,right,down,up',
  backspace: 'backspace',
  ctrlc: 'ctrl+c',
  ctrlv: 'ctrl+v',
  ctrla: 'ctrl+a',
  cmda: 'cmd+a',
  ctrlg: 'ctrl+g',
  cmdg: 'cmd+g',
  ctrlzoomOut: 'ctrl++',
  cmdzoomOut: 'ctrl++',
  cmdzoomIn: 'cmd+-',
  ctrlzoomIn: 'cmd+-',
  ctrlundo: 'ctrl+z',
  cmdzundo: 'cmd+z',
  ctrlredo: 'cmd+Shift+Z',
  cmdredo: 'cmd+Shift+Z',
};

function copyElement(canvas: fabric.Canvas) {
  let copyEl: fabric.ActiveSelection | fabric.Object | null;

  // copy
  hotkeys(keyNames.ctrlc, () => {
    const activeObject = canvas.getActiveObject();
    copyEl = activeObject;
  });
  // paste
  // hotkeys(keyNames.ctrlv, () => {
  //   if (copyEl) {
  //     canvas.clone(copyEl);
  //   }
  // });
}

function initHotkeys(canvas: fabric.Canvas) {
  // delete shortcut
  hotkeys(keyNames.backspace, () => {
    const activeObject = canvas.getActiveObjects();
    if (activeObject) {
      activeObject.map((item) => canvas.remove(item));
      canvas.requestRenderAll();
      canvas.discardActiveObject();
    }
  });

  // hotkeys(`${keyNames.cmdzoomIn},${keyNames.ctrlzoomIn}`, (e) => {
  //   e.preventDefault();
  //   zoomInCanvas(canvas)
  // });

  // hotkeys(`${keyNames.ctrlzoomOut},${keyNames.cmdzoomOut}`, (e) => {
  //   e.preventDefault();
  //   zoomOutCanvas(canvas)
  // });

  // hotkeys(`${keyNames.ctrlundo},${keyNames.cmdzundo}`, (e) => {
  //   console.log("keyNames.ctrlundo")
  // });

  // hotkeys(`${keyNames.ctrlredo},${keyNames.cmdredo}`, (e) => {
  //   console.log("keyNames.cmdredo")
  // });

  hotkeys(`${keyNames.cmda},${keyNames.ctrla}`, () => {
    canvas.discardActiveObject();
    if (canvas.getObjects().length) {
      const Objects = canvas.getObjects().filter((obj) => checkNonRestrictedObject(obj));
      if (Objects.length) {
        var sel = new fabric.ActiveSelection(Objects, {
          canvas: canvas,
        });
        canvas.setActiveObject(sel);
        canvas.requestRenderAll();
      }
    }
  });

  //group object
  hotkeys(`${keyNames.cmdg}`, () => {
    const activeObject = canvas.getActiveObjects();
    if (activeObject) {
      if (getIsGroup(activeObject)) {
        unGroup(canvas)
      } else {
        group(canvas)
      }
      canvas.requestRenderAll();
    }
  });

  // mobile shortcuts
  hotkeys(keyNames.lrdu, (event, handler) => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    switch (handler.key) {
      case 'left':
        if (activeObject.left === undefined) return;
        activeObject.set('left', activeObject.left - HOTKEYS_MOVE_PIXELS);
        break;
      case 'right':
        if (activeObject.left === undefined) return;
        activeObject.set('left', activeObject.left + HOTKEYS_MOVE_PIXELS);
        break;
      case 'down':
        if (activeObject.top === undefined) return;
        activeObject.set('top', activeObject.top + HOTKEYS_MOVE_PIXELS);
        break;
      case 'up':
        if (activeObject.top === undefined) return;
        activeObject.set('top', activeObject.top - HOTKEYS_MOVE_PIXELS);
        break;
      default:
    }
    canvas.renderAll();
  });

  // copy and paste
  copyElement(canvas);
}

export default initHotkeys;
export { keyNames, hotkeys };
