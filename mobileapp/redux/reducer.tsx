import * as Actions from "./actions";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RequestResponse } from "./response";
import { ILoginResults } from "../components/loginRegisterInterfaces";
import { ILostDogWithPicture } from "../components/dogs/dog/dogInterfaces";

export type Error = {
  hasError: boolean;
  errorCode: number;
  erorMessage: string;
};

export type State = {
  dogs: ILostDogWithPicture[] | any;
  loading: boolean;
  error: Error;
  loginInformation: ILoginResults | null;
};

const init: State = {
  dogs: [],
  loading: false,
  error: {
    hasError: false,
    errorCode: 0,
    erorMessage: "",
  },
  loginInformation: null,
};

export const reducer = createReducer(init, {
  [Actions.clearLoginInformation.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.loginInformation = null;
    return newState;
  },
  [Actions.incorrectUserType.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.loginInformation = null;
    newState.error.hasError = true;
    newState.error.errorCode = 1;
    newState.error.erorMessage =
      "Mobile application is not available for admins or shelter managers";
    return newState;
  },

  [Actions.loginThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    newState.error.hasError = false;
    newState.error.errorCode = 0;
    newState.error.erorMessage = "";
    return newState;
  },
  [Actions.loginThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILoginResults>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.loginInformation = payload.payload.response.data;
    return newState;
  },
  [Actions.loginThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILoginResults>>
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
