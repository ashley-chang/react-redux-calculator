import React from "react";
import { createStore, combineReducers } from "redux";
import reducers from "../reducers/reducers.js";

// export const store = createStore(
//   combineReducers(
//     { state: reducers } //this is getting imported from the file
//   )
// );

export const store = createStore(reducers);
