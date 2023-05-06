import styles from '@templatesCSS/builderPage/builderPage.module.scss'
import React, { useEffect, useState } from 'react'
import { Col, Layout, Row, Segmented, theme, Typography } from 'antd';
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState } from '@reduxStore/slices/darkMode';
const { Header, Content, Sider } = Layout;
const { Text } = Typography;
import { BsPencil } from 'react-icons/bs';
import { BsLaptop } from 'react-icons/bs';
import { BsPhone } from 'react-icons/bs';
import { BsTabletLandscape } from 'react-icons/bs';
import { BsFillLayersFill } from 'react-icons/bs';
import { consoleLog } from '@util/conole.log';
import { v4 as uuid } from 'uuid';
import SectionsContainer from './sectionsContainer';
import BuilderContainer from './builderContainer';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch } from '@hook/useAppDispatch';
import { getBuilderState, updateBuilderState } from '@reduxStore/slices/builderState';
import ComponentEditor from '@organisms/componentEditor';
import { getActiveEditorComponent, updateActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';


const DEVICE_TYPES = [
    { name: 'Mobile', icon: <BsPhone /> },
    { name: 'Tablet', icon: <BsTabletLandscape /> },
    { name: 'Laptop', icon: <BsLaptop /> },
]

const ITEMS = [
    {
        id: uuid(),
        text: 'Header Bar'
    },
    {
        id: uuid(),
        text: 'Hero Banners'
    },
    {
        id: uuid(),
        text: 'How it works'
    },
    {
        id: uuid(),
        text: 'Slideshow'
    },
    {
        id: uuid(),
        text: 'Footer'
    }
];


function BuilderPage() {
    const isDarkMode = useAppSelector(getDarkModeState)
    const { token } = theme.useToken();
    const [activeOptionTab, setActiveOptionTab] = useState('Sections');
    const [activeDeviceType, setActiveDeviceType] = useState(DEVICE_TYPES[0].name);
    const dispatch = useAppDispatch();
    // const [droppedComponentsList, setDroppedComponentsList] = useState({
    //     [uuid()]: []
    // })
    const droppedComponentsList = useAppSelector(getBuilderState) || { [uuid()]: [] };
    const activeComponentID = useAppSelector(getActiveEditorComponent);

    useEffect(() => {
        if (activeComponentID != null) setActiveOptionTab('Editor');
    }, [activeComponentID])


    const onClickOptionsTab = (tab: any) => {
        setActiveOptionTab(tab);
        dispatch(updateActiveEditorComponent(null));
    }
    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    /**
     * Moves an item from one list to another list.
     */
    const copy = (source, destination, droppableSource, droppableDestination) => {
        console.log('==> dest', destination);
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const item: any = sourceClone[droppableSource.index];
        destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
        return destClone;
    };

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

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
                    [destination.droppableId]: reorder(droppedComponentsList[source.droppableId], source.index, destination.index)
                }));
                break;
            case 'ITEMS':
                dispatch(updateBuilderState({
                    [destination.droppableId]: copy(ITEMS, droppedComponentsList[destination.droppableId], source, destination)
                }));
                break;
            default:
                dispatch(updateBuilderState(
                    move(droppedComponentsList[source.droppableId], droppedComponentsList[destination.droppableId], source, destination)
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
                    <Content className={`${styles.editorWrap} ${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"}`} style={{
                        background: token.colorBgLayout
                    }}>
                        <div className={styles.editorContent}>
                            <BuilderContainer droppedComponentsList={droppedComponentsList} activeDeviceType={activeDeviceType} />
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
                            <div className={styles.sectionWrap}>
                                <SectionsContainer ITEMS={ITEMS} />
                            </div>
                        </div> : <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                {activeComponentID != null ? 'Edit content of selected section' : 'You have no component selected'}
                            </div>
                            {activeComponentID != null && <div className={styles.editorWrap}>
                                <ComponentEditor activeComponentID={activeComponentID} droppedComponentsList={droppedComponentsList} />
                            </div>}
                        </div>}
                    </div>
                </Sider>
            </DragDropContext>
        </Layout>
    )
}

export default BuilderPage