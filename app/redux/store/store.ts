import { createStore, applyMiddleware, combineReducers } from 'redux'
import rootReducer from "app/redux/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { MakeStore, HYDRATE, createWrapper, Context } from "next-redux-wrapper";
import { windowRef } from '@util/window';


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
