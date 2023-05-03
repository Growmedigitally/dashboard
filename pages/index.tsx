import SvgIcon from "@atoms/svgIcon";
import { useAppDispatch } from "@hook/useAppDispatch";
import Layout from "@organisms/layout";
import { showErrorToast, showSuccessToast, showToast, showWarningToast } from "@reduxStore/slices/toast";
import { wrapper } from "@reduxStore/store/store";
import { Button } from "antd";
import { ReactElement } from "react";

const Home = () => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <Button onClick={() => dispatch(showToast("Toast Toast Message"))}>Show  Toast</Button>
            <Button onClick={() => dispatch(showSuccessToast("Toast Success Message"))}>Show  Success</Button>
            <Button onClick={() => dispatch(showErrorToast("Toast Error Message"))}>Show  Error</Button>
            <Button onClick={() => dispatch(showWarningToast("Toast warning Message"))}>Show  warning</Button>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            // we can set the initial User from here
            // we are setting to false but you can run your custom logic here
            // await store.dispatch(showAlert({ message: "hieee" }));
            console.log("User on server", store.getState());
            return {
                props: {
                    loader: null,
                },
            };
        }
);

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Home;
