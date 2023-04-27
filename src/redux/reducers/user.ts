import { UPDATE_USER_DATA } from "src/constants/user";

/* eslint-disable no-case-declarations */
export function user(state: any = '', action) {// reduxState = {loader: action.payload}
    switch (action.type) {
        case UPDATE_USER_DATA:
            return (action.payload);
        default:
            return state;
    }
}
