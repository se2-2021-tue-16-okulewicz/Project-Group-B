import * as Actions from "./actions";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RequestResponse } from "./response";
import { ILostDogWithPicture } from "../dog/dogInterfaces";

export type Error = {
  hasError: boolean;
  errorCode: number;
  erorMessage: string;
};

export type State = {
  loading: boolean;
  error: Error;
};

const init: State = {
  loading: false,
  error: {
    hasError: false,
    errorCode: 0,
    erorMessage: "",
  },
};

export const reducer = createReducer(init, {
  [Actions.addDogThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.addDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    return newState;
  },
  [Actions.addDogThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture>>
  ) => {
    let newState = _.cloneDeep(state);
    let errorResponse = payload.payload;
    newState.loading = false;
    newState.error = {
      hasError: true,
      errorCode: errorResponse.code,
      erorMessage: errorResponse.response.message,
    };
    return newState;
  },
});
