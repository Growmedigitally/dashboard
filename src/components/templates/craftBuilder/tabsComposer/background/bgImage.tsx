import { Segmented, Slider, theme, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import styles from '@objectPropertiesEditor/patterns/patterns.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { BsImages, BsUpload } from 'react-icons/bs';
import { BACKGROUND_IMAGES_TYPES, PATTERN_PAGE } from '@constant/common';
import GalleryImages from '@organisms/imagePickerModal/galleryImages';
import { MdOutlineImageSearch } from 'react-icons/md';
import SearchImage from '@organisms/imagePickerModal/searchImage';
import UploadImage from '@organisms/imagePickerModal/uploadImage';
import { RiImageAddFill } from 'react-icons/ri';
import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';
// import styles from './patterns.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { getObjectType } from '@util/craftBuilderUtils';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';

const TAB_TYPES = {
    GALLERY: 'Gallery',
    SEARCH: 'Search',
    UPLOAD: 'Upload',
}

function BGImage({ activeObjectsState, activeObject, canvas, updateLocalCanvas }) {

    const { token } = theme.useToken();
    const [patternDimentions, setPatternDimentions] = useState({ width: 0, height: 0 });//added pattern image dimensions
    const [currentFill, setCurrentFill] = useState<any>({ opacity: 1 })
    const [objectDimenstions, setObjectDimenstions] = useState({ width: 0, height: 0 })//active object dimensions
    const [initialLoading, setInitialLoading] = useState(true);

    const IMAGES_TAB = [
        { key: TAB_TYPES.GALLERY, icon: <BsImages /> },
        { key: TAB_TYPES.SEARCH, icon: <MdOutlineImageSearch /> },
        { key: TAB_TYPES.UPLOAD, icon: <RiImageAddFill /> },
    ]

    useEffect(() => {
        // setCurrentObjectType(activeObject.get(CUSTOME_ATTRIBUTES.OBJECT_TYPE))
        if (activeObjectsState.isSelected && canvas) {
            //if fill is set to pattern
            if (activeObject?.get('fill') instanceof fabric.Pattern) {
                const patternData = activeObject.get('patternData');
                if (activeObject && patternData && patternData.src) {
                    fabric.Image.fromURL(patternData.src, function (img) {

                        img.scaleToWidth((patternData.patternDimentions.width) || 0);
                        img.set('opacity', patternData.opacity);
                        //set selected pattern image dimenstions - which is used for image widht adjustment at edit time
                        const imgDimenstions = { width: patternData.patternDimentions.width, height: patternData.patternDimentions.height }
                        setPatternDimentions(imgDimenstions)

                        //add image to canvas and set this canvas as pattern
                        var patternSourceCanvas = new fabric.StaticCanvas();
                        patternSourceCanvas.setDimensions({ width: img.getScaledWidth(), height: img.getScaledHeight() });
                        patternSourceCanvas.add(img);

                        const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: 'repeat' })
                        activeObject?.set('fill', pattern);
                        activeObject?.set('patternData', { ...patternData, patternSourceCanvas, img })

                        setCurrentFill({ src: patternData.src, opacity: patternData.opacity });
                        canvas.renderAll()
                        setTimeout(() => {
                            setInitialLoading(false);
                            canvas.renderAll()
                        }, 300);
                    }, { crossOrigin: 'anonymous' });
                }
            }
            setObjectDimenstions({ width: activeObject?.get('width'), height: activeObject.get('height') })
        }
    }, [canvas, activeObjectsState])

    const getSegmentOptions = () => {
        return IMAGES_TAB.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} Background`}>
                        <div style={{ color: activeTab == option.key ? token.colorPrimary : 'inherit' }}
                            className={`${GlobalCss.segmentItem} ${activeTab == option.key ? GlobalCss.active : ''}`}>
                            <div className={GlobalCss.iconWrap} style={{
                                backgroundColor: activeTab == option.key ? token.colorPrimary : token.colorBgBase,
                                color: activeTab == option.key ? token.colorBgBase : token.colorTextBase
                            }}>
                                {option.icon}
                            </div>
                            <div className={GlobalCss.name} style={{ color: activeTab == option.key ? token.colorPrimary : token.colorBgBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }
    const [activeTab, setActiveTab] = useState(TAB_TYPES.GALLERY);


    useEffect(() => {
        if (activeObject && !initialLoading) updateCanvasPatternData(currentFill, patternDimentions);
    }, [currentFill, patternDimentions])

    const updateCanvasPatternData = (currentFill, patternDimentions) => {
        const patternData = activeObject.get("patternData");
        activeObject.set('patternData', {
            ...patternData,
            src: currentFill.src,
            patternDimentions,
            [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${OBJECT_TYPES.workspace}-BG`
        })
    }

    const addSelectedImage = (image, status = false) => {
        // console.log(image)
        if (activeObject) {
            fabric.Image.fromURL(image.src, function (img) {

                const patternData = activeObject.get("patternData") || {};
                const opacity = patternData?.opacity || activeObject.get('opacity') || 1;
                img.set('opacity', opacity)
                const fittedValue: any = ((activeObject?.getScaledWidth() || 1) / 2)
                img.scaleToWidth(parseInt(fittedValue, 10));
                // img.scaleToWidth(patternDimentions.width || img.width || ((activeObject?.getScaledWidth() || 1) / 2));

                //set selected pattern image dimenstions - which is used for image widht adjustment at edit time
                const imgDimenstions = { width: img.get('width') - 10, height: img.get('height') - 10, padding: 0 }
                setPatternDimentions(imgDimenstions)

                //add image to canvas and set this canvas as pattern
                var patternSourceCanvas = new fabric.StaticCanvas();
                patternSourceCanvas.setDimensions({ width: img.getScaledWidth(), height: img.getScaledHeight() });
                patternSourceCanvas.add(img);
                //set previous color as background color

                //set patternSource and iamge in active object so that we can use it for other implimentations

                patternData.src = image.src;
                activeObject.set('patternData', { ...patternData, patternSourceCanvas, img, opacity })
                // activeObject.patternData = { patternSourceCanvas, img };
                const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: 'repeat' })
                activeObject.set('fill', pattern);

                setCurrentFill({ ...image, opacity })
                setPatternDimentions({ width: img.getScaledWidth(), height: img.getScaledHeight() })
                updateCanvasPatternData({ ...image, opacity }, { width: img.getScaledWidth(), height: img.getScaledHeight() })
            }, { crossOrigin: 'anonymous' });
            canvas.renderAll();
            setTimeout(() => updateLocalCanvas(canvas), 1000);
        }
    }

    const onChangePatternWidth = (widthValue) => {
        const { patternSourceCanvas, img } = activeObject.get('patternData');
        img.scaleToWidth(parseInt(widthValue, 10));
        patternSourceCanvas.setDimensions({ width: (img.getScaledWidth()), height: (img.getScaledHeight()) });
        const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: 'repeat' })
        activeObject.set('fill', pattern);
        setPatternDimentions({ width: img.getScaledWidth(), height: img.getScaledHeight() })
        updateCanvasPatternData(currentFill, { width: img.getScaledWidth(), height: img.getScaledHeight() })
        canvas.renderAll();
        setTimeout(() => updateLocalCanvas(canvas), 1000);
    }

    const onChangePatternOpacity = (opacityValue) => {
        const { patternSourceCanvas, img } = activeObject.get('patternData');
        const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: 'repeat' })
        // Modify the opacity of the source image
        activeObject.set('fill', pattern);
        activeObject.set('patternData', { ...activeObject.get('patternData'), opacity: opacityValue });
        setCurrentFill({ ...currentFill, opacity: opacityValue })
        updateCanvasPatternData({ ...currentFill, opacity: opacityValue }, { width: img.getScaledWidth(), height: img.getScaledHeight() })
        canvas.renderAll();
        setTimeout(() => updateLocalCanvas(canvas), 1000);
    }

    return (
        <div className={`${styles.patternsWrap} ${styles.workspaceStyles}`}>
            <div className={styles.title}>Background as Image</div>

            {currentFill?.src && <>
                {/* <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ color: token.colorTextBase }}>
                    <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Background Image Width</div>
                    <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                        <Slider
                            min={((activeObject?.getScaledWidth() || 1) / 2)}
                            max={patternDimentions.width + 100}
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
                </div> */}
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

            <div className={`${GlobalCss.segmentWrap} ${styles.segmentWrap}`} >
                <Segmented
                    className={GlobalCss.middleSegmentWrap}
                    style={{ background: token.colorBgTextActive }}
                    size="small"
                    block={true}
                    value={activeTab}
                    defaultValue={TAB_TYPES.GALLERY}
                    onChange={(tab: any) => setActiveTab(tab)}
                    options={getSegmentOptions()}
                />
            </div>
            <div className={`${styles.typesList}`}>
                {activeTab == TAB_TYPES.GALLERY && <>
                    <GalleryImages currentPage={PATTERN_PAGE} selectedImage={currentFill?.src} setSelectedImage={(imageData) => addSelectedImage(imageData)} config={{ type: BACKGROUND_IMAGES_TYPES.SQUARE }} />
                </>}
                {activeTab == TAB_TYPES.SEARCH && <>
                    <SearchImage selectedImage={currentFill?.src} setSelectedImage={(imageData) => addSelectedImage(imageData, true)} config={{ type: BACKGROUND_IMAGES_TYPES.SMALL }} />
                </>}
                {activeTab == TAB_TYPES.UPLOAD && <>
                    <UploadImage onUpload={(src) => addSelectedImage({ src })} />
                </>}
            </div>
        </div>
    )
}

export default BGImage