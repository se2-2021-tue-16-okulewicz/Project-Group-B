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
  RequestResponse<ILoginResults>,
  ILoginInformation,
  { rejectValue: RequestResponse<ILoginResults> }
>("login", async (credentials: ILoginInformation, { rejectWithValue }) => {
  const response: RequestResponse<ILoginResults> = await Fetching.login(
    credentials
  );

  if (response.response.successful !== true) {
    return rejectWithValue(response as RequestResponse<ILoginResults>);
  }

  return response as RequestResponse<ILoginResults>;
});

/*
fetching dogs
*/
export const fetchDogsThunk = createAsyncThunk(
  "fetchAllDogs",
  async (item: any, { rejectWithValue }) => {
    const response: RequestResponse<
      ILostDogWithPicture[] | null
    > = await Fetching.fetchDogs(item.filters, item.cookies);

    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<ILostDogWithPicture | null>
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
      ILostDogWithPicture[] | null
    > = await Fetching.markLostDogAsFound(item.dogId, item.cookies);

    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<ILostDogWithPicture | null>
      );
    }

    //let dogs = response.response.data as ILostDogWithPicture[];

    return response;
  }
);
