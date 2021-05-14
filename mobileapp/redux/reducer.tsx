import * as Actions from "./actions";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RequestResponse } from "./response";
import { ILoginResults } from "../components/loginRegisterInterfaces";
import { IDogCharacteristics, ILostDogWithPicture, IPicture } from "../components/dogs/dog/dogInterfaces";
import config from "../config/config";
import { initPicture } from "../components/dogs/dog/dogClasses";
import { SpecialMarkTypes } from "../components/dogs/dog/dogArrays";

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
  //currentDog: ILostDogWithPicture | null;
  //picture: IPicture;
};

const init: State = {
  status: "",
  dogs: [],
  dogsLastPage: false,
  dogsRequireRefresh: true,
  loadingDogs: false,
  loading: false,
  error: {
    hasError: false,
    errorCode: 0,
    erorMessage: "",
  },
  loginInformation: null,
  image: "",
  dogCharacteristics: {
    name: "",
    age: 0,
    hairLength: "",
    color: "",
    size: "",
    earsType: "",
    tailLength: "",
    specialMark: "",
    behaviours: [],

  }
  //currentDog: null,
  // picture: {
  //   id: 0,
  //   fileName: "",
  //   fileType: "",
  //   data: new ArrayBuffer(8)
  // },
};

/*name: string;
  breed: BreedTypes | "";
  age: number;
  hairLength: HairTypes | "";
  color: ColorTypes | "";
  size: SizeTypes | "";
  earsType: EarsTypes | "";
  tailLength: TailTypes | "";
  specialMark: SpecialMarkTypes;
  behaviors: BehaviorsTypes[];
}*/

export const reducer = createReducer(init, {
  [Actions.clearLoginInformation.type]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.loginInformation = null;
    console.log("log info cleared");
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
    //console.log(newState.image);
    return newState;
  },

  [Actions.setDogCharacteristics.type]: (state: State, payload: PayloadAction<IDogCharacteristics>) => {
    let newState = _.cloneDeep(state);
    newState.dogCharacteristics = payload.payload;
    //newState.currentDog?.picture = payload.payload;
    //newState.picture = payload.payload;
    //console.log(newState.image);
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
    newState.dogsRequireRefresh = true;
    if (newState.loginInformation?.userType == "Regular") {
      newState.status = "redirectToDogs";
    }
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

  [Actions.fetchDogsThunk.pending.toString()]: (state: State) => {
    let newState = _.cloneDeep(state);
    newState.loadingDogs = true;
    newState.dogsRequireRefresh = false;
    newState.status = "";
    return newState;
  },

  [Actions.fetchDogsThunk.fulfilled.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[]>>
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
    // dogs obtained from server are appended to current dogs
    // the .slice protects dogs list enormous growth - when fetch
    // is called multiple times (by an error)
    newState.dogs = payload.payload.response.data;
    newState.loadingDogs = false;
    // if response is shorter than default size - it means end is reached.
    newState.dogsLastPage = newState.dogs.length < pageSize;
    newState.dogsRequireRefresh = false;
    return newState;
  },

  [Actions.fetchDogsThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[]>>
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
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[]>>
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
    // if response is shorter than default size - it means end is reached.
    newState.dogsLastPage = newState.dogs.length < pageSize;
    newState.dogsRequireRefresh = true;
    return newState;
  },

  [Actions.markLostDogAsFoundThunk.rejected.toString()]: (
    state: State,
    payload: PayloadAction<RequestResponse<ILostDogWithPicture[]>>
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
    payload: PayloadAction<RequestResponse<null>>
  ) => {
    let newState = _.cloneDeep(state);
    newState.status = "redirectToDogs";
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
