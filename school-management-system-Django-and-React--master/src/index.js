import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import 'antd/dist/antd.css';

import authReducer from "./store/reducers/auth";
import assignmentReducer from "./store/reducers/assignment";
import gradedReducer from './store/reducers/graded'


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  assignment: assignmentReducer,
  grad: gradedReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
