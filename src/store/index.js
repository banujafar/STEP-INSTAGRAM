import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import { apiSlice } from "./api/apiSlice";
import modalReducer from "./modalSlice";
import userRedcuer from "./userSlice"
import feedReducer from "./feedSlice";
import allUsersReducer from "./allUsersSlice";
import addPostReducer from "./addPostSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    modal: modalReducer,
    feed: feedReducer,
    allUsers: allUsersReducer,
    user: userRedcuer,
    addPost: addPostReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware),
  devTools: true,
});
export default store;
