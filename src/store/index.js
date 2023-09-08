import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userProfileSlice";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = configureStore(
  {
    reducer: { userProfile: userProfileReducer },
  },
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;
