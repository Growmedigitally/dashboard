
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "./store";

persistStore(store); // persist the store

export function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
}