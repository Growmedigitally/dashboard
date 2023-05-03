import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import Layout from '@organisms/layout';
import { consoleLog } from '@util/conole.log';
import { Button, ConfigProvider, Space, Select, theme, Switch } from 'antd';
import { connect, useSelector } from 'react-redux';
import { ReactElement, useEffect, useState } from 'react';
import { TOGGLE_DARK_MODE } from '@constant/common';
import { wrapper } from '@reduxStore/store/store';
import { toggleDarkMode } from '@reduxStore/slices/darkMode';

const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
];


const BuggyCounter = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }

    if (count === 5) {
        throw new Error("New Crashing Seq. Initiated");
    }

    return (
        <div className="counter--block">
            <span>Count</span>
            <span>{count}</span>
            <button onClick={handleIncrement}>Increment count</button>
        </div>
    );
}

function about(props) {
    return (
        <div>
            hi
            <BuggyCounter />
        </div>
    );
}


// export const getStaticProps = wrapper.getStaticProps(({ store }) => {
//     store.dispatch({ type: TOGGLE_DARK_MODE, payload: false });
//     return { props: { isDarkMode: false } };
// });

about.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default connect()(about);