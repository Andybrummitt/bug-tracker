import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import logger from "redux-logger";

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        user: userReducer
    }
});