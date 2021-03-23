import { configureStore } from "@reduxjs/toolkit";
import * as Reducer from "./reducer";

const store = configureStore({
  reducer: Reducer.reducer,
});

export default store;
