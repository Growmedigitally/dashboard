import styles from '@templatesCSS/builderPage/builderPage.module.scss'
import React, { useEffect, useState } from 'react'
import { Col, Layout, Row, Segmented, theme, Typography } from 'antd';
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState } from '@reduxStore/slices/darkMode';
import { BsPencil, BsLaptop, BsPhone, BsTabletLandscape, BsFillLayersFill } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';
import SectionsContainer from './sectionsContainer';
import BuilderContainer from './builderContainer';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch } from '@hook/useAppDispatch';
import { getBuilderState, updateBuilderState } from '@reduxStore/slices/builderState';
import ComponentEditor from '@organisms/componentEditor';
import { getActiveEditorComponent, updateActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';
import componentConfigs from '@organisms/ComponentsList/configs';
import { copy, move, reorder } from '@util/dndHelpers';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const DEVICE_TYPES = [
    { name: 'Mobile', icon: <BsPhone /> },
    { name: 'Tablet', icon: <BsTabletLandscape /> },
    { name: 'Laptop', icon: <BsLaptop /> },
]

function BuilderPage() {
    const isDarkMode = useAppSelector(getDarkModeState)
    const { token } = theme.useToken();
    const [activeOptionTab, setActiveOptionTab] = useState('Sections');
    const [activeDeviceType, setActiveDeviceType] = useState(DEVICE_TYPES[0].name);
    const dispatch = useAppDispatch();
    const builderState = useAppSelector(getBuilderState) || { [uuid()]: [] };
    const componentUID = useAppSelector(getActiveEditorComponent);

    useEffect(() => {
        if (componentUID != null) setActiveOptionTab('Editor');
        console.log(componentUID)
    }, [componentUID])


    const onClickOptionsTab = (tab: any) => {
        setActiveOptionTab(tab);
        dispatch(updateActiveEditorComponent(null));
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        console.log('==> result', result);
        // dropped outside the list
        if (!destination) {
            return;
        }
        switch (source.droppableId) {
            case destination.droppableId:
                dispatch(updateBuilderState({
                    [destination.droppableId]: reorder(builderState[source.droppableId], source.index, destination.index)
                }));
                break;
            case 'ECOMAI_BUILDER':
                dispatch(updateBuilderState({
                    [destination.droppableId]: copy(componentConfigs, builderState[destination.droppableId], source, destination)
                }));
                break;
            default:
                dispatch(updateBuilderState(
                    move(builderState[source.droppableId], builderState[destination.droppableId], source, destination)
                ));
                break;
        }
    };

    return (
        <Layout className={styles.builderPageWrap}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Layout className={styles.builderLeftWrap}>
                    <Header className={`${styles.headerWrap}`} style={{ background: token.colorBgLayout }}>
                        <Row>
                            <Col className={styles.headingWrap} span={18}>
                                <Text style={{ color: token.colorPrimary }}>EcomAi Website Builder</Text>
                            </Col>
                            <Col className={styles.sizeWrap} span={6}>
                                {DEVICE_TYPES.map((device: any, i: number) => {
                                    return <div key={i}
                                        style={{ color: isDarkMode ? 'white' : 'black', background: activeDeviceType == device.name ? token.colorPrimary : '#dee1ec46' }}
                                        onClick={() => setActiveDeviceType(device.name)}
                                        className={`iconWrap hover ${styles.iconWrap} ${activeDeviceType == device.name ? styles.active : ''}`}>
                                        {device.icon}
                                    </div>
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
                                        label: <div style={{ color: activeOptionTab == 'Sections' ? token.colorPrimary : 'inherit' }} className={`${styles.segmentItem}`}>
                                            <div className={styles.iconWrap} style={{ color: activeOptionTab == 'Sections' ? token.colorPrimary : 'inherit' }} >
                                                <BsFillLayersFill />
                                            </div>
                                            <div>Sections</div>
                                        </div>,
                                        value: 'Sections'
                                    },
                                    {
                                        label: <div style={{ color: activeOptionTab == 'Editor' ? token.colorPrimary : 'inherit' }} className={`${styles.segmentItem}`}>
                                            <div className={styles.iconWrap} style={{ color: activeOptionTab == 'Editor' ? token.colorPrimary : 'inherit' }} >
                                                <BsPencil />
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
                            <SectionsContainer componentConfigs={componentConfigs} />
                        </div> : <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                {componentUID != null ? 'Edit content of selected section' : 'You have no component selected'}
                            </div>
                            {componentUID != null && <ComponentEditor componentUID={componentUID} builderState={builderState} />}
                        </div>}
                    </div>
                </Sider>
            </DragDropContext>
        </Layout>
    )
}

export default BuilderPage