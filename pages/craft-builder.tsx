import CraftBuilder from "@template/craftBuilder";
import Layout from "@organisms/layout";
import { wrapper } from "@reduxStore/store/store";
import BuilderPage from "@template/builderPage";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Builder: NextPageWithLayout = () => <CraftBuilder />
Builder.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Builder;