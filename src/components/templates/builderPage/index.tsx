import styles from '@templatesCSS/builderPage/builderPage.module.scss'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, Layout, Row, Segmented, theme, Typography } from 'antd';
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState } from '@reduxStore/slices/darkMode';
const { Header, Content, Sider } = Layout;
const { Text, Paragraph, Link } = Typography;
import { BsPencil } from 'react-icons/bs';
import { BsLaptop } from 'react-icons/bs';
import { BsPhone } from 'react-icons/bs';
import { BsTabletLandscape } from 'react-icons/bs';
import { BsFillLayersFill } from 'react-icons/bs';
import { consoleLog } from '@util/conole.log';
import SectionsList from './sectionsList';
import Editor from './editor';


const DEVICE_TYPES = [
    { name: 'Mobile', icon: <BsPhone /> },
    { name: 'Tablet', icon: <BsTabletLandscape /> },
    { name: 'Laptop', icon: <BsLaptop /> },
]
function BuilderPage() {
    const isDarkMode = useAppSelector(getDarkModeState)
    const { token } = theme.useToken();
    const [activeOptionTab, setActiveOptionTab] = useState('Sections');
    const [activeDeviceType, setActiveDeviceType] = useState(DEVICE_TYPES[0].name)
    useEffect(() => {
        consoleLog(activeOptionTab)
    }, [activeOptionTab])

    return (
        <Layout className={styles.builderPageWrap}>
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
                        <Editor />
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
                            <SectionsList />
                        </div>
                    </div>
                </div>
            </Sider>
        </Layout>
    )
}

export default BuilderPage