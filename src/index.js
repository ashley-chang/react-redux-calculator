import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

import App from "./components/App.js";

import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <div className="app-container">
      <App />
    </div>
  </Provider>,
  rootElement
);
