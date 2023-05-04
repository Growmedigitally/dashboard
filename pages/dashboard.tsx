import HomePage from "src/components/templates/homePage";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "src/components/organisms/layout";

const Home: NextPageWithLayout = () => <HomePage />;

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home;

