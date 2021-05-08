import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as Fetching from "./fetching";
import {
  ILoginInformation,
  ILoginResults,
} from "../components/loginRegisterInterfaces";
import { RequestResponse } from "./response";
import { ILostDogWithPicture } from "../components/dogs/dog/dogInterfaces";

/**
 * Thunk for logging into an account
 * @param {ILoginInformation} credentials an object containing login details
 */

export const loginThunk = createAsyncThunk<
  RequestResponse<ILoginResults, undefined>,
  ILoginInformation,
  { rejectValue: RequestResponse<ILoginResults, undefined> }
>("login", async (credentials: ILoginInformation, { rejectWithValue }) => {
  const response: RequestResponse<
    ILoginResults,
    undefined
  > = await Fetching.login(credentials);

  if (response.response.successful !== true) {
    return rejectWithValue(
      response as RequestResponse<ILoginResults, undefined>
    );
  }

  return response as RequestResponse<ILoginResults, undefined>;
});

/*
fetching dogs
*/
export const fetchDogsThunk = createAsyncThunk(
  "fetchAllDogs",
  async (item: any, { rejectWithValue }) => {
    const response: RequestResponse<
      ILostDogWithPicture[],
      number
    > = await Fetching.fetchDogs(item.filters, item.Authorization);

    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<ILostDogWithPicture[], number>
      );
    }

    //let dogs = response.response.data as ILostDogWithPicture[];

    return response;
  }
);

/*
 * Reseting state to idle.
 */
export const setIdle = createAction("setIdle");
export const clearLoginInformation = createAction("clearLoginInformation");
export const incorrectUserType = createAction("incorrectUserType");

/*
Marking lost dog as foud.
*/
export const markLostDogAsFoundThunk = createAsyncThunk(
  "markLostDogAsFound",
  async (item: any, { rejectWithValue }) => {
    const response: RequestResponse<
      null,
      undefined
    > = await Fetching.markLostDogAsFound(item.dogID, item.Authorization);

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null, undefined>);
    }

    //let dogs = response.response.data as ILostDogWithPicture[];

    return response;
  }
);
