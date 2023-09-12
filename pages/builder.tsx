import Layout from "@organisms/layout";
import BuilderPage from "@template/builderPage";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Builder: NextPageWithLayout = () => <BuilderPage />

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

Builder.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Builder;