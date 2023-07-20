import React, { useState } from 'react'
import { fabric } from "fabric";
import styles from './header.module.scss'
import { LuCheck, LuImage, LuSaveAll, LuShare2 } from 'react-icons/lu'
import { activeObjectsState } from '../types';
import { Button, Popover, theme, Image, Tooltip, Modal, Checkbox, Input, Popconfirm, Dropdown, MenuProps, Space } from 'antd';
import defaultCraftBuilderConfig from 'src/data/defaultCraftBuilderConfig';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast } from '@reduxStore/slices/toast';
import { PiFileSvg, PiFileJpg, PiFilePng, PiCrownFill } from 'react-icons/pi';
import { TbDownload, TbEdit, TbResize } from 'react-icons/tb';
import ProIcon from '@atoms/proIcon';
import { toggleDarkMode, getDarkModeState } from '@reduxStore/slices/darkMode';
import { useAppSelector } from '@hook/useAppSelector';
import { MdLightMode, MdDarkMode, MdLayersClear, MdCleaningServices, MdUpdate, MdSave } from 'react-icons/md'
import { v4 as uuid } from 'uuid';
import { BiSolidHomeSmile } from 'react-icons/bi';
import { checkNonRestrictedObject } from '@util/imageEditorUtils';
import { BsFillSunFill, BsSave } from 'react-icons/bs';
import CRAFT_SIZES from '@constant/craftSizes';
import SocialIcon from '@assets/Icons/social/SocialIcon';
import { IoClose, IoSave } from 'react-icons/io5';
import { GiCancel, GiSave } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { ImDownload } from 'react-icons/im';
const { Search } = Input;
import { DownOutlined } from '@ant-design/icons';
import { showSuccessAlert } from '@reduxStore/slices/alert';

type pageProps = {
    updateWorkspaceSize: any,
    setAutoSizing: any,
    rerenderCanvas: any,
    canvas: fabric.Canvas,
    activeObjectsState: activeObjectsState
}

const DOWNLOAD_OPTIONS = {
    REMOVE_BG: 'Remove Background',
    REMOVE_WATERMARK: 'Remove Watermark',
    PNG: 'png',
    JPEG: 'jpeg',
    SVG: 'svg',
}

const FILE_TYPES = [
    { name: DOWNLOAD_OPTIONS.PNG, icon: <PiFilePng /> },
    { name: DOWNLOAD_OPTIONS.JPEG, icon: <PiFileJpg /> },
    { name: DOWNLOAD_OPTIONS.SVG, icon: <PiFileSvg /> },
]


