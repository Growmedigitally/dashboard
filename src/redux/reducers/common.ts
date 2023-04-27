import { TOGGLE_DARK_MODE } from "src/constants/common";

/* eslint-disable no-case-declarations */
export function isDarkMode(state: any = false, action) {// reduxState = {isDarkMode: action.payload}
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            // return Object.assign({}, state, {
            //     isDarkMode: action.payload || state
            // });
            return { ...state, isDarkMode: action.payload }
        default:
            return state;
    }
}
