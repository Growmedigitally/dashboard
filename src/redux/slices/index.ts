import { combineReducers } from "@reduxjs/toolkit";
import { auth } from "./auth";
import { loader } from "./loader";
import { alert } from "./alert";
import { toast } from "./toast";
import { darkMode } from "./darkMode";
import { builderState } from "./builderState";
import { activeEditorComponent } from "./activeEditorComponent";

const rootReducer = combineReducers({
  [auth.name]: auth.reducer,
  [loader.name]: loader.reducer,
  [alert.name]: alert.reducer,
  [toast.name]: toast.reducer,
  [darkMode.name]: darkMode.reducer,
  [builderState.name]: builderState.reducer,
  [activeEditorComponent.name]: activeEditorComponent.reducer,
});
export default rootReducer;