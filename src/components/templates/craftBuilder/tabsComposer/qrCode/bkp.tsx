import { fabric } from "fabric";
import { LOGO } from '@constant/common'
import { Button, Input, Modal, QRCode, Segmented, Slider, theme, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styles from './qrCode.module.scss'
import type { QRCodeProps } from 'antd';
import { TbBrandWhatsapp, TbClipboardCopy, TbDeviceMobileMessage, TbLink, TbMinus, TbPlus, TbReplace, TbSignature } from 'react-icons/tb';
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import { LuCheck, LuFileSignature, LuUpload } from 'react-icons/lu';
import Saperator from '@atoms/Saperator';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast, showSuccessToast } from '@reduxStore/slices/toast';
import { AiOutlineClose } from 'react-icons/ai';
import { VscDeviceMobile } from 'react-icons/vsc';
import { addSelectedQRImage } from './utils';
import useDebounce from '@hook/useDebounce';
import Corner from '@template/craftBuilder/objectPropertiesEditor/shapesProps/corner';
const { TextArea } = Input;

const TAB_TYPES = {
    STYLE: 'Style',
    TEMPLATE: 'Template',
}

const TAB_TYPES_LIST = [
    { key: TAB_TYPES.STYLE, icon: <LuFileSignature /> },
    { key: TAB_TYPES.TEMPLATE, icon: <TbSignature /> },
]
const VALUE_TYPES = {
    URL: 'URL',
    WHATSAPP: 'Whatsapp',
}

const VALUE_TYPES_LIST = [
    { key: VALUE_TYPES.WHATSAPP, icon: <TbBrandWhatsapp />, color: 'green' },
    { key: VALUE_TYPES.URL, icon: <TbLink />, color: 'inherit' },
]

const LOGO_SIZES = [
    // { key: 'Hide', value: 0 },
    { key: 'Small', value: 30 },
    { key: 'Medium', value: 50 },
    { key: 'Large', value: 70 },
]

