import * as Actions from "./actions";
import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
//import config from "../config/config";

const init = {
  token: null,
};

export const reducer = createReducer(init, {});
/*
[Actions.addDogThunk.pending]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "adding";
    return newState;
  },

  [Actions.addDogThunk.fulfilled]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "idle";
    return newState;
  },

  [Actions.addDogThunk.rejected]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "error";
    newState.error = action.payload.code;
    newState.errorBody = action.payload.body;
    return newState;
  },*/
