import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
import config from "../config/config";
import * as Actions from "./actions";

const init = {
  token: null,
};

export const reducer = createReducer(init, {
  [Actions.logInThunk.pending]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "loggingIn";
    return newState;
  },

  [Actions.logInThunk.fulfilled]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "redirectToCars";
    newState.token = action.payload.token;
    return newState;
  },

  [Actions.logInThunk.rejected]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "logInError";
    newState.error = action.payload.code;
    newState.errorBody = action.payload.body;
    return newState;
  },
  [Actions.setIdle]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "idle";
    newState.error = null;
    newState.errorBody = {};
    return newState;
  },
});
