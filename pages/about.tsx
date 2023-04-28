import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import Layout from '@organisms/layout';
import { toggleDarkMode } from '@reduxStore/actions/common';
import { getDarkModeState } from '@reduxStore/selectors';
import { consoleLog } from '@util/conole.log';
import { Button, ConfigProvider, Space, Select, theme, Switch } from 'antd';
import { connect, useSelector } from 'react-redux';
import { ReactElement, useEffect, useState } from 'react';
import { TOGGLE_DARK_MODE } from '@constant/common';
import { wrapper } from '@reduxStore/store/store';

const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
];

function about(props) {

    const dispatch = useAppDispatch();
    const isDarkMode = useSelector((state: any) => state.isDarkMode);

    useEffect(() => {
        consoleLog('isdarkmode.isdarkmode', props);
    }, [props])

    useEffect(() => {
        consoleLog('about isdarkmode.isdarkmode', isDarkMode.isdarkmode);
    }, [isDarkMode])

    return (
        <div
            style={{
                background: isDarkMode.isdarkmode ? 'black' : 'white',
                height: 'calc(100vh - 40px)',
                padding: '20px',
            }}>
            {/* <ConfigProvider
                theme={{
                    algorithm: isDarkMode.isdarkmode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}

            >
            </ConfigProvider> */}
            <Space direction="vertical">
                <Switch
                    checked={isDarkMode.isdarkmode}
                    checkedChildren="Dark Mode"
                    unCheckedChildren="Light Mode"
                    onChange={() => dispatch(toggleDarkMode(!isDarkMode.isdarkmode))}
                />
                <Space wrap>
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        options={options}
                    />
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        disabled
                        options={options}
                    />
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        loading
                        options={options}
                    />
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        allowClear
                        options={options}
                    />
                </Space>
            </Space>
        </div>
    );
}

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
    store.dispatch({ type: TOGGLE_DARK_MODE, payload: false });
    return { props: { isDarkMode: false } };
});

about.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default connect()(about);