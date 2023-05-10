import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '@templatesCSS/builderPage/sectionsContainer.module.scss'
import ComponentRenderer from '@organisms/componentRenderer';
import SectionsList from '@organisms/sections/sectionsList';
import { Collapse, theme } from 'antd';
const { Panel } = Collapse;

function SectionsContainer({ ComponentConfigs }) {

    const { token } = theme.useToken();
    const onChange = (key: string | string[]) => {
        console.log(key);
    };
    return (
        <div>
            <Droppable droppableId="ECOMAI_BUILDER" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <div className={`${styles.sectionsContainer} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`} ref={provided.innerRef}>
                        <>
                            {SectionsList.map((section, i) => {
                                return <Collapse key={i}
                                    // bordered={false}
                                    style={{ background: token.colorBgLayout }}
                                    expandIconPosition='end'
                                    defaultActiveKey={[section]}
                                    onChange={onChange}
                                    size="small"
                                    className={styles.sectionConatiner}
                                >
                                    <Panel header={section}
                                        key={section}
                                        className={styles.sectionList}
                                        style={{ color: token.colorPrimary, fontSize: '13px', fontFamily: 'poppins-semibold' }}
                                    >
                                        {ComponentConfigs.map((item, index) => {
                                            return <React.Fragment key={index}>
                                                {item.section == section && <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <React.Fragment>
                                                            <div className={`${styles.componentWrap} ${snapshot.isDragging ? styles.draggingInProgress : ''}`}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={provided.draggableProps.style}>
                                                                <ComponentRenderer
                                                                    uid={item.uid}
                                                                    componentsList={ComponentConfigs}
                                                                    index={index}
                                                                    currentPage={'SECTIONS'}
                                                                    componentConfig={item}
                                                                />
                                                            </div>
                                                            {snapshot.isDragging && (
                                                                <div className={`${styles.componentWrap} ${styles.draggingItem} ${styles.draggingInProgress}`}>
                                                                    <ComponentRenderer
                                                                        uid={item.uid}
                                                                        componentsList={ComponentConfigs}
                                                                        index={index}
                                                                        currentPage={'SECTIONS'}
                                                                        componentConfig={item}
                                                                    />
                                                                </div>
                                                            )}
                                                        </React.Fragment>
                                                    )}
                                                </Draggable>}
                                            </React.Fragment>
                                        })}
                                    </Panel>
                                </Collapse>
                            })}
                        </>
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default SectionsContainer