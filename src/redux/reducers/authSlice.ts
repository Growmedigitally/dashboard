import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "../store/store";
import { HYDRATE } from "next-redux-wrapper";

export interface AuthUser {
  authUser: boolean;
}

const initialState: AuthUser = {
  authUser: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthUser } = authSlice.actions;

export const selectAuthUser = (state: AppState) => state.auth?.authUser;

export default authSlice.reducer;
