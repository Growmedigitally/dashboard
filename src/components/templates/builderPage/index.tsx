import styles from '@templatesCSS/builderPage/builderPage.module.scss'
import React, { useEffect, useState } from 'react'
import { Col, Layout, Popconfirm, Row, Segmented, theme, Tooltip, Typography } from 'antd';
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState } from '@reduxStore/slices/darkMode';
import { BsFillPencilFill, BsLaptop, BsPhone, BsTabletLandscape, BsFillLayersFill, BsArrowCounterclockwise, BsFillPhoneFill, BsFillTabletLandscapeFill, BsLaptopFill } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';
import SectionsContainer from './sectionsContainer';
import BuilderContainer from './builderContainer';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch } from '@hook/useAppDispatch';
import { getBuilderState, updateBuilderState } from '@reduxStore/slices/builderState';
import ComponentEditor from '@organisms/componentEditor';
import { getActiveEditorComponent, initialState, updateActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';
import ComponentConfigs from '@organisms/sections/configsList';
import { copy, move, reorder } from '@util/dndHelpers';
import { showSuccessToast } from '@reduxStore/slices/toast';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const DEVICE_TYPES = [
    { name: 'Mobile', icon: <BsPhone /> },
    { name: 'Tablet', icon: <BsTabletLandscape /> },
    { name: 'Laptop', icon: <BsLaptop /> },
    // { name: 'Mobile', icon: <BsFillPhoneFill /> },
    // { name: 'Tablet', icon: <BsFillTabletLandscapeFill /> },
    // { name: 'Laptop', icon: <BsLaptopFill /> },
]

function BuilderPage() {
    const isDarkMode = useAppSelector(getDarkModeState)
    const { token } = theme.useToken();
    const [activeOptionTab, setActiveOptionTab] = useState('Sections');
    const [activeDeviceType, setActiveDeviceType] = useState(DEVICE_TYPES[0].name);
    const dispatch = useAppDispatch();
    const builderState = useAppSelector(getBuilderState) || { [uuid()]: [] };
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const [originalDesignState, setOriginalDesignState] = useState({ [uuid()]: [] })
    useEffect(() => {
        if (Boolean(activeComponent.uid)) setActiveOptionTab('Editor');
        console.log(activeComponent)
    }, [activeComponent])


    const onClickOptionsTab = (tab: any) => {
        setActiveOptionTab(tab);
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        console.log('==> result', result);
        // dropped outside the list
        if (!destination) {
            return;
        }
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        switch (source.droppableId) {
            case destination.droppableId:
                dispatch(updateBuilderState({
                    [destination.droppableId]: reorder(builderState[source.droppableId], source.index, destination.index)
                }));
                break;
            case 'ECOMAI_BUILDER':
                dispatch(updateBuilderState({
                    [destination.droppableId]: copy(ComponentConfigs, builderState[destination.droppableId], source, destination)
                }));
                break;
            default:
                dispatch(updateBuilderState(
                    move(builderState[source.droppableId], builderState[destination.droppableId], source, destination)
                ));
                break;
        }
    };

    const onClickRevert = () => {
        dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        dispatch(updateBuilderState(originalDesignState));
        dispatch(showSuccessToast('Changes reverted successfully'));
    }

    return (
        <Layout className={styles.builderPageWrap}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Layout className={styles.builderLeftWrap}>
                    <Header className={`${styles.headerWrap}`} style={{ background: token.colorBgLayout }}>
                        <Row>
                            <Col className={styles.headingWrap} span={18}>
                                <Text style={{ color: token.colorPrimary }}>EcomAi Website Builder</Text>
                            </Col>
                            <Col className={styles.actionsWrap} span={6}>

                                <Tooltip title="Revert Changes" color={'#8892b0'} key='3'>
                                    <Popconfirm
                                        title="Revert Changes"
                                        description="Are you sure you want revert?"
                                        onConfirm={onClickRevert}
                                    >
                                        <div style={{ color: isDarkMode ? 'white' : 'black', background: '#dee1ec46' }}
                                            onClick={() => { }}
                                            className={`iconWrap hover ${styles.iconWrap}`}>
                                            <BsArrowCounterclockwise />
                                        </div>
                                    </Popconfirm>
                                </Tooltip>

                                {DEVICE_TYPES.map((device: any, i: number) => {
                                    return <React.Fragment key={i}>
                                        <Tooltip title={`${device.name} View`} color={'#8892b0'} key='3'>
                                            <div style={{ color: isDarkMode ? 'white' : 'black', background: activeDeviceType == device.name ? token.colorPrimary : '#dee1ec46' }}
                                                onClick={() => setActiveDeviceType(device.name)}
                                                className={`iconWrap hover ${styles.iconWrap} ${activeDeviceType == device.name ? styles.active : ''}`}>
                                                {device.icon}
                                            </div>
                                        </Tooltip>
                                    </React.Fragment>
                                })}
                            </Col>
                        </Row>
                    </Header>
                    <Content className={`${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"}`} style={{
                        background: token.colorBgLayout
                    }}>
                        <div className={styles.editorContent} >
                            <BuilderContainer builderState={builderState} activeDeviceType={activeDeviceType} />
                        </div>
                    </Content>
                </Layout>
                <Sider
                    className={`${styles.builderRightWrap} ${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"} ${styles[activeDeviceType]}`}>
                    <div className={styles.sidebarWrap}>
                        <div className={styles.segmentWrap}>
                            <Segmented
                                size="large"
                                block={true}
                                value={activeOptionTab}
                                onChange={(tab: any) => onClickOptionsTab(tab)}
                                options={[
                                    {
                                        label: <div style={{ color: activeOptionTab == 'Sections' ? token.colorPrimary : 'inherit' }}
                                            className={`${styles.segmentItem} ${activeOptionTab == 'Sections' ? styles.active : ''}`}>
                                            <div className={styles.iconWrap} >
                                                <BsFillLayersFill />
                                            </div>
                                            <div>Sections</div>
                                        </div>,
                                        value: 'Sections'
                                    },
                                    {
                                        label: <div style={{ color: activeOptionTab == 'Editor' ? token.colorPrimary : 'inherit' }}
                                            className={`${styles.segmentItem} ${activeOptionTab == 'Editor' ? styles.active : ''}`}>
                                            <div className={styles.iconWrap} >
                                                <BsFillPencilFill />
                                            </div>
                                            <div>Editor</div>
                                        </div>,
                                        value: 'Editor',
                                    },
                                ]}
                            />
                        </div>
                        {activeOptionTab == 'Sections' ? <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                Drag and drop section to left builder area
                            </div>
                            <SectionsContainer ComponentConfigs={ComponentConfigs} />
                        </div> : <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                {Boolean(activeComponent.uid) ? 'Edit content of selected section' : 'You have no component selected'}
                            </div>
                            {Boolean(activeComponent.uid) && <ComponentEditor activeComponent={activeComponent} builderState={builderState} />}
                        </div>}
                    </div>
                </Sider>
            </DragDropContext>
        </Layout>
    )
}

export default BuilderPage