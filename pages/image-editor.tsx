import ImageEditor from "@template/imageEditor";
import Layout from "@organisms/layout";
import { wrapper } from "@reduxStore/store/store";
import BuilderPage from "@template/builderPage";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Builder: NextPageWithLayout = () => <ImageEditor />
Builder.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Builder;