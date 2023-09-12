import SvgIcon from "@atoms/svgIcon";
import { useAppDispatch } from "@hook/useAppDispatch";
import Layout from "@organisms/layout";
import { showErrorToast, showSuccessToast, showToast, showWarningToast } from "@reduxStore/slices/toast";
import { Button } from "antd";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <Button onClick={() => dispatch(showToast("Toast Toast Message"))}>Show  Toast</Button>
        </div>
    );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) =>
//         async ({ params }) => {
//             // we can set the initial User from here
//             // we are setting to false but you can run your custom logic here
//             // await store.dispatch(showAlert({ message: "hieee" }));
//             console.log("state on server", store.getState());
//             return {
//                 props: {},
//             };
//         }
// );

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Home;