// const QR_LEVELS = ['L', 'M', 'Q', 'H'];
const QR_LEVELS = ['L', 'H'];
function QrCode({ canvas, updateLocalCanvas }) {
    const { token } = theme.useToken();
    const dispatch = useAppDispatch()
    const fileInputRef = useRef(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const [qrConfig, setQrConfig] = useState({
        selectedType: "",
        selectedIcon: LOGO,
        size: 300,
        logo: LOGO,
        disableLogo: false,
        logoSize: 50,
        color: "black",
        bgColor: '#dee1ec',
        valueType: VALUE_TYPES.WHATSAPP,
        phone: '',
        text: '',
        padding: 10,
        // corner: 10,
        value: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    })
    const [error, setError] = useState({ id: '', message: '' });

    const [qrStylesImages, setQrStylesImages] = useState([]);

    const updateQRLevelImages = useDebounce(() => {
        const list = [];
        QR_LEVELS.map((type) => {
            const qrCanvas = document.getElementById(`qr-element-${type}`)?.querySelector<HTMLCanvasElement>('canvas');
            const imageSrc = qrCanvas.toDataURL("image/png", 1.0);
            list.push(imageSrc)
        })
        setQrStylesImages(list)
    })

    useEffect(() => {
        updateQRLevelImages()
    }, [])

    const downloadQRCode = () => {
        const canvas = document.getElementById(`qr-element-${qrConfig.selectedType}`)?.querySelector<HTMLCanvasElement>('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = 'QRCode.png';
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const onChange = (property, value) => {
        setError({ id: '', message: '' })
        const qrConfigCopy = { ...qrConfig };
        qrConfigCopy[property] = value;
        if (property == 'color' && value == '#ffffff00') qrConfigCopy.color = 'black';
        if (property === 'text' || property === 'phone') {
            qrConfigCopy.value = `https://wa.me/${qrConfigCopy.phone}?text=${encodeURI(qrConfigCopy.text)}`;
        }
        updateQRLevelImages()
        setQrConfig(qrConfigCopy)
    }

    const onChangeSize = (value) => {
        const qrConfigCopy = { ...qrConfig };
        if (value == 'Hide') qrConfigCopy.disableLogo = true;
        else qrConfigCopy.disableLogo = false;
        qrConfigCopy.logoSize = LOGO_SIZES.find((i) => i.key == value).value;
        updateQRLevelImages()
        setQrConfig(qrConfigCopy)
    }

    const validateWhatsappData = () => {
        let err = { id: '', message: '' };
        if (!qrConfig.phone) err = { id: 'phone', message: 'Whatsapp phone number is mandatory ' }
        else if (qrConfig.phone && qrConfig.phone.length < 7) err = { id: 'phone', message: 'Enter valid whatsapp phone number' }
        else if (!qrConfig.text) err = { id: 'text', message: 'Message is mandatory' }
        if (err.id) {
            setError(err);
            dispatch(showErrorToast(err.message));
            return false;
        } else return true
    }

    {/* https://api.whatsapp.com/send?phone=912009209092&text=lsklkssss */ }
    {/* https://wa.me/7507832247?text=%E2%80%9CHello,%20I%20want%20more%20info%20about%20the%20product%E2%80%9D */ }
    {/* https://wa.me/7979759978998?text=%E2%80%9CHello%2C%20I%20want%20more%20info%20about%20the%20product%E2%80%9D */ }
    const generateLink = () => {
        if (validateWhatsappData()) {
            const qrConfigCopy = { ...qrConfig };
            qrConfigCopy.value = `https://wa.me/${qrConfigCopy.phone}?text=${encodeURI(qrConfigCopy.text)}`;
            navigator?.clipboard?.writeText(qrConfigCopy.value)
            dispatch(showSuccessToast("Link copied successfully!"))
            setQrConfig(qrConfigCopy);
            const element = document.getElementById("qr-list-wrap");
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }

    const showPreview = () => {
        if (validateWhatsappData()) {
            setShowPreviewModal(true);
        }
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                onChange('selectedIcon', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getSegmentOptions = () => {
        return TAB_TYPES_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} images`}>
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

    const getLogoSizeOptions = () => {
        return LOGO_SIZES.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} logo`}>
                        <div style={{ color: qrConfig.logoSize == option.value ? token.colorPrimary : 'inherit' }}
                            className={`${GlobalCss.segmentItem} ${qrConfig.logoSize == option.value ? GlobalCss.active : ''}`}>
                            <div className={GlobalCss.name} style={{ color: qrConfig.logoSize == option.value ? token.colorPrimary : token.colorBgBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }

    const getValueOptions = () => {
        return VALUE_TYPES_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} after scan`}>
                        <div style={{ color: qrConfig.valueType == option.key ? token.colorPrimary : 'inherit' }}
                            className={`${GlobalCss.segmentItem} ${qrConfig.valueType == option.key ? GlobalCss.active : ''}`}>
                            <div className={GlobalCss.iconWrap} style={{ backgroundColor: qrConfig.valueType == option.key ? token.colorPrimary : token.colorBgBase }}>
                                {option.icon}
                            </div>
                            <div className={GlobalCss.name} style={{ color: qrConfig.valueType == option.key ? token.colorPrimary : token.colorBgBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }
    const [activeTab, setActiveTab] = useState(TAB_TYPES.TEMPLATE);

    const onClickType = (type) => {
        setError({ id: '', message: '' });
        const qrConfigCopy = { ...qrConfig, selectedType: type }

        if (qrConfigCopy.valueType === VALUE_TYPES.WHATSAPP && !validateWhatsappData()) {
            const element = document.getElementById("valueContentWrap");
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            return false;

        } else if (qrConfigCopy.valueType === VALUE_TYPES.URL && !qrConfigCopy.value) {
            setError({ id: 'url', message: 'Please enter url' });
            dispatch(showErrorToast("Please enter url"));
            return false;
        }

        setQrConfig(qrConfigCopy)
        const qrCanvas = document.getElementById(`qr-element-${type}`)?.querySelector<HTMLCanvasElement>('canvas');
        const imageSrc = qrCanvas.toDataURL("image/png", 1.0);
        addSelectedQRImage(canvas, updateLocalCanvas, { ...qrConfigCopy, src: imageSrc })
    }

    return (
        <div className={styles.qrCodeWrap} >
            <div className={`${GlobalCss.segmentWrap} ${styles.segmentWrap}`} >
                <Segmented
                    className={GlobalCss.largeSegmentWrap}
                    style={{ background: token.colorBgTextActive }}
                    size="middle"
                    block={true}
                    value={activeTab}
                    defaultValue={TAB_TYPES.TEMPLATE}
                    onChange={(tab: any) => setActiveTab(tab)}
                    options={getSegmentOptions()}
                />
            </div>

            <div className={styles.valueWrap}>
                <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                    <div className={`${styleElementCSS.label} ${styles.label}`}>Results after scan</div>
                    <div className={`${GlobalCss.segmentWrap} ${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                        <Segmented
                            value={qrConfig.valueType}
                            style={{ background: token.colorBgTextActive }}
                            size="middle"
                            block={true}
                            defaultValue={qrConfig.valueType}
                            onChange={(value: any) => setQrConfig({ ...qrConfig, valueType: value, value: '' })}
                            options={getValueOptions()}
                        />
                    </div>
                </div>

                <div className={styles.valueContentWrap} id="valueContentWrap">
                    {qrConfig.valueType == VALUE_TYPES.URL ? <>
                        <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                            <div className={`${styleElementCSS.elementWrap}`}>
                                <TextArea
                                    status={error.id == 'url' ? "error" : ''}
                                    showCount
                                    allowClear
                                    size="large"
                                    value={qrConfig.value}
                                    placeholder="Enter url that display after scanning the qr code"
                                    style={{ minHeight: 'auto', marginBottom: 24 }}
                                    onChange={(e: any) => onChange('value', e.target.value)}
                                />
                            </div>
                        </div>
                    </> : <>
                        <div className={styles.whatsappLinkWrap}>
                            <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                                <div className={`${styleElementCSS.label} ${styles.label}`}>Enter your phone number</div>
                                <div className={`${GlobalCss.segmentWrap} ${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                                    <Input
                                        status={error.id == 'phone' ? "error" : ''}
                                        placeholder="Enter your phone number"
                                        allowClear
                                        size="middle"
                                        value={qrConfig.phone}
                                        onChange={(e: any) => onChange('phone', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                                <div className={`${styleElementCSS.label} ${styles.label}`}>Enter message you want to share</div>
                                <div className={`${GlobalCss.segmentWrap} ${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                                    <TextArea
                                        status={error.id == 'text' ? "error" : ''}
                                        showCount
                                        allowClear
                                        size="large"
                                        value={qrConfig.text}
                                        placeholder="Enter message that display on whatsapp after scanning the qr code"
                                        style={{ minHeight: 'auto' }}
                                        onChange={(e: any) => onChange('text', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.generateLinkBtn}>
                                <Button size='middle' icon={<TbClipboardCopy />} type='primary' onClick={generateLink}>Copy Link</Button>
                                <Button size='middle' icon={<TbDeviceMobileMessage />} type='primary' onClick={showPreview}>Preview</Button>
                            </div>
                        </div>
                    </>}
                </div>

                <Saperator />
                <Modal
                    destroyOnClose
                    title="Whatsapp message preview"
                    open={Boolean(showPreviewModal)}
                    onCancel={() => setShowPreviewModal(false)}
                    onOk={() => window.open(qrConfig.value, "_blank")}
                    maskStyle={{ backdropFilter: 'blur(6px)' }}
                    className={styles.modalWrap}
                    closeIcon={<AiOutlineClose />}
                    width={'max-content'}
                    okText={<div className="d-f-c">Open whatsapp&nbsp; <TbBrandWhatsapp /></div>}
                    cancelText="Close"
                >
                    <div className={styles.previewImageWrap}>
                        <div className={styles.frameWrap} >
                            <div className={styles.imgWrap}>
                                <img src="/assets/images/chat_screen.png" />
                            </div>
                            <div className={styles.numberWrap}>{qrConfig.phone}</div>
                            <div className={styles.messageWrap}>
                                {qrConfig.text}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

            <div className={`${styleElementCSS.label} ${styles.label}`} style={{ margin: '10px 0' }}>Select QR Style</div>
            <div className={`${styles.qrListsWrap} ${styles.displayImages}`}>
                {qrStylesImages.map((type, i) => {
                    return <React.Fragment key={i}>
                        <div className={styles.qrWrap}
                            style={{
                                borderColor: (QR_LEVELS[i] === qrConfig.selectedType) ? token.colorPrimary : 'transparent',
                                background: qrConfig.bgColor,
                                padding: qrConfig.padding,
                                // borderRadius: qrConfig.corner,
                            }}
                            onClick={() => onClickType(QR_LEVELS[i])}>
                            <img src={type} />
                            {QR_LEVELS[i] === qrConfig.selectedType && <div className={styles.selected} style={{ backgroundColor: token.colorPrimary }}>
                                <LuCheck />
                            </div>}
                        </div>
                    </React.Fragment>
                })}
            </div>
            <div className={styles.qrListsWrap} id="qr-list-wrap" style={{ display: 'none' }}>
                {QR_LEVELS.map((type, i) => {
                    return <React.Fragment key={i}>
                        <div className={styles.qrWrap}
                            id={`qr-element-${type}`}
                            style={{
                                borderColor: (type === qrConfig.selectedType) ? token.colorPrimary : 'transparent',
                            }}
                            onClick={() => onClickType(type)}>
                            <QRCode
                                color={qrConfig.color}
                                bgColor={qrConfig.bgColor}
                                bordered={true}
                                errorLevel={type as QRCodeProps['errorLevel']}
                                size={qrConfig.size}
                                iconSize={qrConfig.logoSize}
                                value={qrConfig.value || 'Your text'}
                                icon={((qrConfig.logoSize == 50 && (type === 'M' || type === 'Q')) || qrConfig.disableLogo || type === 'L') ? null : qrConfig.logo}
                            />
                            {type === qrConfig.selectedType && <div className={styles.selected} style={{ backgroundColor: token.colorPrimary }}>
                                <LuCheck />
                            </div>}
                        </div>
                    </React.Fragment>
                })}
            </div>

            <Saperator />
            <div className={styles.colorsWrap}>
                <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                    <div className={`${styleElementCSS.elementWrap}`}>
                        <ColorPickerComponent
                            parentStyles={{ background: 'unset', color: token.colorTextBase }}
                            hideColorString
                            // hideTransparency
                            value={{ format: 'hex', color: qrConfig.bgColor }}
                            onChange={(value) => onChange('bgColor', value.color)}
                            label="Background Color" />
                    </div>
                </div>
                <div className={`${styleElementCSS.styleWrap}`} style={{ background: 'unset', color: token.colorTextBase }}>
                    <div className={`${styleElementCSS.elementWrap}`}>
                        <ColorPickerComponent
                            parentStyles={{ background: 'unset', color: token.colorTextBase }}
                            hideColorString
                            // hideTransparency
                            value={{ format: 'hex', color: qrConfig.color }}
                            onChange={(value) => onChange('color', value.color)}
                            label="Design Color" />
                    </div>
                </div>
            </div>

            <div className={styles.propertyWrapper}>
                <div className={`${styleElementCSS.label} ${styles.label}`}>Spacing</div>
                <div className={`${GlobalCss.segmentWrap} ${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                    <Segmented
                        value={qrConfig.padding}
                        style={{ background: token.colorBgTextActive }}
                        size="middle"
                        block={true}
                        defaultValue={qrConfig.padding}
                        onChange={(value) => onChange('padding', value)}
                        options={[0, 5, 10, 15]}
                    />
                </div>
            </div>
            <Saperator />

            <Saperator />
            <div className={`${styleElementCSS.styleWrap} ${styles.logoWrap} ${qrConfig.selectedType === 'L' ? 'disabled' : ''}`} style={{ background: 'unset', color: token.colorTextBase }}>
                <div className={`${styleElementCSS.label} ${styles.label}`}>Logo</div>
                <div className={`${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                    <div className={styles.qrLogo}>
                        <img src={qrConfig.selectedIcon} />
                        <Button size='middle' onClick={() => fileInputRef.current.click()} icon={<TbReplace />} >Replace</Button>
                        <input type="file" style={{ display: 'none' }} accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                    </div>
                </div>
            </div>

            <Saperator />
            <div className={`${styleElementCSS.styleWrap} ${styles.logoWrap} ${qrConfig.selectedType === 'L' ? 'disabled' : ''}`} style={{ background: 'unset', color: token.colorTextBase }}>
                <div className={`${styleElementCSS.label} ${styles.label}`}>Logo Size</div>
                <div className={`${GlobalCss.segmentWrap} ${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                    <Segmented
                        value={LOGO_SIZES.find((i) => i.value == qrConfig.logoSize).key}
                        style={{ background: token.colorBgTextActive }}
                        size="middle"
                        block={true}
                        defaultValue={LOGO_SIZES[2].key}
                        onChange={(value) => onChangeSize(value)}
                        options={getLogoSizeOptions()}
                    />
                </div>
            </div>

            {/* <Saperator />
            <div className={styles.propertyWrapper}>
                <div className={`${styleElementCSS.label} ${styles.label}`}>Corner</div>
                <div className={`${GlobalCss.segmentWrap} ${styles.styleWrap} ${styleElementCSS.elementWrap}`}>
                    <Segmented
                        value={qrConfig.corner}
                        style={{ background: token.colorBgTextActive }}
                        size="middle"
                        block={true}
                        defaultValue={qrConfig.corner}
                        onChange={(value) => onChange('corner', value)}
                        options={[0, 10, 20, 30]}
                    />
                </div>
            </div> */}
        </div>
    )
}

export default QrCode