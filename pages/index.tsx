import Layout from "@organisms/layout";
import { selectAuthUser, setAuthUser } from "@reduxStore/reducers/authSlice";
import { wrapper } from "@reduxStore/store/store";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const authUser = useSelector(selectAuthUser);
    const dispatch = useDispatch();
    return (
        <div>
            <div style={{ color: 'white' }}>{authUser ? "Logged in" : "Not Logged In"}</div>
            <button
                onClick={() =>
                    authUser
                        ? dispatch(setAuthUser(false))
                        : dispatch(setAuthUser(true))
                }
            >
                {authUser ? "Logout" : "LogIn"}
            </button>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            // we can set the initial User from here
            // we are setting to false but you can run your custom logic here
            await store.dispatch(setAuthUser(false));
            console.log("User on server", store.getState());
            return {
                props: {
                    authUser: false,
                },
            };
        }
);

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Home;
