import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import { apiSlice } from "./api/apiSlice";
import modalReducer from "./modalSlice";
import feedReducer from "./feedSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,

        modal: modalReducer,
        feed: feedReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});
export default store;