import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./redux/reducers";
import App from "./App";

let middleWare = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleWare.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middleWare));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
