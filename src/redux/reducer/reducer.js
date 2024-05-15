import { combineReducers } from "@reduxjs/toolkit";
import signerReducer from "./signerReducer";

const rootReducer = combineReducers({
    signerReducer,
});

export default rootReducer;