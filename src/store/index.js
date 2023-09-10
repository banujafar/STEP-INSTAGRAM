import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import { apiSlice } from "./api/apiSlice";
import modalReducer from "./modalSlice";
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,

        modal: modalReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});
export default store;
