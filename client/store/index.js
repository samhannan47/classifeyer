import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: { auth },
  middleware: [thunkMiddleware],
  devTools: true,
});
export * from "./auth";