function Header({ updateWorkspaceSize, setAutoSizing, rerenderCanvas, canvas, activeObjectsState }: pageProps) {

    const [previewUrl, setPreviewUrl] = useState('')
    const { token } = theme.useToken();
    const [hoverId, setHoverId] = useState(null);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const isDarkMode = useAppSelector(getDarkModeState);
    const [activeTemplate, setActiveTemplate] = useState(1)
    const [downloadOptions, setDownloadOptions] = useState({
        removeBg: false,
        type: 'png',//'png', 'jpeg', or 'svg'
        removeWatermark: false
    })
    const [openSizeModal, setOpenSizeModal] = useState(false)
    const [openDownloadModal, setOpenDownloadModal] = useState('')
    const [selectedSize, setSelectedSize] = useState({ name: 'Square', width: 500, height: 500 })
    const [templateName, setTemplateName] = useState('')

    const TEMPLATE_ACTIONS: MenuProps['items'] = [
        {
            label: <div className={styles.saveAction}
                onMouseEnter={() => setHoverId(`save-templ`)}
                onMouseLeave={() => setHoverId('')}
                style={{ borderColor: hoverId == 'save-tmpl' ? token.colorPrimary : token.colorBorder }}>
                <div className={styles.iconWrap}
                    style={{ background: token.colorBgTextHover, color: token.colorPrimary }}><MdSave /></div>
                Save as new Template
                {!defaultCraftBuilderConfig.isPro && <ProIcon />}
            </div>,
            key: 'Save',
        },
        {
            label: <div className={styles.saveAction}
                onMouseEnter={() => setHoverId(`update-templ`)}
                onMouseLeave={() => setHoverId('')}
                style={{ borderColor: hoverId == 'update-tmpl' ? token.colorPrimary : token.colorBorder }}>
                <div className={styles.iconWrap} style={{ background: token.colorBgTextHover, color: token.colorPrimary }}><GiSave /></div>
                Update current Template
                {!defaultCraftBuilderConfig.isPro && <ProIcon />}
            </div>,
            key: 'Update',
        },
    ];

    const switchTheme = () => {
        dispatch(toggleDarkMode(!isDarkMode))
    }

    const getImgUrl = (type = 'png') => {
        const workspace = canvas.getObjects().find((item: fabric.Object) => item.id === 'workspace');
        const { left, top, width, height } = workspace as fabric.Object;
        const option = {
            name: 'New Image',
            format: 'png',
            quality: 1,
            width,
            height,
            left,
            top,
        };
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        canvas.renderAll();
        const dataUrl = canvas.toDataURL(option);
        setAutoSizing();
        return dataUrl;
    };

    const onClickPreview = () => {
        const dataUrl = getImgUrl();
        setPreviewUrl(dataUrl)
    }

    const onChnageOptions = (option, value) => {
        setIsLoading(false);
        switch (option) {
            case DOWNLOAD_OPTIONS.REMOVE_BG:
                if (defaultCraftBuilderConfig.isPro || !value) {
                    setDownloadOptions({ ...downloadOptions, removeBg: value })
                } else {
                    dispatch(showErrorToast('To remove background you need to be on pro version'))
                }
                break;

            case DOWNLOAD_OPTIONS.REMOVE_WATERMARK:
                if (defaultCraftBuilderConfig.isPro || !value) {
                    setDownloadOptions({ ...downloadOptions, removeWatermark: value })
                } else {
                    dispatch(showErrorToast('To remove watermark you need to be on pro version'))
                }
                break;
            default:
                break;
        }
    }

    const onClickDownload = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (downloadOptions.type == DOWNLOAD_OPTIONS.PNG || downloadOptions.type == DOWNLOAD_OPTIONS.JPEG) {
                const dataUrl = getImgUrl(downloadOptions.type);
                downloadFile(dataUrl, downloadOptions.type);
            } else {
                const workspace = canvas.getObjects().find((item: fabric.Object) => item.id === 'workspace');
                const { left, top, width, height } = workspace as fabric.Object;
                const dataUrl = canvas.toSVG({
                    width,
                    height,
                    viewBox: {
                        x: left,
                        y: top,
                        width,
                        height,
                    },
                });
                const fileStr = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dataUrl)}`;
                downloadFile(fileStr, 'svg');
                setOpenDownloadModal(null);
            }
        }, 3000);
    }

    const downloadFile = (fileStr, fileType) => {
        const anchorEl = document.createElement('a');
        anchorEl.href = fileStr;
        anchorEl.download = `${uuid()}.${fileType}`;
        document.body.appendChild(anchorEl); // required for firefox
        anchorEl.click();
        anchorEl.remove();
        setIsLoading(false);
    }

    const onClickClear = () => {
        canvas.getObjects().forEach((obj) => {
            if (checkNonRestrictedObject(obj)) canvas.remove(obj)
        });
        canvas.discardActiveObject();
        canvas.renderAll();
    }

    const onClickResize = () => {
        if (selectedSize.height && selectedSize.width) {
            updateWorkspaceSize(selectedSize.width, selectedSize.height);
            setOpenSizeModal(false);
        } else {
            dispatch(showErrorToast('Please select size'))
        }
    }

    const onClickSaveTemplate = () => {
        if (defaultCraftBuilderConfig.isPro) {


            console.log('save template');
            dispatch(showSuccessAlert('Template saved successfuly'))
        } else dispatch(showErrorToast('To save template you need to be on pro version'))
    }

    const onSaveActionClick: MenuProps['onClick'] = ({ key }) => {
        console.log(key)
        if (defaultCraftBuilderConfig.isPro) {


            console.log(`${key} Template`);
            dispatch(showSuccessAlert(`Template ${key} successfuly`))
        } else dispatch(showErrorToast(`To ${key} template you need to be on pro version`))
    };
    return (
        <div className={styles.headerWrap}>
            <Button className={styles.navToHome} icon={<BiSolidHomeSmile />} onClick={switchTheme} />
            <div className={styles.drawingTitle}>
                <Input type='dashed' size="middle" prefix={<TbEdit />} placeholder="Your drawing title" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
            </div>
            <div className={styles.actionsWrap}>
                {Boolean(canvas?.getObjects()?.length > 2) && <Popconfirm
                    okText="Yes"
                    cancelText="No"
                    title="Delete Layers"
                    description="Are you sure you want to delete all layers?"
                    onConfirm={(e) => onClickClear()}
                >
                    <Tooltip title="Start with blank design">
                        <Button icon={<MdCleaningServices />}></Button>
                    </Tooltip>
                </Popconfirm>}
                {/* <Tooltip title="Share your design">
                    <Button icon={<LuShare2 />}></Button>
                </Tooltip> */}
                <Tooltip title={`Switch theme to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
                    <Button type='dashed' className={styles.themeMode} icon={isDarkMode ? <MdDarkMode /> : <BsFillSunFill />} onClick={switchTheme} />
                </Tooltip>
                <Tooltip title="Risize design frame">
                    <Button type='primary' icon={<TbResize />} onClick={() => setOpenSizeModal(true)}>Resize</Button>
                </Tooltip>
                <Tooltip title="Preview of final image">
                    <Button type='primary' icon={<LuImage />} onClick={onClickPreview}>Preview</Button>
                </Tooltip>
                <Tooltip title="Download your creativity">
                    <Button type='primary' icon={<TbDownload />} onClick={() => setOpenDownloadModal(getImgUrl())}>Save</Button>
                </Tooltip>
            </div>

            {/* Final image preview */}
            <Modal
                title="Final image preview"
                open={Boolean(previewUrl)}
                onCancel={() => setPreviewUrl('')}
                maskStyle={{ backdropFilter: 'blur(6px)' }}
                footer={null}
                className={styles.modalWrap}
                closeIcon={<AiOutlineClose />}
                width={'max-content'}
            >
                <div className={styles.previewImageWrap}>
                    <img src={previewUrl} />
                </div>
            </Modal>
            {/* Sizes Options: */}
            <Modal
                title="Sizes Options:"
                open={Boolean(openSizeModal)}
                onCancel={() => setOpenSizeModal(false)}
                maskStyle={{ backdropFilter: 'blur(3px)' }}
                footer={null}
                width={'max-content'}
                className={styles.modalWrap}
                closeIcon={<AiOutlineClose />}
            >
                <div className={styles.sizesWrap}>
                    {/* <div className={styles.title}>Sizes Options: </div> */}
                    <div className={styles.sizesList}>
                        {CRAFT_SIZES.map((craftCategory: any, i) => {
                            return <React.Fragment key={i}>
                                <div className={styles.categoryWrap}>
                                    <div className={styles.details}>
                                        {craftCategory.icon && <div className={styles.iconWrap}>
                                            <SocialIcon icon={craftCategory.icon} />
                                        </div>}
                                        {craftCategory.name}
                                    </div>
                                    <div className={styles.typesList}>
                                        {craftCategory.items.map((type, ind) => {
                                            return <div className={styles.typeDetails} key={ind}
                                                onMouseEnter={() => setHoverId(`${type.id}-${type.name}`)}
                                                onMouseLeave={() => setHoverId('')}
                                                onClick={() => setSelectedSize({ name: `${craftCategory.name}-${type.name}`, height: type.height, width: type.width })}
                                                style={{
                                                    background: token.colorBgContainerDisabled,
                                                    borderColor: (hoverId == `${type.id}-${type.name}` || (selectedSize.width == type.width && selectedSize.height == type.height && selectedSize.name == `${craftCategory.name}-${type.name}`)) ? token.colorPrimary : token.colorBorder,
                                                    color: hoverId == `${type.id}-${type.name}` ? token.colorPrimary : token.colorTextBase
                                                }}
                                            >
                                                {type.icon && <div className={styles.iconWrap}>
                                                    <SocialIcon icon={type.icon} />
                                                </div>}
                                                <div className={styles.sizenameWrap}>
                                                    <div className={styles.name}>{type.name}</div>
                                                    {type.width} x {type.height}px
                                                </div>
                                                {(selectedSize.width == type.width && selectedSize.height == type.height && selectedSize.name == `${craftCategory.name}-${type.name}`) && <div className={styles.selected} style={{ backgroundColor: token.colorPrimary }}>
                                                    <LuCheck />
                                                </div>}
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </React.Fragment>
                        })}
                    </div>
                    <div className={styles.actionBtn} style={{ background: token.colorBgTextHover }}>
                        <Tooltip title={defaultCraftBuilderConfig.isPro ? '' : 'Available for pro version'}>
                            <div className={styles.selectedSize}>
                                <Input addonBefore="Width" defaultValue={selectedSize.width} value={selectedSize.width} onChange={(e) => setSelectedSize({ ...selectedSize, width: Number(e.target.value) })} />
                                <Input addonBefore="Height" defaultValue={selectedSize.height} value={selectedSize.height} onChange={(e) => setSelectedSize({ ...selectedSize, height: Number(e.target.value) })} />
                                {!defaultCraftBuilderConfig.isPro && <div className={styles.proNote} style={{ background: token.colorBgMask }}>
                                    <div className={styles.iconWrap}>
                                        <PiCrownFill />
                                    </div>
                                </div>}
                            </div>
                        </Tooltip>
                        <Button type='primary' size='large' loading={isLoading} icon={<TbResize />} onClick={onClickResize}>Resize</Button>
                    </div>
                </div>
            </Modal>
            {/* Download Options */}
            <Modal
                title="Download Options:"
                open={Boolean(openDownloadModal)}
                onCancel={() => setOpenDownloadModal('')}
                maskStyle={{ backdropFilter: 'blur(3px)' }}
                footer={null}
                className={styles.modalWrap}
                closeIcon={<AiOutlineClose />}
            >
                <div className={styles.saveActionsWrap}>
                    <div className={styles.actionsWrap}>
                        <div className={styles.previewWrap}>
                            <div className={styles.previewImageWrap}>
                                <img src={openDownloadModal} />
                            </div>
                        </div>
                        <div className={styles.saveOptionsWrap}>
                            <div className={styles.actionType}>
                                <Checkbox
                                    className={styles.checkboxElement}
                                    defaultChecked={downloadOptions.removeBg}
                                    style={{ color: token.colorTextBase }}
                                    checked={downloadOptions.removeBg}
                                    onChange={() => onChnageOptions(DOWNLOAD_OPTIONS.REMOVE_BG, !downloadOptions.removeBg)}>
                                    {DOWNLOAD_OPTIONS.REMOVE_BG}
                                </Checkbox>
                                <ProIcon />
                            </div>
                            <div className={styles.actionType}>
                                <Checkbox
                                    className={styles.checkboxElement}
                                    defaultChecked={downloadOptions.removeWatermark}
                                    style={{ color: token.colorTextBase }}
                                    checked={downloadOptions.removeWatermark}
                                    onChange={() => onChnageOptions(DOWNLOAD_OPTIONS.REMOVE_WATERMARK, !downloadOptions.removeWatermark)}>
                                    {DOWNLOAD_OPTIONS.REMOVE_WATERMARK}
                                </Checkbox>
                                <ProIcon />
                            </div>

                            {FILE_TYPES.map((option) => {
                                return <div key={option.name} className={styles.fileType}
                                    onClick={() => setDownloadOptions({ ...downloadOptions, type: option.name })}
                                    onMouseEnter={() => setHoverId(option)}
                                    onMouseLeave={() => setHoverId('')}
                                    style={{
                                        backgroundColor: (downloadOptions.type == option.name || hoverId == option) ? token.colorPrimaryBgHover : token.colorBgBase,
                                        border: '1px solid #dee1ec',
                                        borderColor: (downloadOptions.type == option.name || hoverId == option) ? token.colorPrimary : token.colorBorder,
                                        color: (downloadOptions.type == option.name || hoverId == option) ? token.colorTextBase : token.colorTextLabel
                                    }}>
                                    <div className={styles.iconWrap}
                                        style={{
                                            // backgroundColor: (downloadOptions.type == option.name|| hoverId == option) ? token.colorPrimary : token.colorBgBase,
                                            // border: '1px solid #dee1ec',
                                            borderColor: (downloadOptions.type == option.name || hoverId == option) ? token.colorPrimary : token.colorBorder,
                                            color: (downloadOptions.type == option.name || hoverId == option) ? token.colorTextBase : token.colorTextLabel
                                        }}
                                    >{option.icon}</div>
                                    {option.name} File
                                    <div className={`${styles.selected} ${downloadOptions.type == option.name ? styles.active : ''}`} style={{ backgroundColor: token.colorPrimary }}>
                                        <LuCheck />
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles.actionBtn}>
                        <Button type='primary' size='middle' loading={isLoading} icon={<ImDownload />} onClick={onClickDownload}>Download</Button>
                        {activeTemplate ? <>

                            <Dropdown
                                // disabled={!defaultCraftBuilderConfig.isPro}
                                placement="bottom"
                                arrow
                                destroyPopupOnHide={true}
                                menu={{ items: TEMPLATE_ACTIONS, onClick: onSaveActionClick }}
                                overlayClassName={styles.templateSaveActionsWrap}
                            >
                                <div className={styles.templateActions}>
                                    <Button type='primary' size='middle' loading={isLoading} icon={<IoSave />}>
                                        Template  <DownOutlined />
                                    </Button>
                                    {/* {!defaultCraftBuilderConfig.isPro && <ProIcon />} */}
                                </div>
                            </Dropdown>
                        </> :
                            <Button disabled={!defaultCraftBuilderConfig.isPro} type='primary' loading={isLoading} icon={defaultCraftBuilderConfig.isPro ? <IoSave /> : <ProIcon />} onClick={onClickSaveTemplate}>Save Template</Button>}
                    </div>
                </div>
            </Modal>
        </div >
    )
}

export default Header
