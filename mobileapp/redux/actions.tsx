import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as Fetching from "./fetching";
import {
  ILoginInformation,
  ILoginResults,
} from "../components/loginRegisterInterfaces";
import { RequestResponse } from "./response";
import { ILostDogWithPicture } from "../components/dogs/dog/dogInterfaces";
import { IRegisterRegularUserInformation } from "../components/register-login/loginRegisterInterfaces";

/**
 * Thunk for logging into an account
 * @param {ILoginInformation} credentials an object containing login details
 */

export const loginThunk = createAsyncThunk<
  RequestResponse<ILoginResults, undefined>,
  ILoginInformation,
  { rejectValue: RequestResponse<ILoginResults, undefined> }
>("login", async (credentials: ILoginInformation, { rejectWithValue }) => {
  const response: RequestResponse<ILoginResults, undefined> =
    await Fetching.login(credentials);

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
    const response: RequestResponse<ILostDogWithPicture[], number> =
      await Fetching.fetchDogs(item.filters, item.Authorization);

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
    const response: RequestResponse<null, undefined> =
      await Fetching.markLostDogAsFound(item.dogID, item.Authorization);

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null, undefined>);
    }

    //let dogs = response.response.data as ILostDogWithPicture[];

    return response;
  }
);
/**
 * Register a regular user
 */
export const registerRegularUserThunk = createAsyncThunk<
  RequestResponse<ILoginResults>,
  IRegisterRegularUserInformation,
  { rejectValue: RequestResponse<null> }
>(
  "registeregularUser",
  async (newUserInfo: IRegisterRegularUserInformation, { rejectWithValue }) => {
    const response: RequestResponse<null> = await Fetching.registerRegularUser(
      newUserInfo
    );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null>);
    }

    //On success we want to acutally login
    const responseLogin: RequestResponse<ILoginResults> = await Fetching.login({
      username: newUserInfo.username,
      password: newUserInfo.password,
    });

    if (response.response.successful !== true) {
      return rejectWithValue({
        code: responseLogin.code,
        response: {
          message: responseLogin.response.message,
          successful: responseLogin.response.successful,
          data: null,
        },
      });
    }

    return responseLogin as RequestResponse<ILoginResults>;
  }
);
