import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userProfileSlice";
import feedReducer from "./feedSlice";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = configureStore(
  {
    reducer: { 
      userProfile: userProfileReducer ,
      feed: feedReducer,
    },
  },
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;
