import * as Actions from "./actions";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RequestResponse } from "./response";
import {
  ILostDogWithPicture,
  IShelterDog,
  IShelterDogWithPicture,
} from "../dog/dogInterfaces";
import config from "../config/config";
import { IContactInfo } from "../contactInfo/contactInfoInterface";
import { ValidateFetchedDog } from "../utilityComponents/validation";
import { ILoginResults } from "../registerLogin/LoginRegisterInterface";

export type Error = {
  hasError: boolean;
  errorCode: number;
  erorMessage: string;
};

/*TODO: change any in the State*/

export type State = {
  dogs: ILostDogWithPicture[] | any; //if these are not any, the clear actions throw an error (only for dogs with pictures)
  shelterdogs: IShelterDog[] | any;
  editedDog: ILostDogWithPicture | any; //
  dogsLastPage: boolean | null;
  dogsRequireRefresh: boolean;
  settingsRequireRefresh: boolean;
  loading: boolean;
  error: Error;
  loginInformation: ILoginResults | null;
  contactInfo: IContactInfo | null;
  redirect: string | null;
  pages: number;
};

export const init: State = {
  dogs: [],
  shelterdogs: [],
  editedDog: null,
  dogsLastPage: false,
  dogsRequireRefresh: true,
  settingsRequireRefresh: true,
  loading: false,
  error: {
    hasError: false,
    errorCode: 0,
    erorMessage: "",
  },
  loginInformation: null,
  contactInfo: null,
  redirect: null,
  pages: 0,
};

export const reducer = createReducer(init, {
  [Actions.clearError.type]: (state: State) => {
    let newState = _.cloneDeep(state as State);
    newState.error = {
      hasError: false,
      errorCode: 0,
      erorMessage: "",
    };
    return newState as State;
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

  [Actions.clearDogList.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.dogs = [];
    newState.shelterdogs = [];
    newState.dogsRequireRefresh = true;
    newState.dogsLastPage = false;
    newState.editedDog = null;
    return newState;
  },
  [Actions.startRefreshing.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.dogsRequireRefresh = true;
    return newState;
  },
  [Actions.finishRefreshing.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.dogsRequireRefresh = false;
    newState.settingsRequireRefresh = true;
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
    payload: PayloadAction<RequestResponse<IContactInfo, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.contactInfo = payload.payload.response.data as IContactInfo;
    return newState;
  },
  [Actions.fetchContactInfoThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IContactInfo, undefined>>
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
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.dogsRequireRefresh = true;
    return newState;
  },
  [Actions.markDogAsFoundThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.markDogAsFoundThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
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
    payload: PayloadAction<RequestResponse<ILostDogWithPicture, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.dogsRequireRefresh = true;
    return newState;
  },
  [Actions.addDogThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.dogs = [];
    newState.loading = true;
    return newState;
  },
  [Actions.addDogThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
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
  [Actions.addShelterDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IShelterDogWithPicture, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.dogsRequireRefresh = true;
    return newState;
  },
  [Actions.addShelterDogThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.shelterdogs = [];
    newState.loading = true;
    return newState;
  },
  [Actions.addShelterDogThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
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
    payload: PayloadAction<RequestResponse<ILostDogWithPicture, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.dogsRequireRefresh = true;
    return newState;
  },
  [Actions.updateDogThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    let errorResponse = payload.payload;
    newState.loading = false;
    newState.error = {
      hasError: true,
      errorCode: payload.payload ? errorResponse.code : -1,
      erorMessage: payload.payload
        ? errorResponse.response.message
        : "Update has failed",
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
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[], number>>
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
    if (state.dogs != null || pageNumber != 0) {
      newState.dogs = state.dogs
        .concat(payload.payload.response.data as ILostDogWithPicture[])
        .slice(0, (pageNumber + 1) * pageSize);
    } else {
      newState.dogs = (
        payload.payload.response.data as ILostDogWithPicture[]
      ).slice(0, (pageNumber + 1) * pageSize);
    }
    // if response is shorter than default size - it means end is reached.
    newState.dogsLastPage =
      (payload.payload.response.data as ILostDogWithPicture[]).length <
      pageSize;
    newState.pages = pageNumber;
    newState.dogsRequireRefresh = false;
    //console.log("pageNumber " + pageNumber + "\nlastpage: " + newState.dogsLastPage + "\nrefresh: " + newState.dogsRequireRefresh);
    return newState;
  },

  [Actions.fetchDogsThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<undefined, undefined>>
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

  [Actions.fetchShelterDogsThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },

  [Actions.fetchShelterDogsThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IShelterDog[], number>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    const pageNumber = _.get(
      payload,
      ["meta", "arg", "filters", "page"],
      config.defaultFilters.page
    );
    const pageSize = _.get(
      payload,
      ["meta", "arg", "filters", "size"],
      config.defaultFilters.size
    );
    if (state.shelterdogs != null || pageNumber != 0) {
      newState.shelterdogs = state.shelterdogs
        .concat(payload.payload.response.data as IShelterDog[])
        .slice(0, (pageNumber + 1) * pageSize);
    } else {
      newState.shelterdogs = (
        payload.payload.response.data as IShelterDog[]
      ).slice(0, (pageNumber + 1) * pageSize);
    }
    newState.dogsLastPage =
      (payload.payload.response.data as IShelterDog[]).length < pageSize;
    newState.pages = pageNumber;
    newState.dogsRequireRefresh = false;
    //console.log("pageNumber " + pageNumber + "\nlastpage: " + newState.dogsLastPage + "\nrefresh: " + newState.dogsRequireRefresh);
    return newState;
  },

  [Actions.fetchShelterDogsThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<undefined, undefined>>
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

  [Actions.updateContactInfoThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IContactInfo, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.contactInfo = payload.payload.response.data as IContactInfo;
    return newState;
  },
  [Actions.updateContactInfoThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IContactInfo, undefined>>
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

  [Actions.updateContactInfoThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },

  [Actions.fetchOneDogThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<undefined, undefined>>
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
    //newState.settingsRequireRefresh=true;
    return newState;
  },

  [Actions.fetchOneDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.editedDog = ValidateFetchedDog(
      payload.payload.response.data as ILostDogWithPicture
    );
    newState.editedDog.picture.data = (
      payload.payload.response.data as ILostDogWithPicture
    ).picture.data as string;
    newState.dogsRequireRefresh = false;
    newState.settingsRequireRefresh = false;
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
    payload: PayloadAction<RequestResponse<ILoginResults, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.loginInformation = payload.payload.response.data as ILoginResults;
    return newState;
  },
  [Actions.loginThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILoginResults, undefined>>
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
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.loginInformation = null;
    //newState.dogs = [];
    //newState.shelterdogs = [];
    return newState;
  },
  [Actions.logoutThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
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
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.redirect = "/";
    newState.loading = false;
    newState.loginInformation = payload.payload.response.data;
    return newState;
  },
  [Actions.registerRegularUserThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
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
