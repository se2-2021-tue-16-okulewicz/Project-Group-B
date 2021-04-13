import * as Actions from "./actions";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RequestResponse } from "./response";
import { IDog, ILostDog, ILostDogWithPicture } from "../dog/dogInterfaces";
import { ILoginResults } from "../registerLogin/loginRegisterInterfaces";
import { useState } from "react";
import config from "../config/config";
import { IContactInfo } from "../settings/contactInfoInterfaces";
import { useCookies } from "react-cookie";
import { initLostDogProps } from "../dog/dogClasses";

export type Error = {
  hasError: boolean;
  errorCode: number;
  erorMessage: string;
};

export type State = {
  dogs: ILostDogWithPicture[] | any;
  editedDog: ILostDogWithPicture|any;
  dogsLastPage: boolean|null;
  dogsRequireRefresh: boolean;
  settingsRequireRefresh:boolean;
  loading: boolean;
  error: Error;
  loginInformation: ILoginResults | null;
  contactInfo: IContactInfo|null;
  redirect: string | null;
};

export const init: State = {
  dogs: [],
  editedDog:null,
  dogsLastPage: false,
  dogsRequireRefresh: true,
  settingsRequireRefresh:true,
  loading: false,
  error: {
    hasError: false,
    errorCode: 0,
    erorMessage: "",
  },
  loginInformation: null,
  contactInfo: null,
  redirect: null,
};


export const reducer = createReducer(init, {
  [Actions.clearError.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.error = {
      hasError: false,
      errorCode: 0,
      erorMessage: "",
    };
    return newState;
  },

  [Actions.clearLoginInformation.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.loginInformation = null;
    newState.contactInfo = null;
    return newState;
  },

  [Actions.clearRedirect.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.redirect = null;
    return newState;
  },

  [Actions.fetchContactInfoThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.fetchContactInfoThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IContactInfo>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.contactInfo=payload.payload.response.data;
    newState.dogsRequireRefresh = true;
    return newState;
  },
  [Actions.fetchContactInfoThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IContactInfo>>
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


  [Actions.markDogAsFoundThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    //newState.dogsRequireRefresh = true;
    return newState;
  },
  [Actions.markDogAsFoundThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null>>
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

  [Actions.addDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    //newState.dogsRequireRefresh = true;
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
  [Actions.updateDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    //newState.dogsRequireRefresh = true;
    return newState;
  },
  [Actions.updateDogThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture>>
  ) => {
    let newState = _.cloneDeep(state);
    let errorResponse = payload.payload;
    newState.loading = false;
    newState.error = {
      hasError: true,
      errorCode: payload.payload?errorResponse.code:-1,
      erorMessage: payload.payload?errorResponse.response.message:"Update has failed",
    };
    return newState;
  },


  [Actions.fetchDogsThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },

  [Actions.fetchDogsThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[]>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    // if page filter not specified - set to default
    const pageNumber = _.get(
      payload,
      ["meta", "arg", "filters", "page"],
      config.defaultFilters.page
    );
    // if size filter not specified - set pageSize to default
    const pageSize = _.get(
      payload,
      ["meta", "arg", "filters", "size"],
      config.defaultFilters.size
    );
    // dogs obtained from server are appended to current dogs
    // the .slice protects dogs list enormous growth - when fetch
    // is called multiple times (by an error)
      newState.dogs = state.dogs
      .concat(payload.payload.response.data)
      .slice(0, (pageNumber + 1) * pageSize);
    
    // if response is shorter than default size - it means end is reached.
    newState.dogsLastPage = newState.dogs.length < pageSize;
    newState.dogsRequireRefresh = false;
    return newState;
  },

  [Actions.fetchOneDogThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture>>
  ) => {
    let newState = _.cloneDeep(state);
    let errorResponse = payload.payload;
    newState.loading = false;
    newState.error = {
      hasError: true,
      errorCode: errorResponse ? errorResponse.code : -1,
      erorMessage: errorResponse ? errorResponse.response.message : "",
    };
    return newState;
  },
  [Actions.fetchOneDogThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },

  [Actions.fetchOneDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.editedDog = payload.payload.response.data as ILostDogWithPicture;
    return newState;
  },

  [Actions.fetchDogsThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[]>>
  ) => {
    let newState = _.cloneDeep(state);
    let errorResponse = payload.payload;
    newState.loading = false;
    newState.error = {
      hasError: true,
      errorCode: errorResponse ? errorResponse.code : -1,
      erorMessage: errorResponse ? errorResponse.response.message : "",
    };
    return newState;
  },

  [Actions.loginThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.loginThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILoginResults>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.loginInformation = payload.payload.response.data as ILoginResults;
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

  [Actions.logoutThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.logoutThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.loginInformation = null;
    return newState;
  },
  [Actions.logoutThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null>>
  ) => {
    let newState = _.cloneDeep(state);
    let errorResponse = payload.payload;
    newState.loading = false;
    newState.loginInformation = null;
    newState.error = {
      hasError: true,
      errorCode: errorResponse.code,
      erorMessage: errorResponse.response.message,
    };
    return newState;
  },

  [Actions.registerRegularUserThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.registerRegularUserThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.redirect = "/";
    newState.loading = false;
    newState.loginInformation = payload.payload.response.data;
    return newState;
  },
  [Actions.registerRegularUserThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null>>
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
