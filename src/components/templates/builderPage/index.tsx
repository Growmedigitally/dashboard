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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import SectionsList from './sectionsList';


const DEVICE_TYPES = [
    { name: 'Mobile', icon: <BsPhone /> },
    { name: 'Tablet', icon: <BsTabletLandscape /> },
    { name: 'Laptop', icon: <BsLaptop /> },
]

const ITEMS = [
    {
        id: uuid(),
        content: 'Headline'
    },
    {
        id: uuid(),
        content: 'Copy'
    },
    {
        id: uuid(),
        content: 'Image'
    },
    {
        id: uuid(),
        content: 'Slideshow'
    },
    {
        id: uuid(),
        content: 'Quote'
    }
];


function BuilderPage() {
    const isDarkMode = useAppSelector(getDarkModeState)
    const { token } = theme.useToken();
    const [activeOptionTab, setActiveOptionTab] = useState('Sections');
    const [activeDeviceType, setActiveDeviceType] = useState(DEVICE_TYPES[0].name);
    const [droppedComponentsList, setDroppedComponentsList] = useState({
        [uuid()]: []
    })

    useEffect(() => {
        consoleLog(activeOptionTab)
    }, [activeOptionTab])


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
                setDroppedComponentsList({
                    [destination.droppableId]: reorder(
                        droppedComponentsList[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                setDroppedComponentsList({
                    [destination.droppableId]: copy(
                        ITEMS,
                        droppedComponentsList[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                setDroppedComponentsList(
                    move(
                        droppedComponentsList[source.droppableId],
                        droppedComponentsList[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };

    return (
        <Layout className={styles.builderPageWrap}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Layout className={styles.builderLeftWrap}>
                    <Header className={`${styles.headerWrap} ${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"}`}>
                        <Row>
                            <Col className={styles.headingWrap} span={18}>
                                <Text>EcomAi Website Builder</Text>
                            </Col>
                            <Col className={styles.sizeWrap} span={6}>
                                {DEVICE_TYPES.map((device: any, i: number) => {
                                    return <div key={i} onClick={() => setActiveDeviceType(device.name)} className={`iconWrap hover ${styles.iconWrap} ${activeDeviceType == device.name ? styles.active : ''}`}>
                                        {device.icon}
                                    </div>
                                })}
                            </Col>
                        </Row>
                    </Header>
                    <Content className={`${styles.editorWrap} ${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"}`}>
                        <div className={styles.editorContent}>
                            {Object.keys(droppedComponentsList).map((list, i) => {
                                console.log('==> list', list);
                                return (
                                    <Droppable key={list} droppableId={list}>
                                        {(provided, snapshot) => (
                                            <div className={`${styles.listWrap} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`}
                                                ref={provided.innerRef}>
                                                {droppedComponentsList[list].length
                                                    ? droppedComponentsList[list].map(
                                                        (item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(
                                                                    provided,
                                                                    snapshot
                                                                ) => (
                                                                    <div className={`${styles.itemWrap} ${snapshot.isDragging ? styles.isDragging : ''}`}
                                                                        {...provided.dragHandleProps}
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        isDragging={
                                                                            snapshot.isDragging
                                                                        }
                                                                        style={
                                                                            provided
                                                                                .draggableProps
                                                                                .style
                                                                        }>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    )
                                                    : !provided.placeholder && (
                                                        <div className={styles.emptyEditorWrap}>
                                                            Drop items here
                                                        </div>
                                                    )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                );
                            })}
                        </div>
                    </Content>
                </Layout>
                <Sider
                    className={`${styles.builderRightWrap} ${isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"}`}>
                    <div className={styles.sidebarWrap}>
                        <div className={styles.segmentWrap}>
                            <Segmented
                                size="large"
                                block={true}
                                onChange={(tab: any) => setActiveOptionTab(tab)}
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
                        <div className={styles.sidebarContentWrap}>
                            <div className={styles.note} style={{ color: token.colorPrimary }}>
                                Drag and drop section to left builder area
                            </div>
                            <div className={styles.sectionWrap}>
                                <SectionsList ITEMS={ITEMS} />
                            </div>
                        </div>
                    </div>
                </Sider>
            </DragDropContext>
        </Layout>
    )
}

export default BuilderPage