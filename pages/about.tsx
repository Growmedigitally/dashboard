import Layout from '@organisms/layout';
import { connect } from 'react-redux';
import { ReactElement, useState } from 'react';

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