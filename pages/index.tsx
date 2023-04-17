import Layout from "@module/layout";
import HomePage from "@template/homePage";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => <HomePage />;

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home;

