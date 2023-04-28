import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../reducers/authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});
export default rootReducer;