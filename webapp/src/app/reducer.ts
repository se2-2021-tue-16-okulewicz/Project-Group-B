import * as Actions from "./actions";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RequestResponse } from "./response";
import {
  ILostDogWithPicture,
  ILostDogWithPictureAndComments,
  IShelterDog,
  IShelterDogWithPicture,
} from "../dog/dogInterfaces";
import config from "../config/config";
import { IContactInfo } from "../contactInfo/contactInfoInterface";
import { ValidateFetchedDog } from "../utilityComponents/validation";
import { ILoginResults } from "../registerLogin/LoginRegisterInterface";
import { IShelter } from "../shelter/shelterInterfaces";
import { initState, State } from "./stateInterfaces";
import { ICommentWithIdAndAuthor } from "../dog/dogComments/commentsInterfaces";

export const reducer = createReducer(initState, {
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
    newState.shelters = [];
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
    newState.dogsRequireRefresh = false;
    return newState;
  },
  [Actions.addDogThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.dogsRequireRefresh = false;
    let errorResponse = payload.payload;
    newState.loading = false;
    newState.error = {
      hasError: true,
      errorCode: errorResponse.code,
      erorMessage: errorResponse.response.message,
    };
    return newState;
  },
  [Actions.addCommentThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ICommentWithIdAndAuthor, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.editedDog.comments = state.editedDog.comments.concat(
      payload.payload.response.data as ICommentWithIdAndAuthor
    );
    return newState;
  },
  [Actions.addCommentThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.addCommentThunk.rejected.toString()]: (
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
  [Actions.editCommentThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ICommentWithIdAndAuthor, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    const index = state.editedDog.comments.findIndex((el:ICommentWithIdAndAuthor) => el.id === (payload.payload.response.data as ICommentWithIdAndAuthor).id)
    if(index < newState.editedDog.comments.length){
        newState.editedDog.comments[index] = payload.payload.response.data as ICommentWithIdAndAuthor;}
      
    return newState;
  },
  [Actions.editCommentThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.editCommentThunk.rejected.toString()]: (
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
    payload: PayloadAction<
      RequestResponse<ILostDogWithPictureAndComments, undefined>
    >
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
    if (state.dogs !== null || pageNumber !== 0) {
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

    if (state.shelterdogs !== null || pageNumber !== 0) {
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

  [Actions.fetchSheltersThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },

  [Actions.fetchSheltersThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IShelter[], number>>
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
    if (state.shelters !== null || pageNumber !== 0) {
      newState.shelters = state.shelters
        .concat(payload.payload.response.data as IShelter[])
        .slice(0, (pageNumber + 1) * pageSize);
    } else {
      newState.shelters = (payload.payload.response.data as IShelter[]).slice(
        0,
        (pageNumber + 1) * pageSize
      );
    }
    newState.dogsLastPage =
      (payload.payload.response.data as IShelter[]).length < pageSize;
    newState.pages = pageNumber;
    newState.dogsRequireRefresh = false;
    //console.log("pageNumber " + pageNumber + "\nlastpage: " + newState.dogsLastPage + "\nrefresh: " + newState.dogsRequireRefresh);
    return newState;
  },

  [Actions.fetchSheltersThunk.rejected.toString()]: (
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
    newState.editedDog = null;
    return newState;
  },

  [Actions.fetchOneDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<
      RequestResponse<ILostDogWithPictureAndComments, undefined>
    >
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.editedDog = null;
    newState.editedDog = ValidateFetchedDog(
      payload.payload.response.data as ILostDogWithPictureAndComments
    );
    newState.editedDog.picture.data = (
      payload.payload.response.data as ILostDogWithPictureAndComments
    ).picture.data as string;
    newState.comments = (payload.payload.response.data as ILostDogWithPictureAndComments).comments as ICommentWithIdAndAuthor[];
    newState.dogsRequireRefresh = false;
    newState.settingsRequireRefresh = false;
    return newState;
  },

  [Actions.deleteOneShelterDogThunk.rejected.toString()]: (
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
  [Actions.deleteOneShelterDogThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    //newState.settingsRequireRefresh=true;
    return newState;
  },

  [Actions.deleteOneShelterDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.shelterdogs = [];
    newState.shelterDog = null;
    newState.dogsRequireRefresh = true;
    newState.settingsRequireRefresh = false;
    return newState;
  },

  [Actions.deleteOneCommentThunk.rejected.toString()]: (
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
  [Actions.deleteOneCommentThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },

  [Actions.deleteOneCommentThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.editedDog = null;
    newState.loading = false;
    return newState;
  },

  [Actions.fetchOneShelterDogThunk.rejected.toString()]: (
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
  [Actions.fetchOneShelterDogThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    //newState.settingsRequireRefresh=true;
    return newState;
  },

  [Actions.fetchOneShelterDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IShelterDogWithPicture, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.shelterDog = payload.payload.response
      .data as IShelterDogWithPicture;
    newState.shelterDog.picture.data = (
      payload.payload.response.data as IShelterDogWithPicture
    ).picture.data as string;
    newState.dogsRequireRefresh = false;
    newState.settingsRequireRefresh = false;
    return newState;
  },

  [Actions.fetchOneShelterThunk.rejected.toString()]: (
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
  [Actions.fetchOneShelterThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },

  [Actions.fetchOneShelterThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<IShelter, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.shelter = payload.payload.response.data as IShelter;
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

  [Actions.registerShelterUserThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<undefined>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = true;
    return newState;
  },
  [Actions.registerShelterUserThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.redirect = "/";
    newState.loading = false;
    newState.loginInformation = payload.payload.response.data;
    return newState;
  },
  [Actions.registerShelterUserThunk.rejected.toString()]: (
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
