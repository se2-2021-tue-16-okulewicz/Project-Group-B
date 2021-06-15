import * as Actions from "./actions";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RequestResponse } from "./response";
import { ILoginResults } from "../components/loginRegisterInterfaces";
import {
  IDogCharacteristics,
  IDogDetails,
  ILostDogWithPicture,
  IPicture,
  Picture,
} from "../components/dogs/dog/dogInterfaces";
import config from "../config/config";
import {
  genericCharacteristics,
  genericDogDetails,
  genericPicture,
  initDogDetails,
  initLostDogCharacteristics,
  initPic,
  initPicture,
} from "../components/dogs/dog/dogClasses";
import { SpecialMarkTypes } from "../components/dogs/dog/dogArrays";
import { BehaviorsTypes } from "../components/dogs/dog/dogEnums";
import {
  IFilterSort,
  initFilterProps,
} from "../components/helper/filtersInterface";

export type Error = {
  hasError: boolean;
  errorCode: number;
  erorMessage: string;
};

export type State = {
  status: string;
  dogs: ILostDogWithPicture[] | any;
  dogsLastPage: boolean;
  dogsRequireRefresh: boolean;
  loadingDogs: boolean;
  loading: boolean;
  error: Error;
  loginInformation: ILoginResults | null;
  image: string;
  dogCharacteristics: IDogCharacteristics | any;
  dogDetails: IDogDetails;
  dogBehaviours: BehaviorsTypes[];
  //currentDog: ILostDogWithPicture | null;
  picture: Picture;
  filters: IFilterSort;
};

const init: State = {
  status: "",
  dogs: [],
  dogsLastPage: false,
  dogsRequireRefresh: false,
  loadingDogs: false,
  loading: false,
  error: {
    hasError: false,
    errorCode: 0,
    erorMessage: "",
  },
  loginInformation: null,
  image: "",
  dogCharacteristics: initLostDogCharacteristics,
  dogDetails: initDogDetails,
  dogBehaviours: [],
  picture: initPic,
  filters: initFilterProps,
};

export const reducer = createReducer(init, {
  [Actions.clearLoginInformation.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.loginInformation = null;
    return newState;
  },
  [Actions.reset.type]: (state: State) => {
    let newState = init;
    newState.status = "reset";
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

  [Actions.setImage.type]: (state: State, payload: PayloadAction<string>) => {
    let newState = _.cloneDeep(state);
    newState.image = payload.payload;
    return newState;
  },

  [Actions.setPicture.type]: (
    state: State,
    payload: PayloadAction<Picture>
  ) => {
    let newState = _.cloneDeep(state);
    newState.picture = payload.payload;
    return newState;
  },

  [Actions.setDogCharacteristics.type]: (
    state: State,
    payload: PayloadAction<IDogCharacteristics>
  ) => {
    let newState = _.cloneDeep(state);
    newState.dogCharacteristics = payload.payload;
    //newState.currentDog?.picture = payload.payload;
    //newState.picture = payload.payload;
    return newState;
  },

  [Actions.setDogDetails.type]: (
    state: State,
    payload: PayloadAction<IDogDetails>
  ) => {
    let newState = _.cloneDeep(state);
    newState.dogDetails = payload.payload;
    return newState;
  },

  [Actions.setDogBehaviours.type]: (
    state: State,
    payload: PayloadAction<BehaviorsTypes[]>
  ) => {
    let newState = _.cloneDeep(state);
    newState.dogBehaviours = payload.payload;
    return newState;
  },

  [Actions.setFilters.type]: (
    state: State,
    payload: PayloadAction<IFilterSort>
  ) => {
    let newState = _.cloneDeep(state);
    newState.filters = payload.payload;
    return newState;
  },

  [Actions.setDogsRequireRefresh.type]: (
    state: State,
    payload: PayloadAction<boolean>
  ) => {
    let newState = _.cloneDeep(state);
    newState.dogsRequireRefresh = payload.payload;
    newState.dogs = [];
    return newState;
  },

  [Actions.addDogThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.status="added dog";
    newState.dogsRequireRefresh = true;
    
    return newState;
  },
  [Actions.addDogThunk.pending.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
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
    payload: PayloadAction<RequestResponse<ILoginResults, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.loading = false;
    newState.loginInformation = payload.payload.response.data;
    newState.dogsRequireRefresh = true;
    if (newState.loginInformation?.userType == "Regular") {
      newState.status = "redirectToDogs";
    }
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

  [Actions.fetchDogsThunk.pending.toString()]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.loadingDogs = true;
    newState.dogsRequireRefresh = false;
    return newState;
  },

  [Actions.fetchDogsThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[], number>>
  ) => {
    let newState = _.cloneDeep(state);
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
    console.log(newState.status)
    if(newState.status==="added dog"){
      newState.status =""
      newState.dogs = []
    }

    // dogs obtained from server are appended to current dogs
    // the .slice protects dogs list enormous growth - when fetch
    // is called multiple times (by an error)

    //newState.cars = state.cars.concat(action.payload.body);
    let newDogs: ILostDogWithPicture[] | null = payload.payload.response.data;

    let norepeatIds: number[] = [];
    let newnorepeatIds: number[] = [];
    let length = newDogs?.length;
    let oldLength = state.dogs.length;
    for(let i = 0; i < oldLength; i++){
      norepeatIds.push(state.dogs[i].id);
    }
    for(let i = 0; i < length; i++){
      if(!norepeatIds.includes(newDogs[i].id)){
        newnorepeatIds.push(newDogs[i].id);
        norepeatIds.push(newDogs[i].id);
      }
    }
    

    let dogs = state.dogs.concat(payload.payload.response.data);
    dogs = dogs.filter(dog  => newnorepeatIds.includes(dog.id));
  
    
    newState.dogs = state.dogs.concat(dogs);
    newState.loadingDogs = false;
    // if response is shorter than default size - it means end is reached.
    newState.dogsLastPage = newState.dogs.length < pageSize;
    newState.dogsRequireRefresh = false;
    return newState;
  },

  [Actions.fetchDogsThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[], number>>
  ) => {
    let newState = _.cloneDeep(state);
    let errorResponse = payload.payload;
    newState.loadingDogs = false;
    newState.error = {
      hasError: true,
      errorCode: errorResponse ? errorResponse.code : -1,
      erorMessage: errorResponse ? errorResponse.response.message : "",
    };
    return newState;
  },

  [Actions.markLostDogAsFoundThunk.pending.toString()]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.loadingDogs = true;
    newState.dogsRequireRefresh = false;
    newState.status = "";
    return newState;
  },

  [Actions.markLostDogAsFoundThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
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
    newState.loadingDogs = false;
    newState.dogs = [];
    // if response is shorter than default size - it means end is reached.
    newState.dogsLastPage = newState.dogs.length < pageSize;
    newState.dogsRequireRefresh = true;
    return newState;
  },

  [Actions.markLostDogAsFoundThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<null, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    let errorResponse = payload.payload;
    newState.loadingDogs = false;
    newState.error = {
      hasError: true,
      errorCode: errorResponse ? errorResponse.code : -1,
      erorMessage: errorResponse ? errorResponse.response.message : "",
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
    payload: PayloadAction<RequestResponse<ILoginResults, undefined>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.status = "redirectToDogs";
    newState.loading = false;
    newState.loginInformation = payload.payload.response.data;
    return newState;
  },
  [Actions.registerRegularUserThunk.rejected.toString()]: (
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
});
