import { createStore, applyMiddleware, combineReducers } from 'redux'
import rootReducer from "src/redux/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { MakeStore, HYDRATE, createWrapper, Context } from "next-redux-wrapper";
import { windowRef } from 'src/utils/window';
import { consoleLog } from 'src/utils/conole.log';


const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.isDarkMode.isDarkMode) nextState.isDarkMode.isDarkMode = state.isDarkMode.isDarkMode
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export const makeStore: any = (context: Context) =>
    createStore(reducer, bindMiddleware([]));

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;
export const wrapper = createWrapper(makeStore, { debug: false });
