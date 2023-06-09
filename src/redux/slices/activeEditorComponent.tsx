import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store/store";
import { HYDRATE } from "next-redux-wrapper";
const HYDRATE_ACTION = createAction(HYDRATE)

export interface ActiveEditorComponent {
    activeEditorComponent: any;
}

const initialState: ActiveEditorComponent = {
    activeEditorComponent: null,
};

export const activeEditorComponent = createSlice({
    name: "activeEditorComponent",
    initialState,
    reducers: {
        updateActiveEditorComponent(state, action) {
            state.activeEditorComponent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE_ACTION, (state, action: any) => {
                return {
                    ...state,
                    ...action.payload.activeEditorComponent,
                };
            })
    },
});

export const { updateActiveEditorComponent } = activeEditorComponent.actions;

export const getActiveEditorComponent = (state: AppState) => state.activeEditorComponent?.activeEditorComponent;