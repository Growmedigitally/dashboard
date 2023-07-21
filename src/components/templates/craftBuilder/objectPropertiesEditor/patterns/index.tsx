import { BACKGROUND_IMAGES_TYPES, PATTERN_PAGE } from '@constant/common';
import GalleryImages from '@organisms/imagePickerModal/galleryImages';
import { Checkbox, Segmented, Slider, theme, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { BsImages, BsImageAlt } from 'react-icons/bs';
import { IoColorFill } from 'react-icons/io5'
import styles from './patterns.module.scss';
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { fabric } from "fabric";
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import { activeObjectsState } from '@template/craftBuilder/types';
import { getObjectType } from '@util/craftBuilderUtils';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showToast } from '@reduxStore/slices/toast';
import { GiThreeLeaves } from 'react-icons/gi';
import { TbIcons } from 'react-icons/tb';
import IconsElements from '@template/craftBuilder/tabsComposer/graphics/iconsElements';
import GraphicsElements from '@template/craftBuilder/tabsComposer/graphics/graphicsElements';
import GraphicsCss from '@template/craftBuilder/tabsComposer/graphics/graphics.module.scss'

type pageProps = {
    activeObject: any,
    updateLocalCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

const TAB_TYPES = {
    GALLERY: 'Gallery',
    ICONS: 'Icons',
    GRAPHICS: 'Graphics',
    UPLOAD: 'Upload',
}

const FILL_PEPEAT_TYPE = {
    REPEAT: 'repeat',
    NOREPEAT: 'no-repeat'
}


const FILL_TYPE = {
    FILL_COLOR: 'Fill Color',
    FILL_PATTERN: 'Fill Patern'
}

const Patterns = ({ activeObject, updateLocalCanvas, canvas, activeObjectsState }: pageProps) => {

    const [selectedImage, setSelectedImage] = useState({ src: '' });
    const [activeTab, setActiveTab] = useState(TAB_TYPES.GALLERY);
    const { token } = theme.useToken();
    const [currentFill, setCurrentFill] = useState<any>({ repeat: FILL_PEPEAT_TYPE.REPEAT, opacity: 1 })
    const [isFillColor, setIsFillColor] = useState(false)
    const [initialPropsGets, setInitialPropsGets] = useState(false);
    const [patternDimentions, setPatternDimentions] = useState({ width: 0, height: 0, padding: 0 });//added pattern image dimensions
    const [objectDimenstions, setObjectDimenstions] = useState({ width: 0, height: 0 })//active object dimensions
    const dispatch = useAppDispatch();
    const [initialLoading, setInitialLoading] = useState(true);
    const [currentObjectType, setCurrentObjectType] = useState(activeObject.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE))

    useEffect(() => {
        if (activeObject && !initialLoading) updateCanvasPatternData(currentFill, patternDimentions);
    }, [currentFill, patternDimentions])

    useEffect(() => {
        // setCurrentObjectType(activeObject.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE))
        if (activeObjectsState.isSelected && canvas) {
            setIsFillColor(activeObject.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) ? false : true);

            //if fill is set to pattern
            const patternData = activeObject.get('patternData');
            if (activeObject.get('fill') instanceof fabric.Pattern) {
                if (activeObject && patternData && patternData.src && patternData[CUSTOME_ATTRIBUTES.OBJECT_TYPE].includes(OBJECT_TYPES.pattern)) {
                    setIsFillColor(false);
                    fabric.Image.fromURL(patternData.src, function (img) {

                        const repeat = patternData.repeat || 'repeat';
                        const padding = patternData.patternDimentions.padding || 0;
                        img.scaleToWidth((patternData.patternDimentions.width) || 0);
                        // img.scaleToHeight((patternData.patternDimentions.height) || 0);

                        img.set('opacity', patternData.opacity)
                        //set selected pattern image dimenstions - which is used for image widht adjustment at edit time
                        const imgDimenstions = { width: patternData.patternDimentions.width, height: patternData.patternDimentions.height, padding: padding }
                        setPatternDimentions(imgDimenstions)

                        //add image to canvas and set this canvas as pattern
                        var patternSourceCanvas = new fabric.StaticCanvas();
                        patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + padding, height: img.getScaledHeight() + padding });
                        patternSourceCanvas.add(img);
                        patternSourceCanvas.backgroundColor = patternData.fill;
                        patternSourceCanvas.opacity = patternData.opacity;
                        const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: repeat })
                        activeObject?.set('fill', pattern);
                        activeObject?.set('patternData', { ...patternData, patternSourceCanvas, img })

                        setCurrentFill({ repeat: repeat, src: patternData.src, fill: patternData.fill, opacity: patternData.opacity });
                        setSelectedImage({ src: patternData.src })
                        setInitialLoading(false);
                        canvas.requestRenderAll()
                        setTimeout(() => {
                            // //rerender pattern with existing padding because in first render padding of right side is zero
                            // patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + padding, height: img.getScaledHeight() + padding });
                            // const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: currentFill.repeat })
                            // activeObject.set('fill', pattern);
                            canvas.requestRenderAll()
                        }, 1000);
                    }, { crossOrigin: 'anonymous' });
                }
                //  else {
                //     //if fill is set to color
                //     setInitialLoading(false);
                //     setCurrentFill(activeObject.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) ? {src:patternData.src, repeat: FILL_PEPEAT_TYPE.REPEAT } : activeObject.get('fill'))
                // }
            } else if (typeof activeObject.get('fill') === 'string') {
                setCurrentFill(activeObject.get('fill'))
            }
            //  else {
            //     //if fill is set to color
            //     setInitialLoading(false);
            // setCurrentFill(activeObject.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) ? {src:patternData.src, repeat: FILL_PEPEAT_TYPE.REPEAT } : activeObject.get('fill'))
            // }
        }
        setInitialPropsGets(true);
        setInitialLoading(false);
        setObjectDimenstions({ width: activeObject.get('width'), height: activeObject.get('height') })
    }, [canvas, activeObjectsState])

    const FILL_TYPE_ITEMS_LIST = [
        { key: FILL_TYPE.FILL_COLOR, icon: <IoColorFill /> },
        { key: FILL_TYPE.FILL_PATTERN, icon: <BsImageAlt /> },
    ]

    const getCurrentFillTypeSTring = (isFill) => {
        return isFill ? FILL_TYPE.FILL_COLOR : FILL_TYPE.FILL_PATTERN;
    }

    const getFillTypesSegmentOptions = () => {
        return FILL_TYPE_ITEMS_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key}`}>
                        <div style={{ color: getCurrentFillTypeSTring(isFillColor) == option.key ? token.colorPrimary : 'inherit' }}
                            className={`${GlobalCss.segmentItem} ${getCurrentFillTypeSTring(isFillColor) == option.key ? GlobalCss.active : ''}`}>
                            <div className={GlobalCss.iconWrap} style={{ backgroundColor: getCurrentFillTypeSTring(isFillColor) == option.key ? token.colorPrimary : token.colorBgBase }}>
                                {option.icon}
                            </div>
                            <div className={GlobalCss.name} style={{ color: getCurrentFillTypeSTring(isFillColor) == option.key ? token.colorPrimary : token.colorBgBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }

    const TAB_ITEMS_LIST = [
        {
            key: TAB_TYPES.GALLERY,
            icon: <BsImages />,
            children: <GalleryImages currentPage={PATTERN_PAGE} selectedImage={selectedImage} setSelectedImage={(imageData) => addPatternImage(imageData)} config={{ type: BACKGROUND_IMAGES_TYPES.SQUARE }} />
        },
        {
            key: TAB_TYPES.ICONS,
            icon: <TbIcons />,
            children: <IconsElements onSelect={(imageData) => addPatternImage(imageData)} canvas={canvas} updateLocalCanvas={updateLocalCanvas} />
        },
        {
            key: TAB_TYPES.GRAPHICS,
            icon: <GiThreeLeaves />,
            children: <GraphicsElements onSelect={(imageData) => addPatternImage(imageData)} canvas={canvas} updateLocalCanvas={updateLocalCanvas} />
        },
        // {
        //     key: TAB_TYPES.UPLOAD,
        //     icon: <RiImageAddFill />,
        //     children: <UploadImage onUpload={(image) => addPatternImage({ src: image })} />
        // },
    ]

    const getSegmentOptions = () => {
        return TAB_ITEMS_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} Pattern`}>
                        <div style={{ color: activeTab == option.key ? token.colorPrimary : 'inherit' }}
                            className={`${GlobalCss.segmentItem} ${activeTab == option.key ? GlobalCss.active : ''}`}>
                            <div className={GlobalCss.iconWrap} style={{ backgroundColor: activeTab == option.key ? token.colorPrimary : token.colorBgBase }}>
                                {option.icon}
                            </div>
                            <div className={GlobalCss.name} style={{ color: activeTab == option.key ? token.colorPrimary : token.colorBgBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }

    const onChangeFill = (value) => {
        if (initialPropsGets) {
            activeObject.set('fill', value)
            const patternData = activeObject.get("patternData");
            activeObject.set('patternData', patternData ? { ...patternData, fill: value } : { fill: value })
            setCurrentFill(value)
            updateLocalCanvas(canvas);
        }
    }

    const onChangePatternFill = (value) => {
        const patternData = activeObject.get("patternData");
        if (initialPropsGets && value != patternData.fill) {
            patternData.fill = value;
            fabric.Image.fromURL(patternData.src, function (img) {
                img.set('opacity', patternData.opacity)
                img.scaleToWidth((patternData.patternDimentions.width) || 0);
                // img.scaleToHeight((patternData.patternDimentions.height) || 0);

                //set selected pattern image dimenstions - which is used for image widht adjustment at edit time
                const imgDimenstions = { width: patternData.patternDimentions.width, height: patternData.patternDimentions.height, padding: patternData.patternDimentions.padding }
                setPatternDimentions(imgDimenstions)

                //add image to canvas and set this canvas as pattern
                var patternSourceCanvas = new fabric.StaticCanvas();
                patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + patternData.patternDimentions.padding, height: img.getScaledHeight() + patternData.patternDimentions.padding });
                patternSourceCanvas.add(img);

                patternSourceCanvas.backgroundColor = patternData.fill;

                const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: patternData.repeat })
                activeObject?.set('fill', pattern);
                activeObject?.set('patternData', { ...patternData, patternSourceCanvas, img })

                setCurrentFill({ ...currentFill, repeat: patternData.repeat, src: patternData.src, fill: patternData.fill });
                canvas.requestRenderAll()
            }, { crossOrigin: 'anonymous' });
        }
    }

    const onChange = (key: string) => {
        setActiveTab(key)
    };

    const updateCanvasPatternData = (currentFill, patternDimentions) => {
        const patternData = activeObject.get("patternData");
        activeObject.set('patternData', {
            ...patternData,
            src: currentFill.src,
            repeat: currentFill.repeat,
            padding: patternDimentions?.padding || 0,
            patternDimentions,
            [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${activeObject.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE) == OBJECT_TYPES.workspace ? OBJECT_TYPES.workspace + '-' + OBJECT_TYPES.pattern : OBJECT_TYPES.pattern}`
        })
        // console.log("updateCanvasPatternData", activeObject.get("patternData"))
    }

    const addPatternImage = (image) => {
        // console.log(image)
        setSelectedImage(image)
        const repeatType = typeof currentFill == 'string' ? FILL_PEPEAT_TYPE.REPEAT : currentFill.repeat;
        if (activeObject) {
            fabric.Image.fromURL(image.src, function (img) {

                const patternData = activeObject.get("patternData") || {};

                if (activeObject.get('fill') instanceof fabric.Gradient) {
                    patternData.fill = activeObject.get('fill').colorStops[0].color;
                } else if (typeof activeObject.get('fill') === 'string') {
                    patternData.fill = activeObject.get('fill');
                } else {
                    patternData.fill = patternData.fill || '#0000'
                }

                const opacity = patternData.opacity || activeObject.get('opacity') || 1;
                img.set('opacity', opacity)
                img.scaleToWidth(patternDimentions.width || img.width || ((activeObject?.getScaledWidth() || 1) / 2));

                //set selected pattern image dimenstions - which is used for image widht adjustment at edit time
                const imgDimenstions = { width: img.get('width') - 10, height: img.get('height') - 10, padding: 0 }
                setPatternDimentions(imgDimenstions)

                //add image to canvas and set this canvas as pattern
                var patternSourceCanvas = new fabric.StaticCanvas();
                patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + patternDimentions.padding, height: img.getScaledHeight() + patternDimentions.padding });
                patternSourceCanvas.add(img);
                //set previous color as background color

                //set patternSource and iamge in active object so that we can use it for other implimentations

                patternSourceCanvas.backgroundColor = patternData.fill;
                patternData.src = image.src;
                activeObject.set('patternData', { ...patternData, patternSourceCanvas, img, opacity })
                // activeObject.patternData = { patternSourceCanvas, img };
                const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: repeatType })
                activeObject.set('fill', pattern);

                setCurrentFill({ ...image, repeat: repeatType, fill: patternData.fill, opacity })
                setPatternDimentions({ width: img.getScaledWidth(), height: img.getScaledHeight(), padding: patternDimentions.padding })

            }, { crossOrigin: 'anonymous' });
            canvas.requestRenderAll();
            setTimeout(() => updateLocalCanvas(canvas), 1000);
        }
    }

    const onFillTypeChange = (type) => {
        if (type) setCurrentFill("#000")
        setIsFillColor(type);
    }

    const onChangeFillRepeat = (value) => {
        var { patternSourceCanvas, img } = activeObject.get('patternData');
        const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: value })
        activeObject.set('fill', pattern);
        canvas.requestRenderAll();
        setTimeout(() => updateLocalCanvas(canvas), 1000);
        setCurrentFill({ ...currentFill, repeat: value })
        setPatternDimentions({ width: img.getScaledWidth(), height: img.getScaledHeight(), padding: patternDimentions.padding })
    }

    const getPatternDiamensionDiff = (patternValue) => {
        return ((activeObject?.getScaledWidth() / 2) - patternValue) > 0 && ((activeObject?.getScaledWidth() / 2) - patternValue) < 1;
    }

    const fitPatternToElement = () => {
        const fittedValue = ((activeObject?.getScaledWidth() || 1) / 2)
        if (getPatternDiamensionDiff(patternDimentions.width)) {
            dispatch(showToast('Image already fits with element'))
        } else onChangePatternWidth(fittedValue);
    }

    const onChangePatternWidth = (widthValue) => {
        const { patternSourceCanvas, img } = activeObject.get('patternData');
        img.scaleToWidth(parseInt(widthValue, 10));
        patternSourceCanvas.setDimensions({ width: (img.getScaledWidth() + patternDimentions.padding), height: (img.getScaledHeight() + patternDimentions.padding) });
        const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: currentFill.repeat })
        activeObject.set('fill', pattern);
        setPatternDimentions({ width: img.getScaledWidth(), height: img.getScaledHeight(), padding: patternDimentions.padding })
        canvas.requestRenderAll();
        setTimeout(() => updateLocalCanvas(canvas), 1000);
    }

    const onChangePatternOpacity = (opacityValue) => {
        const { patternSourceCanvas, img } = activeObject.get('patternData');
        const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: currentFill.repeat })
        // Modify the opacity of the source image
        activeObject.set('fill', pattern);
        activeObject.set('patternData', { ...activeObject.get('patternData'), opacity: opacityValue });
        setCurrentFill({ ...currentFill, opacity: opacityValue })
        canvas.requestRenderAll();
        setTimeout(() => updateLocalCanvas(canvas), 1000);
    }

    const onChangePatternPadding = (paddingValue) => {
        const { patternSourceCanvas, img } = activeObject.get('patternData');
        patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + paddingValue, height: img.getScaledHeight() + paddingValue });
        const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: currentFill.repeat })
        activeObject.set('fill', pattern);
        setPatternDimentions({ width: img.getScaledWidth(), height: img.getScaledHeight(), padding: paddingValue })
        canvas.requestRenderAll();
        setTimeout(() => updateLocalCanvas(canvas), 1000);
    }

    return (
        <div className={`${styles.patternsWrap}`}>
            {activeObjectsState.isSelected && currentObjectType != OBJECT_TYPES.workspace &&
                <div className={`${GlobalCss.segmentWrap} ${styles.fillTypes}`} >
                    <Segmented
                        style={{ background: token.colorBgTextActive }}
                        size={isFillColor ? 'middle' : 'large'}
                        block={true}
                        value={getCurrentFillTypeSTring(isFillColor)}
                        defaultValue={FILL_TYPE.FILL_COLOR}
                        onChange={(tab: any) => tab == FILL_TYPE.FILL_COLOR ? onFillTypeChange(true) : onFillTypeChange(false)}
                        options={getFillTypesSegmentOptions()}
                    />
                </div>}
            {!initialLoading && <>
                {isFillColor ? <>
                    <ColorPickerComponent
                        parentStyles={{ background: 'unset', color: token.colorTextBase }}
                        hideTransparency
                        value={{ format: 'hex', color: currentFill }}
                        onChange={(value) => onChangeFill(value.color)}
                        label="Text Color" />
                </> : <>
                    {currentFill?.src && <>
                        {currentFill?.fill && <div className={styles.fillReapeatType}>
                            <ColorPickerComponent
                                parentStyles={{ background: 'unset', color: token.colorTextBase }}
                                hideTransparency
                                value={{ format: 'hex', color: currentFill?.fill || '#0000' }}
                                onChange={(value) => onChangePatternFill(value.color)}
                                label="Pattern background color" />
                        </div>}
                        <div className={styles.fillReapeatType}>
                            <Checkbox
                                className={styles.checkboxElement}
                                defaultChecked={getPatternDiamensionDiff(patternDimentions.width)}
                                style={{ color: token.colorTextBase }}
                                checked={getPatternDiamensionDiff(patternDimentions.width)}
                                onChange={fitPatternToElement}>
                                Fit background to element
                            </Checkbox>
                        </div>
                        <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Background Image Width</div>
                            <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                                <Slider
                                    min={10 || objectDimenstions.width}
                                    max={activeObject.patternData?.img?.width || patternDimentions.width}
                                    className={styles.siderWrap}
                                    defaultValue={objectDimenstions.width}
                                    style={{ width: '100%' }}
                                    railStyle={{ background: token.colorBgSpotlight }}
                                    trackStyle={{ background: token.colorBgSpotlight }}
                                    onChange={(value) => onChangePatternWidth(value)}
                                    value={patternDimentions.width}
                                    step={20}
                                />
                            </div>
                        </div>
                        {!(activeObject && getObjectType(activeObject)?.includes(OBJECT_TYPES.text)) && <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Background Image Padding</div>
                            <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                                <Slider
                                    min={0}
                                    max={50}
                                    className={styles.siderWrap}
                                    defaultValue={0}
                                    style={{ width: '100%' }}
                                    railStyle={{ background: token.colorBgSpotlight }}
                                    trackStyle={{ background: token.colorBgSpotlight }}
                                    onChange={(value) => onChangePatternPadding(value)}
                                    value={patternDimentions.padding}
                                    step={1}
                                />
                            </div>
                        </div>}
                        <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Background Image Opacity</div>
                            <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                                <Slider
                                    min={0}
                                    max={1}
                                    className={styles.siderWrap}
                                    defaultValue={currentFill.opacity}
                                    style={{ width: '100%' }}
                                    railStyle={{ background: token.colorBgSpotlight }}
                                    trackStyle={{ background: token.colorBgSpotlight }}
                                    onChange={(value) => onChangePatternOpacity(value)}
                                    value={currentFill.opacity}
                                    step={0.1}
                                />
                            </div>
                        </div>
                        <div className={styles.currentFill} style={{ background: token.colorBgSpotlight }}>
                            <img src={currentFill?.src} />
                        </div>
                    </>}

                    <div className={GlobalCss.segmentWrap} >
                        <Segmented
                            style={{ background: token.colorBgTextActive }}
                            size="small"
                            block={true}
                            value={activeTab}
                            defaultValue={TAB_TYPES.GALLERY}
                            onChange={(tab: any) => onChange(tab)}
                            options={getSegmentOptions()}
                        />
                    </div>
                    <div className={GraphicsCss.tabContent}>
                        {TAB_ITEMS_LIST.find((t) => t.key == activeTab).children}
                    </div>
                </>}
            </>}
        </div>
    )
}

export default Patterns